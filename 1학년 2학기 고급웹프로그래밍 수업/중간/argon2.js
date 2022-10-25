'use strict';
var vcanvas, ctx;
var x, y;
var stu_left, stu_right, stu_up, stu_down;
var stu_vel = 8;
var stu_stype = 0;
var stu_fire;
var stu_arrRocket = [];
var stu_arrEnemy = [];

var stu_lx, stu_ly;
var stu_l_left, stu_l_right, stu_l_up, stu_l_down;
var stu_lvel = 8;
var stu_lstype = 0;
var stu_lfire;
var stu_arrLRocket = [];

function stu_clearCanvas() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

//------------------------왼쪽 비행선----------------------------------------

function stu_createLRocket() {
    if(stu_lfire) {
        if(stu_lstype != 1) {
            stu_arrLRocket.push({x: stu_lx + 60, y: stu_ly - 2, w: 5, h: 4, c: "yellow", v: 5});
        }
        if(stu_lstype === 1) {
            stu_arrLRocket.push({x: stu_lx + 50, y: stu_ly - 5, w: 5, h: 4, c: "yellow", v: 5});
            stu_arrLRocket.push({x: stu_lx + 50, y: stu_ly + 1, w: 5, h: 4, c: "yellow", v: 5});
        }
        if(stu_lstype > 1) {
            stu_arrLRocket.push({x: stu_lx + 20, y: stu_ly - 15, w: 5, h: 4, c: "yellow", v: 5});
            stu_arrLRocket.push({x: stu_lx + 20, y: stu_ly + 11, w: 5, h: 4, c: "yellow", v: 5});
        }
        if(stu_lstype > 2) {
            stu_arrLRocket.push({x: stu_lx + 10, y: stu_ly - 20, w: 5, h: 4, c: "yellow", v: 5});
            stu_arrLRocket.push({x: stu_lx + 10, y: stu_ly + 16, w: 5, h: 4, c: "yellow", v: 5});
        }
    }
}

function stu_drawLRocket() {
    for(var i = 0; i < stu_arrLRocket.length; i++) {
        ctx.fillStyle = stu_arrLRocket[i].c;
        ctx.fillRect(stu_arrLRocket[i].x, stu_arrLRocket[i].y, stu_arrLRocket[i].w, stu_arrLRocket[i].h);
    }
}

function stu_updateLRocket() {
    for(var i = 0; i < stu_arrLRocket.length; i++) {
        stu_arrLRocket[i].x += stu_arrLRocket[i].v;
    }
}

function stu_deleteLRocket() {
    for(var i = 0; i < stu_arrLRocket.length; i++) {
        if(stu_arrLRocket[i].x > vcanvas.width) {
            stu_arrLRocket.splice(i, 1);
        }
    }
}

function stu_leftShip() {
    if(stu_lstype === 1) {
        ctx.fillStyle = "red";
        ctx.fillRect(stu_lx + 40, stu_ly - 5, 10, 10);
    }
    if(stu_lstype > 1) {
        ctx.fillStyle = "red";
        ctx.fillRect(stu_lx + 10, stu_ly - 15, 10, 30);
    }
    if(stu_lstype > 2) {
        ctx.fillStyle = "red";
        ctx.fillRect(stu_lx, stu_ly - 20, 10, 40);
    }

    ctx.beginPath();
    ctx.moveTo(stu_lx - 15, stu_ly);
    ctx.lineTo(stu_lx, stu_ly - 15);
    ctx.lineTo(stu_lx + 60, stu_ly);
    ctx.lineTo(stu_lx, stu_ly + 15);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
}

//-----------------------------------------------------------------------------

function stu_createEnemy() {
    if(stu_arrEnemy.length < 10) {
        var stu_tx, stu_ty, stu_tr, stu_tc, stu_tv;
        stu_tx = 15;   // -15 ~ -5
        stu_ty = Math.round(Math.random() * (vcanvas.height - 30)) + 15; // 15 ~ (vcanvas.height - 15)
        stu_tr = Math.round(Math.random() * 10) + 5; // (0 ~ 10)  + 5
        stu_tv = Math.round(Math.random()) + 1; // 1 ~ 2
        stu_tc = "#" + parseInt(Math.random() * 0xffffff, 10).toString(16);
    
        stu_arrEnemy.push({x: stu_tx, y: stu_ty, r: stu_tr, c: stu_tc, v: stu_tv});
    }
}

