'use strict';
var vcanvas, ctx;

function taeguk(x, y, r) {
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

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    taeguk(200, 200, 100);
}