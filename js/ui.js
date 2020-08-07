const OBSTACLE_SIZE = 20;
const WIDTH = 1000;
const HEIGHT = 800;

const dot = new Vector(WIDTH / 2, HEIGHT / 2);

const positions = [];
const circles = [];
const lines = [];
let obstacles = [];

let paused = false;
let changing = false;


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pause').addEventListener('click', pause);
    document.getElementById('c').addEventListener('contextmenu', rightClick);
    document.getElementById('c').addEventListener('mousedown', mouseDown);

    document.getElementById('angle').addEventListener('mousedown', e => changing = true);
    document.getElementById('angle').addEventListener('mouseup', e => changing = false);
    document.getElementById('angle').addEventListener('input', e => angle = e.target.value / 180 * Math.PI);
    document.getElementById('speed').addEventListener('input', e => speed = e.target.value);
});

function pause() {
    paused = !paused;
    document.getElementById('pause').innerText = paused ? 'PLAY' : 'PAUSE';
}

function rightClick(e) {
    const targetedObstacle = obstacles.filter(o => e.offsetX > o.x && e.offsetY > o.y && e.offsetX < o.x + o.w && e.offsetY < o.y + o.y);
    if(targetedObstacle.length == 0) return;

    e.preventDefault();
    obstacles = obstacles.filter(o => o != targetedObstacle[0]);
}

function mouseDown(e) {
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);

    const targetedObstacle = obstacles.filter(o => e.offsetX > o.x && e.offsetY > o.y && e.offsetX < o.x + o.w && e.offsetY < o.y + o.h);
    if(targetedObstacle.length == 0) mouseDownStart = { o: obstacles[obstacles.push(new Obstacle(e.offsetX - (OBSTACLE_SIZE / 2), e.offsetY - (OBSTACLE_SIZE / 2), OBSTACLE_SIZE, OBSTACLE_SIZE)) - 1], x: OBSTACLE_SIZE / 2, y: OBSTACLE_SIZE / 2 };
    else mouseDownStart = { o: targetedObstacle[0], x: e.offsetX - targetedObstacle[0].x, y: e.offsetY - targetedObstacle[0].y };
}

function mouseMove(e) {
    if(!mouseDownStart) return;

    mouseDownStart.o.x = e.offsetX - mouseDownStart.x;
    mouseDownStart.o.y = e.offsetY - mouseDownStart.y;
}

function mouseUp(e) {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
}

function draw() {
    const ctx = document.getElementById('c').getContext('2d');
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    ctx.fillStyle = 'blue';
    for(const o of obstacles) ctx.fillRect(o.x, o.y, o.w, o.h);

    for(const p of positions) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'green';
        ctx.fill();
    }

    for(const c of circles) {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.stroke();
        ctx.fill();
    }
}