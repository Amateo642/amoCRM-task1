const inputEl = document.querySelector("input");
const startButton = document.querySelector(".start");
const breakButton = document.querySelector(".break");
const labelEl = document.querySelector("label");

const timer = {
    _timeLeft: 0,
    _interval: null,
    _format(seconds) {
        let hoursLeft = Math.floor(seconds / 3600);
        hoursLeft = hoursLeft < 10 ? '0' + hoursLeft : hoursLeft;
        let minutesLeft = Math.floor(seconds / 60) % 60;
        minutesLeft = minutesLeft < 10 ? '0' + minutesLeft : minutesLeft;
        let secondsLeft = Math.floor(seconds % 60);
        secondsLeft = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
        return `${hoursLeft}:${minutesLeft}:${secondsLeft}`;
    },
    _tick() {
        if (this._timeLeft > 0) {
            this._cb?.(this._format(this._timeLeft));
        } else {
            clearInterval(this._interval);
            this._cb?.(this._format(0));
        }
        this._timeLeft--;
    },
    start(seconds) {
        if (seconds <= 0) {
            return;
        }
        this._timeLeft = seconds;
        if (this._interval) {
            clearInterval(this._interval);
        }
        this._interval = setInterval(() => { this._tick() }, 1000);
        this._tick();
    },
    stop() {
        clearInterval(this._interval);
    },
    onTick(cb) {
        this._cb = cb;
    } 
};

startButton.addEventListener('click', () => {
    timer.start(Number(inputEl.value));
    inputEl.value = '';
});

breakButton.addEventListener('click', () => {
    timer.stop();
});

timer.onTick((timeLeft) => {
    labelEl.textContent = timeLeft;
});