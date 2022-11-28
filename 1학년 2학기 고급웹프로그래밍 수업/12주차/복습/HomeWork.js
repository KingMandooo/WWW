'use strict';
var vcanvas, ctx;
var x, y;
var r_left, r_right, r_up, r_down;
var vel = 8;
var stype = 0;
var fire;
var arrRocket = [];
var arrEnemy = [];
var carsh_Count = 0; // 비행선 - 적 충돌횟수 추가 변수

function clearCanvas() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

// Colider
function hitCircleToCircle(rt, rt2) {  // 원과 원 충돌 감지
    var dx, dy, distance;
    dx = rt.x - rt2.x;
    dy = rt.y - rt2.y;
    distance = Math.sqrt(dx * dx + dy * dy);

    return distance < rt.r + rt2.r;
}

function colisionShip() {  // Ship Colider
    var big_rt = {}, small_rt = {}, rt2 = {};
    big_rt = {x: x + 5, y: y, r: 14};      // ctx.arc(x + 5, y, 13, 0, Math.PI * 2);
    small_rt = {x: x + 27, y: y, r: 8};    // ctx.arc(x + 27, y, 8, 0, Math.PI * 2);

    for(var i = 0; i < arrEnemy.length; i++) {
        rt2 = {x: arrEnemy[i].x + arrEnemy[i].wh/2, y:arrEnemy[i].y + arrEnemy[i].wh/2, r: arrEnemy[i].wh/2};

        if(hitCircleToCircle(big_rt, rt2)) {
            arrEnemy.splice(i, 1);
            carsh_Count++;
        }
        if(hitCircleToCircle(small_rt, rt2)) {
            arrEnemy.splice(i, 1);
            carsh_Count++;
        }
    }
}

function colisionRocket(ri) {   // Rocket Colider
    var rt = {}, rt2 = {};
    rt = {x: ri.x, y: ri.y, r: ri.r};

    for(var i = 0; i < arrEnemy.length; i++) {
        rt2 = {x: arrEnemy[i].x + arrEnemy[i].wh/2, y:arrEnemy[i].y + arrEnemy[i].wh/2, r: arrEnemy[i].wh/2};
        
        if(hitCircleToCircle(rt, rt2)) {
            arrEnemy[i].hit++;
        }   
        if(arrEnemy[i].hit > 30) {
            var myAudio = new Audio();          // 적을 로켓으로 부셨을 때 효과음 추가
            myAudio.src ="sound/explosion.mp3";
            myAudio.volume = 0.8;
            myAudio.play();

            arrEnemy.splice(i, 1);
        }
    }
}
//----------------------------------------------------------------------

//Enemy
function createEnemy() {
    if(arrEnemy.length < 20) {
        var tx, ty, twh, tc, tv;
        tx = vcanvas.width;
        ty = Math.round(Math.random() * (vcanvas.height - 40));
        twh = Math.round(Math.random() * 20) + 20;
        tv = Math.round(Math.random() * 1) + 1;
        tc = "#" + parseInt(Math.random() * 0xffffff, 10).toString(16);
    
        arrEnemy.push({x: tx, y: ty, wh: twh, c: tc, v: tv, hit: 0});
    }
}

