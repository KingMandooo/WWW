'use strict';
var vcanvas, ctx;
var rt = {x: 150, y: 100, w: 300, h: 200};
var rt2 = {x: 200, y: 150, w: 200, h: 100};
var ct = {x: 520, y: 80, r: 50, v: 5};
var r_left, r_right, r_up, r_down;

function clearCanvas() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function updateCircle() {
    if(r_left) {ct.x -= ct.v;}
    if(r_right) {ct.x += ct.v;}
    if(r_up) {ct.y -= ct.v;}
    if(r_down) {ct.y += ct.v;}
}

function drawCircle() {
    ctx.beginPath();
    ctx.arc(ct.x, ct.y, ct.r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(ct.x, ct.y, 2, 0, Math.PI * 2);
    ctx.fill();
}

function drawTarget() {
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.strokeRect(rt.x, rt.y, rt.w, rt.h);
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.strokeRect(rt2.x, rt2.y, rt2.w, rt2.h);

    if(hit_rt_ct()) {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.fillRect(rt2.x, rt2.y, rt2.w, rt2.h);
        ctx.fillStyle = "black";
    }

    ctx.beginPath();
    ctx.moveTo(rt2.x, rt2.y - 100);
    ctx.lineTo(rt2.x, rt2.y + 200);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rt2.x + rt2.w, rt2.y - 100);
    ctx.lineTo(rt2.x + rt2.w, rt2.y + 200);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rt2.x - 130, rt2.y);
    ctx.lineTo(rt2.x + rt2.w + 130, rt2.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rt2.x - 130, rt2.y + rt2.h);
    ctx.lineTo(rt2.x + rt2.w + 130, rt2.y + rt2.h);
    ctx.stroke();
}

function distance(x, y, a, b) {  // 거리가 계속 바뀌므로 함수 적용
    var dx, dy;
    dx = x - a;
    dy = y - b;
    
    return Math.sqrt(dx * dx + dy * dy);
}

function hit_rt_ct() {
    var x0, x1, y0, y1, result = false;
    x0 = rt.x;
    x1 = rt.x + rt.w;
    y0 = rt.y;
    y1 = rt.y + rt.h;

    if(ct.x > x0 && ct.x < x1 && ct.y > y0 && ct.y < y1) 
    {
        result = true;
        if(ct.x < rt2.x)   // ct.x가 rt2.x보다 작을 때
        {
            if(ct.y < rt2.y)  // ct.y가 rt2.y보다 작을 때
            {
                if(distance(ct.x, ct.y, rt2.x, rt2.y) > ct.r) 
                {
                    result = false;
                }
            } 
            else 
            {
                if(ct.y > rt2.y + rt2.h)  // ct.y가 rt2.y + rt2.h 보다 클 때
                {
                    if(distance(ct.x, ct.y, rt2.x, rt2.y + rt2.h) > ct.r) 
                    {
                        result = false;
                    }
                }
            }
        } 
        else if(ct.x > rt2.x + rt2.w)    // ct.x가 rt2.x + rt2.w 보다 클 때
        {
            if(ct.y < rt2.y)  // ct.y가 rt2.y보다 작을 때
            {
                if(distance(ct.x, ct.y, rt2.x + rt2.w, rt2.y) > ct.r)  // 함수의 인자에 rt2.w + rt2.h가 핵심임
                {
                    result = false;
                }
            } 
            else 
            {
                if(ct.y > rt2.y + rt2.h)  // ct.y가 rt2.y + rt2.h 보다 클 때
                {
                    if(distance(ct.x, ct.y, rt2.x + rt2.w, rt2.y + rt2.h) > ct.r) 
                    {
                        result = false;
                    }
                }
            }
        }
    } 

    return result;
}

function stateInfo() {
    if(hit_rt_ct()) {
        ctx.fillText("상태: 충돌", 50, 50);
    } else {
        ctx.fillText("상태: 안전", 50, 50);
    }
}

function gameLoop() {
    clearCanvas();
    drawTarget();
    drawCircle();
    updateCircle();
    stateInfo();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx =vcanvas.getContext("2d");

    ctx.font = "15px Georgio";

    setInterval(gameLoop, 20);
}

function set_key(event) {
    if(event.keyCode === 37) {r_left = 1;}
    if(event.keyCode === 39) {r_right = 1;}
    if(event.keyCode === 38) {r_up = 1;}
    if(event.keyCode === 40) {r_down = 1;}
}

function stop_key(event) {
    if(event.keyCode === 37) {r_left = 0;}
    if(event.keyCode === 39) {r_right = 0;}
    if(event.keyCode === 38) {r_up = 0;}
    if(event.keyCode === 40) {r_down = 0;}
}

document.onkeydown = set_key;
document.onkeyup = stop_key;