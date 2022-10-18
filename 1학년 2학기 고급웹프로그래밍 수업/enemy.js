'use strict';
var vcanvas, ctx;
var x, y;
var game_enemy = {};

function game_clearCanvas() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

//enemy-------------------=
function game_createEnemy() {
    var game_tx, game_ty, game_twh, game_tc, game_tv;
    game_tx = vcanvas.width;
    game_ty = Math.round(Math.random() * (vcanvas.height - 40));
    game_twh = Math.round(Math.random() * 20) + 20; // 20 ~ 40
    game_tv = Math.round(Math.random()) + 2; // 2 ~ 3
    game_tc = "#" + parseInt(Math.random() * 0xffffff, 10).toString(16);
    game_enemy = {x: game_tx, y: game_ty, wh: game_twh, c: game_tc, v: 3};
}

function game_drawEnemy() {
    ctx.fillStyle = game_enemy.c;
    ctx.fillRect(game_enemy.x, game_enemy.y, game_enemy.wh, game_enemy.wh);
}

function game_updateEnemy() {
    game_enemy.x -= game_enemy.v;
}
//-------------------------

function game_drawShip() {
    ctx.beginPath();
    ctx.moveTo(x - 15, y);
    ctx.lineTo(x, y - 15);
    ctx.lineTo(x + 60, y);
    ctx.lineTo(x , y + 15);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
}

function game_gameLoop() {
    game_clearCanvas();
    game_drawShip();

    game_updateEnemy();
    game_drawEnemy();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    x = 200;
    y = 200;
    
    setInterval(game_createEnemy, 3000);
    setInterval(game_gameLoop, 33);
}