/*******************************************************************
 *
 * 입사지원서 공통 Script
 *
 *******************************************************************/
 var g_base_minute = 30;
 var g_base_second = g_base_minute * 60 ;
 var g_timer_checker = null;
 var recomApplyPathCd = "12,14,16,13,08,20,27"; //임직원추천/기타/교수추천/헤드헌팅업체/취업사이트/SNS광고/외부 지인 소개 및 추천
 
 /*
  * 로그인 유지시간 타이머
  */
 function countTimer() {
     rMinute = parseInt(g_base_second / 60);
     rSecond = g_base_second % 60;
     
     if(g_base_second > -1){
         timer.innerHTML = "(" + String(rMinute).lpad('0',2) + "분 " + String(rSecond).lpad('0',2) + "초)";
         g_base_second--;
         g_timer_checker = setTimeout("countTimer()", 1000);
         
         if (String(rMinute).lpad('0',2) + String(rSecond).lpad('0',2) == "0500") {
             $.blockUI({ message: $('#confirmSessionDialog'), css: { width: '520px', left:'25%' } });
         }
     } else {
         clearTimeout(g_timer_checker);
         alert("로그인 유지시간이 종료되었습니다.\n\n다시 로그인해주세요.");
         self.close();
     }
 }
 
 /*
  * 로딩바 처리
  */
 function showLoadingMessage() {
     $.blockUI({ message: "<div style='height:100px;line-height:100px;vertical-align:middle'><img src='/img/common/searching.gif' align='absmiddle'/></div>" });
 }
 
 /*
  * 로딩바 숨김 처리
  */
 function hideLoadingMessage() {
     $.unblockUI();
 }
 
 /*
  * 입사지원서 로드시 창 사이즈및 버튼 노출여부 정의
  */
 function initApplication(prevPage, nextPage, sysCompanyCd) {
     window.resizeTo(945, 790);
     
     if (typeof(sysCompanyCd) == "undefined" || sysCompanyCd != "KR") {
         if (prevPage == "") document.getElementById("btnBottomPrev").style.display = "none";
         if (nextPage == "") document.getElementById("btnBottomNext").style.display = "none";
     
         if (prevPage == "" && nextPage == "") {
             document.getElementById("btnBottomTempSave").style.display = "none";
             document.getElementById("btnBottomEdit").style.display = "";
             document.getElementById("btnBottomApply").style.display = "";
         }
     }
 }
 // 지원서 수정
 function editButtonApplication() {
     location.href = "personalinfo";
 }
 // 지원서 제출
 function submitButtonApplication() {
     submitApplication();
 }
 // 지원서작성 이전단계
 function movePrevApplicationPage(page) {
     if (!formValidationCheck(document.form1)) {
         return false;
     }
     if (confirm("저장 후 이전단계로 이동하시겠습니까?")) {
         document.form1.movePage.value = page;
         formElementAllEnable(document.form1); // 저장하기 위해서 모든 폼 element의 상태를 enable로 만든다.
         hiddenApplicationButton();
         removeFormElementFmt(document.form1);
         document.form1.action = "?movePage=" + page;
         showLoadingMessage();
         document.form1.submit();
     }
 }
 // 지원서작성 다음단계
 function moveNextApplicationPage(page) {
     if (!formValidationCheck(document.form1)) {
         return false;
     }
     if (confirm("저장 후 다음단계로 이동하시겠습니까?")) {
         document.form1.movePage.value = page;
         formElementAllEnable(document.form1); // 저장하기 위해서 모든 폼 element의 상태를 enable로 만든다.
         hiddenApplicationButton();
         removeFormElementFmt(document.form1);
         document.form1.action = "?movePage=" + page;
         showLoadingMessage();
         document.form1.submit();
     }
 }
 // 지원서 임시저장
 function saveTempApplication() {
     if (!formValidationCheck(document.form1)) {
         return false;
     }
     if (confirm("저장하시겠습니까?")) {
         formElementAllEnable(document.form1); // 저장하기 위해서 모든 폼 element의 상태를 enable로 만든다.
         hiddenApplicationButton();
         removeFormElementFmt(document.form1);
         showLoadingMessage();
         window.onbeforeunload = null;
         document.form1.submit();
     }
 }
 // 저장시나 이동시에 하단버튼들 숨김처리
 function hiddenApplicationButton() {
     $("#btnBottomPrev").css("display", "none");
     $("#btnBottomNext").css("display", "none");
     $("#btnBottomTempSave").css("display", "none");
 }
 
 /*******************************************************************
  *
  * Validation Check Script
  *
  *******************************************************************/
 // 빈값 체크 함수
 function checkIfEmptyValue(jObj, msg) {
     if (jObj[0] == null) {
         alert(msg);
     }
     var endMsg = " 입력해주세요.";
     if (jObj[0].nodeName == "SELECT") endMsg = " 선택해주세요.";
 
     if (jObj.attr("disabled")) return false;
     if ($.trim(jObj.val()) == "") {
         alert(msg + endMsg);
         jObj.focus();
         return true;
     }
     return false;
 }
 
 // 날짜형식 체크
 function checkDateValue(jObj) {
     if (jObj.attr("disabled")) return false;
 
     var maskType = jObj.attr("masktype");
 
     if (maskType == "dateYm" && jObj.val().removeFmt().length != 6) {
         alert("날짜 자리수가 올바르지 않습니다.");
         jObj.focus();
         return true;
     }
 
     if ((maskType == "date" || maskType == "dateYmd") && jObj.val().removeFmt().length != 8) {
         alert("날짜 자리수가 올바르지 않습니다.");
         jObj.focus();
         return true;
     }
 
     if (jObj.val().length > 1 && !jObj.val().isDate()) {
         alert("날짜형식이 올바르지 않습니다.");
         jObj.focus();
         return true;
     }
     return false;
 }
 
 //숫자형식 체크
 function checkFloatValue(jObj) {
     if (jObj.attr("disabled")) return false;
     if (jObj.val().length > 0 && !jObj.val().isFloat()) {
         alert("숫자만(소수점 포함) 입력 가능합니다.");
         jObj.focus();
         return true;
     }
     return false;
 }
 // 날짜기간 체크
 function checkDatePeriod(sObj, eObj, msg) {
     var sVal = (typeof(sObj) == "object" ? sObj.val() : sObj);
     var eVal = (typeof(eObj) == "object" ? eObj.val() : eObj);
 
     if (typeof(sObj) == "object" && sObj.attr("disabled")) return false;
     if (typeof(eObj) == "object" && eObj.attr("disabled")) return false;
 
     if (sVal.removeFmt() >= eVal.removeFmt()) {
         alert(msg);
         if (typeof(eObj) == "object") {
             eObj.focus();
         }
         return true;
     }
 
     return false;
 }
 
 //날짜기간 체크
 function checkDatePeriod2(sObj, eObj, msg) {
     var sVal = (typeof(sObj) == "object" ? sObj.val() : sObj);
     var eVal = (typeof(eObj) == "object" ? eObj.val() : eObj);
 
     if (typeof(sObj) == "object" && sObj.attr("disabled")) return false;
     if (typeof(eObj) == "object" && eObj.attr("disabled")) return false;
 
     if (sVal.removeFmt() > eVal.removeFmt()) {
         alert(msg);
         if (typeof(eObj) == "object") {
             eObj.focus();
         }
         return true;
     }
 
     return false;
 }
 
 /**
  * 입력글자수를 체크하는 함수
  */
 function checkContentLength(inputObj, dispObj, maxLength) {
     var inputValue = inputObj.val();
 
     if (maxLength == "" || parseInt(maxLength, 10) == 0) return;
 
     dispObj.html(inputValue.length + " / " + maxLength + "자");
 
     if (inputValue.length > maxLength) {
         alert(maxLength + "자를 초과하여 입력할 수 없습니다. \n초과된 내용은 자동삭제 됩니다.");
         inputValue = inputValue.substr(0, maxLength) ;
         inputObj.val(inputValue);
         checkContentLength(inputObj, dispObj, maxLength);
     }
 }
 
 /*******************************************************************
  *
  * Form, Table 관련 Script
  *
  *******************************************************************/
 // 폼 element의 disable 상태 변경.
 function disableFormElement(jObj, disable, defaultValue) {
     jObj.attr("disabled", disable);
     jObj.attr("readonly", disable);
     if (disable) {
         jObj.css("display", "none");
     } else {
         jObj.css("display", "");
     }
     if (typeof(defaultValue) != "undefined") jObj.val(defaultValue);
     
     /*var objName = jObj.attr("name");
     var objId = jObj.attr("id");
     if (typeof(objName) != "undefined") {
         if (typeof(objId) != "undefined") {
         var idx = parseInt(objName.substring(objName.indexOf("[") + 1, objName.indexOf("]")));
         if (disable) {
             console.log("true " + objId + "---------" + $("label[for='" + objId + "']").eq(idx).children(".lb_txt").hasClass("blind"));
             $("label[for='" + objId + "']").eq(idx).children(".lb_txt").addClass("blind");
             console.log("true " + objId + "---------" + $("label[for='" + objId + "']").eq(idx).children(".lb_txt").hasClass("blind"));
             //console.log("true " + objName + "___" + objId +"___"+ "____" + idx + "___" +$("label[for='" + objId + "']").eq(idx).css("display"));
         } else {
             console.log("false " + objId + "---------" + $("label[for='" + objId + "']").eq(idx).children(".lb_txt").hasClass("blind"));
             $("label[for='" + objId + "']").eq(idx).children(".lb_txt").removeClass("blind");
             console.log("false " + objId + "---------" + $("label[for='" + objId + "']").eq(idx).children(".lb_txt").hasClass("blind"));
             //console.log("2" + $("label[for='" + objId + "']").eq(idx).children(".lb_txt").hasClass("blind"));
             //console.log("false " + objName + "___" + objId +"___"+ "____" + idx + "___" +$("label[for='" + objId + "']").eq(idx).css("display"));
         }
         }
     }*/
 }
 
 
 /*
  * 행추가
  *   주의) 첫번째 tr을 복사해서 행추가하는 형태이기 때문에 첫번째 tr은 display:none 설정 처리
  * @param tableObj 행추가 대상 테이블 Object
  */
 function appendRow(tableObj) {
     var newItem = $("#" + tableObj.attr("id") + " > tbody > tr:first").clone();
     tableObj.append(newItem);
     newItem.css("display", "");
 
     var index = $("#" + tableObj.attr("id") + " > tbody > tr").length - 2;	// 배열순서 (첫번째tr : 제목, 두번째 tr : 복사대상tr)
 
     // input, select, textarea의 이름을 배열형태로 변경
     var inputObj = $("#" + tableObj.attr("id") + " > tbody > tr:last").find("input, select, textarea, button, div");
 
     inputObj.each(function() {
         if ($(this).get(0).tagName == "DIV") {
             var newId = $(this).attr("id");
             if (typeof(newId) != "undefined") {
                 newId = newId + "_" + index;
                 $(this).attr("id", newId);
             }
         } else {
             var newName = $(this).attr("name");
             newName = newName.replace(".", "[" + index + "].");
             $(this).attr("name", newName);
         }
     });
 }
 
 /*
  * 행추가후 데이터 입력
  * @param tableObj 행추가 대상 테이블 Object
  * @param 행추가이벤트
  * @param json형태의 입력할 데이터
  */
 function appendRowAndSetData(tableObj, appendRowEvent, jsonData) {
     for (var i = 0; i < jsonData.length; i++) {
         eval(appendRowEvent + "($('#" + tableObj.attr("id") + "'))");
         var inputObj = $("#" + tableObj.attr("id") + " > tbody > tr:last").find("input, select, textarea, button");
         for (var j = 0; j < inputObj.length; j++) {
             var jObj = $(inputObj.get(j));
             var objName = jObj.attr("name");
             var prefix = objName.substring(0, objName.indexOf("."));
 
             for (var dataName in jsonData[i]) {
                 var dataValue = jsonData[i][dataName];
                 if ((prefix + "." + dataName) == objName) {
                     if (dataValue != null) {
                         jObj.val(dataValue.unescapeHTML());
                     }
 
                     if (jObj.get(0).tagName == "SELECT") {
                         jObj.change();
                     }
 
                     if (jObj.attr("type") == "checkbox" && dataValue == "Y") {
                         jObj.attr("checked", true);
                     }
                     break;
                 }
             }
         }
     }
 }
 
 /*
  * 업로드 된 첨부파일 링크 표시
  */
 function displayUploadFile(tableObj, fileListId, jsonData) {
     var index = getAppendTrTotalCount($("#" + tableObj.attr("id") + " > tbody > tr"));
 
     for (var i = 0; i < index; i++) {
         var uploadAreaObj = $("#" + fileListId + "_" + i);
         var fileNm = jsonData[i]["fileNm"];
         var realFileNm = jsonData[i]["realFileNm"];
         var filePath = jsonData[i]["filePath"];
         var fileLink = "";
         if (fileNm != "") {
             uploadAreaObj.css("display", "");
             fileLink += '<a href="/common/file/downloadFile';
             fileLink += '?fileNm=' + fileNm;
             fileLink += '&realFileNm=' + realFileNm;
             fileLink += '&filePath=' + filePath;
             fileLink += '">' + fileNm + '</a>&nbsp;';
 
             uploadAreaObj.html(fileLink + uploadAreaObj.html());
         }
     }
 }
 
 /*
  * 파라미터로 받은 object가 같은이름의 object들중 몇번째 object인지 index번호 반환
  * @param obj
  */
 function getFormElementIndex(obj) {
     var objName = obj.getAttribute("name");
     return parseInt(objName.substring(objName.indexOf("[") + 1, objName.indexOf("]")));
 }
 
 /*
  * 테이블에 추가된 전체 tr 갯수
  */
 function getAppendTrTotalCount(jObj) {
     // 배열순서 (첫번째tr : 복사대상tr)
     var index = jObj.length - 1;
 
     return index;
 }
 
 /*
  * 행삭제 - 실제 삭제처리는 안하고 sStatus 컬럼의 상태값을 D로 변경하고 행숨김 처리한다.
  * @param obj : 현재클릭한 object
  * @param tableObj : 행삭제대상 table
  * @param prefix
  */
 function deleteRow(obj, tableObj, prefix) {
     if (confirm("삭제 하시겠습니까?")) {
         var index = getFormElementIndex(obj);
         $("#" + tableObj.attr("id") + " > tbody > tr:eq(" + (index + 1) + ")").css("display", "none");
         $("[name='" + prefix + "[" + index + "].sStatus']").val("D");
     }
 }
 
 /*
  * 저장하기위해서 모든FORM의 Element들 활성화시킴
  * @param form
  */
 function formElementAllEnable(form) {
     for (var i=0;i<form.elements.length;i++) {
         form.elements[i].disabled = false;
     }
 }
 
 
 
 
 /*******************************************************************
  *
  * 팝업 관련 Script
  *
  *******************************************************************/
 /*
  * 우편번호 검색창열기
  */
 function openPostPopup(gubun) {
     var returnMethod = "";
     if(gubun == "ctz"){
         returnMethod = "onPostSearchEnd";
     }else if(gubun == "cur"){
         returnMethod = "onCurPostSearchEnd";
     }
 
     var win = open("/common/searchPostPopup?returnMethod=" + returnMethod, "_searchPost","height=550,width=500,resizable=no,scrollbars=no");
     win.focus();
 }
 function onPostSearchEnd(returnData) {
     $("#applicant\\.postNo").val(returnData.post);
     $("#applicant\\.addr").val(returnData.addr);
     $("#applicant\\.addr2").focus();
 }
 function onCurPostSearchEnd(returnData) {
     $("#applicant\\.curPostNo").val(returnData.post);
     $("#applicant\\.curAddr").val(returnData.addr);
     $("#applicant\\.curAddr2").focus();
 }
 /*
  * 국가검색
  */
 function openNationPopup(gubun){
     var returnMethod = "";
     var param = "";
     if(gubun == "ctz"){
         returnMethod = "onNationSearchEnd";
     }else if(gubun == "cur"){
         returnMethod = "onCurNationSearchEnd";
     }
 
     param += "?cdKind=HRM_048";
     param += "&searchType=nation";
     param += "&returnMethod=" + returnMethod;
 
     var win = open("/common/searchCodePopup" + param, "_searchCode","height=550,width=500,resizable=no,scrollbars=no");
     win.focus();
 }
 
 function onNationSearchEnd(returnData) {
     $("#applicant\\.nationCd").val(returnData.cd);
     $("#applicant\\.nationNm").val(returnData.cdNm);
 }
 
 function onCurNationSearchEnd(returnData) {
     $("#applicant\\.curNationCd").val(returnData.cd);
     $("#applicant\\.curNationNm").val(returnData.cdNm);
 }
 
 // 학교검색
 function openSchoolPopup(obj) {
     g_index = getFormElementIndex(obj);
     
     var scholarTypeCd = $("[name='scholarList[" + g_index + "].scholarTypeCd']").val();
 
     var param = "";
     param += "?cdKind=HRM_903";
     param += "&searchType=school";
     param += "&returnMethod=onSchoolSearchEnd";
 
     if (scholarTypeCd == "001" || scholarTypeCd == "002") {
         param += "&groupCd=" + scholarTypeCd;
     }
 
     var win = open("/common/searchCodePopup" + param, "_searchCode","height=550,width=500,resizable=no,scrollbars=no");
     win.focus();
 }
 
 function onSchoolSearchEnd(returnData) {
     $("[name='scholarList[" + g_index + "].schoolCd']").val(returnData.cd);
     $("[name='scholarList[" + g_index + "].schoolNm']").val(returnData.cdNm);
     $("[name='scholarList[" + g_index + "].schoolGroupCd']").val(returnData.groupCd);
 }
 
 // 전공검색
 function openMajorPopup(obj) {
     var returnMethod = "onMajorSearchEnd";
     
     if (obj.name.indexOf("Minor") > -1) {
         returnMethod = "onMinorSearchEnd";
     }
     
     g_index = getFormElementIndex(obj);
 
     var param = "";
     param += "?cdKind=HRM_902";
     param += "&searchType=major";
     param += "&returnMethod=" + returnMethod;
 
     var win = open("/common/searchCodePopup" + param, "_searchCode","height=550,width=500,resizable=no,scrollbars=no");
     win.focus();
 }
 
 // 전공검색 callback
 function onMajorSearchEnd(returnData) {
     $("[name='scholarList[" + g_index + "].majorCd']").val(returnData.cd);
     $("[name='scholarList[" + g_index + "].majorNm']").val(returnData.cdNm);
     $("[name='scholarList[" + g_index + "].majorGroupCd']").val(returnData.groupCd);
 }
 
 // 부전공검색 callback
 function onMinorSearchEnd(returnData) {
     $("[name='scholarList[" + g_index + "].minorCd']").val(returnData.cd);
     $("[name='scholarList[" + g_index + "].minorNm']").val(returnData.cdNm);
     $("[name='scholarList[" + g_index + "].minorGroupCd']").val(returnData.groupCd);
 }
 
 //회사검색
 function openCompanyPopup(obj) {
     g_index = getFormElementIndex(obj);
 
     var param = "";
     param += "?cdKind=HRM_907";
     param += "&searchType=company";
     param += "&returnMethod=onCompanySearchEnd";
 
     var win = open("/common/searchCodePopup" + param, "_searchCode","height=550,width=500,resizable=no,scrollbars=no");
     win.focus();
 }
 function onCompanySearchEnd(returnData) {
     $("[name='careerList[" + g_index + "].corpCd']").val(returnData.cd);
     $("[name='careerList[" + g_index + "].corpNm']").val(returnData.cdNm);
     $("[name='careerList[" + g_index + "].corpGroupCd']").val(returnData.groupCd);
 }
 
 //자격증검색
 function openLicensePopup(obj, sysCompanyCd) {
     var returnMethod = "onLicenseSearchEnd";
     if (typeof(sysCompanyCd) != "undefined") {
         returnMethod = "onLicenseSearchEndNaver";
     }
     g_index = getFormElementIndex(obj);
 
     var param = "";
     param += "?cdKind=HRM_904";
     param += "&searchType=license";
     param += "&returnMethod=" + returnMethod;
 
     var win = open("/common/searchCodePopup" + param, "_searchCode","height=550,width=500,resizable=no,scrollbars=no");
     win.focus();
 }
 function onLicenseSearchEnd(returnData) {
     $("[name='licenseList[" + g_index + "].licenseCd']").val(returnData.cd);
     $("[name='licenseList[" + g_index + "].licenseNm']").val(returnData.cdNm);
 }
 function onLicenseSearchEndNaver(returnData) {
     $("[name='licenseLanguageList[" + g_index + "].licenseCd']").val(returnData.cd);
     $("[name='licenseLanguageList[" + g_index + "].licenseNm']").val(returnData.cdNm);
 }
 
 //수상내역검색
 function openPrizePopup(obj) {
     g_index = getFormElementIndex(obj);
 
     var param = "";
     param += "?cdKind=HRM_137";
     param += "&searchType=prize";
     param += "&returnMethod=onPrizeSearchEnd";
 
     var win = open("/common/searchCodePopup" + param, "_searchCode","height=550,width=500,resizable=no,scrollbars=no");
     win.focus();
 }
 function onPrizeSearchEnd(returnData) {
     $("[name='prizeList[" + g_index + "].meetingCd']").val(returnData.cd);
     $("[name='prizeList[" + g_index + "].meetingNm']").val(returnData.cdNm);
 }
 //어학사항검색
 function openLanguagePopup(obj, division) {
     var cdKind = "HRM_014"; // 언어
     var searchType = "language";
     var returnMethod = "onLanguageTypeSearchEnd";
     if (division == "TEST") {
         cdKind = "HRM_059"; // 시험종류
         searchType = "test";
         returnMethod = "onLanguageTestSearchEnd";
     }
     g_index = getFormElementIndex(obj);
 
     var param = "";
     param += "?cdKind=" + cdKind;
     param += "&searchType=" + searchType;
     param += "&returnMethod=" + returnMethod;
 
     var win = open("/common/searchCodePopup" + param, "_searchCode","height=550,width=500,resizable=no,scrollbars=no");
     win.focus();
 }
 function onLanguageTypeSearchEnd(returnData) {
     $("[name='licenseLanguageList[" + g_index + "].langTypeCd']").val(returnData.cd);
     $("[name='licenseLanguageList[" + g_index + "].langTypeNm']").val(returnData.cdNm);
 }
 function onLanguageTestSearchEnd(returnData) {
     $("[name='licenseLanguageList[" + g_index + "].langTestCd']").val(returnData.cd);
     $("[name='licenseLanguageList[" + g_index + "].langTestNm']").val(returnData.cdNm);
 }
 //등급검색
 function openGradeSearchPopup(obj, division) {
     var cdKind = "HRM_050"; // 자격등급
     var returnMethod = "onLicenseGradeSearchEnd";
     if (division == "LANGUAGE") {
         cdKind = "HRM_080"; // 어학등급
         returnMethod = "onLanguageGradeSearchEnd";
     }
     g_index = getFormElementIndex(obj);
 
     var param = "";
     param += "?cdKind=" + cdKind;
     param += "&searchType=grade";
     param += "&returnMethod=" + returnMethod;
 
     var win = open("/common/searchCodePopup" + param, "_searchCode","height=550,width=500,resizable=no,scrollbars=no");
     win.focus();
 }
 function onLicenseGradeSearchEnd(returnData) {
     $("[name='licenseLanguageList[" + g_index + "].licenseGrdCd']").val(returnData.cd);
     $("[name='licenseLanguageList[" + g_index + "].licenseGrdNm']").val(returnData.cdNm);
 }
 function onLanguageGradeSearchEnd(returnData) {
     $("[name='licenseLanguageList[" + g_index + "].langGrdCd']").val(returnData.cd);
     $("[name='licenseLanguageList[" + g_index + "].langGrdNm']").val(returnData.cdNm);
 }
 
 ////////////////////////////////////////////////////////////////////
 // 네이버 채용 개편 추가
 ////////////////////////////////////////////////////////////////////
 function prependRowAndSetDiv(tableObj, prependRowEvent, jsonData) {
     for (var i = 0; i < jsonData.length; i++) {
         eval(prependRowEvent + "($('#" + tableObj.attr("id") + "'))");
         var inputObj = $("#" + tableObj.attr("id") + " > tbody > tr:last").find("input, select, textarea, button");
         for (var j = 0; j < inputObj.length; j++) {
             var jObj = $(inputObj.get(j));
             var objName = jObj.attr("name");
             var prefix = objName.substring(0, objName.indexOf("."));
 
             for (var dataName in jsonData[i]) {
                 var dataValue = jsonData[i][dataName].escapeHTML();
                 if ((prefix + "." + dataName) == objName) {
                     jObj.val(dataValue);
 
                     if (jObj.get(0).tagName == "SELECT") {
                         jObj.change();
                     }
                     if (jObj.get(0).tagName == "TEXTAREA") {
                         jObj.val(jsonData[i][dataName].unescapeHTML().toTEXT());
                     }
                     if (jObj.get(0).tagName == "INPUT") {
                         jObj.val(jsonData[i][dataName].unescapeHTML().toTEXT());
                     }
                     if (jObj.attr("type") == "checkbox" && dataValue == "Y") {
                         jObj.attr("checked", true);
                     }
                     break;
                 }
             }
         }
         
         updateViewArea(tableObj, i);
     }
 }
 
 /*
  * 행추가
  *   주의) 첫번째 tr을 복사해서 행추가하는 형태이기 때문에 첫번째 tr은 display:none 설정 처리
  * @param tableObj 행추가 대상 테이블 Object
  */
 function prependRow(tableObj) {
     var newItem = $("#" + tableObj.attr("id") + " > tbody > tr:first").clone();
     tableObj.append(newItem);
     newItem.css("display", "");
 
     var index = $("#" + tableObj.attr("id") + " > tbody > tr").length - 2;	// 배열순서 (첫번째tr : 제목, 두번째 tr : 복사대상tr)
 
     // input, select, textarea의 이름을 배열형태로 변경
     var inputObj = $("#" + tableObj.attr("id") + " > tbody > tr:last").find("input, select, textarea, button, div");
 
     inputObj.each(function() {
         if ($(this).get(0).tagName == "DIV") {
             var newId = $(this).attr("id");
             if (typeof(newId) != "undefined") {
                 newId = newId + "_" + index;
                 $(this).attr("id", newId);
             }
         } else {
             var newName = $(this).attr("name");
             newName = newName.replace(".", "[" + index + "].");
             $(this).attr("name", newName);
             
             if ($(this).get(0).tagName == "SELECT") {
                 createComboBoxList($(this));
             } else if ($(this).get(0).tagName == "TEXTAREA") {
                 // textarea를 clone하면 placeholer 값이 textarea로 값이 복사되기 때문에 value 값 reset 
                 if ($(this).get(0).placeholder == $(this).get(0).value) {
                     $(this).get(0).value = "";
                 }
             }
         }
     });
 }
 
 function updateViewArea(tableObj, idx) {
     var sysCompanyCd = $("#applicant\\.sysCompanyCd").val();
     var viewArea = $("#" + tableObj.attr("id") + " #viewArea_" + idx);
     var inptArea = $("#" + tableObj.attr("id") + " #inptArea_" + idx);
     
     var viewAreaInfo = "";
     if (tableObj.attr("id") == "addTableScholarship") {
         var schoolTypeCd = $("[name='scholarList[" + idx + "].scholarTypeCd']").val();
         var graduationType = $("[name='scholarList[" + idx + "].graduationType']").val();
         var schPlaceNm = $("[name='scholarList[" + idx + "].schPlaceCd'] option:selected").text();
         var schoolNm = $("[name='scholarList[" + idx + "].schoolNm']").val().escapeHTML();
         if (schPlaceNm != "") {
             schoolNm = $("[name='scholarList[" + idx + "].schoolNm']").val().escapeHTML() + "(" + schPlaceNm + ")"; 
         }
         viewAreaInfo += "<span>" + schoolNm + "</span>";
         if (schoolTypeCd != "001") {
             viewAreaInfo += "<span>" + $("[name='scholarList[" + idx + "].majorNm']").val().escapeHTML() + "</span>";
             viewAreaInfo += "<span>" + $("[name='scholarList[" + idx + "].minorNm']").val().escapeHTML() + "</span>";
             viewAreaInfo += "<span>" + $("[name='scholarList[" + idx + "].majorDetailNm']").val().escapeHTML() + "</span>";
             viewAreaInfo += "<span>" + $("[name='scholarList[" + idx + "].gradePnt']").val().escapeHTML() + "/" + $("[name='scholarList[" + idx + "].gradeBasis']").val().escapeHTML() + "</span>";
         }
         viewAreaInfo += "<span>" + $("[name='scholarList[" + idx + "].staYm']").val().escapeHTML().toDateFmt() + "~";
         if (graduationType == "001" || graduationType == "005" || graduationType == "009") {
             viewAreaInfo += $("[name='scholarList[" + idx + "].endYm']").val().escapeHTML().toDateFmt();
         }
         viewAreaInfo += "</span>";
         viewAreaInfo += "<span>" + $("[name='scholarList[" + idx + "].graduationType'] option:selected").text() + "</span>";
     } else if (tableObj.attr("id") == "addTableCareer") {
         viewAreaInfo += "<span>" + $("[name='careerList[" + idx + "].corpNm']").val().escapeHTML() + "</span>";
         viewAreaInfo += "<span>" + $("[name='careerList[" + idx + "].deptNm']").val().escapeHTML() + "</span>";
         viewAreaInfo += "<span>" + $("[name='careerList[" + idx + "].enterYmd']").val().escapeHTML().toDateFmt() + " ~ " + $("[name='careerList[" + idx + "].retireYmd']").val().escapeHTML().toDateFmt() + "</span>";
         
         if ("LP" == sysCompanyCd) {
             viewAreaInfo += "<span>" + $("[name='careerList[" + idx + "].jobRole']").val().escapeHTML() + "</span>";
             viewAreaInfo += "<span>" + $("[name='careerList[" + idx + "].empTypeCd'] option:selected").text() + "</span>";
         } else {
             viewAreaInfo += "<span>" + $("[name='careerList[" + idx + "].jobPosition']").val().escapeHTML() + "</span>";
             viewAreaInfo += "<span>" + $("[name='careerList[" + idx + "].jobRole']").val().escapeHTML() + "</span>";
         }
     } else if (tableObj.attr("id") == "addTableLicenseLanguage") {
         var licenseLanguageTypeCd = $("[name='licenseLanguageList[" + idx + "].licenseLanguageTypeCd']").val();
         if (licenseLanguageTypeCd == "LICENSE") {
             viewAreaInfo += "<span>" + $("[name='licenseLanguageList[" + idx + "].licenseNm']").val().escapeHTML() + "</span>";
             viewAreaInfo += "<span>" + $("[name='licenseLanguageList[" + idx + "].licenseGrdNm']").val().escapeHTML() + "</span>";
             viewAreaInfo += "<span>" + $("[name='licenseLanguageList[" + idx + "].score']").val().escapeHTML() + "</span>";
             viewAreaInfo += "<span>" + $("[name='licenseLanguageList[" + idx + "].takeYmd']").val().escapeHTML().toDateFmt() + "</span>";
             viewAreaInfo += "<span>" + $("[name='licenseLanguageList[" + idx + "].issueOrgNm']").val().escapeHTML() + "</span>";
         } else {
             viewAreaInfo += "<span>" + $("[name='licenseLanguageList[" + idx + "].langTypeNm']").val().escapeHTML() + "</span>";
             viewAreaInfo += "<span>" + $("[name='licenseLanguageList[" + idx + "].langTestNm']").val().escapeHTML() + "</span>";
             viewAreaInfo += "<span>" + $("[name='licenseLanguageList[" + idx + "].langGrdNm']").val().escapeHTML() + "</span>";
             viewAreaInfo += "<span>" + $("[name='licenseLanguageList[" + idx + "].score']").val().escapeHTML() + "</span>";
             viewAreaInfo += "<span>" + $("[name='licenseLanguageList[" + idx + "].testYmd']").val().escapeHTML().toDateFmt() + "</span>";
             viewAreaInfo += "<span>" + $("[name='licenseLanguageList[" + idx + "].langOrgNm']").val().escapeHTML() + "</span>";
         }
     }
     
     viewArea.find("#viewAreaInfo").empty().html(viewAreaInfo);
 
     inptArea.css("display", "none");
     viewArea.css("display", "block");
 }
 
 function setPreviewData() {
     var sysCompanyCd = $("#applicant\\.sysCompanyCd").val();
     var isRequired = true;
     var requiredMsg = "<em>필수</em>";
     var selfintroTitle = "직무질문";
     
     if (typeof(sysCompanyCd) != 'undefiend' && sysCompanyCd == "NX") {
         isRequired = false;
         requiredMsg = "";
         selfintroTitle = "지원질문";
     }
     
     if ("20004144" == $("[name='annoId']").val()) {
         selfintroTitle = "사전질문";
     }
     
     $("#previewApplicationLayer").empty();
     
     // 기본 인적사항
     var applNm = $("#applicant\\.applNm").val().escapeHTML();
     var birthYmd = $("#applicant\\.birthYmd").val().escapeHTML();
     var email = $("#applicant\\.email").val().escapeHTML();
     var genderType = $("#applicant\\.genderType option:selected").text();
     var nationNm = $("#applicant\\.nationNm").val().escapeHTML();
     var cellNo = $("#applicant\\.cellNo").val().escapeHTML();
     var entTypeCd = $("#applicant\\.entTypeCd").val();
     var applyPathCd = $("#applicant\\.applyPathCd").val();
     var applyPathNm = $("#applicant\\.applyPathCd option:selected").text();
     var recomEmpNm =  $("#applicant\\.recomEmpNm").val() != null ? $("#applicant\\.recomEmpNm").val().escapeHTML(): '';
     
     var personalInfo = "";
     personalInfo += "<div id='previewInfo_BASIC' class='prev_con v2'>";
     personalInfo += "	<h3>기본 인적사항 <em>필수</em></h3>";
     personalInfo += "	<dl class='dft_con v2'>";
     personalInfo += "	<dt>" + applNm + "</dt>";
     personalInfo += "	<dd>" + birthYmd + "</dd>";
     personalInfo += "	<dd>" + email + "</dd>";
     personalInfo += "	</dl>";
     personalInfo += "	<dl class='dft_con v2'>";
     personalInfo += "	<dt>" + genderType + "</dt>";
     personalInfo += "	<dd>" + nationNm + "</dd>";
     personalInfo += "	<dd>" + cellNo + "</dd>";
     personalInfo += "	<dd>" + applyPathNm + "</dd>";
 
     // 채용지원경로 임직원추천/기타/교수추천 일때 추천인 항목 추가
     /*if (recomApplyPathCd.indexOf(applyPathCd) > -1) {
         personalInfo += "	<dd>" + recomEmpNm + "</dd>";
     }*/
     if (recomEmpNm != "") {
         personalInfo += "	<dd>" + recomEmpNm + "</dd>";
     }
     
     personalInfo += "	</dl>";
     personalInfo += "</div>";
     
     $("#previewApplicationLayer").append(personalInfo);
     
     // 학력사항
     var validationMsg = "";
     var scholarshipInfo = "";
     var scholarRequiredMsg = "";
     var scholarIsRequired = true;
     scholarshipInfo += "<div class='prev_con' id='previewInfo_SCHOLARSHIP'>";
     
     var index = getAppendTrTotalCount($("#addTableScholarship > tbody > tr"));
 
     if (typeof(isRequiredSchool) != "undefined") {
         scholarIsRequired = isRequiredSchool;
     }
     if (scholarIsRequired) {
         scholarRequiredMsg = requiredMsg;
     }
 
     if (index == 1 && scholarIsRequired) {
         validationMsg = "<span class='prev_imp'>필수 입력 사항을 다시 한번 확인하고 작성해주세요</span>";
     }
     
     scholarshipInfo += "	<h3>학력사항 " + scholarRequiredMsg + validationMsg + "</h3>";
     
     for (var i = 0; i < index; i++) {
         var sStatus = $("[name='scholarList[" + i + "].sStatus']").val();
         if (sStatus != "D") {
             var schoolNm = $("[name='scholarList[" + i + "].schoolNm']").val().escapeHTML();
             var scholarTypeCd = $("[name='scholarList[" + i + "].scholarTypeCd']").val();
             var majorNm = $("[name='scholarList[" + i + "].majorNm']").val().escapeHTML();
             var minorNm = $("[name='scholarList[" + i + "].minorNm']").val().escapeHTML();
             var majorDetailNm = $("[name='scholarList[" + i + "].majorDetailNm']").val().escapeHTML();
             var gradePnt = $("[name='scholarList[" + i + "].gradePnt']").val().escapeHTML();
             var gradeBasis = $("[name='scholarList[" + i + "].gradeBasis']").val().escapeHTML();
             var staYm = $("[name='scholarList[" + i + "].staYm']").val().escapeHTML();
             var endYm = $("[name='scholarList[" + i + "].endYm']").val().escapeHTML();
             var graduationTypeCd = $("[name='scholarList[" + i + "].graduationType']").val();
             var graduationTypeNm = $("[name='scholarList[" + i + "].graduationType'] option:selected").text();
             var schPlaceNm = $("[name='scholarList[" + i + "].schPlaceCd'] option:selected").text();
             if (schPlaceNm != "") {
                 schoolNm = schoolNm + "(" + schPlaceNm + ")"; 
             }
             
             if (graduationTypeCd != "001" && graduationTypeCd != "005" && graduationTypeCd != "009") {
                 endYm = "";
             }
             
             if (typeof(scholarTypeCd) != "undefined" && scholarTypeCd != "") {
                 if (scholarTypeCd == "001") {	// 고등학교
                     scholarshipInfo += "<dl class='dft_con'>";
                     scholarshipInfo += "<dt>" + schoolNm + "</dt>";
                     scholarshipInfo += "<dd>" + staYm + " ~ " + endYm + "</dd>";
                     scholarshipInfo += "<dd>" + graduationTypeNm + "</dd>";
                     scholarshipInfo += "</dl>";
                 } else if (scholarTypeCd == "002" || scholarTypeCd == "003") {	// 전문대학/대학교
                     scholarshipInfo += "<dl class='dft_con'>";
                     scholarshipInfo += "<dt>" + schoolNm + "</dt>";
                     scholarshipInfo += "<dd>" + majorNm + "</dd>";
                     scholarshipInfo += "<dd>" + minorNm + "</dd>";
                     scholarshipInfo += "<dd>" + gradePnt + "/" + gradeBasis + "</dd>";
                     scholarshipInfo += "<dd>" + staYm + " ~ " + endYm + "</dd>";
                     scholarshipInfo += "<dd>" + graduationTypeNm + "</dd>";
                     scholarshipInfo += "</dl>";
                 } else if (scholarTypeCd == "004" || scholarTypeCd == "005") {	// 대학원(석/박사)
                     scholarshipInfo += "<dl class='dft_con'>";
                     scholarshipInfo += "<dt>" + schoolNm + "</dt>";
                     scholarshipInfo += "<dd>" + majorNm + "</dd>";
                     scholarshipInfo += "<dd>" + majorDetailNm + "</dd>";
                     scholarshipInfo += "<dd>" + gradePnt + "/" + gradeBasis + "</dd>";
                     scholarshipInfo += "<dd>" + staYm + " ~ " + endYm + "</dd>";
                     scholarshipInfo += "<dd>" + graduationTypeNm + "</dd>";
                     scholarshipInfo += "</dl>";
                 }
             }
         }
     }
     
     scholarshipInfo += "</div>";
     
     // 경력사항
     var validationMsg = "";
     var careerRequireMsg = "";
     var careerInfo = "";
     isRequired = true;
     careerInfo += "<div class='prev_con' id='previewInfo_CAREER'>";
     
     var index = getAppendTrTotalCount($("#addTableCareer > tbody > tr"));
     
     if (entTypeCd == "002") {
         careerRequireMsg = "<em>필수</em>";
         
         if (index == 1 && isRequired) {
             validationMsg += "<span class='prev_imp'>필수 입력 사항을 다시 한번 확인하고 작성해주세요</span>";
         }
     }
     
     careerInfo += "	<h3>경력사항 " + careerRequireMsg + validationMsg + "</h3>";
     
     for (var i = 0; i < index; i++) {
         var sStatus = $("[name='careerList[" + i + "].sStatus']").val();
         if (sStatus != "D") {
             var corpNm = $("[name='careerList[" + i + "].corpNm']").val().escapeHTML();
             var deptNm = $("[name='careerList[" + i + "].deptNm']").val().escapeHTML();
             var enterYmd = $("[name='careerList[" + i + "].enterYmd']").val().escapeHTML();
             var retireYmd = $("[name='careerList[" + i + "].retireYmd']").val().escapeHTML();
             
             var jobPosition = "";
             var empTypeNm = "";
             
             if ("LP" == sysCompanyCd) {
                 empTypeNm = $("[name='careerList[" + i + "].empTypeCd'] option:selected").text();
             } else {
                 jobPosition = $("[name='careerList[" + i + "].jobPosition']").val().escapeHTML();
             }
             
             var jobRole = $("[name='careerList[" + i + "].jobRole']").val().escapeHTML();
             
             if (typeof(corpNm) != "undefined" && corpNm != "") {
                 careerInfo += "<dl class='dft_con'>";
                 careerInfo += "<dt>" + corpNm + "</dt>";
                 careerInfo += "<dd>" + deptNm + "</dd>";
                 careerInfo += "<dd>" + enterYmd + " ~ " + retireYmd + "</dd>";
                 
                 if ("LP" == sysCompanyCd) {
                     var jobDetail = $("[name='careerList[" + i + "].jobDetail']").val().escapeHTML();
                     
                     careerInfo += "<dd>" + jobRole + "</dd>";
                     careerInfo += "<dd>" + empTypeNm + "</dd>";
                     careerInfo += "</dl>";
                     careerInfo += "<div class='prev_qna'>";
                     careerInfo += "<dl><dd>" + jobDetail + "</dd></dl>";
                     careerInfo += "</div>";
                 } else {
                     careerInfo += "<dd>" + jobPosition + "</dd>";
                     careerInfo += "<dd>" + jobRole + "</dd>";
                     careerInfo += "</dl>";
                 }
             }
         }
     }
     
     careerInfo += "</div>";
     
     // 라인플러스 경력일 때는 경력사항이 학력사항보다 먼저 위치
     if (sysCompanyCd == "LP" && entTypeCd == "002") {
         $("#previewApplicationLayer").append(careerInfo);
         $("#previewApplicationLayer").append(scholarshipInfo);
     } else {
         $("#previewApplicationLayer").append(scholarshipInfo);
         $("#previewApplicationLayer").append(careerInfo);
     }
     
     
     //LAB 일경우 지원경로
     if (sysCompanyCd == "NL"){
         var applPathInfo = "";
         var index = applPathData.dataList.length;
         validationMsg = "";
         if (index == 0) {
             validationMsg = "<span class='prev_imp'>필수 입력 사항을 다시 한번 확인하고 작성해주세요</span>";
         }
         var pathData = applPathData.dataList;
         applPathInfo += "<div class='prev_con'>";
         applPathInfo += "	<h3>지원경로 <em>필수</em>"+validationMsg+"</h3> ";
         for (var i = 0; i < index; i++) {
             applPathInfo += "	<dl class='dft_con'>";
             applPathInfo += 		"<dt style='width: 250px;'>"+pathData[i]['applyTypeNm']+"</dt>";
             if(pathData[i]['applyTypeTxt']!=''){
                 applPathInfo += "	<dd> "+ pathData[i]['applyTypeTxt']+"</dd>";
             }
             applPathInfo += "	</dl>";
         }
         
         applPathInfo += "</div>";
         $("#previewApplicationLayer").append(applPathInfo);
     }
     
     // 자격/어학사항
     var licenseLanguageInfo = "";
     licenseLanguageInfo += "<div class='prev_con' id='previewInfo_LICENSE'>";
     licenseLanguageInfo += "	<h3>자격/어학사항</h3>";
     
     var index = getAppendTrTotalCount($("#addTableLicenseLanguage > tbody > tr"));
     for (var i = 0; i < index; i++) {
         var sStatus = $("[name='licenseLanguageList[" + i + "].sStatus']").val();
         if (sStatus != "D") {
             var licenseLanguageTypeCd = $("[name='licenseLanguageList[" + i + "].licenseLanguageTypeCd']").val();
             var score = $("[name='licenseLanguageList[" + i + "].score']").val().escapeHTML();
             
             var licenseNm = $("[name='licenseLanguageList[" + i + "].licenseNm']").val().escapeHTML();
             var licenseGrdNm = $("[name='licenseLanguageList[" + i + "].licenseGrdNm']").val().escapeHTML();
             var takeYmd = $("[name='licenseLanguageList[" + i + "].takeYmd']").val().escapeHTML();
             var issueOrgNm = $("[name='licenseLanguageList[" + i + "].issueOrgNm']").val().escapeHTML();
             
             var langTypeNm = $("[name='licenseLanguageList[" + i + "].langTypeNm']").val().escapeHTML();
             var langTestNm = $("[name='licenseLanguageList[" + i + "].langTestNm']").val().escapeHTML();
             var langGrdNm = $("[name='licenseLanguageList[" + i + "].langGrdNm']").val().escapeHTML();
             var testYmd = $("[name='licenseLanguageList[" + i + "].testYmd']").val().escapeHTML();
             var langOrgNm = $("[name='licenseLanguageList[" + i + "].langOrgNm']").val().escapeHTML();
             
             if (typeof(licenseLanguageTypeCd) != "undefined" && licenseLanguageTypeCd != "") {
                 if (licenseLanguageTypeCd == "LICENSE") {
                     licenseLanguageInfo += "<dl class='dft_con'>";
                     licenseLanguageInfo += "<dt>" + licenseNm + "</dt>";
                     licenseLanguageInfo += "<dd>" + licenseGrdNm + "</dd>";
                     licenseLanguageInfo += "<dd>" + score + "</dd>";
                     licenseLanguageInfo += "<dd>" + takeYmd + "</dd>";
                     licenseLanguageInfo += "<dd>" + issueOrgNm + "</dd>";
                     licenseLanguageInfo += "</dl>";
                 } else if (licenseLanguageTypeCd == "LANGUAGE") {
                     licenseLanguageInfo += "<dl class='dft_con'>";
                     licenseLanguageInfo += "<dt>" + langTypeNm + "</dt>";
                     licenseLanguageInfo += "<dd>" + langTestNm + "</dd>";
                     licenseLanguageInfo += "<dd>" + langGrdNm + "</dd>";
                     licenseLanguageInfo += "<dd>" + score + "</dd>";
                     licenseLanguageInfo += "<dd>" + testYmd + "</dd>";
                     licenseLanguageInfo += "<dd>" + langOrgNm + "</dd>";
                     licenseLanguageInfo += "</dl>";
                 }
             }
         }
     }
     
     licenseLanguageInfo += "</div>";
 
     if ($("#addTableLicenseLanguage").length > 0) {
         $("#previewApplicationLayer").append(licenseLanguageInfo);
     }
     
     // 직무질문
     var selfIntroInfo = "";
     var index = selfAnswerData.length;
     var validationMsg = "";
     
     if (!getValidationSelfAnswer(selfAnswerData) && isRequired) {
         validationMsg = "<span class='prev_imp'>필수 입력 사항을 다시 한번 확인하고 작성해주세요</span>";
     }
     
     // 직무질문
     for (var i = 0; i < index; i++) {
         var questionTypeCd = $("[name='selfAnswerList[" + i + "].questionTypeCd']").val();
         
         if (i == 0) {
             selfIntroInfo += "<div class='prev_con' id='previewInfo_SELFINTRO'>";
             selfIntroInfo += "	<h3>" + selfintroTitle + " " + requiredMsg + validationMsg + "</h3>";
         }
         
         if (questionTypeCd == "DESC") {
             var subjectNm = $("[for='selfAnswerList[" + i + "].answer']").text();
             var answer = $("[name='selfAnswerList[" + i + "].answer']").val().escapeHTML().replace(/ /g, "&nbsp;");
             
             selfIntroInfo += "<div class='prev_qna'>";
             selfIntroInfo += "<h4>" + subjectNm + "</h4>";
             selfIntroInfo += "<dl>";
             selfIntroInfo += "<dt class='blind'>답변</dt>";
             selfIntroInfo += "<dd style=\"word-break: break-all\">" + answer + "</dd>";
             selfIntroInfo += "</dl>";
             selfIntroInfo += "</div>";
         }
         
         if (i == index) {
             selfIntroInfo += "</div>";
         }
     }
     
     var referenceCount = 0;
     var referenceInfo = "";
     for (var i = 0; i < index; i++) {
         var sysFileList = selfAnswerData[i]["sysFileList"];
         var questionTypeCd = $("[name='selfAnswerList[" + i + "].questionTypeCd']").val();
         var reqYn = $("[name='selfAnswerList[" + i + "].reqYn']").val();
         var reqNm = (reqYn == "Y") ? "<em>필수</em>" : "";
         
         if (questionTypeCd != "DESC") {
             if (sysCompanyCd == "LP") {
                 var fileObj = $("#uploadSelfFile_" + i);
                 
                 if (typeof(fileObj) == "object") {
                     fileObj.children("a").each(function (i) {
                         var fileLink = $(this).attr("href");
                         var fileNm = $(this).text().escapeHTML();
                         referenceInfo += "<li><a href='"+ fileLink +"'>"+ fileNm + "</a></li>\n"
                     });
                 }
             } else {
                 if (sysFileList.length > 0) {
                     for (var j = 0; j < sysFileList.length; j++) {
                         var fileNm = sysFileList[j]["fileNm"].escapeHTML();
                         var realFileNm = sysFileList[j]["realFileNm"];
                         var filePath = sysFileList[j]["filePath"];
                         
                         if (typeof(fileNm) != "undefined") {
                             referenceInfo += "<li><a href='/common/file/downloadFile?fileNm=" + fileNm + "&realFileNm=" + realFileNm + "&filePath=" + filePath + "'>" + fileNm + "</a></li>\n";
                         }
                     }
                 }
             }
             
             if (questionTypeCd == "FILE_URL") {
                 var answer = $("[name='selfAnswerList[" + i + "].answer']").val().escapeHTML();
                 if (typeof(answer) != "undefined" && answer != '') {
                     if (answer.indexOf("http") == -1) {
                         answer = "http://" + answer;
                     }
                     referenceInfo += "<li><a href='" + answer + "' class='prev_link' target='_blank'>" + answer + "</a></li>\n";
                 }
             }
             
             referenceCount++;
         }
     }
     
     var validationMsg = "";
     if (referenceInfo == "") {
         validationMsg = "<span class='prev_imp'>저장된 파일만 미리보기에서 조회됩니다.</span>";
     }
     if (referenceCount > 0) {
         // 첨부자료
         selfIntroInfo += "<div class='prev_con' id='previewInfo_SELFINTRO_ATTACHMENTS'>";
         selfIntroInfo += "	<h3>첨부자료" + reqNm + validationMsg + "</h3>";
         selfIntroInfo += "	<ul class='prev_file'>";
         
         if (referenceInfo != "") {
             selfIntroInfo += referenceInfo;
         } else {
             selfIntroInfo += "첨부자료가 없습니다.";
         }
     }
     
     selfIntroInfo += "	</ul>";
     selfIntroInfo += "</div>";
     $("#previewApplicationLayer").append(selfIntroInfo);
     
     // 기타사항
     var demobTypeNm = $("#military\\.demobTypeCd option:selected").text();
     var demobTypeCd = $("#military\\.demobTypeCd option:selected").val();
     var patriotYnNm = ($("#applicant\\.patriotY").attr("checked")) ? "대상" : "비대상";
     var patriotYn = $("[name='applicant.patriotYn']:checked").val();
     var patriotNo = $("#applicant\\.patriotNo").val();
     var handicapNm = $("#handicap\\.handicapCd option:selected").text();
     var etcInfo = "";
     etcInfo += "<div class='prev_con' id='previewInfo_ETC'>";
     etcInfo += "	<div class='dvid_sec'>";
     etcInfo += "		<h3>병역사항 "+ requiredMsg + "</h3>";
     etcInfo += "		<p>" + demobTypeNm + "&nbsp;</p>";
     etcInfo += "	</div>";
     etcInfo += "	<div class='dvid_sec v2'>";
     etcInfo += "		<h3>보훈대상 여부 " + requiredMsg + "</h3>";
     etcInfo += "		<p>" + patriotYnNm + "</p>";
     
     if ("Y" == patriotYn && patriotNo != "" && typeof(patriotNo) != "undefined") {
         etcInfo += "		<p style='margin-top:20px'>보훈번호 : " + patriotNo + "</p>";
     }
     
     etcInfo += "	</div>";
     etcInfo += "	<div class='dvid_sec v3'>";
     etcInfo += "		<h3>장애사항 " + requiredMsg + "</h3>";
     etcInfo += "		<p>" + handicapNm + "</p>";
     etcInfo += "	</div>";
     if (isRequired && demobTypeCd == "") {
         etcInfo += "	<div class='dvid_sec'><p class='prev_imp'>필수 입력 사항을 다시 한번 확인하고 작성해주세요</p></div>";
     }
     etcInfo += "</div>";
     
     if ($("#military\\.demobTypeCd").length > 0) {
         $("#previewApplicationLayer").append(etcInfo);
     }
     
     // 닫기 버튼
     var btn_class = "sp sp_ico btn_prev_clse";
     if (sysCompanyCd == "LP") {
         btn_class = "sp2 btn_prev_clse";
     }
     
     var closeBtn = "<a href='#null' onclick='hidePreviewApplication();' class='" + btn_class + "'><span class='blind'>레이어 닫기</span></a>";
     $("#previewApplicationLayer").append(closeBtn);
     
 }
 
 function getValidationSelfAnswer(selfAnswerData) {
     for (var i=0; i < selfAnswerData.length; i++) {
         var questionTypeCd = $("[name='selfAnswerList[" + i + "].questionTypeCd']").val();
         var reqYn = $("[name='selfAnswerList[" + i + "].reqYn']").val();
         
         if (questionTypeCd == "DESC") {
             var answer = $("[name='selfAnswerList[" + i + "].answer']").val();
             if (reqYn == 'Y' && answer == "") {
                 return false;
             }
         } else if (questionTypeCd == "FILE") {
             var sysFileList = selfAnswerData[i]["sysFileList"];
             if (reqYn == 'Y' && sysFileList == 0) {
                 return false;
             }
         } else if (questionTypeCd == "FILE_DESC") {
             var sysFileList = selfAnswerData[i]["sysFileList"];
             var answer = $("[name='selfAnswerList[" + i + "].answer']").val();
             
             if (reqYn == 'Y' && sysFileList == 0 && answer == "") {
                 return false;
             }
         }
     }
     
     return true;
 }
 
 function getValidationNames(objId) {
     var sysCompanyCd = $("#applicant\\.sysCompanyCd").val();
     var careerObj = ["careerList.corpNm", "careerList.deptNm", "careerList.enterYmd", "careerList.jobPosition", "careerList.jobRole"];
     if ("LP" == sysCompanyCd) {
         careerObj = ["careerList.corpNm", "careerList.deptNm", "careerList.enterYmd", "careerList.jobRole", "careerList.empTypeCd", "careerList.jobDetail"];
     }
         
     if (objId == "addTableScholarship") {
         return ["scholarList.scholarTypeCd", "scholarList.schoolNm", "scholarList.majorNm"
                 , "scholarList.gradePnt", "scholarList.gradeBasis", "scholarList.graduationType"
                 , "scholarList.staYm", "scholarList.endYm"];
     } else if (objId == "addTableCareer") {
         return careerObj;
     } else if (objId == "addTableLicenseLanguage") {
         return ["licenseLanguageList.licenseLanguageTypeCd", "licenseLanguageList.licenseNm"
                 , "licenseLanguageList.licenseGrdNm", "licenseLanguageList.takeYmd", "licenseLanguageList.issueOrgNm"
                 , "licenseLanguageList.langTypeNm", "licenseLanguageList.langTestNm"
                 , "licenseLanguageList.langOrgNm"
                 , "licenseLanguageList.testYmd"];
     }
 }
 
 function prependRowValidationCheckEvent(tableObj) {
     var rowObj = $("#" + tableObj.attr("id") + " > tbody > tr");
     var checkObj = getValidationNames(tableObj.attr("id"));
     
     rowObj.each(function(idx) {
         var lastRowObj = $(this);
         
         lastRowObj.find("input, select, textarea").change(function() {
             var chk = 0;
             
             lastRowObj.find("input, select, textarea").each(function() {
                 for (var i = 0; i < checkObj.length; i++) {
                     if (typeof($(this).attr("id")) != "undefined") {
                         var objDisabled = $(this).attr("disabled");
                         
                         if (checkObj[i] == $(this).attr("id") && $(this).val() == "" && typeof(objDisabled) != "undefiend" && objDisabled == "disabled") {
                             chk++;
                         }
                         
                         if (checkObj[i] == $(this).attr("id") && $(this).val() != "") {
                             chk++;
                         }
                     }
                 }
             });
             
             if (chk == checkObj.length) {
                 lastRowObj.find("div[id*=completeDiv]").addClass("on");
             } else {
                 lastRowObj.find("div[id*=completeDiv]").removeClass("on");
             }
         });
     });
 }
 
 function setScholarshipLast() {
     var scholarshipIndex = getAppendTrTotalCount($("#addTableScholarship > tbody > tr"));
     
     // 최종학력 계산
     var arrEndYm = [];	// 최종학력 계산하기 위한 마지막 졸업(예정)일 구하기 위한 변수
     for (var i = 0; i < scholarshipIndex; i++) {
         var sStatus = $("[name='scholarList[" + i + "].sStatus']").val();
         if (sStatus != "D") {
             arrEndYm.push($("[name='scholarList[" + i + "].endYm']").val().removeFmt());
         }
     }
     
     arrEndYm.sort();
     arrEndYm.reverse();
     $("input[name$='].lastYn']").each(function() {$(this).val("N");});
 
     for (var i = 0; i < scholarshipIndex; i++) {
         var sStatus = $("[name='scholarList[" + i + "].sStatus']").val();
         if (sStatus != "D") {
             if (arrEndYm[0] == $("[name='scholarList[" + i + "].endYm']").val().removeFmt()) {
                 $("[name='scholarList[" + i + "].lastYn']").val("Y");
                 break;
             }
         }
     }
 }
 
 function initCombo(divId, objName) {
     $("#" + divId).find(".slct_box_list").remove();
     createComboBoxList($("select[name='" + objName + "']"));
     selectComboBoxData($("#" + divId).find(".slct_box_list > ul"));
 }
 
 
 /*
  * =======================================================
  * 코드검색 레이어 공통
  * =======================================================
  */
 function initCodeSearchLayer() {
     $("#codeSearchLayer").find("input, select").each(function() {
         $(this).val("");
         
         if ($(this).attr("id") == "schPlaceCd") {
             $(this).change();
             $(this).prev(".choice_txt").children(".selected").text("소재지");
             $(this).prev(".choice_txt").children(".selected").removeClass("selected");
         }
     });
     
     $("#codeSearchLayer > #searchArea").css("display", "none");
     $("#codeSearchLayer > #selectGroupArea").css("display", "none");
     $("#codeSearchLayer > #insertArea").css("display", "none");
     $("#codeSearchLayer > #commentArea").css("display", "none");
     $("#codeSearchLayer > #buttonArea").css("display", "none");
 }
 
 function hideCodeSearchLayer() {
     $(".dim").css("display", "none");
     $("#codeSearchLayer").hide();
     $.unblockUI();
     initCodeSearchLayer();
 }
 
 function getSearchTypeNm(searchType) {
     var searchTypeNm = "검색어명";
     var sysCompanyCd = $("#applicant\\.sysCompanyCd").val();
     
     if (searchType == "school") {
         searchTypeNm = "학교명";
     } else if (searchType == "major") {
         searchTypeNm = "전공명";
     } else if (searchType == "minor") {
         searchTypeNm = "부전공명";
         if (sysCompanyCd == "NX") {
             searchTypeNm = "복수전공명";
         }
     } else if (searchType == "nation") {
         searchTypeNm = "국가명";
     } else if (searchType == "company") {
         searchTypeNm = "회사명";
     } else if (searchType == "license") {
         searchTypeNm = "자격/면허종류명";
     } else if (searchType == "language") {
         searchTypeNm = "어학명";
     } else if (searchType == "test") {
         searchTypeNm = "시험종류명";
     } else if (searchType == "grade") {
         searchTypeNm = "등급명";
     }
     
     return searchTypeNm;
 }
 
 function searchCode(divObj) {
     var cdKind = $(divObj).find("#cdKind").val();
     var searchType = $(divObj).find("#searchType").val();
     var returnMethod = $(divObj).find("#returnMethod").val();
     var groupCd = $(divObj).find("#groupCd").val();
     var cdNm = $(divObj).find("#cdNm").val();
     var alertMsg = getSearchTypeNm(searchType);
     
     if (cdNm == "") {
         alert(alertMsg + "을 입력하세요.");
         $(divObj).find("#cdNm").focus();
         return;
     }
     
     /*
     if (cdNm.length < 2 && searchType != "grade") {
         alert(alertMsg + "를 2글자 이상 입력해주세요.");
         $(divObj).find("#cdNm").focus();
         return;
     }
     */
     
     $(divObj).find("#passiveInput").val("N");
     
     var async = false;
     var aventailPatch = {src:""};
     var param = "";
     param += "cdKind=" + cdKind;
     param += "&returnMethod=" + returnMethod;
     param += "&searchType=" + searchType;
     param += "&passiveInput=N";
     param += "&groupCd=" + groupCd;
     param += "&cdNm=" + encodeURIComponent(cdNm);
     
     aventailPatch.src = "/common/searchCodeJson";
     
     $.ajax({
         type: "GET",
         url: aventailPatch.src,
         data: param,
         success: function(data, textStatus, xhr){
             onSearchCodeEnd(data, searchType, returnMethod);
         },
         error: function(x, o, e) {
             alert("오류가 발생하였습니다" + e);
             retObj = x;
         },
         dataType: "json",
         async: async
     });
 }
 
 function onSearchCodeEnd(data, searchType, returnMethod) {
     $("#codeSearchLayer #searchArea").css("display", "block");
     
     if (typeof(data) == "undefined" || data == "") {
         $("#codeSearchLayer #searchArea").empty().append("<p>조회된 결과가 없습니다</p>");
         $("#codeSearchLayer #commentArea").css("display", "none");
         $("#codeSearchLayer #insertArea").css("display", "block");
         if (searchType == "school") {
             $("#codeSearchLayer #selectGroupArea").css("display", "block");
         }
         $("#codeSearchLayer #buttonArea").css("display", "block");
         //$("#codeSearchLayer #cdNm").val("");
         $("#codeSearchLayer #passiveInput").val("Y");
         
         return;
     }
     if (data.length > 0) {
         $("#codeSearchLayer #commentArea").css("display", "block");
         $("#codeSearchLayer #insertArea").css("display", "none");
         $("#codeSearchLayer #selectGroupArea").css("display", "none");
         $("#codeSearchLayer #buttonArea").css("display", "none");
         
         var liObj = "";
         for (var i=0; i < data.length; i++) {
             var cd = data[i].cd;
             var cdNm = data[i].cdNm;
             var groupCd = "";
             
             if (typeof(data[i].groupCd) != "undefined") {
                 groupCd = data[i].groupCd;
             }
             
             if (cdNm.indexOf("'") > -1) {
                 cdNm = cdNm.replace(/\'/g,"&#39;");
             }
             
             var callbackMethod = returnMethod + "(\"" + cd + "\",\"" + cdNm + "\",\"" + groupCd + "\")";
             liObj += "<li><a href='#null' onClick='" + callbackMethod + "'>" + cdNm + "</a></li>";
         }
         
         $("#codeSearchLayer #searchArea").empty();
         $("#codeSearchLayer #searchArea").append("<ul></ul>");
         $("#codeSearchLayer .srch_list > ul").append(liObj);
     }
 }
 
 function checkDirectInsert() {
     var searchType = $("#codeSearchLayer #searchType").val();
     var insertGroupCd = $("#codeSearchLayer #insertGroupCd");
     var returnMethod = $("#codeSearchLayer #returnMethod").val();
     var insertNm = $("#codeSearchLayer #insertNm");
     
     if (searchType == "school" && typeof(insertGroupCd.val()) != "undefined") {
         if (insertGroupCd.val() == "") {
             alert("분류를 선택하세요.");
             insertGroupCd.focus();
             return false;
         }
     }
     if(insertNm.val() == "") {
         alert('명칭을 입력하세요');
         insertNm.focus();
         return false;
     }
 
     var returnFn = window[returnMethod];
     
     returnFn("99999", insertNm.val());
     return true;
 }
 
 /*
  * =======================================================
  * 코드검색
  * =======================================================
  */
 // 국가명 검색
 function showNationEvent(obj, event) {
     if (obj.value != '' && ((event.type == "keydown" && event.keyCode == 13) || event.type == "blur")) {
         showNationLayer(obj);
     }
 }
 
 function showNationLayer(obj) {
     var cdKind = "HRM_048";
     var searchType = "nation";
     var returnMethod = "excuteNationSearchEnd";
     var searchValue = $("#applicant\\.nationNm").val();
     
     showCodeSearchLayer(cdKind, searchType, searchValue, returnMethod);
 }
 
 function excuteNationSearchEnd(cd, cdNm) {
     $("#applicant\\.nationCd").val(cd);
     $("#applicant\\.nationNm").val(cdNm);
     
     hideCodeSearchLayer();
 }
 
 // 학교명 검색
 function showSchoolEvent(obj, event) {
     if (obj.value != '' && ((event.type == "keydown" && event.keyCode == 13) || event.type == "blur")) {
         showSchoolLayer(obj);
     }
 }
 
 function showSchoolLayer(obj) {
     g_index = getFormElementIndex(obj);
     var cdKind = "HRM_903";
     var searchType = "school";
     var returnMethod = "excuteSchoolSearchEnd";
     var scholarTypeCd = $("[name='scholarList[" + g_index + "].scholarTypeCd']").val();
     var searchValue = $("[name='scholarList[" + g_index + "].schoolNm']").val();
     var schPlaceCd = $("[name='scholarList[" + g_index + "].schPlaceCd']").val();
     
     if (scholarTypeCd == "") {
         alert("구분을 먼저 선택하세요.");
         return;
     }
     
     if (scholarTypeCd == "001" || scholarTypeCd == "002") {
         showCodeSearchLayer(cdKind, searchType, searchValue, returnMethod, schPlaceCd, scholarTypeCd);
     } else {
         showCodeSearchLayer(cdKind, searchType, searchValue, returnMethod, schPlaceCd);
     }
 }
 
 function excuteSchoolSearchEnd(cd, cdNm, groupCd, schPlaceCd) {
     var schPlaceCd = $("#codeSearchLayer #schPlaceCd").val();
     if (schPlaceCd == "") {
         alert("소재지를 선택하세요.");
         return;
     }
     $("[name='scholarList[" + g_index + "].schoolCd']").val(cd);
     $("[name='scholarList[" + g_index + "].schoolNm']").val(cdNm).change();
     if (typeof(groupCd) != "undefined") {
         $("[name='scholarList[" + g_index + "].schoolGroupCd']").val(groupCd);
     }
     if (typeof(schPlaceCd) != "undefined") {
         $("[name='scholarList[" + g_index + "].schPlaceCd']").val(schPlaceCd);
     }
     
     hideCodeSearchLayer();
 }
 
 // 전공 검색
 function showMajorEvent(obj, event) {
     if (obj.value != '' && ((event.type == "keydown" && event.keyCode == 13) || event.type == "blur")) {
         showMajorLayer(obj);
     }
 }
 
 function showMajorLayer(obj) {
     g_index = getFormElementIndex(obj);
     var cdKind = "HRM_902";
     var searchType = "major";
     var returnMethod = "excuteMajorSearchEnd";
     var searchValue = $("[name='scholarList[" + g_index + "].majorNm']").val();
     
     if (obj.name.toLowerCase().indexOf("minor") > -1) {
         returnMethod = "excuteMinorSearchEnd";
         searchType = "minor";
         searchValue = $("[name='scholarList[" + g_index + "].minorNm']").val();
     }
     
     showCodeSearchLayer(cdKind, searchType, searchValue, returnMethod);
 }
 
 function excuteMajorSearchEnd(cd, cdNm, groupCd) {
     $("[name='scholarList[" + g_index + "].majorCd']").val(cd);
     $("[name='scholarList[" + g_index + "].majorNm']").val(cdNm).change();
     $("[name='scholarList[" + g_index + "].majorGroupCd']").val(groupCd);
     
     hideCodeSearchLayer();
 }
 
 function excuteMinorSearchEnd(cd, cdNm, groupCd) {
     $("[name='scholarList[" + g_index + "].minorCd']").val(cd);
     $("[name='scholarList[" + g_index + "].minorNm']").val(cdNm).change();
     $("[name='scholarList[" + g_index + "].minorGroupCd']").val(groupCd);
     
     hideCodeSearchLayer();
 }
 
 // 회사 검색
 function showCompanyEvent(obj, event) {
     if (obj.value != '' && ((event.type == "keydown" && event.keyCode == 13) || event.type == "blur")) {
         showCompanyLayer(obj);
     }
 }
 
 function showCompanyLayer(obj) {
     g_index = getFormElementIndex(obj);
     var cdKind = "HRM_907";
     var searchType = "company";
     var returnMethod = "excuteCompanySearchEnd";
     var searchValue = $("[name='careerList[" + g_index + "].corpNm']").val();
     
     showCodeSearchLayer(cdKind, searchType, searchValue, returnMethod);
 }
 
 function excuteCompanySearchEnd(cd, cdNm, groupCd) {
     $("[name='careerList[" + g_index + "].corpCd']").val(cd);
     $("[name='careerList[" + g_index + "].corpNm']").val(cdNm).change();
     $("[name='careerList[" + g_index + "].corpGroupCd']").val(groupCd);
     
     hideCodeSearchLayer();
 }
 
 // 자격증 검색
 function showLicenseEvent(obj, event) {
     if (obj.value != '' && ((event.type == "keydown" && event.keyCode == 13) || event.type == "blur")) {
         showLicenseLayer(obj);
     }
 }
 
 function showLicenseLayer(obj) {
     g_index = getFormElementIndex(obj);
     var cdKind = "HRM_904";
     var searchType = "license";
     var returnMethod = "excuteLicenseSearchEnd";
     var licenseLanguageTypeCd = $("[name='licenseLanguageList[" + g_index + "].licenseLanguageTypeCd']").val();
     var searchValue = $("[name='licenseLanguageList[" + g_index + "].licenseNm']").val();
     
     if (licenseLanguageTypeCd == "") {
         alert("구분을 먼저 선택하세요.");
         return;
     }
     
     showCodeSearchLayer(cdKind, searchType, searchValue, returnMethod);
 }
 
 function excuteLicenseSearchEnd(cd, cdNm) {
     $("[name='licenseLanguageList[" + g_index + "].licenseCd']").val(cd);
     $("[name='licenseLanguageList[" + g_index + "].licenseNm']").val(cdNm).change();
     
     hideCodeSearchLayer();
 }
 
 // 어학 검색
 function showLanguageEvent(obj, division, event) {
     if (obj.value != '' && ((event.type == "keydown" && event.keyCode == 13) || event.type == "blur")) {
         showLanguageLayer(obj, division);
     }
 }
 
 function showLanguageLayer(obj, division) {
     g_index = getFormElementIndex(obj);
     var cdKind = "HRM_014";	// 어학
     var searchType = "language";
     var returnMethod = "excuteLanguageTypeSearchEnd";
     var searchValue = $("[name='licenseLanguageList[" + g_index + "].langTypeNm']").val();
     
     if (division == "TEST") {
         cdKind = "HRM_059";	// 시험종류
         searchType = "test";
         returnMethod = "excuteLanguageTestSearchEnd";
         searchValue = $("[name='licenseLanguageList[" + g_index + "].langTestNm']").val();
     }
     
     showCodeSearchLayer(cdKind, searchType, searchValue, returnMethod);
 }
 
 function excuteLanguageTypeSearchEnd(cd, cdNm) {
     $("[name='licenseLanguageList[" + g_index + "].langTypeCd']").val(cd);
     $("[name='licenseLanguageList[" + g_index + "].langTypeNm']").val(cdNm).change();
     
     hideCodeSearchLayer();
 }
 
 function excuteLanguageTestSearchEnd(cd, cdNm) {
     $("[name='licenseLanguageList[" + g_index + "].langTestCd']").val(cd);
     $("[name='licenseLanguageList[" + g_index + "].langTestNm']").val(cdNm).change();
     
     hideCodeSearchLayer();
 }
 
 // 등급검색
 function showGradeSearchEvent(obj, division, event) {
     if (obj.value != '' && ((event.type == "keydown" && event.keyCode == 13) || event.type == "blur")) {
         showGradeSearchLayer(obj, division);
     }
 }
 
 function showGradeSearchLayer(obj, division) {
     g_index = getFormElementIndex(obj);
     var cdKind = "HRM_050";	// 자격등급
     var searchType = "grade";
     var returnMethod = "executeLicenseGradeSearchEnd";
     var searchValue = $("[name='licenseLanguageList[" + g_index + "].licenseGrdNm']").val();
     
     var licenseLanguageTypeCd = $("[name='licenseLanguageList[" + g_index + "].licenseLanguageTypeCd']").val();
     
     if (licenseLanguageTypeCd == "") {
         alert("구분을 먼저 선택하세요.");
         return;
     }
     
     if (division == "LANGUAGE") {
         cdKind = "HRM_080";	// 어학등급
         returnMethod = "executeLanguageGradeSearchEnd";
         searchValue = $("[name='licenseLanguageList[" + g_index + "].langGrdNm']").val();
     }
     
     showCodeSearchLayer(cdKind, searchType, searchValue, returnMethod);
 }
 function executeLicenseGradeSearchEnd(cd, cdNm) {
     $("[name='licenseLanguageList[" + g_index + "].licenseGrdCd']").val(cd);
     $("[name='licenseLanguageList[" + g_index + "].licenseGrdNm']").val(cdNm).change();
     
     hideCodeSearchLayer();
 }
 function executeLanguageGradeSearchEnd(cd, cdNm) {
     $("[name='licenseLanguageList[" + g_index + "].langGrdCd']").val(cd);
     $("[name='licenseLanguageList[" + g_index + "].langGrdNm']").val(cdNm).change();
     
     hideCodeSearchLayer();
 }
 
 function showPreviewApplication() {
     $(".dim").css("display", "block");
     setPreviewData();
     $(window).scrollTop(0);
     $("#previewApplicationLayer").show();
 }
 
 function hidePreviewApplication() {
     $(".dim").css("display", "none");
     $("#previewApplicationLayer").hide();
 }
 
 function showFinalValidationDialog() {
     $.blockUI({ message: $('#finalValidationDialog'), css: { width: '600px', left:'25%' } });
 }
 
 function showFinalValidationLayer() {
     $.blockUI({ message: $('#finalValidationDialog'), css: { border: '0px' } });
 }
 
 function getInputErrorMsg(dataNm) {
     return "<em>\"" + dataNm + "\"</em>이(가) 입력되지 않았습니다.";
 }
 
 function showLoadingLayer() {
     var imageTag = "<img src='/img/naver/career_loading.gif' width='76' height='76' alt='페이지 로딩중'>";
     var sysCompanyCd = $("#applicant\\.sysCompanyCd").val();
     if (sysCompanyCd == "NAVERZ") {
         imageTag = "<img src='/img/naverz/career_loading.gif' width='100' height='100' alt='페이지 로딩중'>";
     }
     $.blockUI({ message: "<div class='c_load'>" + imageTag + "</div>", css: { border: '0px' } });
 }
 
 function hideLoadingLayer() {
     $.unblockUI();
 }
 
 //지원서 저장하기
 function saveTemporaryApplication() {
     if (!formValidationCheck(document.form1)) {
         return false;
     }
     if (confirm("저장하시겠습니까?")) {
         formElementAllEnable(document.form1); // 저장하기 위해서 모든 폼 element의 상태를 enable로 만든다.
         removeFormElementFmt(document.form1);
         showLoadingLayer();
         window.onbeforeunload = null;
         document.form1.submit();
     }
 }
 