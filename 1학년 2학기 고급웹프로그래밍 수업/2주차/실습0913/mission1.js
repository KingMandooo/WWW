'use strict'; // 틀린 문법을 제대로 알려줌
var vcanvas, ctx;

function drawLine(x, y, c) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.moveTo(x, y);
    ctx.lineTo(x + 100, y);
    ctx.lineTo(x, y + 100);
    ctx.lineTo(x + 100, y + 100);
    ctx.closePath();
    ctx.fillStyle = c;
    ctx.fill();
}

function drawArc(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = "yellow";
    ctx.stroke();
}

function drawRect(x, y, w, h) {
    ctx.strokeStyle = "green";
    ctx.strokeRect(x, y, w, h);
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    drawLine(50, 50, "black");
    drawLine(250, 250, "grey");
    drawArc(300, 100, 50);
    drawRect(50, 250, 100, 100);    
}