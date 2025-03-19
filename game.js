const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const scoreElement = document.getElementById('score');
let score = 0;

class Target {
    constructor(x, y, speedX, speedY, size) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.size = size;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width - this.size) {
            this.speedX = -this.speedX;
        }
        if (this.y < 0 || this.y > canvas.height - this.size) {
            this.speedY = -this.speedY;
        }
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    isClicked(mouseX, mouseY) {
        return mouseX > this.x && mouseX < this.x + this.size &&
               mouseY > this.y && mouseY < this.y + this.size;
    }
}

const targets = [];
for (let i = 0; i < 5; i++) {
    const size = 50;
    const x = Math.random() * (canvas.width - size);
    const y = Math.random() * (canvas.height - size);
    const speedX = (Math.random() - 0.5) * 6;
    const speedY = (Math.random() - 0.5) * 6;
    targets.push(new Target(x, y, speedX, speedY, size));
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    targets.forEach((target, index) => {
        if (target.isClicked(mouseX, mouseY)) {
            targets.splice(index, 1);
            score += 1;
            scoreElement.textContent = `Score: ${score}`;
        }
    });
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    targets.forEach(target => {
        target.update();
        target.draw();
    });

    requestAnimationFrame(gameLoop);
}

gameLoop();