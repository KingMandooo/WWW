'use strict'; // 틀린 문법을 제대로 알려줌
var vcanvas, ctx;

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.moveTo(100, 100);
    ctx.lineTo(300, 100);
    ctx.lineTo(100, 300);
    ctx.lineTo(300, 300);
    ctx.closePath();
    ctx.fillStyle = "blue";
    ctx.fill();
}