function stu_drawEnemy() {
    for(var i = 0; i < stu_arrEnemy.length; i++) {
        if(stu_arrEnemy[i].x < 300) {
            ctx.beginPath();
            ctx.fillStyle = stu_arrEnemy[i].c;
            ctx.arc(stu_arrEnemy[i].x, stu_arrEnemy[i].y, stu_arrEnemy[i].r, 0, Math.PI * 2);
            ctx.fill();
        }
        if(stu_arrEnemy[i].x >= 300 && stu_arrEnemy[i].x < 600 ) {
            ctx.strokeStyle = "white";
            ctx.strokeRect(stu_arrEnemy[i].x - stu_arrEnemy[i].r, stu_arrEnemy[i].y - stu_arrEnemy[i].r, stu_arrEnemy[i].r * 2,stu_arrEnemy[i].r * 2);
            ctx.beginPath();
            ctx.fillStyle = stu_arrEnemy[i].c;
            ctx.arc(stu_arrEnemy[i].x, stu_arrEnemy[i].y, stu_arrEnemy[i].r, 0, Math.PI * 2);
            ctx.fill();
        }
        if(stu_arrEnemy[i].x >= 600) {
            ctx.strokeStyle = stu_arrEnemy[i].c;
            ctx.fillStyle = stu_arrEnemy[i].c;
            ctx.fillRect(stu_arrEnemy[i].x - stu_arrEnemy[i].r, stu_arrEnemy[i].y - stu_arrEnemy[i].r, stu_arrEnemy[i].r * 2,stu_arrEnemy[i].r * 2);
        }
    }
}

function stu_updateEnemy() {
    for(var i = 0; i < stu_arrEnemy.length; i++) {
        stu_arrEnemy[i].x += stu_arrEnemy[i].v;
    }
}

function stu_deleteEnemy() {
    for(var i = 0; i < stu_arrEnemy.length; i++) {
        if(stu_arrEnemy[i].x - stu_arrEnemy[i].r > vcanvas.width) {
            stu_arrEnemy.splice(i, 1);
        }
    }
}

function stu_createRocket() {
    if(stu_fire) {
        if(stu_stype != 1) {
            stu_arrRocket.push({x: x - 60, y: y - 2, w: 5, h: 4, c: "yellow", v: 5});
        }
        if(stu_stype === 1) {
            stu_arrRocket.push({x: x - 65, y: y - 5, w: 5, h: 4, c: "yellow", v: 5});
            stu_arrRocket.push({x: x - 65, y: y + 1, w: 5, h: 4, c: "yellow", v: 5});
        }
        if(stu_stype > 1) {
            stu_arrRocket.push({x: x - 25, y: y - 15, w: 5, h: 4, c: "yellow", v: 5});
            stu_arrRocket.push({x: x - 25, y: y + 11, w: 5, h: 4, c: "yellow", v: 5});
        }
        if(stu_stype > 2) {
            stu_arrRocket.push({x: x - 15, y: y - 20, w: 5, h: 4, c: "yellow", v: 5});
            stu_arrRocket.push({x: x - 15, y: y + 16, w: 5, h: 4, c: "yellow", v: 5});
        }
    }
}

function stu_drawRocket() {
    for(var i = 0; i < stu_arrRocket.length; i++) {
        ctx.fillStyle = stu_arrRocket[i].c;
        ctx.fillRect(stu_arrRocket[i].x, stu_arrRocket[i].y, stu_arrRocket[i].w, stu_arrRocket[i].h);
    }
}

function stu_updateRocket() {
        for(var i = 0; i < stu_arrRocket.length; i++) {
            stu_arrRocket[i].x -= stu_arrRocket[i].v;
    }
}

function stu_deleteRocket() {
    for(var i = 0; i < stu_arrRocket.length; i++) {
        if(stu_arrRocket[i].x + stu_arrRocket[i].w < 0) {
            stu_arrRocket.splice(i, 1);
        }
    }
}

function stu_updateShip() {
    if(stu_left) {x -= stu_vel;}
    if(stu_right) {x += stu_vel;}
    if(stu_up) {y -= stu_vel;}
    if(stu_down) {y += stu_vel;}

    if(x + 30 > vcanvas.width) {x = vcanvas.width - 30;}
    if(x - 60 < 0) (x = 60);
    if(y + 15 > vcanvas.height) {y = vcanvas.height - 15;}
    if(y - 15 < 0) (y = 15);

    if(stu_stype > 2) {
        if(y - 20 < 0) {y = 20;}
        if(y + 20 > vcanvas.height) { y = vcanvas.height - 20;}
    }

    if(stu_l_left) {stu_lx -= stu_lvel;}
    if(stu_l_right) {stu_lx += stu_lvel;}
    if(stu_l_up) {stu_ly -= stu_lvel;}
    if(stu_l_down) {stu_ly += stu_lvel;}

    if(stu_lx + 60 > vcanvas.width) {stu_lx = vcanvas.width - 60;}
    if(stu_lx - 15 < 0) (stu_lx = 15);
    if(stu_ly + 15 > vcanvas.height) {stu_ly = vcanvas.height - 15;}
    if(stu_ly - 15 < 0) (stu_ly = 15);

    if(stu_lstype > 2) {
        if(stu_ly - 20 < 0) {stu_ly = 20;}
        if(stu_ly + 20 > vcanvas.height) { stu_ly = vcanvas.height - 20;}
    }
}

