'use strict';
var vcanvas, ctx;
var x, y;
var vel = 8;
var r_left, r_right, r_up, r_down;
var arrRocket = [];
var fire;
var stype = 0;
var arrEnemy = [];

function clearCanvas() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function hitRectToRect(rt, rt2) { // 충돌의 범위 참과 거짓
    return rt.x0 < rt2.a1 && rt.x1 > rt2.a0 && rt.y0 < rt2.b1 && rt.y1 > rt2.b0;
}

function collisionShip() {  // 비행선과의 충돌 (rt는 비행선의 콜라이더 범위)
    var rt = {}, rt2 = {};
    rt = {x0: x - 10, y0: y - 7, x1: x + 30, y1: y + 7};

    for(var i = 0; i < arrEnemy.length; i++) {
        rt2 = {a0: arrEnemy[i].x, b0: arrEnemy[i].y, a1: arrEnemy[i].x + arrEnemy[i].wh, b1: arrEnemy[i].y + arrEnemy[i].wh};
        
        if(hitRectToRect(rt, rt2)) {
            arrEnemy.splice(i, 1);
        }
    }
}

function collisionRocket(ri) { // 총알과 적의 충돌(rt눈 총알 콜라이더 범위)
    var rt = {}, rt2 = {}; 
    rt = {x0: ri.x, y0: ri.y, x1: ri.x + ri.w, y1: ri.y + ri.h};

    for(var i = 0; i < arrEnemy.length; i++) {
        rt2 = {a0: arrEnemy[i].x, b0: arrEnemy[i].y, a1: arrEnemy[i].x + arrEnemy[i].wh, b1: arrEnemy[i].y + arrEnemy[i].wh};

        if(hitRectToRect(rt, rt2)) {
            arrEnemy[i].hit++;
        }
        if(arrEnemy[i].hit > 30) {
            arrEnemy.splice(i, 1);
        }
    }
}

function createEnemy() {
    var tx, ty, twh, tc, tv;
    tx = vcanvas.width;
    ty = Math.round(Math.random() * (vcanvas.height - 40));
    twh = Math.round(Math.random() * 20) + 20;
    tv = Math.round(Math.random()) + 2;
    tc =    tc = "#" + parseInt(Math.random() * 0xffffff, 10).toString(16); 

    arrEnemy.push({x: tx, y: ty, wh: twh, c:tc, v: tv, hit: 0});
}

function drawEnemy() {
    for(var i = 0; i < arrEnemy.length; i++) {
        ctx.fillStyle = arrEnemy[i].c;
        ctx.fillRect(arrEnemy[i].x, arrEnemy[i].y, arrEnemy[i].wh, arrEnemy[i].wh);
    }
}

function updateEnemy() {
    for(var i = 0; i < arrEnemy.length; i++) {
        arrEnemy[i].x -= arrEnemy[i].v;
    }
}

function deleteEnemy() {
    for(var i = 0; i < arrEnemy.length; i++) {
        if(arrEnemy[i].x + arrEnemy[i].wh < 0) {
            arrEnemy.splice(i, 1);
        }
    }
}

function createRocket() {
    if(fire) {
        if(stype != 1) {
            arrRocket.push({x: x + 60, y: y - 2, w: 5, h: 4, c: "yellow", v: 5});
        }
        if(stype === 1) {
            arrRocket.push({x: x + 60, y: y - 4, w: 5, h: 4, c: "yellow", v: 5});
            arrRocket.push({x: x + 60, y: y + 1, w: 5, h: 4, c: "yellow", v: 5});
        }
        if(stype > 1) {
            arrRocket.push({x: x + 20, y: y - 15, w: 5, h: 4, c: "yellow", v: 5});
            arrRocket.push({x: x + 20, y: y + 11, w: 5, h: 4, c: "yellow", v: 5});
        }
        if(stype === 3) {
            arrRocket.push({x: x + 10, y: y - 20, w: 5, h: 4, c: "yellow", v: 5});
            arrRocket.push({x: x + 10, y: y + 16, w: 5, h: 4, c: "yellow", v: 5});
        }
    }
}

function drawRocket() {
    for(var i = 0; i < arrRocket.length; i++) {
        ctx.fillStyle = arrRocket[i].c;
        ctx.fillRect(arrRocket[i].x, arrRocket[i].y, arrRocket[i].w, arrRocket[i].h);
    }
}

function updateRocket() {
    for(var i = 0; i < arrRocket.length; i++) {
        arrRocket[i].x += arrRocket[i].v;
        collisionRocket(arrRocket[i]);
    }
}

function deleteRocket() {
    for(var i = 0; i < arrRocket.length; i++) {
        if(arrRocket[i].x + arrRocket[i].w > vcanvas.width) {
            arrRocket.splice(i, 1);
        }
    }
}

function updateShip() {
    if(r_left) {x -= vel;}
    if(r_right) {x += vel;}
    if(r_up) {y -= vel;}
    if(r_down) {y += vel;}

    if(x - 15 < 0) {x = 15;}
    if(x + 60 > vcanvas.width) {x = vcanvas.width - 60;}
    if(y - 15 < 0) {y = 15;}
    if(y + 15 > vcanvas.height) {y = vcanvas.height - 15;}

    if(stype === 3) {
        if(y - 20 < 0) {y = 20;}
        if(y + 20 > vcanvas.height) {y = vcanvas.height - 20;}
    }
}

function drawShip() {
    ctx.beginPath();
    ctx.moveTo(x - 15, y);
    ctx.lineTo(x, y - 15);
    ctx.lineTo(x + 60, y);
    ctx.lineTo(x, y + 15);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();

    if(stype === 1) {
        ctx.beginPath();
        ctx.fillRect(x + 50, y - 5, 10, 10);
    } 
    if(stype > 1) {
        ctx.beginPath();
        ctx.fillRect(x + 10, y - 15, 10, 30);
    }
    if(stype === 3) {
        ctx.beginPath();
        ctx.fillRect(x, y - 20, 10, 40);
    }
}

function stateInfo() {
    ctx.fillStyle = "white";
    ctx.font = "15pt Georgia";
    ctx.fillText("Stype: " + stype + "   Enemy: " + arrEnemy.length + "   Rocket: " + arrRocket.length, 10, 20);
  }
  

function gameLoop() {
    clearCanvas();
    drawShip();
    updateShip();
    collisionShip();

    drawRocket();
    updateRocket();
    deleteRocket();

    drawEnemy();
    updateEnemy();
    deleteEnemy();
    
    stateInfo();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    x = 200;
    y = 200;
    
    setInterval(createEnemy, 300);
    setInterval(createRocket, 100);
    setInterval(gameLoop, 20);
}

function set_key(event) {
    if(event.keyCode === 37) {r_left = 1;}
    if(event.keyCode === 38) {r_up = 1;}
    if(event.keyCode === 39) {r_right = 1;}
    if(event.keyCode === 40) {r_down = 1;}

    if(event.keyCode === 48) {stype = 0;}
    if(event.keyCode === 49) {stype = 1;}
    if(event.keyCode === 50) {stype = 2;}
    if(event.keyCode === 51) {stype = 3;}

    if(event.keyCode === 32) {fire = 1;}
}

function stop_key(event) {
    if(event.keyCode === 37) {r_left = 0;}
    if(event.keyCode === 38) {r_up = 0;}
    if(event.keyCode === 39) {r_right = 0;}
    if(event.keyCode === 40) {r_down = 0;}

    if(event.keyCode === 32) {fire = 0;}
}

document.onkeydown = set_key;
document.onkeyup = stop_key;