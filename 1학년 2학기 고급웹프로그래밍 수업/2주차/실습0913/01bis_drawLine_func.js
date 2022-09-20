'use strict'; // 틀린 문법을 제대로 알려줌
var vcanvas, ctx;

function drawLine(x, y, c) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(x, y);
    ctx.lineTo(x + 100, y);
    ctx.lineTo(x, y + 100);
    ctx.lineTo(x + 100, y + 100);
    ctx.closePath();
    ctx.fillStyle = c;
    ctx.fill();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    drawLine(100, 100, "yellow");
    drawLine(200, 100, "blue");
    drawLine(100, 200, "green");
    drawLine(200, 200, "red");

    ctx.beginPath();
    ctx.strokeStyle = "rgb(50, 200, 230)";
    ctx.strokeRect(10, 10, 50, 50);
    ctx.fillStyle = "grey";
    ctx.fillRect(10, 100, 50, 50);
}