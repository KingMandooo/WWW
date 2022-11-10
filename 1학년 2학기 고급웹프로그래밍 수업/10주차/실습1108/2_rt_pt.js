'use strict';
var vcanvas, ctx;
var rt = {x: 150, y: 100, w: 300, h: 200};
var rt2 = {x: 500, y: 100, v: 5};
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
    ctx.arc(rt2.x, rt2.y, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillText("(pt.x, pt.y)", rt2.x + 5, rt2.y + 5);
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

function hit_rt_rt(rt, pt) {  
    var x0, x1, y0, y1;

    x0 = rt.x;
    y0 = rt.y;
    x1 = rt.x + rt.w;
    y1 = rt.y + rt.h;

    if(pt.x > x0 && pt.x < x1 && pt.y > y0 && pt.y < y1) {
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