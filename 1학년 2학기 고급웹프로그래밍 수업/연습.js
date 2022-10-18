'use strict';
var vcanvas, ctx;
var x, y;
var r_left, r_rigt, r_up, r_down;
var vel = 8;
var stype = 0;
var fire;
var arrRocket = [];
var arrEnemy = [];

function drawShip() {
    ctx.beginPath();
    ctx.moveTo(x - 15, y);
    ctx.lineTo(x, y + 15);
    ctx.lineTo(x + 60, y);
    ctx.lineTo(x, y + 15);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    x = 200;
    y = 200;

    drawShip();
}