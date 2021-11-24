const clockTitle = document.querySelector('.js-clock');
const inputYear = document.querySelector('#dateForm input:first-child');
const inputMonth = document.querySelector('#dateForm input:nth-child(2)');
const inputDate = document.querySelector('#dateForm input:nth-child(3)');
const checkBtn = document.querySelector('#dateForm input:last-child');
const countResult = document.querySelector('h1#countDate') ;

// 확인 버튼을 눌렀을 때 year, Month, Date의 value들을 종료 일자 변수에 담고
// 오늘 날짜와의 간격을 계산하여서 
// 356-day 이렇게 표시하기.

function handleClickBtn(){
    const targetYear = String(inputYear.value);
    const targetMonth = String(inputMonth.value);
    const targetDate = String(inputDate.value);

    const targetFullDate = `${targetMonth} ${targetDate} ${targetYear} 00:00:00`;

    const getTargetTime = new Date(targetFullDate).getTime();
    const now = new Date().getTime();

    const distance = getTargetTime - now ;

    const days = Math.floor(distance / (1000*60*60*24));

    countResult.innerText = `${days}-day`;

}

checkBtn.addEventListener('click', handleClickBtn);









function showDay() {
    //종료 일자
    const christmasEve = new Date("Dec 24 2021 00:00:00").getTime();
    //현재 일자
    const now = new Date().getTime();
    // 종료일자에서 현재일자 간격
    const gapTime = christmasEve - now;

    // 밀리초 계산
    const dayMil = 1000 * 60 * 60 * 24; // 86,400,000 -> 1일
    const hourMil = 1000 * 60 * 60; // 3,600,000 -> 1시간
    const minuteMil = 1000 * 60; // 60000 -> 1분
    const secondMil = 1000; // 1000 -> 1초

    //일, 시, 분, 초 계산
    const days = Math.floor(gapTime / dayMil);
    const hours =String(Math.floor((gapTime % dayMil) / hourMil)).padStart(2,"0");
    const minutes = String(Math.floor((gapTime % hourMil) / minuteMil)).padStart(2,"0");
    const seconds = String(Math.floor((gapTime % minuteMil) / secondMil)).padStart(2,"0");

    clockTitle.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
//showDay();
//setInterval(showDay, 1000);
