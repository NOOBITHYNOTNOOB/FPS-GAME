const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    angle: 0,
    speed: 5,
    radius: 10,
};

let bullets = [];

let keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

canvas.addEventListener('click', (e) => {
    let bullet = {
        x: player.x,
        y: player.y,
        angle: player.angle,
        speed: 10,
        radius: 3,
    };
    bullets.push(bullet);
});

function update() {
    if (keys['w']) {
        player.x += Math.cos(player.angle) * player.speed;
        player.y += Math.sin(player.angle) * player.speed;
    }
    if (keys['s']) {
        player.x -= Math.cos(player.angle) * player.speed;
        player.y -= Math.sin(player.angle) * player.speed;
    }
    if (keys['a']) {
        player.x += Math.cos(player.angle - Math.PI / 2) * player.speed;
        player.y += Math.sin(player.angle - Math.PI / 2) * player.speed;
    }
    if (keys['d']) {
        player.x += Math.cos(player.angle + Math.PI / 2) * player.speed;
        player.y += Math.sin(player.angle + Math.PI / 2) * player.speed;
    }
    if (keys['ArrowLeft']) {
        player.angle -= 0.05;
    }
    if (keys['ArrowRight']) {
        player.angle += 0.05;
    }

    bullets.forEach((bullet, index) => {
        bullet.x += Math.cos(bullet.angle) * bullet.speed;
        bullet.y += Math.sin(bullet.angle) * bullet.speed;

        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
            bullets.splice(index, 1);
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    // Bullets
    bullets.forEach((bullet) => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    });
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();