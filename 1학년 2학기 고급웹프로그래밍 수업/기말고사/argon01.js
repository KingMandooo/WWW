"use strict";
var vcanvas, ctx;
var sx, sy;
var r_left, r_up, r_right, r_down;
var vel = 8;
var stype = 0;
var fire = 0;
var arrRocket = [];
var arrEnemy = [];

// ---- 추가코드 시작 -----
var tu_bb;

//Particle
var tu_particle = [];

function tu_b2v(a, b) {
    return Math.random() * (b - a) + a;
}

function tu_createParticle(ei) {
    var tu_nop, tu_x, tu_y, tu_wh, tu_hue, tu_d1, tu_d2, tu_velx, tu_vely;

    tu_nop = 150;

    for(var i = 0; i < tu_nop; i++) {
        tu_x = tu_b2v(ei.x , ei.x + ei.w);
        tu_y = tu_b2v(ei.y , ei.y + ei.h);
        tu_wh = tu_b2v(1, 10);

        tu_hue = ei.c + Math.round(Math.random() * 20);

        tu_d1 = tu_b2v(30, 120);
        tu_d2 = tu_b2v(30, 120);

        tu_velx = (7 - tu_wh) / 3 * tu_b2v(-1, 1);
        tu_vely = (7 - tu_wh) / 3 * tu_b2v(-1, 1);

        tu_particle.push({px: tu_x, py: tu_y, pwh: tu_wh, pc: tu_hue, d1: tu_d1, d2: tu_d2, pvx: tu_velx, pvy: tu_vely});
    }
}

function tu_drawParticle() {
    var tu_hue, tu_lightness;

    for(var i = 0; i < tu_particle.length; i++) {
        tu_hue = tu_particle[i].pc;
        tu_lightness = 80 * tu_particle[i].d1 / tu_particle[i].d2;

        ctx.fillStyle = "hsl(" + tu_hue + ", 100%, " + tu_lightness + "%)";
        ctx.fillRect(tu_particle[i].px, tu_particle[i].py, tu_particle[i].pwh, tu_particle[i].pwh);
        ctx.strokeStyle = "white";
        ctx.strokeRect(tu_particle[i].px, tu_particle[i].py, tu_particle[i].pwh, tu_particle[i].pwh);
    }
}

function tu_updateParticle() {
    var tu_k = 1;

    for(var i = 0; i < tu_particle.length; i++) {
        tu_particle[i].px += tu_k * tu_particle[i].pvx;
        tu_particle[i].py += tu_k * tu_particle[i].pvy;

        tu_particle[i].d1 -= tu_k * 2;

        if(tu_particle[i].d1 < 0) {
            tu_particle.splice(i, 1);
        }
    }
}

//Colision
function tu_distance(x0, y0, x1, y1) {
    var tu_dx, tu_dy;
    tu_dx = x0 - x1;
    tu_dy = y0 - y1;

    return Math.sqrt(tu_dx * tu_dx + tu_dy * tu_dy);
}

function tu_hitCircleToRect(ct, rt, rt2) {
    var tu_x0, tu_y0, tu_x1, tu_y1, tu_a0, tu_b0, tu_a1, tu_b1, tu_result = false;
    tu_x0 = rt.x;
    tu_y0 = rt.y;
    tu_x1 = rt.x + rt.w;
    tu_y1 = rt.y + rt.h;
    tu_a0 = rt2.x;
    tu_b0 = rt2.y;
    tu_a1 = rt2.x + rt2.w;
    tu_b1 = rt2.y + rt2.h;

    if(ct.x > tu_x0 && ct.x < tu_x1 && ct.y > tu_y0 && ct.y < tu_y1) {
        tu_result = true;
        
        if(ct.x < tu_a0) {
            if(ct.y < tu_b0) {
                if(tu_distance(ct.x, ct.y, tu_a0, tu_b0) > ct.r) {
                    tu_result = false;
                }
            } else if(ct.y > tu_b1) {
                if(tu_distance(ct.x, ct.y, tu_a0, tu_b1) > ct.r) {
                    tu_result = false;
                }
            }
        } else if(ct.x > tu_a1) {
            if(ct.y < tu_b0) {
                if(tu_distance(ct.x, ct.y, tu_a1, tu_b0) > ct.r) {
                    tu_result = false;
                }
            } else if(ct.y > tu_b1) {
                if(tu_distance(ct.x, ct.y, tu_a1, tu_b1) > ct.r) {
                    tu_result = false;
                }
            }
        }
    }

    return tu_result;
}

