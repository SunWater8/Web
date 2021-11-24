const clockTitle = document.querySelector('.js-clock');

function showDay() {
    //종료 일자
    const christmasEve = new Date("Dec 24, 2021 00:00:00").getTime();
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
showDay();
setInterval(showDay, 1000);
