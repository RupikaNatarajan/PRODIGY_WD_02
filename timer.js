
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = timeToString(elapsedTime);
}

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 1000;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(3, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

startStopBtn.addEventListener('click', () => {
    if (!running) {
        start();
    } else {
        stop();
    }
});

resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    startStopBtn.textContent = "Pause";
    running = true;
}

function stop() {
    clearInterval(timerInterval);
    startStopBtn.textContent = "Start";
    running = false;
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = "00:00:00.000";
    elapsedTime = 0;
    startStopBtn.textContent = "Start";
    laps.innerHTML = '';
    running = false;
}

function lap() {
    if (running) {
        let lapTime = timeToString(elapsedTime);
        let lapElement = document.createElement('div');
        lapElement.textContent = lapTime;
        laps.appendChild(lapElement);
    }
}