function tu_hitRectToRect(rt, rt2) {
    var tu_x0, tu_y0, tu_x1, tu_y1, tu_a0, tu_b0, tu_a1, tu_b1;
    tu_x0 = rt.x;
    tu_y0 = rt.y;
    tu_x1 = rt.x + rt.w;
    tu_y1 = rt.y + rt.h;
    tu_a0 = rt2.x;
    tu_b0 = rt2.y;
    tu_a1 = rt2.x + rt2.w;
    tu_b1 = rt2.y + rt2.h;

    return tu_a0 < tu_x1 && tu_a1 > tu_x0 && tu_b0 < tu_y1 && tu_b1 > tu_y0;
}

function tu_colisionShip() {
    var tu_rt = {}, tu_rt2 = {}, tu_rt3 = {}, tu_rt4 = {}, tu_rt5 = {}, tu_flag = false;

    tu_rt2 = {x: sx - 20, y: sy - 10, w: 20, h: 20};
    tu_rt3 = {x: sx - 60, y: sy - 5, w: 20, h: 10};
    tu_rt4 = {x: sx - 20, y: sy - 15, w: 10, h: 30};
    tu_rt5 = {x: sx - 10, y: sy - 20, w: 10, h: 40};

    for(var i = 0; i < arrEnemy.length; i++) {
        tu_flag = false;
        tu_rt = {x: arrEnemy[i].x, y: arrEnemy[i].y, w: arrEnemy[i].w, h: arrEnemy[i].h};

        if(tu_hitRectToRect(tu_rt, tu_rt2)) {
            tu_flag = true;
        }
        if(tu_hitRectToRect(tu_rt, tu_rt3) && stype === 1) {
            tu_flag = true;
        }
        if(tu_hitRectToRect(tu_rt, tu_rt4) && stype > 1) {
            tu_flag = true;
        }
        if(tu_hitRectToRect(tu_rt, tu_rt5) && stype > 2) {
            tu_flag = true;
        }

        if(tu_flag) {
            tu_createParticle(arrEnemy[i]);
            arrEnemy.splice(i, 1);
        }
    }
}

function tu_colisionRocket(ri) {
    var tu_rt = {}, tu_rt2 = {}, tu_ct ={};

    tu_ct = {x: ri.x, y: ri.y, r: ri.r};

    for(var i = 0; i < arrEnemy.length; i++) {
        tu_rt = {x: arrEnemy[i].x - 2, y: arrEnemy[i].y - 2, w: arrEnemy[i].w + 4, h: arrEnemy[i].h + 4};
        tu_rt2 = {x: arrEnemy[i].x, y: arrEnemy[i].y, w: arrEnemy[i].w, h: arrEnemy[i].h};

        if(tu_hitCircleToRect(tu_ct, tu_rt, tu_rt2)) {
            arrEnemy[i].hit++;
        }
        if(arrEnemy[i].hit > 40) {
            tu_createParticle(arrEnemy[i]);
            arrEnemy.splice(i, 1);
        }
    }
}

//Bonding Box
function tu_drawBox() {
      if(tu_bb) {
        ctx.strokeStyle = "white";
        ctx.strokeRect(sx - 20,  sy - 10, 20, 20);
    
        if(stype === 1) {
            ctx.strokeStyle = "white";
            ctx.strokeRect(sx - 60,  sy - 5, 20, 10);
        }
        if(stype > 1) {
            ctx.strokeStyle = "white";
            ctx.strokeRect(sx - 20,  sy - 15, 10, 30);
        }
        if(stype > 2) {
            ctx.strokeStyle = "white";
            ctx.strokeRect(sx - 10,  sy - 20, 10, 40);
        }
    }
}
// ---- 추가코드 끝 -----

