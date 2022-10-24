'use strict';
var vcanvas, ctx;
var sun65_x, sun65_y;
var sun65_left, sun65_right, sun65_up, sun65_down;
var sun65_vel = 8;
var sun65_stype = 0;
var sun65_fire;
var sun65_arrRocket = [];
var sun65_arrEnemy = [];

function sun65_clearCanvas() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function sun65_createEnemy() {
    var sun65_tx, sun65_ty, sun65_twh, sun65_tc, sun65_tv;
    sun65_tx = vcanvas.width;
    sun65_ty = Math.round(Math.random() * (vcanvas.height - 40));
    sun65_twh = Math.round(Math.random() * 20) + 20;
    sun65_tv = Math.round(Math.random()) + 2;
    sun65_tc = "#" + (parseInt(Math.random() * 0xffffff, 10)).toString(16);

    sun65_arrEnemy.push({x: sun65_tx, y: sun65_ty, wh: sun65_twh, c: sun65_tc, v: sun65_tv});
}

function sun65_drawEnemy() {
    for(var i = 0; i < sun65_arrEnemy.length; i++) {
        ctx.fillStyle = sun65_arrEnemy[i].c;
        ctx.fillRect(sun65_arrEnemy[i].x, sun65_arrEnemy[i].y, sun65_arrEnemy[i].wh, sun65_arrEnemy[i].wh);
    }
}

function sun65_updateEnemy() {
    for(var i = 0; i < sun65_arrEnemy.length; i++) {
        sun65_arrEnemy[i].x -= sun65_arrEnemy[i].v;
    }
}

function sun65_deleteEnemy() {
    for(var i = 0; i < sun65_arrEnemy.length; i++) {
        if(sun65_arrEnemy[i].x + sun65_arrEnemy[i].wh < 0) {
            sun65_arrEnemy.splice(i, 1);
        }
    }
}

function sun65_createRocket() {
    if(sun65_fire) {
        if(sun65_stype != 1) {
            sun65_arrRocket.push({x: sun65_x + 60, y: sun65_y - 2, w: 5, h: 4, c: "yellow", v: 5});
        }
        if(sun65_stype === 1) {
            sun65_arrRocket.push({x: sun65_x + 60, y: sun65_y - 5, w: 5, h: 4, c: "yellow", v: 5});
            sun65_arrRocket.push({x: sun65_x + 60, y: sun65_y + 1, w: 5, h: 4, c: "yellow", v: 5});
        }
        if(sun65_stype > 1) {
            sun65_arrRocket.push({x: sun65_x + 20, y: sun65_y - 15, w: 5, h: 4, c: "yellow", v: 5});
            sun65_arrRocket.push({x: sun65_x + 20, y: sun65_y + 11, w: 5, h: 4, c: "yellow", v: 5});
        }
        if(sun65_stype > 2) {
            sun65_arrRocket.push({x: sun65_x + 10, y: sun65_y - 20, w: 5, h: 4, c: "yellow", v: 5});
            sun65_arrRocket.push({x: sun65_x + 10, y: sun65_y + 16, w: 5, h: 4, c: "yellow", v: 5});
        }
    }
}

function sun65_drawRocket() {
    for(var i = 0; i < sun65_arrRocket.length; i++) {
        ctx.fillStyle = sun65_arrRocket[i].c;
        ctx.fillRect(sun65_arrRocket[i].x, sun65_arrRocket[i].y, sun65_arrRocket[i].w, sun65_arrRocket[i].h);
    }
}

function sun65_updateRocket() {
    for(var i = 0; i < sun65_arrRocket.length; i++) {
        sun65_arrRocket[i].x += sun65_arrRocket[i].v;
    }
}

function sun65_deleteRocket() {
    for(var i = 0; i < sun65_arrRocket.length; i++) {
        if(sun65_arrRocket[i].x > vcanvas.width) {
            sun65_arrRocket.splice(i, 1);
        }
    }
}

