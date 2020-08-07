let angle = 0;
let speed = 50;
let delta = 0;
let start = 0;

document.addEventListener('DOMContentLoaded', () => setInterval(update, 1000 / 75));

function update() {
    delta = Date.now() - start;
    start = Date.now();

    if(!changing) {
        if(!paused) angle += (delta / 1000) * (speed / 100);
        if(angle > 2 * Math.PI) angle = angle % (2 * Math.PI);
        document.getElementById('angle').value = angle * 180 / Math.PI;
    }
    document.getElementById('angle-span').innerText = `${(angle * 180 / Math.PI).toFixed(0)} deg`;
    document.getElementById('speed-span').innerText = `${speed} %`;

    getDistance(angle);

    draw();
}

function getDistance(angle) {
    positions.length = 0;
    circles.length = 0;
    lines.length = 0;

    let pos = dot;
    let distance = Infinity;

    do {
        distance = Infinity;
        for(const o of obstacles) distance = Math.min(pos.clone().distance(new Vector(Math.max(Math.min(pos.x, o.x + o.w), o.x), Math.max(Math.min(pos.y, o.y + o.h), o.y))), distance);

        positions.push(pos);
        circles.push({x: pos.x, y: pos.y, r: distance});

        pos = Vector.fromAngle(angle).times(distance).add(pos);
    } while(distance > 0.01 && pos.x > 0 && pos.y > 0 && pos.x < WIDTH && pos.y < HEIGHT);

    return pos.distance(dot);
}