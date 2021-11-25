const clockTitle = document.querySelector(".js-clock");

const christmasDate = new Date("2021-12-25 00:00:00");

function getDiff() {
  const date = new Date();

  let diff = christmasDate - date;
  const cDay = 24 * 60 * 60 * 1000;

  const f_day = diff / cDay;
  const day = Math.floor(f_day);
  const f_hour = (f_day - day) * 24;
  const hour = Math.floor(f_hour);
  const f_min = (f_hour - hour) * 60;
  const min = Math.floor(f_min);
  const f_sec = (f_min - min) * 60;
  const sec = Math.floor(f_sec);

  clockTitle.innerText = `${day}d ${String(hour).padStart(2, "0")}h ${String(
    min
  ).padStart(2, "0")}m ${String(sec).padStart(2, "0")}s`;
}
getDiff();
setInterval(getDiff, 1000);
