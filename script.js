const gameScreen = document.getElementById("game-screen");
const form = document.getElementById("form");

let pixelsArray,
    snakeArray = [],
    head,
    tail,
    interval,
    applePoz,
    eaten = false,
    points = Number(0),
    speed = Number(1),
    dir = "ArrowUp";

const renderPixels = () => {
    for (let i = 0; i < 400; i++) {
        const pixel = document.createElement("div");
        pixel.className = "pixel";
        gameScreen.appendChild(pixel);
    }
};

const initSnake = () => {
    pixelsArray = document.getElementsByClassName("pixel");
    pixelsArray[230].classList.add("snake-body");
    head = tail = 230;
    snakeArray = [230];
};

const appleEaten = () => {
    points += Number(10);
    speed += Number(0.1);
    eaten = true;
    pixelsArray[applePoz].classList.remove("apple");
    document.getElementsByClassName("points")[0].innerText = points;
    clearInterval(interval);
    nextApple();
};

const checkCollision = () => {
    if (
        head < 0 ||
        head > 399 ||
        ((head + 1) % 20 == 0 && dir == "ArrowLeft") ||
        (head % 20 == 0 && dir == "ArrowRight")
    ) {
        // console.log("COLLISION");
        clearInterval(interval);
        return true;
    }
    if (applePoz == head) {
        appleEaten();
    }
    return false;
};


const moveSnake = () => {
    // checkCollision();
    switch (dir) {
        case "ArrowUp":
            pixelsArray[head - 20].classList[1]
                ? clearInterval(interval)
                : null;
            head -= 20;
            break;
        case "ArrowDown":
            pixelsArray[head + 20].classList[1]
                ? clearInterval(interval)
                : null;
            head += 20;
            break;
        case "ArrowLeft":
            pixelsArray[head - 1].classList[1] ? clearInterval(interval) : null;
            head -= 1;
            break;
        case "ArrowRight":
            pixelsArray[head + 1].classList[1] ? clearInterval(interval) : null;
            head += 1;
            break;
        default:
            null;
    }
    if (checkCollision()) return;
    if (!eaten) {
        pixelsArray[snakeArray.pop()].classList.remove("snake-body");
    } else {
        eaten = false;
    }
    pixelsArray[head].classList.add("snake-body");
    snakeArray.unshift(head);
};

const generateApple = () => {
    applePoz = Math.floor(Math.random() * 400);
    if (pixelsArray[applePoz].classList[1]) {
        generateApple();
    } else {
        pixelsArray[applePoz].classList.add("apple");
    }
};

const nextApple = () => {
    generateApple();
    interval = setInterval(moveSnake, 500 / speed);
};

document.addEventListener("keydown", (e) => {
    if (
        (dir == "ArrowUp" && e.code == "ArrowDown") ||
        (dir == "ArrowDown" && e.code == "ArrowUp") ||
        (dir == "ArrowLeft" && e.code == "ArrowRight") ||
        (dir == "ArrowRight" && e.code == "ArrowLeft")
    )
        return;
    dir = e.code;
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementsByClassName("hello")[0].style.display = "none";
    document.getElementsByClassName("player-name")[0].innerText =
        e.target[0].value;
    nextApple();
});

renderPixels();
initSnake();
