"use strict";
var vcanvas, ctx;
var stype = 0; // 비행선 종류 0 ~ 3
var sx = 200,
  sy = 200; // 비행선 좌표, 길이
var fire; // 총알생성 키
var arrRocket = [];
var key = 0;

function clearCanvas() {
  ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

// Rocket
function createRocket() {
  if (fire) {
    if (stype !== 1) {
      arrRocket.push({
        x: sx + 60,
        y: sy - 2,
        w: 5,
        h: 4,
        c: "#ffff00",
        v: 5,
      });
    }
    if (stype === 1) {
      arrRocket.push({
        x: sx + 60,
        y: sy - 5,
        w: 5,
        h: 4,
        c: "#ffff00",
        v: 5,
      });
      arrRocket.push({
        x: sx + 60,
        y: sy + 1,
        w: 5,
        h: 4,
        c: "#ffff00",
        v: 5,
      });
    }
    if (stype > 1) {
      arrRocket.push({
        x: sx + 10,
        y: sy - 15,
        w: 5,
        h: 4,
        c: "#ffff00",
        v: 5,
      });
      arrRocket.push({
        x: sx + 10,
        y: sy + 11,
        w: 5,
        h: 4,
        c: "#ffff00",
        v: 5,
      });
    }
    if (stype > 2) {
      arrRocket.push({ x: sx, y: sy - 19, w: 5, h: 4, c: "#ffff00", v: 5 });
      arrRocket.push({ x: sx, y: sy + 15, w: 5, h: 4, c: "#ffff00", v: 5 });
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
function drawShip() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(sx - 15, sy);
  ctx.lineTo(sx, sy - 15);
  ctx.lineTo(sx + 60, sy);
  ctx.lineTo(sx, sy + 15);
  ctx.closePath();
  ctx.fill();

  if (stype === 1) {
    ctx.fillRect(sx + 42, sy - 5, 10, 10);
  }

  if (stype > 1) {
    ctx.fillRect(sx + 10, sy - 15, 10, 30);
  }

  if (stype > 2) {
    ctx.fillRect(sx, sy - 19, 11, 38);
  }
}

function play() {
  if(fire) {
    var myAudio = new Audio();

    if(stype === 0) {
      // var myAudio = new Audio();
      myAudio.src ="sound/Gun_1p.mp3";
      myAudio.volume = 0.3;
      myAudio.play();
    }
    if(stype === 1) {
      // var myAudio = new Audio();
      myAudio.src ="sound/Gun_2p.mp3";
      myAudio.volume = 0.3;
      myAudio.play();
    }
    if(stype === 2) {
      // var myAudio = new Audio();
      myAudio.src ="sound/Gun_3p.mp3";
      myAudio.volume = 0.3;
      myAudio.play();
    }
    if(stype === 3) {
      // var myAudio = new Audio();
      myAudio.src ="sound/Gun_4p.mp3";
      myAudio.volume = 0.3;
      myAudio.play();
    }
  }
}

function stateInfo() {
  ctx.fillStyle = "#fff";
  ctx.font = "20pt arial bold";
  ctx.fillText(
    "sType: " + stype + "  fire: " + fire + "  Rocket: " + arrRocket.length,
    100,
    100
  );
}

function gameLoop() {
  clearCanvas();
  updateRocket();
  deleteRocket();
  drawRocket();
  drawShip();
  stateInfo();
}

function init() {
  vcanvas = document.getElementById("myCanvas");
  ctx = vcanvas.getContext("2d");

  setInterval(play, 100);
  setInterval(createRocket, 100);
  setInterval(gameLoop, 16);
}

// key control
function set_key(event) {
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
  if (event.keyCode === 32) {
    fire = 0;
  }
}

document.onkeydown = set_key;
document.onkeyup = stop_key;
