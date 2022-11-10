'use strict';
var vcanvas, ctx;
var ct = {x: 300, y: 200, r: 100};
var rt2 = {x: 500, y: 100, r: 50, v: 5};
var r_left, r_up, r_right, r_down;

function clearCanvas() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function updateRect() {  // 점 움직이기
    if(r_left) {rt2.x -= rt2.v;}
    if(r_right) {rt2.x += rt2.v;}
    if(r_up) {rt2.y -= rt2.v;}
    if(r_down) {rt2.y += rt2.v;}
}

function drawRect() {  // 작은 원 그리기
    ctx.beginPath();
    ctx.arc(rt2.x, rt2.y, rt2.r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(rt2.x, rt2.y, 2, 0, Math.PI * 2); // 작은 원 중점
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(rt2.x, rt2.y);
    ctx.lineTo(rt2.x, rt2.y - rt2.r);  // 반지름 표시
    ctx.stroke();

    ctx.fillText("R2", rt2.x - 20, rt2.y - 20);
    ctx.fillText("(pt.x, pt.y)", rt2.x - 25, rt2.y + 15);
}

function darwTarget() {
    ctx.beginPath();
    ctx.arc(ct.x, ct.y, ct.r, 0, Math.PI * 2); // 큰 원
    if(hit_rt_rt(ct, rt2)) {
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.fillStyle = "black";
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(ct.x, ct.y, 2, 0, Math.PI * 2); // 큰 원 중점
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(ct.x, ct.y);
    ctx.lineTo(ct.x, ct.y - ct.r);  // 반지름 표시
    ctx.stroke();
    
    ctx.fillText("(ct.x, ct.y)", ct.x - 25, ct.y + 20);
    ctx.fillText("R1", ct.x - 20, ct.y - 40);
}

function hit_rt_rt(ct, ct2) {  
    var distance, dx, dy, dis;
    dx = ct.x - ct2.x;
    dy = ct.y - ct2.y;
    dis = Math.sqrt(dx * dx + dy * dy); // 두 원의 중점의 거리(움직이는)
    distance = ct.r + ct2.r; // 두 원의 중점의 거리 (고정된)

    if(distance > dis) { // 움직이는 원의 중점거리보다 고정된 원의 중점거리가 크면 true
        return true;
    } else {
        return false;
    }
}

function stateInfo() {
    if(hit_rt_rt(ct, rt2)) {
        ctx.fillText("상태: 충돌", 50, 50);
    } else {
        ctx.fillText("상태: 충돌되지 않음", 50, 50);
    }
}

function gameLoop() {
    clearCanvas();
    darwTarget();
    updateRect();
    drawRect();
    stateInfo();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    ctx.font = "12px Georgia";

    setInterval(gameLoop, 20);
}

// keyControl
function set_key(event) {
    if(event.keyCode === 37) {r_left = 1;}
    if(event.keyCode === 38) {r_up = 1;}
    if(event.keyCode === 39) {r_right = 1;}
    if(event.keyCode === 40) {r_down = 1;}
}

function stop_key(event) {
    if(event.keyCode === 37) {r_left = 0;}
    if(event.keyCode === 38) {r_up = 0;}
    if(event.keyCode === 39) {r_right = 0;}
    if(event.keyCode === 40) {r_down = 0;}
}

document.onkeydown = set_key;
document.onkeyup = stop_key;