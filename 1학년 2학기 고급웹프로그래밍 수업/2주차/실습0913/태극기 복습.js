'use strict';
var vcanvas, ctx;

function 태극기(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI, true);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI, false);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x - r/2, y, r/2, 0, Math.PI, false);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + r/2, y, r/2, 0, Math.PI, true);
    ctx.fillStyle = "blue";
    ctx.fill();
}

function trans(x, y, r, deg) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(deg);
    태극기(0, 0, r);
    // ctx.restore();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    태극기(0, 0, 100);
    trans(200, 200, 100, 3); 
    태극기(0, 100, 100);
    // 당연히 각도를 3만큼 틀면 뒤집히기 떄문에 y축을 100만큼 증가시키면 위로 올라가지!
}