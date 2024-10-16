let startTime, updatedTime, difference, interval;
let paused = true;
let lapsContainer = document.getElementById("laps");
let lapCount = 0;

const display = document.getElementById("display");

document.getElementById("start").addEventListener("click", startStopwatch);
document.getElementById("pause").addEventListener("click", pauseStopwatch);
document.getElementById("reset").addEventListener("click", resetStopwatch);
document.getElementById("lap").addEventListener("click", recordLap);

function startStopwatch() {
    if (paused) {
        paused = false;
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateDisplay, 1000);
    }
}

function pauseStopwatch() {
    paused = true;
    clearInterval(interval);
    difference = new Date().getTime() - startTime;
}

function resetStopwatch() {
    paused = true;
    clearInterval(interval);
    display.innerHTML = "00:00:00";
    difference = 0;
    lapsContainer.innerHTML = "";
    lapCount = 0;
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    let hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((updatedTime / 1000) % 60);

    display.innerHTML = 
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);
}

function recordLap() {
    if (!paused) {
        lapCount++;
        let lapTime = document.createElement("div");
        lapTime.innerHTML = "Lap " + lapCount + ": " + display.innerHTML;
        lapsContainer.appendChild(lapTime);
    }
}
