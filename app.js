const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeBtn = document.querySelector("#time-list");
const timer = document.querySelector("#time");
const board = document.querySelector("#board");

let time = 10;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeBtn.addEventListener("click", (event) => {
  //Делегирование событий
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    randomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  randomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function finishGame() {
  timer.parentNode.classList.add("hide");
  const restartButton = document.createElement("button");
  restartButton.textContent = "Начать сначала";
  restartButton.style.position = "relative";
  restartButton.style.bottom = "-120px";
  restartButton.style.background = "transparent";
  restartButton.style.border = "2px solid white";
  restartButton.style.padding = "10px 20px";
  restartButton.style.fontSize = "16px";
  restartButton.style.cursor = "pointer";
  restartButton.style.display = "block";
  restartButton.style.color = "antiquewhite";
  board.innerHTML = `<h1 style="position: absolute;">Игра окончена!<br>Ваш счет: <span class="primary">${score}</span></h1>`;
  board.appendChild(restartButton);

  restartButton.addEventListener("click", () => {
    location.reload();
  });
}

function setTime(v) {
  timer.innerHTML = `00:${v}`;
}

function randomCircle() {
  const circle = document.createElement("div");
  const size = circleRandomSize(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = circleRandomSize(0, width - size);
  const y = circleRandomSize(0, height - size);
  const color = randomColor();
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.aspectRatio = 1;
  circle.style.background = `${color}`;
  circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
  board.append(circle);
}

function circleRandomSize(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