function clearCanvas() {
  ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

// Enemy
function createEnemy() {
    if(arrEnemy.length < 15) {
        var tx, ty, twh, tc, tv;

        twh = Math.round(Math.random() * 30) + 10;
        tx = -twh;
        ty = Math.round(Math.random() * (vcanvas.height - 80)) + 40;  // 40 ~ vcanvas.height - 40
        tc = Math.round(Math.random() * 360);
        tv = Math.floor(Math.random() * 2) + 1;
      
        arrEnemy.push({ x: tx, y: ty, w: twh, h: twh, c: tc, v: tv, hit: 0});
    }
}

function updateEnemy() {
  var i;
  for (i = 0; i < arrEnemy.length; i += 1) {
    arrEnemy[i].x += arrEnemy[i].v;
  }
}

function deleteEnemy() {
  var i;
  for (i = 0; i < arrEnemy.length; i += 1) {
    if (arrEnemy[i].x > vcanvas.width) {
      arrEnemy.splice(i, 1);
    }
  }
}

function drawEnemy() {
  var i, hue;
  for (i = 0; i < arrEnemy.length; i += 1) {
    hue = arrEnemy[i].c;
    ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
    ctx.fillRect(arrEnemy[i].x, arrEnemy[i].y, arrEnemy[i].w, arrEnemy[i].h);
  }
}

// Rocket
function createRocket() {
  if (fire) {
    if (stype != 1) {
      arrRocket.push({ x: sx - 57, y: sy, r:2, c: "yellow", v: 5 });
    }
    if (stype === 1) {
        arrRocket.push({ x: sx - 57, y: sy - 3, r:2, c: "yellow", v: 5 });
        arrRocket.push({ x: sx - 57, y: sy + 3, r:2, c: "yellow", v: 5 });
    }
    if (stype > 1) {
        arrRocket.push({ x: sx - 17, y: sy - 13, r:2, c: "yellow", v: 5 });
        arrRocket.push({ x: sx - 17, y: sy + 13, r:2, c: "yellow", v: 5 });
    }
    if (stype > 2) {
        arrRocket.push({ x: sx - 7, y: sy - 18, r:2, c: "yellow", v: 5 });
        arrRocket.push({ x: sx - 7, y: sy + 18, r:2, c: "yellow", v: 5 });
    }
  }
}

function updateRocket() {
  var i;
  for (i = 0; i < arrRocket.length; i += 1) {
    arrRocket[i].x -= arrRocket[i].v;
    tu_colisionRocket(arrRocket[i]);
  }
}

function deleteRocket() {
  var i;
  for (i = 0; i < arrRocket.length; i += 1) {
    if (arrRocket[i].x + 5 < 0) {
      arrRocket.splice(i, 1);
    }
  }
}

function drawRocket() {
  var i;
  for (i = 0; i < arrRocket.length; i += 1) {
    ctx.beginPath();
    ctx.fillStyle = arrRocket[i].c;
    ctx.arc(arrRocket[i].x, arrRocket[i].y, arrRocket[i].r, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ship
function updateShip() {
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
  if(sx - 60 < 0) {sx = 60;}
  if(sx + 30 > vcanvas.width) {sx = vcanvas.width - 30;}
  if(sy - 15 < 0) {sy = 15;}
  if(sy + 15 > vcanvas.height) {sy = vcanvas.height - 15;}

  if(stype === 3) {
    if(sy - 20 < 0) {sy = 20;}
    if(sy + 20 > vcanvas.height) {sy = vcanvas.height - 20};
  }
}

function drawShip() {
    if (stype === 1) {
        ctx.fillStyle = "green";
        ctx.fillRect(sx - 60, sy - 5, 20, 10);
    }
    if (stype > 1) {sy
        ctx.fillStyle = "green";
        ctx.fillRect(sx - 20, sy - 15, 10, 30);
    }
    if (stype > 2) {
        ctx.fillStyle = "green";
        ctx.fillRect(sx - 10, sy - 20, 10, 40);
    }

    ctx.beginPath();
    ctx.moveTo(sx + 15, sy);
    ctx.lineTo(sx, sy + 15);
    ctx.lineTo(sx - 60, sy);
    ctx.lineTo(sx, sy - 15);
    ctx.closePath();
    ctx.fillStyle="red";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(sx - 60, sy);
    ctx.lineTo(sx - 40, sy + 4);
    ctx.lineTo(sx - 40, sy - 4);
    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(sx + 30, sy - 8);
    ctx.lineTo(sx + 10, sy - 8);
    ctx.lineTo(sx + 10, sy - 13);
    ctx.lineTo(sx + 15, sy - 13);
    ctx.closePath();
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(sx + 30, sy + 8);
    ctx.lineTo(sx + 10, sy + 8);
    ctx.lineTo(sx + 10, sy + 13);
    ctx.lineTo(sx + 15, sy + 13);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(sx - 10, sy, 5, 0, Math.PI * 2);
    ctx.fillStyle = "skyblue";
    ctx.fill();
}

function stateInfo() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
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

  updateEnemy();
  deleteEnemy();
  drawEnemy();

  updateShip();
  drawShip();
  tu_drawBox();
  tu_colisionShip();

  updateRocket();
  deleteRocket();
  drawRocket();

  tu_drawParticle();
  tu_updateParticle();

  stateInfo();
}

function init() {
  vcanvas = document.getElementById("myCanvas");
  ctx = vcanvas.getContext("2d");

  sx = 700;
  sy = 200;

  setInterval(createEnemy, 700);
  setInterval(createRocket, 100);
  setInterval(gameLoop, 20);
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

  //-------------
  if (event.keyCode === 90) {tu_bb = 1;}
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
  
  //-------------
  if (event.keyCode === 90) {tu_bb = 0;}
}
document.onkeydown = set_key;
document.onkeyup = stop_key;
