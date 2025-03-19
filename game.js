const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

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
let targets = [];
let score = 0;

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

function createTarget() {
    let target = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 15,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
    };
    targets.push(target);
}

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

    bullets.forEach((bullet, bulletIndex) => {
        bullet.x += Math.cos(bullet.angle) * bullet.speed;
        bullet.y += Math.sin(bullet.angle) * bullet.speed;

        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
            bullets.splice(bulletIndex, 1);
        }

        targets.forEach((target, targetIndex) => {
            const dx = bullet.x - target.x;
            const dy = bullet.y - target.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < bullet.radius + target.radius) {
                bullets.splice(bulletIndex, 1);
                targets.splice(targetIndex, 1);
                score += 10;
                scoreDisplay.textContent = `Score: ${score}`;
            }
        });
    });

    targets.forEach((target) => {
        target.x += target.speedX;
        target.y += target.speedY;

        if (target.x < target.radius || target.x > canvas.width - target.radius) {
            target.speedX *= -1;
        }
        if (target.y < target.radius || target.y > canvas.height - target.radius) {
            target.speedY *= -1;
        }
    });

    if (Math.random() < 0.01) {
        createTarget();
    }
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

    // Targets
    targets.forEach((target) => {
        // Blue outer circle
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();

        // White inner circle
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius * 0.5, 0, Math.PI * 2); // Half the radius
        ctx.fillStyle = 'white';
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