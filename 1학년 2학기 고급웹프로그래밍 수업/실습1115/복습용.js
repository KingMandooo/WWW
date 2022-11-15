"use strict";
var vcanvas, ctx;
var sx, sy;
var r_left, r_right, r_up, r_down;
var vel = 5;
var stype = 0;
var fire = 0;
var arrRocket = [];
var arrEnemy = [];

function clearCanvas() {
  ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

// Enemy
function createEnemy() {
  var x, y, wh, c, v;

  x = vcanvas.width;
  y = Math.floor(Math.random() * vcanvas.height);
  wh = Math.floor(Math.random() * 31) + 10;
  v = Math.floor(Math.random() * 2) + 1;
  c = "#" + parseInt(Math.random() * 0xffffff, 10).toString(16);

  if (y > wh && y < vcanvas.height - wh) {
    arrEnemy.push({ x: x, y: y, wh: wh, v: v, c: c, hit: 0 });
  }
}

function updateEnemy() {
  var i;
  for (i = 0; i < arrEnemy.length; i += 1) {
    arrEnemy[i].x -= arrEnemy[i].v;
  }
}

function deleteEnemy() {
  var i;
  for (i = 0; i < arrEnemy.length; i += 1) {
    if (arrEnemy[i].x + arrEnemy[i].wh < 0) {
      arrEnemy.splice(i, 1);
    }
  }
}

function drawEnemy() {
  var i;
  for (i = 0; i < arrEnemy.length; i += 1) {
    ctx.fillStyle = arrEnemy[i].c;
    ctx.fillRect(arrEnemy[i].x, arrEnemy[i].y, arrEnemy[i].wh, arrEnemy[i].wh);
  }
}

// Rocket
function createRocket() {
  if (fire) {
    if (stype !== 1) {
      arrRocket.push({ x: sx + 60, y: sy - 2, w: 5, h: 4, v: 8, c: "yellow" });
    }
    if (stype === 1) {
      arrRocket.push({ x: sx + 55, y: sy - 5, w: 5, h: 4, v: 8, c: "yellow" });
      arrRocket.push({ x: sx + 55, y: sy + 1, w: 5, h: 4, v: 8, c: "yellow" });
    }
    if (stype > 1) {
      arrRocket.push({ x: sx + 20, y: sy - 15, w: 5, h: 4, v: 8, c: "yellow" });
      arrRocket.push({ x: sx + 20, y: sy + 11, w: 5, h: 4, v: 8, c: "yellow" });
    }
    if (stype > 2) {
      arrRocket.push({ x: sx + 10, y: sy - 19, w: 5, h: 4, v: 8, c: "yellow" });
      arrRocket.push({ x: sx + 10, y: sy + 15, w: 5, h: 4, v: 8, c: "yellow" });
    }
  }
}

function updateRocket() {
  var i;
  for (i = 0; i < arrRocket.length; i += 1) {
    arrRocket[i].x += arrRocket[i].v;
  }
}

function deleteRocket() {
  var i;
  for (i = 0; i < arrRocket.length; i += 1) {
    if (arrRocket[i].x > vcanvas.width) {
      arrRocket.splice(i, 1);
    }
  }
}

function drawRocket() {
  var i;
  for (i = 0; i < arrRocket.length; i += 1) {
    ctx.fillStyle = arrRocket[i].c;
    ctx.fillRect(
      arrRocket[i].x,
      arrRocket[i].y,
      arrRocket[i].w,
      arrRocket[i].h
    );
  }
}

// Ship
function updateShip() {
  var h = 15;
  if (r_left) {
    sx -= vel;
  }
  if (r_right) {
    sx += vel;
  }
  if (r_up) {
    sy -= vel;
  }
  if (r_down) {
    sy += vel;
  }

  // 보정
  if (sx - 15 < 0) {
    sx = 15;
  }
  if (sx + 60 > vcanvas.width) {
    sx = vcanvas.width - 60;
  }
  if (stype > 2) {
    h = 19;
  }
  if (sy - h < 0) {
    sy = h;
  }
  if (sy + h > vcanvas.height) {
    sy = vcanvas.height - h;
  }
}

function drawShip() {
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.moveTo(sx - 15, sy);
  ctx.lineTo(sx, sy - 15);
  ctx.lineTo(sx + 60, sy);
  ctx.lineTo(sx, sy + 15);
  ctx.lineTo(sx - 15, sy);
  ctx.fill();

  if (stype === 1) {
    ctx.fillRect(sx + 42, sy - 5, 10, 10);
  }
  if (stype > 1) {
    ctx.fillRect(sx + 10, sy - 15, 10, 30);
  }
  if (stype > 2) {
    ctx.fillRect(sx, sy - 19, 10, 38);
  }
}

function stateInfo() {
  ctx.fillStyle = "white";
  ctx.font = "15pt Georgia";
  ctx.fillText(
    "Stype: " +
      stype +
      "   Enemy: " +
      arrEnemy.length +
      "   Rocket: " +
      arrRocket.length,
    10,
    20
  );
}

function gameLoop() {
  clearCanvas();

  updateRocket();
  deleteRocket();
  drawRocket();

  updateEnemy();
  deleteEnemy();
  drawEnemy();

  updateShip();
  drawShip();

  stateInfo();
}

function init() {
  vcanvas = document.getElementById("myCanvas");
  ctx = vcanvas.getContext("2d");

  sx = 200;
  sy = 200;

  setInterval(createEnemy, 900);
  setInterval(createRocket, 90);
  setInterval(gameLoop, 30);
}

// key control
function set_key(event) {
  if (event.keyCode === 37) {
    r_left = 1;
  }
  if (event.keyCode === 38) {
    r_up = 1;
  }
  if (event.keyCode === 39) {
    r_right = 1;
  }
  if (event.keyCode === 40) {
    r_down = 1;
  }

  if (event.keyCode === 48) {
    stype = 0;
  }
  if (event.keyCode === 49) {
    stype = 1;
  }
  if (event.keyCode === 50) {
    stype = 2;
  }
  if (event.keyCode === 51) {
    stype = 3;
  }

  if (event.keyCode === 32) {
    fire = 1;
  }
}

function stop_key(event) {
  if (event.keyCode === 37) {
    r_left = 0;
  }
  if (event.keyCode === 38) {
    r_up = 0;
  }
  if (event.keyCode === 39) {
    r_right = 0;
  }
  if (event.keyCode === 40) {
    r_down = 0;
  }

  if (event.keyCode === 32) {
    fire = 0;
  }
}

document.onkeydown = set_key;
document.onkeyup = stop_key;
