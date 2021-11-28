const API_KEY = "398fde494b36e7c67fbeb8a729dcb809";

// geolocation 정보를 얻는데 성공했을 경우 
function onGeoOk(position) { // position은 사용자의 위치를 의미
    console.log(position); // GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1638120106533}
    //console에 나온 객체 배열 중 coords를 열어보면 lat과 long의 정보를 찾아볼 수 있다.
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log('you live in', lat, lon); // you live in 37.******* 126.*******

    //quote이 아니라 벡틱으로 감싸기 (url 뒤에 units=metric 을 붙이면 온도를 우리가 쓰는 수치로 알아낼 수 있다.)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    console.log(url); // console에 url이 표시되고 이 곳으로 클릭하면 내 위치 정보에 대한 JSON을 볼 수 있다.

    // javascript가 알아서 url을 불러줄 것임.
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.name, data.weather[0].main); // Gimpo-si Clouds (김포시, 구름)

            const city = document.querySelector('#weather span:first-child');
            const weather = document.querySelector('#weather span:last-child');
            city.innerText = data.name;
            weather.innerText =`${data.weather[0].main} / ${data.main.temp}` ;

    });
    // F12 > network 로 가면 저절로 알아서 내 위치 정보를 가지고 다른 여러 정보를 가져오는 것을 볼 수 있다.
    // url의 정보를 가져오는 데 loading 시간이 걸리는데 시간이 지나고 url을 fetch한 후에는 응답(json형태로 된 응답)을 받아야 한다.
    // 내용을 추출한 후에는 data를 얻게 된다.


}

// geolocation 정보를 얻는데 실패했을 경우 나오는 메시지
function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError); // 괄호 안에는 success와 error 함수를 넣도록 한다.


// openweathermap.org/api 사이트에 들어가서 lat과 lng의 수치를 지도안의 위치로 바꾸도록 하기.
// api > current Weather Data 의 doc 보기.
// doc 안에서 By geographic coordinates 보기.
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// 내 위치에 해당하는 lat과 long 넣어서 url에 쳐보기. JSON 형식으로 나옴.
// 다시 url 정리해서 쳐보기
// https://api.openweathermap.org/data/2.5/weather?lat=37.6373248&lon=126.6384896&appid=398fde494b36e7c67fbeb8a729dcb809