function drawEnemy() {
    for(var i = 0; i < arrEnemy.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = arrEnemy[i].c;
        ctx.fillRect(arrEnemy[i].x, arrEnemy[i].y, arrEnemy[i].wh, arrEnemy[i].wh);
        
        // 바운딩 박스
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.arc(arrEnemy[i].x + arrEnemy[i].wh/2, arrEnemy[i].y + arrEnemy[i].wh/2, arrEnemy[i].wh/2, 0, Math.PI * 2);
        ctx.stroke();
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
//----------------------------------------------------------------------

// Rocket
function createRocket() {
    var myAudio = new Audio();  // 소리 출력

    if(fire) {
        if(stype != 1) {
            arrRocket.push({x: x + 60, y: y, r: 2, c: "yellow", v: 5});

            myAudio.src ="sound/Gun_1p.mp3";
            myAudio.volume = 0.3;
            myAudio.play();
        }
        if(stype === 1) {
            arrRocket.push({x: x + 63, y: y - 3, r: 2, c: "yellow", v: 5});
            arrRocket.push({x: x + 63, y: y + 3, r: 2, c: "yellow", v: 5});

            myAudio.src ="sound/Gun_2p.mp3";
            myAudio.volume = 0.3;
            myAudio.play();
        }
        if(stype > 1) {
            arrRocket.push({x: x + 22, y: y - 13, r: 2, c: "yellow", v: 5});
            arrRocket.push({x: x + 22, y: y + 13, r: 2, c: "yellow", v: 5});

            myAudio.src ="sound/Gun_3p.mp3";
            myAudio.volume = 0.3;
            myAudio.play();
        }
        if(stype > 2) {
            arrRocket.push({x: x + 12, y: y - 18, r: 2, c: "yellow", v: 5});
            arrRocket.push({x: x + 12, y: y + 18, r: 2, c: "yellow", v: 5});

            myAudio.src ="sound/Gun_4p.mp3";
            myAudio.volume = 0.3;
            myAudio.play();
        }
    }
}

function drawRocket() {
    for(var i = 0; i < arrRocket.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = arrRocket[i].c;
        ctx.arc(arrRocket[i].x, arrRocket[i].y, arrRocket[i].r, 0, Math.PI * 2);
        ctx.fill();
    }
}

function updateRocket() {
    for(var i = 0; i < arrRocket.length; i++) {
        arrRocket[i].x += arrRocket[i].v;
        colisionRocket(arrRocket[i]);
    }
}

function deleteRocket() {
    for(var i = 0; i < arrRocket.length; i++) {
        if(arrRocket[i].x - arrRocket[i].r > vcanvas.width) {
            arrRocket.splice(i, 1);
        }
    }
}
//----------------------------------------------------------------------

// Ship
function updateShip() {
    if(r_left) {x -= vel;}
    if(r_right) {x += vel;}
    if(r_up) {y -= vel;}
    if(r_down) {y += vel;}

    if(x - 30 < 0) {x = 30;}
    if(x + 60 > vcanvas.width) {x = vcanvas.width - 60;}
    if(y - 15 < 0) {y = 15;}
    if(y + 15 > vcanvas.height) {y = vcanvas.height - 15;}

    if(stype === 3) {
        if(y - 20 < 0) {y = 20;}
        if(y + 20 > vcanvas.height) {y = vcanvas.height - 20;}
    }
}

function drawShip() {
    if (stype === 1) {
        ctx.fillStyle = "green";
        ctx.fillRect(x + 40, y - 5, 20, 10);
    }
    if (stype > 1) {
        ctx.fillStyle = "green";
        ctx.fillRect(x + 10, y - 15, 10, 30);
    }
    if (stype > 2) {
        ctx.fillStyle = "green";
        ctx.fillRect(x, y - 20, 10, 40);
    }

    ctx.beginPath();
    ctx.moveTo(x - 15, y);
    ctx.lineTo(x, y - 15);
    ctx.lineTo(x + 60, y);
    ctx.lineTo(x, y + 15);
    ctx.closePath();
    ctx.fillStyle="red";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + 60, y);
    ctx.lineTo(x + 40, y - 4);
    ctx.lineTo(x + 40, y + 4);
    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x - 30, y - 8);
    ctx.lineTo(x - 10, y - 8);
    ctx.lineTo(x - 10, y - 13);
    ctx.lineTo(x - 15, y - 13);
    ctx.closePath();
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x - 30, y + 8);
    ctx.lineTo(x - 10, y + 8);
    ctx.lineTo(x - 10, y + 13);
    ctx.lineTo(x - 15, y + 13);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 10, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "skyblue";
    ctx.fill();

    // 바운딩 박스
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.arc(x + 5, y, 13, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.arc(x + 27, y, 8, 0, Math.PI * 2);
    ctx.stroke();
}
//----------------------------------------------------------------------

function stateInfo() {
    ctx.font = "20px Georgio";
    ctx.fillStyle = "white";
    ctx.fillText("Type: " + stype + "  Rocket: " + arrRocket.length + "  Enemy: " + arrEnemy. length + "  충돌횟수: " + carsh_Count, 10, 30);
}

function gameLoop() {
    clearCanvas();
    drawShip();
    updateShip();
    colisionShip();

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

// Key Control
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