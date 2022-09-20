'use strict';
var vcanvas, ctx;

function 태극(x, y, r) {
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

function 각도바꾸기(x, y, r, deg) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(deg);
    태극(0, 0, r);
    ctx.restore();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    태극(200, 200, 100);
    각도바꾸기(200, 100, 100, 3);
}