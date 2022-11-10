'use strict';
var vcanvas, ctx;
var rt = {x: 150, y: 100, w: 300, h: 200};
var rt2 = {x: 480, y: 80, w: 100, h: 70, v: 5};
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

function drawRect() {  // 점 그리기
    ctx.beginPath();
    ctx.strokeRect(rt2.x, rt2.y, rt2.w, rt2.h);

    ctx.fillText("(a0, b0)", rt2.x - 20, rt2.y - 5);
    ctx.fillText("(a1, b0)", rt2.x + rt2.w - 30, rt2.y - 5);
    ctx.fillText("(a0, b1)", rt2.x - 20, rt2.y + rt2.h + 15);
    ctx.fillText("(a1, b1)", rt2.x + rt2.w - 30, rt2.y + rt2.h + 15);
}

function darwTarget() {
    ctx.beginPath();

    if(hit_rt_rt(rt, rt2)) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(rt.x, rt.y, rt.w, rt.h);
        ctx.fillStyle = "black";
    }

    ctx.strokeRect(rt.x, rt.y, rt.w, rt.h);
    
    ctx.fillText("(x0, y0)", rt.x - 30, rt.y - 10);
    ctx.fillText("(x1, y0)", rt.x + rt.w - 30, rt.y - 10);
    ctx.fillText("(x0, y1)", rt.x - 30, rt.y + rt.h + 15);
    ctx.fillText("(x1, y1)", rt.x + rt.w - 30, rt.y + rt.h + 15);
}

function hit_rt_rt(rt, rt2) {  
    var x0, x1, y0, y1, a0, a1, b0, b1;

    x0 = rt.x;
    y0 = rt.y;
    x1 = rt.x + rt.w;
    y1 = rt.y + rt.h;
    a0 = rt2.x;
    b0 = rt2.y;
    a1 = rt2.x + rt2.w;
    b1 = rt2.y + rt2.h;

    if(x0 < a1 && x1 > a0 && y0 < b1 && y1 > b0) {
        return true;
    } else {
        return false;
    }
}

function stateInfo() {
    if(hit_rt_rt(rt, rt2)) {
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