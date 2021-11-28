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


}

// geolocation 정보를 얻는데 실패했을 경우 나오는 메시지
function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError); // 괄호 안에는 success와 error 함수를 넣도록 한다.