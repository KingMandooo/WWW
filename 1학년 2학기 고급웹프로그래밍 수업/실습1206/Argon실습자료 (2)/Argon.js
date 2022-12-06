"use strict";
var vcanvas, ctx;
var sx, sy;
var r_left, r_right, r_up, r_down;
var vel = 5;
var stype = 0;
var fire = 0;
var arrRocket = [];
var arrEnemy = [];

// 추가되는 모든 변수 또는 함수들은 이곳에 작성할 것
// *************** 추가코드 작성 시작 ***********************

var myMusic = new Audio(); //  소리 변수
var particle = [];

// 파티클
function b2v(a, b) {
  return Math.random() * (b - a) + a;
}

function createParticle(ei) {
  var nop, x, y, wh, hue, d1, d2, velx, vely;
  
  nop = 200;
  
  for(var i = 0; i < nop; i++) {
      x = b2v(ei.x, ei.x + ei.wh);
      y = b2v(ei.y, ei.y + ei.wh);
      wh = b2v(1, 10);

      hue = ei.c + Math.random() * 20;

      d1 = b2v(30, 120);
      d2 = b2v(30, 120);

      velx = (7 - wh) / 3 * b2v(-1, 1);
      vely = (7 - wh) / 3 * b2v(-1, 1);

      particle.push({px: x, py: y, pwh: wh, pc: hue, d1: d1, d2: d2, pvx: velx, pvy: vely});
  }
}

function drawParticle() {
  var hue, lightness;

  for(var i = 0; i < particle.length; i++) {
      hue = particle[i].pc;
      lightness = 80 * particle[i].d1 / particle[i].d2;

      ctx.fillStyle = "hsl(" + hue + ", 100%," + lightness + "%)";
      ctx.fillRect(particle[i].px, particle[i].py, particle[i].pwh, particle[i].pwh);
      ctx.strokeStyle = "white";
      ctx.strokeRect(particle[i].px, particle[i].py, particle[i].pwh, particle[i].pwh);
  }
}

function updateParticle() {
  var k = 1;

  for(var i = 0; i < particle.length; i++) {
      particle[i].px += k * particle[i].pvx;
      particle[i].py += k * particle[i].pvy;
      particle[i].d1 -= k * 2;

      if(particle[i].d1 < 0) {
          particle.splice(i, 1);
      }
  }
}

// 콜라이더
function hitRectToRect(rt, rt2) {
  return rt.x0 < rt2.a1 && rt.x1 > rt2.a0 && rt.y0 < rt2.b1 && rt.y1 > rt2.b0;
}

function colisonShip() {
  var wing1 = {}, wing2 = {}, rt = {}, rt2 = {}, rt3 = {}, enemy_rt = {};

  wing1 = {x0: sx - 30, y0: sy - 15, x1: sx + 13, y1: sy - 10};  // 뒷날개 콜라이더 정보
  wing2 = {x0: sx - 30, y0: sy + 10, x1: sx + 13, y1: sy + 15};
  
  if(stype === 0)   // stype이 0일 때의 콜라이더 정보
  {
    rt = {x0: sx, y0: sy - 10, x1: sx + 30, y1: sy + 10};
  } 
  else if(stype === 1)    // stype이 1일 때의 콜라이더 정보
  {
    rt = {x0: sx + 40, y0: sy - 5, x1: sx + 60, y1: sy + 5};
    rt2 = {x0: sx, y0: sy - 15, x1: sx + 10, y1: sy + 15};
    rt3 = {x0: sx + 10, y0: sy - 10, x1: sx + 30, y1: sy + 10};
  } 
  else if(stype === 2)    // stype이 2일 때의 콜라이더 정보
  {
    rt = {x0: sx, y0: sy - 15, x1: sx + 10, y1: sy + 15};
    rt2 = {x0: sx + 10, y0: sy - 15, x1: sx + 20, y1: sy + 15};
  } 
  else if(stype === 3)   // stype이 3일 때의 콜라이더 정보 
  {
    rt = {x0: sx, y0: sy - 20, x1: sx + 10, y1: sy + 20};
    rt2 = {x0: sx + 10, y0: sy - 15, x1: sx + 20, y1: sy + 15};
    rt3 = {x0: sx + 20, y0: sy - 8, x1: sx + 40, y1: sy + 8};
  }

  for(var i = 0; i < arrEnemy.length; i++) {
    enemy_rt = {a0: arrEnemy[i].x, b0: arrEnemy[i].y, a1: arrEnemy[i].x + arrEnemy[i].wh, b1: arrEnemy[i].y + arrEnemy[i].wh};

    if(hitRectToRect(wing1, enemy_rt)) 
    {
      createParticle(arrEnemy[i]);  // 추가
      arrEnemy.splice(i, 1);
    }
    if(hitRectToRect(wing2, enemy_rt)) 
    {
      createParticle(arrEnemy[i]);  // 추가
      arrEnemy.splice(i, 1);
    }

    if(stype === 0) 
    {
      if(hitRectToRect(rt, enemy_rt)) 
      {
      createParticle(arrEnemy[i]);  // 추가
      arrEnemy.splice(i, 1);
      }
    } 
    else if(stype === 1) 
    {
      if(hitRectToRect(rt, enemy_rt)) 
      {
      createParticle(arrEnemy[i]);  // 추가
      arrEnemy.splice(i, 1);
      }
      if(hitRectToRect(rt2, enemy_rt)) 
      {
      createParticle(arrEnemy[i]);  // 추가
      arrEnemy.splice(i, 1);
      }
      if(hitRectToRect(rt3, enemy_rt)) 
      {
      createParticle(arrEnemy[i]);  // 추가
      arrEnemy.splice(i, 1);
      }
    } 
    else if(stype === 2) 
    {
      if(hitRectToRect(rt, enemy_rt)) 
      {
      createParticle(arrEnemy[i]);  // 추가
      arrEnemy.splice(i, 1);
      }
      if(hitRectToRect(rt2, enemy_rt)) 
      {
      createParticle(arrEnemy[i]);  // 추가
      arrEnemy.splice(i, 1);
      }
    } 
    else if(stype === 3)
     {
      if(hitRectToRect(rt, enemy_rt)) 
      {
      createParticle(arrEnemy[i]);  // 추가
      arrEnemy.splice(i, 1);
      }
      if(hitRectToRect(rt2, enemy_rt)) 
      {
      createParticle(arrEnemy[i]);  // 추가
      arrEnemy.splice(i, 1);
      }
      if(hitRectToRect(rt3, enemy_rt)) 
      {
      createParticle(arrEnemy[i]);  // 추가
      arrEnemy.splice(i, 1);
      }
    }
  }
}

