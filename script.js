const playboard = document.querySelector('.playboard');

let gameover = false;
let foodY, foodX;
let snakeX = 5, snakeY = 10;
let snakebody = [[snakeX, snakeY]]; // Initialize the snake body with the head position
let velocityX = 0, velocityY = 0;
let setIntervalid;
let score = -1
let scorehtml = document.querySelector('.score')

const changefoodposition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    score++
    scorehtml.textContent = score
};

const handlegameover = () => {
    clearInterval(setIntervalid);
    alert('Game over, press OK to replay...');
    location.reload();
};

const changedirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
};

const initgame = () => {
    if (gameover) return handlegameover();

    let htmlmarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Check if snake ate the food
    if (snakeX === foodX && snakeY === foodY) {
        changefoodposition();
        snakebody.push([foodX, foodY]); // Add a new segment to the snake body
    }

    // Move the snake body
    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i - 1]; // Move body segment to the position of the previous segment
    }

    // Update the first segment (head)
    snakebody[0] = [snakeX, snakeY];

    // Move the snake head
    snakeX += velocityX;
    snakeY += velocityY;

    // Check for wall collision
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameover = true;
    }

    // Check for collision with the snake's own body, excluding the head
    for (let i = 1; i < snakebody.length; i++) {
        if (snakeX === snakebody[i][0] && snakeY === snakebody[i][1]) {
            gameover = true;
        }
    }

    // Add snake body segments to the HTML markup
    for (let i = 0; i < snakebody.length; i++) {
        htmlmarkup += `<div class="head" style="grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;
    }

    playboard.innerHTML = htmlmarkup;
};


changefoodposition();
setIntervalid = setInterval(initgame, 200);
document.addEventListener('keydown', changedirection);