function stu_drawShip() {
    if(stu_stype === 1) {
        ctx.fillStyle = "green";
        ctx.fillRect(x - 60, y - 5, 20, 10);
    }
    if(stu_stype > 1) {
        ctx.fillStyle = "green";
        ctx.fillRect(x - 20, y - 15, 10, 30);
    }
    if(stu_stype > 2) {
        ctx.fillStyle = "green";
        ctx.fillRect(x - 10, y - 20, 10, 40);
    }
    ctx.beginPath();
    ctx.moveTo(x + 15, y);
    ctx.lineTo(x, y - 15);
    ctx.lineTo(x - 60, y);
    ctx.lineTo(x, y + 15);
    ctx.closePath();
    ctx.fillStyle="red";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x - 60, y);
    ctx.lineTo(x - 40, y - 4);
    ctx.lineTo(x - 40, y + 4);
    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + 30, y - 8);
    ctx.lineTo(x + 10, y - 8);
    ctx.lineTo(x + 10, y - 13);
    ctx.lineTo(x + 15, y - 13);
    ctx.closePath();
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + 30, y + 8);
    ctx.lineTo(x + 10, y + 8);
    ctx.lineTo(x + 10, y + 13);
    ctx.lineTo(x + 15, y + 13);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x - 20, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "skyblue";
    ctx.fill();

}

function stu_gameInfo() {
    ctx.fillStyle = "white";
    ctx.font = "20px Georgio";
    ctx.fillText("R_Enemy: " + stu_arrEnemy.length + "  R-Rocket: " + stu_arrRocket.length, 665, 20);
    ctx.fillText("L-Rocket: " + stu_arrLRocket.length, 0, 20);

    ctx.fillStyle = "white";
    ctx.fillRect(300, 0, 0.8, vcanvas.height);
    ctx.fillRect(600, 0, 0.8, vcanvas.height);
}

function stu_gameLoop() {
    stu_clearCanvas();
    stu_updateShip();
    stu_drawShip();
    stu_leftShip();

    stu_drawRocket();
    stu_updateRocket();
    stu_deleteRocket();
    stu_drawLRocket();
    stu_updateLRocket();
    stu_deleteLRocket();

    stu_drawEnemy();
    stu_updateEnemy();
    stu_deleteEnemy();

    stu_gameInfo();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");
    
    x = 700;
    y = 200;

    stu_lx = 200;
    stu_ly = 200;

    setInterval(stu_createLRocket, 100);
    setInterval(stu_createEnemy, 100);
    setInterval(stu_createRocket, 100);
    setInterval(stu_gameLoop, 33);
}

function stu_set_key(event) {
    if(event.keyCode === 37) {stu_left = 1;}
    if(event.keyCode === 38) {stu_up = 1;}
    if(event.keyCode === 39) {stu_right = 1;}
    if(event.keyCode === 40) {stu_down = 1;}

    if(event.keyCode === 55) {stu_stype = 0;}
    if(event.keyCode === 56) {stu_stype = 1;}
    if(event.keyCode === 57) {stu_stype = 2;}
    if(event.keyCode === 48) {stu_stype = 3;}

    if(event.keyCode === 32) {stu_fire = 1;}

    if(event.keyCode === 65) {stu_l_left = 1;}
    if(event.keyCode === 87) {stu_l_up = 1;}
    if(event.keyCode === 68) {stu_l_right = 1;}
    if(event.keyCode === 83) {stu_l_down = 1;}

    if(event.keyCode === 49) {stu_lstype = 0;}
    if(event.keyCode === 50) {stu_lstype = 1;}
    if(event.keyCode === 51) {stu_lstype = 2;}
    if(event.keyCode === 52) {stu_lstype = 3;}

    if(event.keyCode === 86) {stu_lfire = 1;}
}

function stu_stop_key(event) {
    if(event.keyCode === 37) {stu_left = 0;}
    if(event.keyCode === 38) {stu_up = 0;}
    if(event.keyCode === 39) {stu_right = 0;}
    if(event.keyCode === 40) {stu_down = 0;}
    
    if(event.keyCode === 32) {stu_fire = 0;}
    
    if(event.keyCode === 65) {stu_l_left = 0;}
    if(event.keyCode === 87) {stu_l_up = 0;}
    if(event.keyCode === 68) {stu_l_right = 0;}
    if(event.keyCode === 83) {stu_l_down = 0;}

    if(event.keyCode === 86) {stu_lfire = 0;}
}

document.onkeydown = stu_set_key;
document.onkeyup = stu_stop_key;