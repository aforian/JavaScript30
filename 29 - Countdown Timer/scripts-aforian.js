const timeButtons = document.querySelectorAll('.timer__button');
const displayTimeLeft = document.querySelector('.display__time-left');
const displayEndTime = document.querySelector('.display__end-time');

let timer;


function beginTimer(dTime) {

  const now = Date.now()
  const then = now + dTime * 1000;
  writeTimeLeft(dTime);
  writeEndTime(then)

  clearInterval(timer);
  timer = setInterval(() => {
    const timeLeft = Math.round((then - Date.now()) / 1000);

    if (timeLeft < 0) {
      clearInterval(timer);
      return;
    }

    writeTimeLeft(timeLeft);
  },
  1000);
}

function writeTimeLeft(time) {
  const displayTime = `${Math.floor(time/60)}:${time%60<10 ? '0':''}${time%60}`;

  displayTimeLeft.textContent = displayTime;
  document.title = displayTime;
}
function writeEndTime(time) {
  const endTime = new Date(time);
  const min = endTime.getMinutes();
  displayEndTime.textContent = `Be Back At ${endTime.getHours()}:${min < 10 ? '0':''}${min}`;
}


function handleButton(e) {
  const time = this.dataset.time;

  beginTimer(time)
}

timeButtons.forEach(button => {
  button.addEventListener('click', handleButton);
})

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  beginTimer(mins * 60);
  this.reset();
});