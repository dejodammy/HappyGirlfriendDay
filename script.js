// Reveal Message
const btn = document.querySelector('.reveal-btn');
const message = document.querySelector('.message');
btn.addEventListener('click', () => {
    message.classList.toggle('hidden');
    btn.textContent = message.classList.contains('hidden') ? 
        'Click for a Surprise 💌' : 'Hide Message ❌';
});

// Floating Hearts Canvas
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
function Heart(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
}
Heart.prototype.draw = function() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.PI / 4);
    ctx.scale(this.size, this.size);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-1, -1, -3, 1, 0, 4);
    ctx.bezierCurveTo(3, 1, 1, -1, 0, 0);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fill();
    ctx.restore();
};
Heart.prototype.update = function() {
    this.y -= this.speed;
    if (this.y < -10) {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 10;
    }
};

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => {
        h.update();
        h.draw();
    });
    requestAnimationFrame(animate);
}

// Generate hearts
for (let i = 0; i < 30; i++) {
    hearts.push(new Heart(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 0.7 + 0.3,
        Math.random() * 1 + 0.5
    ));
}
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
