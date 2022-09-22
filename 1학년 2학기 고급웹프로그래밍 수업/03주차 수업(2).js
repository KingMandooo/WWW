'use strict';
var vcanvas, ctx;
var x, y;
var Left, Right, Up, Down;
var vel = 8;

function clearGame() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function drawShip(sx, sy) {  // 비행선 함수
    ctx.beginPath();
    ctx.moveTo(sx - 15, sy);
    ctx.lineTo(sx, sy - 15);
    ctx.lineTo(sx + 60, sy);
    ctx.lineTo(sx, sy + 15);
    ctx.closePath();
    ctx.fillStyle="red";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(sx + 60, sy);
    ctx.lineTo(sx + 40, sy - 4);
    ctx.lineTo(sx + 40, sy + 4);
    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(sx - 30, sy - 8);
    ctx.lineTo(sx - 10, sy - 8);
    ctx.lineTo(sx - 10, sy - 13);
    ctx.lineTo(sx - 15, sy - 13);
    ctx.closePath();
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(sx - 30, sy + 8);
    ctx.lineTo(sx - 10, sy + 8);
    ctx.lineTo(sx - 10, sy + 13);
    ctx.lineTo(sx - 15, sy + 13);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(sx + 10, sy, 5, 0, Math.PI * 2);
    ctx.fillStyle = "skyblue";
    ctx.fill();
}

function moveShip() {
    if(Left) { x -= vel; }    // 키를 누르면 True 따라서 if문 작동
    if(Up) { y -= vel; } 
    if(Right) { x += vel; }
    if(Down) { y += vel; }
  
    if (x - 30 < 0) { x = 30; }
    // if (x - 30 == 0) { x = 30; } // 왜 이건 안될까?
    if (x + 60 > vcanvas.width) { x = vcanvas.width - 60;}
    if (y - 15 < 0) { y = 15; }
    if (y + 15 > vcanvas.height) { y = vcanvas.height - 15; }  
}

function gameLoop() {
    clearGame();
    moveShip();
    drawShip(x, y);
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    x = 200;
    y = 200;

    setInterval(gameLoop, 33);
}

//-----------------Key Control-----------------------------
function set_key(event) {
    if(event.keyCode === 37) { Left = 1; }
    if(event.keyCode === 38) { Up = 1; }
    if(event.keyCode === 39) { Right = 1; }
    if(event.keyCode === 40) { Down = 1; }
}

function stop_key(event) {
    if(event.keyCode === 37) { Left = 0; }      // 0 은 False
    if(event.keyCode === 38) { Up = 0; }
    if(event.keyCode === 39) { Right = 0; }
    if(event.keyCode === 40) { Down = 0; }
}

document.onkeydown = set_key;
document.onkeyup = stop_key;
//----------------------------------------------
