'use strict';
var vcanvas, ctx;
var x, y;
var game_left, game_right, game_down, game_up;
var game_vel = 8;
var game_stype;
var game_fire;
var game_arrRocket = [];
var game_enemy = {};

function game_createEnemy() {
    var game_tx, game_ty, game_twh, game_tc, game_tv;
    game_tx = vcanvas.width;
    game_ty = Math.round(Math.random() * (vcanvas.height - 40));
    game_twh = Math.round(Math.random() * 20) + 20;
    game_tv = Math.round(Math.random()) + 2;
    game_tc = "#" + parseInt(Math.random() * 0xffffff, 10).toString(16);
    game_enemy = {x: game_tx, y: game_ty, wh: game_twh, c: game_tc, v: game_tv};
}

function game_drawEnemy() {
    ctx.fillStyle = game_enemy.c;
    ctx.fillRect(game_enemy.x, game_enemy.y, game_enemy.wh, game_enemy.wh);
}

function game_updateEnemy() {
    game_enemy.x -= game_enemy.v;
}

function game_createRocket() {
    if(game_fire) {
        if (game_stype != 1) {
            game_arrRocket.push({x: x + 60, y: y - 2, rw: 5, rh: 4, c: "#ffff00", v: 5});
        }
        if(game_stype === 1) {
            game_arrRocket.push({x: x + 60, y: y - 5, rw: 5, rh: 4, c: "#ffff00", v: 5});
            game_arrRocket.push({x: x + 60, y: y + 1, rw: 5, rh: 4, c: "#ffff00", v: 5});
        }
        if(game_stype > 1) {
            game_arrRocket.push({x: x + 20, y: y - 15, rw: 5, rh: 4, c: "#ffff00", v: 5});
            game_arrRocket.push({x: x + 20, y: y + 11, rw: 5, rh: 4, c: "#ffff00", v: 5});
        }
        if(game_stype > 2) {
            game_arrRocket.push({x: x + 10, y: y - 19, rw: 5, rh: 4, c: "#ffff00", v: 5});
            game_arrRocket.push({x: x + 10, y: y + 15, rw: 5, rh: 4, c: "#ffff00", v: 5});
        }
    }
}

function game_updateRocket() {
    var i;
    for(i = 0; i < game_arrRocket.length; i += 1) {
        game_arrRocket[i].x += game_arrRocket[i].v;
    }
}

function game_deleteRocket() {
    var i;
    for(i = 0; i < game_arrRocket.length; i += 1) {
        if(game_arrRocket[i].x > vcanvas.width) {
            game_arrRocket.splice(i, 1); // i가 가리키는 값부터 한개 삭제
        }
    }
}

function game_drawRocket() {
    var i;
    for(i = 0; i < game_arrRocket.length; i += 1) {
        ctx.fillStyle = game_arrRocket[i].c;
        ctx.fillRect(game_arrRocket[i].x, game_arrRocket[i].y, game_arrRocket[i].rw, game_arrRocket[i].rh);
    }
}

function game_clearCanvas() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function game_updateShip() {
    if(game_left) {x -= game_vel;}
    if(game_right) {x += game_vel;}
    if(game_up) {y -= game_vel;}
    if(game_down) {y += game_vel;}

    if(x - 30 < 0) {x = 30;}
    if(x + 60 > vcanvas.width) {x = vcanvas.width - 60;}
    if(y - 15 < 0) {y = 15;}
    if(y + 15 > vcanvas.height) {y = vcanvas.height - 15;}

    if(game_stype === 3 && (y - 20 < 0)) {y = 20;}
    if(game_stype === 3 && (y + 20 > vcanvas.height)) {y = vcanvas.height - 20;}
}

function game_drawShip(sx, sy) {
    if (game_stype === 1) {
        ctx.fillStyle = "green";
        ctx.fillRect(sx + 40, sy - 5, 20, 10);
    }
    if (game_stype > 1) {
        ctx.fillStyle = "green";
        ctx.fillRect(sx + 10, sy - 15, 10, 30);
    }
    if (game_stype === 3) {
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
}

function game_gameLoop() {
    game_clearCanvas();
    game_updateShip();
    game_drawShip(x, y);

    game_drawRocket();
    game_updateRocket();
    game_deleteRocket();

    game_drawEnemy();
    game_updateEnemy();

    ctx.font = "20px Georgio";
    ctx.fillStyle = "white";
    ctx.fillText("Rocket: " + game_arrRocket.length, 0 ,20);
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    x = 200;
    y = 200;

    setInterval(game_createEnemy, 3000);
    setInterval(game_createRocket, 120);
    setInterval(game_gameLoop, 33);
}

function game_set_key(event) {
    if(event.keyCode === 37) {game_left = 1;}
    if(event.keyCode === 38) {game_up = 1;}
    if(event.keyCode === 39) {game_right = 1;}
    if(event.keyCode === 40) {game_down = 1;}

    if (event.keyCode === 48) { game_stype = 0; }
    if (event.keyCode === 49) { game_stype = 1; }
    if (event.keyCode === 50) { game_stype = 2; }
    if (event.keyCode === 51) { game_stype = 3; }

    if(event.keyCode === 32) {game_fire = 1;}
}

function game_stop_key(event) {
    if(event.keyCode === 37) {game_left = 0;}
    if(event.keyCode === 38) {game_up = 0;}
    if(event.keyCode === 39) {game_right = 0;}
    if(event.keyCode === 40) {game_down = 0;}

    if(event.keyCode === 32) {game_fire = 0;}
}

document.onkeydown = game_set_key;
document.onkeyup = game_stop_key;
