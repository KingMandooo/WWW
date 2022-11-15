'use strict';
var vcanvas, ctx;
var ct = {x: 500, y: 200, r: 100};
var rt = {x: 100, y: 400, w: 300, h: 200};
var pt = {x: 200, y: 200, v: 5};
var rt2 = {x: 500, y: 500, w: 150, h: 100, v: 5};
var r_left, r_right, r_up, r_down;
var left, right, up, down;

function clearCanvas() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function drawRect() {     // 움직이는 사각형 그리기
    ctx.beginPath();
    ctx.fillStyle = 'gray';
    ctx.fillRect(rt2.x, rt2.y, rt2.w, rt2.h);
    ctx.fillStyle = "black";

    if(hit_rt2_pt()) {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.fillRect(rt2.x, rt2.y, rt2.w, rt2.h);
        ctx.fillStyle = "black";
    }

    ctx.fillText("(a0, b0)", rt2.x - 10, rt2.y - 10);
    ctx.fillText("(a1, b0)", rt2.x + rt2.w - 10, rt2.y - 10);
    ctx.fillText("(a0, b1)", rt2.x - 10, rt2.y + rt2.h + 15);
    ctx.fillText("(a1, b1)", rt2.x + rt2.w - 10, rt2.y + rt2.h + 15);
}

function updateRect() {               // 움직이는 사각형 움직이게 하기
    if(left) {rt2.x -= rt2.v;}
    if(right) {rt2.x += rt2.v;}
    if(up) {rt2.y -= rt2.v;}
    if(down) {rt2.y += rt2.v;}
}

function drawPoint() {          // 점 그리기
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillText("(pt.x, pt.y)", pt.x - 20, pt.y - 10);
}

function updatePoint() {         // 점 움직이기
    if(r_left) {pt.x -= pt.v;}
    if(r_right) {pt.x += pt.v;}
    if(r_up) {pt.y -= pt.v;}
    if(r_down) {pt.y += pt.v;}
}

function drawTraget() {          // 가만히 있는 타겟 그리기
    ctx.beginPath();  // 원
    ctx.arc(ct.x, ct.y, ct.r, 0, Math.PI * 2);
    ctx.stroke();

    if(hit_ct_pt()) {    // 점과 충돌하면 원의 색 바뀌기 
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.fillStyle = "black"
    }

    ctx.beginPath();  // 원 중심
    ctx.arc(ct.x, ct.y, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillText("(ct.x, ct.y)", ct.x - 25, ct.y + 15); // 원중심 좌표

    ctx.beginPath();  // 사각형
    ctx.strokeRect(rt.x, rt.y, rt.w, rt.h);

    if(hit_rt_pt() || hit_rt_rt2()) {   // 점이나 사각형과 충돌하면 사각형의 색 바꾸기
        ctx.fillStyle = "yellow";
        ctx.beginPath();  // 사각형
        ctx.fillRect(rt.x, rt.y, rt.w, rt.h);
        ctx.fillStyle = "black"
    }

    ctx.fillText("(x0, y0)", rt.x - 20, rt.y - 10);          // 사각형의 좌표
    ctx.fillText("(x1, y0)", rt.x + rt.w - 20, rt.y - 10);
    ctx.fillText("(x0, y1)", rt.x - 20, rt.y + rt.h + 20);
    ctx.fillText("(x1, y1)", rt.x + rt.w - 20, rt.y + rt.h + 20);
}

function hit_ct_pt() {          // 사각형의 원과 점
    var dx, dy, distance;         
    dx = ct.x - pt.x;
    dy = ct.y - pt.y;
    distance = Math.sqrt(dx * dx + dy * dy);

    if(distance < ct.r) {
        return true;
    } else {
        return false;
    }
}

function hit_rt_pt() {        // 사각형과 점 충돌
    var x0, y0, x1, y1;

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

function hit_rt2_pt() {    // 움직이는 사각형과 점의 충돌
    var x0, y0, x1, y1;

    x0 = rt2.x;
    y0 = rt2.y;
    x1 = rt2.x + rt2.w;
    y1 = rt2.y + rt2.h;

    if(pt.x > x0 && pt.x < x1 && pt.y > y0 && pt.y < y1) {
        return true;
    } else {
        return false;
    }
}

function hit_rt_rt2() {                   // 고정된 사각형과 움직이는 사각형 충돌
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
    if(hit_ct_pt()) {
        ctx.fillText("상태: 원-점 충돌", 50, 700);
    } else if(hit_rt_pt()){
        ctx.fillText("상태: 사각형-점 충돌", 50, 700);
    }
    else if( hit_rt2_pt()){
        ctx.fillText("상태: 사각형2-점 충돌", 50, 700);
    }
    else if( hit_rt_rt2()){
        ctx.fillText("상태: 사각형-사각형2 충돌", 50, 700);
    } else {
        ctx.fillText("상태: 안전", 50, 700);
    }
}

function gameLoop() {
    clearCanvas();

    drawTraget();

    drawRect();
    updateRect();
   
    drawPoint();
    updatePoint();
    stateInfo();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    ctx.font = "12px Georgio";

    setInterval(gameLoop, 20);
}

function set_key(event) {
    if(event.keyCode === 37) {r_left = 1;}
    if(event.keyCode === 38) {r_up = 1;}
    if(event.keyCode === 39) {r_right = 1;}
    if(event.keyCode === 40) {r_down = 1;}

    if(event.keyCode === 65) {left = 1;}
    if(event.keyCode === 87) {up = 1;}
    if(event.keyCode === 68) {right = 1;}
    if(event.keyCode === 83) {down = 1;}
}

function stop_key(event) {
    if(event.keyCode === 37) {r_left = 0;}
    if(event.keyCode === 38) {r_up = 0;}
    if(event.keyCode === 39) {r_right = 0;}
    if(event.keyCode === 40) {r_down = 0;}

    if(event.keyCode === 65) {left = 0;}
    if(event.keyCode === 87) {up = 0;}
    if(event.keyCode === 68) {right = 0;}
    if(event.keyCode === 83) {down = 0;}
}

document.onkeydown = set_key;
document.onkeyup = stop_key;