function sun65_updateShip() {
    if(sun65_left) {sun65_x -= sun65_vel;}
    if(sun65_right) {sun65_x += sun65_vel;}
    if(sun65_up) {sun65_y -= sun65_vel;}
    if(sun65_down) {sun65_y += sun65_vel;}

    if(sun65_x - 15 < 0) {sun65_x = 15;}
    if(sun65_x + 60 > vcanvas.width) {sun65_x = vcanvas.width - 60;}
    if(sun65_y - 15 < 0) {sun65_y = 15;}
    if(sun65_y + 15 > vcanvas.height) {sun65_y = vcanvas.height - 15;}

    if(sun65_stype === 3) {
        if(sun65_y - 20 < 0) {sun65_y = 20};
        if(sun65_y + 20 > vcanvas.height) {sun65_y = vcanvas.height - 20;}
    }
}

function sun65_drawShip() {
    if (sun65_stype === 1) {
        ctx.fillStyle = "green";
        ctx.fillRect(sun65_x + 40, sun65_y - 5, 20, 10);
    }
    if (sun65_stype > 1) {
        ctx.fillStyle = "green";
        ctx.fillRect(sun65_x + 10, sun65_y - 15, 10, 30);
    }
    if (sun65_stype > 2) {
        ctx.fillStyle = "green";
        ctx.fillRect(sun65_x, sun65_y - 20, 10, 40);
    }

    ctx.beginPath();
    ctx.moveTo(sun65_x - 15, sun65_y);
    ctx.lineTo(sun65_x, sun65_y - 15);
    ctx.lineTo(sun65_x + 60, sun65_y);
    ctx.lineTo(sun65_x, sun65_y + 15);
    ctx.closePath();
    ctx.fillStyle="red";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(sun65_x + 60, sun65_y);
    ctx.lineTo(sun65_x + 40, sun65_y - 4);
    ctx.lineTo(sun65_x + 40, sun65_y + 4);
    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(sun65_x - 30, sun65_y - 8);
    ctx.lineTo(sun65_x - 10, sun65_y - 8);
    ctx.lineTo(sun65_x - 10, sun65_y - 13);
    ctx.lineTo(sun65_x - 15, sun65_y - 13);
    ctx.closePath();
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(sun65_x - 30, sun65_y + 8);
    ctx.lineTo(sun65_x - 10, sun65_y + 8);
    ctx.lineTo(sun65_x - 10, sun65_y + 13);
    ctx.lineTo(sun65_x - 15, sun65_y + 13);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(sun65_x + 10, sun65_y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "skyblue";
    ctx.fill();
}

function sun65_gameLoop() {
    sun65_clearCanvas();
    sun65_updateShip();
    sun65_drawShip();

    sun65_drawRocket();
    sun65_updateRocket();
    sun65_deleteRocket();

    sun65_drawEnemy();
    sun65_updateEnemy();
    sun65_deleteEnemy();

    sun65_gameInfo();
}

function sun65_gameInfo() {
    ctx.fillStyle = "white";
    ctx.font = "20px Georgio";
    ctx.fillText("Type: " + sun65_stype + "  Rocket: " + sun65_arrRocket.length + "  Enemy: " + sun65_arrEnemy.length, 10, 20);
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    sun65_x = 200;
    sun65_y = 200;

    setInterval(sun65_createEnemy, 100);
    setInterval(sun65_createRocket, 100);
    setInterval(sun65_gameLoop, 20);
}

function sun65_set_key(event) {
    if(event.keyCode === 37) {sun65_left = 1;}
    if(event.keyCode === 38) {sun65_up = 1;}
    if(event.keyCode === 39) {sun65_right = 1;}
    if(event.keyCode === 40) {sun65_down = 1;}

    if(event.keyCode === 48) {sun65_stype = 0;}
    if(event.keyCode === 49) {sun65_stype = 1;}
    if(event.keyCode === 50) {sun65_stype = 2;}
    if(event.keyCode === 51) {sun65_stype = 3;}

    if(event.keyCode === 32) {sun65_fire = 1;}
}

function sun65_stop_key(event) {
    if(event.keyCode === 37) {sun65_left = 0;}
    if(event.keyCode === 38) {sun65_up = 0;}
    if(event.keyCode === 39) {sun65_right = 0;}
    if(event.keyCode === 40) {sun65_down = 0;}

    if(event.keyCode === 32) {sun65_fire = 0;}
}

document.onkeydown = sun65_set_key;
document.onkeyup = sun65_stop_key;
