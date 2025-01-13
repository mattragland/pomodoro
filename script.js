let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const modeToggleButton = document.getElementById('mode-toggle');
const themeToggleBtn = document.querySelector('.theme-toggle');
const timerSound = document.getElementById('timer-sound');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
    
    // Update the document title with the current time
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const mode = isWorkTime ? 'Work' : 'Break';
    document.title = `${timeString} - ${mode} - Pomodoro`;
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'You Said This Was Important' : 'Break Time';
    modeToggleButton.textContent = isWorkTime ? 'Switch to Break' : 'Switch to Work';
    updateDisplay();
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = WORK_TIME;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                playTimerSound();
                clearInterval(timerId);
                timerId = null;
                switchMode();
                startTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    modeText.textContent = 'Stay Focused';
    modeToggleButton.textContent = 'Switch to Break';
    updateDisplay();
}

startButton.addEventListener('click', function() {
    const taskInput = document.getElementById('task-description');
    if (!taskInput.value.trim()) {
        alert('Please enter a task before starting the timer');
        return;
    }
    startTimer();
});

pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
modeToggleButton.addEventListener('click', () => {
    pauseTimer();
    switchMode();
});

// Initialize the display
resetTimer(); 

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function playTimerSound() {
    timerSound.currentTime = 0; // Reset sound to start
    timerSound.play();
}