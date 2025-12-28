const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

const box = 20; // dimensiune segment
let score = 0;
document.getElementById("score").innerText = score;

// Snake array
let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

// Directie initiala
let direction = null;

// Mâncare (flacara/inimioara)
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box
};

// Control tastatura
document.addEventListener("keydown", directionControl);

function directionControl(event) {
    if(event.keyCode == 37 && direction != "RIGHT") direction = "LEFT";
    else if(event.keyCode == 38 && direction != "DOWN") direction = "UP";
    else if(event.keyCode == 39 && direction != "LEFT") direction = "RIGHT";
    else if(event.keyCode == 40 && direction != "UP") direction = "DOWN";
}

// Deseneaza snake si mancare
function draw() {
    // Fundal
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Snake
    for(let i=0;i<snake.length;i++){
        ctx.fillStyle = "red";
        ctx.font = "20px Arial";
        ctx.fillText("👹", snake[i].x, snake[i].y + box); // segment drac
    }

    // Mancare
    ctx.fillText("🔥", food.x, food.y + box);

    // Snake head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "LEFT") snakeX -= box;
    if(direction == "UP") snakeY -= box;
    if(direction == "RIGHT") snakeX += box;
    if(direction == "DOWN") snakeY += box;

    // Coliziune cu snake
    for(let i=1;i<snake.length;i++){
        if(snakeX == snake[i].x && snakeY == snake[i].y){
            alert("💀 Joc terminat! Scor: " + score);
            snake = [];
            snake[0] = { x: 10*box, y:10*box };
            direction = null;
            score = 0;
            document.getElementById("score").innerText = score;
            return;
        }
    }

    // Coliziune cu peretii
    if(snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height){
        alert("💀 Joc terminat! Scor: " + score);
        snake = [];
        snake[0] = { x: 10*box, y:10*box };
        direction = null;
        score = 0;
        document.getElementById("score").innerText = score;
        return;
    }

    // Mancare
    if(snakeX == food.x && snakeY == food.y){
        score++;
        document.getElementById("score").innerText = score;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    // Adaugam noul cap
    let newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);
}

// Ruleaza jocul la 150ms
let game = setInterval(draw, 150);
