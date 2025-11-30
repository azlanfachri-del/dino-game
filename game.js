const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let dino = {
    x: 50,
    y: 200,
    width: 40,
    height: 40,
    dy: 0,
    jumpForce: -12,
    gravity: 0.6,
    grounded: true
};

let cactus = {
    x: 800,
    y: 220,
    width: 30,
    height: 50,
    speed: 6
};

let score = 0;
let gameOver = false;

// EVENT LOMPAT
document.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "ArrowUp") {
        if (dino.grounded && !gameOver) {
            dino.dy = dino.jumpForce;
            dino.grounded = false;
        }
        // Kontrol untuk HP (tap layar)
document.addEventListener("touchstart", function(){
    lompat();
});

        if (gameOver) restart();
    }
});

function restart() {
    dino.y = 200;
    dino.dy = 0;
    cactus.x = 800;
    score = 0;
    gameOver = false;
}

function update() {
    if (gameOver) return;

    // FISIKA DINO
    dino.y += dino.dy;
    dino.dy += dino.gravity;

    if (dino.y >= 200) {
        dino.y = 200;
        dino.dy = 0;
        dino.grounded = true;
    }

    // GERAK KAKTUS
    cactus.x -= cactus.speed;
    if (cactus.x < -30) {
        cactus.x = 800;
        score++;
    }

    // TABRAKAN
    if (
        dino.x < cactus.x + cactus.width &&
        dino.x + dino.width > cactus.x &&
        dino.y < cactus.y + cactus.height &&
        dino.y + dino.height > cactus.y
    ) {
        gameOver = true;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // DINO
    ctx.fillStyle = "black";
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    // KAKTUS
    ctx.fillStyle = "green";
    ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);

    // SCORE
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("SCORE: " + score, 10, 25);

    if (gameOver) {
        ctx.font = "40px Arial";
        ctx.fillText("GAME OVER", 280, 150);
        ctx.font = "20px Arial";
        ctx.fillText("Tekan SPASI untuk Restart", 250, 190);
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();