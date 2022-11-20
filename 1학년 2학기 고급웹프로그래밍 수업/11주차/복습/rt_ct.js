'use stirct';
var vcanvas, ctx;
var rt = {x: 150, y: 100, w: 300, h: 200};
var rt2 = {x: 200, y: 150, w: 200, h: 100};
var ct = {x: 530, y: 100, r: 50, v: 5};
var r_left, r_right, r_down, r_up;

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
}

function distance(x0, y0, x1, y1) {
    var dx, dy
    dx = x0 - x1;
    dy = y0 - y1;

    return Math.sqrt(dx * dx + dy * dy);
}

function hit_rt_ct() {
    var result = false;
    var x0, y0, x1, y1, a0, b0, a1, b1;
    x0 = rt.x;
    y0 = rt.y;
    x1 = rt.x + rt.w;
    y1 = rt.y + rt.h;
    a0 = rt2.x;
    b0 = rt2.y;
    a1 = rt2.x + rt2.w;
    b1 = rt2.y + rt2.h;

    if(ct.x > x0 && ct.x < x1 && ct.y > y0 && ct.y < y1) {
        result = true;

        if(ct.x < a0) {
            if(ct.y < b0) {
                if(distance(ct.x, ct.y, a0, b0) > ct.r) {
                    result = false;
                }
            }
            else if(ct.y > b1) {
                if(distance(ct.x, ct.y, a0, b1) > ct.r) {
                    result = false;
                }
            }
        }
        else if(ct.x > a1) {
            if(ct.y < b0) {
                if(distance(ct.x, ct.y, a1, b0) > ct.r) {
                    result = false;
                }
            }
            else if(ct.y > b1) {
                if(distance(ct.x, ct.y, a1, b1) > ct.r) {
                    result = false;
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
    ctx = vcanvas.getContext("2d");

    ctx.font = "12px Georgio";

    setInterval(gameLoop, 20);
}

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