function colisionRocket(ri) {
  var rt = {}, rt2 = {};
  rt = {x0: ri.x, y0: ri.y, x1: ri.x + ri.w, y1: ri.y + ri.h};

  for(var i = 0; i < arrEnemy.length; i++) {
    rt2 = {a0: arrEnemy[i].x, b0: arrEnemy[i].y, a1: arrEnemy[i].x + arrEnemy[i].wh, b1: arrEnemy[i].y + arrEnemy[i].wh};

    if(hitRectToRect(rt, rt2)) {
      createParticle(arrEnemy[i]);  // 추가
      arrEnemy.splice(i, 1);
      
    }
  }
}
// *************** 추가코드 작성 끝   ***********************

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
  // c = "#" + parseInt(Math.random() * 0xffffff, 10).toString(16);
  c = Math.round(Math.random() * 360);

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
    // ctx.fillStyle = arrEnemy[i].c;
    ctx.fillStyle = "hsl(" + arrEnemy[i].c + ", 100%," + "50%)";
    ctx.fillRect(arrEnemy[i].x, arrEnemy[i].y, arrEnemy[i].wh, arrEnemy[i].wh);
  }
}

// Rocket
function createRocket() {
  if (fire) {
    if (stype !== 1) {
      arrRocket.push({ x: sx + 52 , y: sy - 2, w: 5, h: 4, v: 8, c: "yellow" });

      myMusic.src = "sound/Gun_1p.mp3";
      myMusic.volume = 0.8;
      myMusic.play();
    }
    if (stype === 1) {
      arrRocket.push({ x: sx + 52, y: sy - 5, w: 5, h: 4, v: 8, c: "yellow" });
      arrRocket.push({ x: sx + 52, y: sy + 1, w: 5, h: 4, v: 8, c: "yellow" });

      myMusic.src = "sound/Gun_2p.mp3";
      myMusic.volume = 0.8;
      myMusic.play();
    }
    if (stype > 1) {
      arrRocket.push({ x: sx + 12, y: sy - 15, w: 5, h: 4, v: 8, c: "yellow" });
      arrRocket.push({ x: sx + 12, y: sy + 11, w: 5, h: 4, v: 8, c: "yellow" });

      myMusic.src = "sound/Gun_3p.mp3";
      myMusic.volume = 0.8;
      myMusic.play();
    }
    if (stype > 2) {
      arrRocket.push({ x: sx + 2, y: sy - 20, w: 5, h: 4, v: 8, c: "yellow" });
      arrRocket.push({ x: sx + 2, y: sy + 16, w: 5, h: 4, v: 8, c: "yellow" });

      myMusic.src = "sound/Gun_4p.mp3";
      myMusic.volume = 0.8;
      myMusic.play();
    }
  }
}

function updateRocket() {
  var i;
  for (i = 0; i < arrRocket.length; i += 1) {
    arrRocket[i].x += arrRocket[i].v;
    colisionRocket(arrRocket[i]);
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
  if (sx - 30 < 0) {
    sx = 30;
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
  if (stype === 1) {
      ctx.fillStyle = "green";
      ctx.fillRect(sx + 40, sy - 5, 20, 10);

      ctx.strokeStyle = "white";
      ctx.strokeRect(sx, sy, 10, 10);
  }
  if (stype > 1) {
      ctx.fillStyle = "green";
      ctx.fillRect(sx + 10, sy - 15, 10, 30);
  }
  if (stype > 2) {
      ctx.fillStyle = "green";
      ctx.fillRect(sx, sy - 20, 10, 40);
  }

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

  // 뒷 날개 콜라이더
  ctx.strokeStyle = "white";
  ctx.strokeRect(sx - 30, sy - 15, 17, 5);
  ctx.strokeStyle = "white";
  ctx.strokeRect(sx - 30, sy + 10, 17, 5);
  
if(stype === 0) {
  ctx.strokeStyle = "white";
  ctx.strokeRect(sx, sy - 10, 30, 20);
}
if (stype === 1) {
  ctx.strokeStyle = "white";
  ctx.strokeRect(sx + 40, sy - 5, 20, 10);
  ctx.strokeRect(sx, sy - 15, 10, 30);
  ctx.strokeRect(sx + 10, sy - 10, 20, 20);
}
if (stype === 2) {
  ctx.strokeStyle = "white";
  ctx.strokeRect(sx, sy - 15, 10, 30);
  ctx.strokeRect(sx + 10, sy - 15, 10, 30);
}
if (stype === 3) {
  ctx.strokeStyle = "white";
  ctx.strokeRect(sx, sy - 20, 10, 40);
  ctx.strokeRect(sx + 10, sy - 15, 10, 30);
  ctx.strokeRect(sx + 20, sy - 8, 20, 16);
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
  colisonShip();

  drawParticle();
  updateParticle();

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
