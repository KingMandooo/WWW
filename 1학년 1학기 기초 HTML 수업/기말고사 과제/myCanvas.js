var vcanvas, ctx;
var vx1 = 0;   // 첫 번째 차를 이동 시키는 변수
var vx2 = 700;  // 두 번째 차를 이동 시키는 변수
var vel1 = 7;   // 첫 번째 차를 방향 전환해주는 변수
var vel2 = 5;   // 두 번째 차를 방향 전환해주는 변수
var dc = 0;  // 차 바퀴를 돌아가게 해주는 변수
var hc = 0;  // 집을 움직이게 해주는 변수

function clearCanvas() {   // 캔버스 비워주는 함수
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function sky() {  // 하늘 함수
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, 800, 400);
}

function ground() {   // 땅 함수
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 400, 800, 400);
}

function 선태욱(x, y, r) {   // 집 함수
    // 집 본체
    ctx.beginPath();
    ctx.moveTo(x, y); 
    ctx.lineTo(x, y - 300 * r);
    ctx.lineTo(x + 600 * r, y - 300 * r);
    ctx.lineTo(x + 600 * r, y);
    ctx.lineTo(x, y);
    ctx.fillStyle = "yellow";
    ctx.stroke(); 
    ctx.fill();

    // 지붕
    ctx.beginPath();
    ctx.moveTo(x, y - 300 * r);
    ctx.lineTo(x + 200 * r, y - 500 * r);
    ctx.lineTo(x + 500 * r, y - 300 * r);
    ctx.fillStyle = "red";
    ctx.stroke(); 
    ctx.fill();

    // 굴뚝
    ctx.beginPath();
    ctx.moveTo(x + 500 * r, y - 300 * r);
    ctx.lineTo(x + 500 * r, y - 450 * r);
    ctx.lineTo(x + 570 * r, y - 450 * r);
    ctx.lineTo(x + 570 * r, y - 300 * r);
    ctx.stroke(); 
    ctx.fillStyle = "black";
    ctx.stroke(); 
    ctx.fill();

    // 창문
    ctx.beginPath();
    ctx.arc(x + 200 * r, y - 160 * r, 100 * r, 0, Math.PI * 2);
    ctx.fillStyle="skyblue";
    ctx.fill();
    ctx.stroke(); 

    ctx.beginPath();
    ctx.moveTo(x + 200 * r, y - 60 * r);  
    ctx.lineTo(x + 200 * r, y - 260 * r);
    ctx.moveTo(x + 300 * r, y - 160 * r);
    ctx.lineTo(x + 100 * r, y - 160 * r);
    ctx.stroke(); 

    //문
    ctx.beginPath();
    ctx.moveTo(x + 450 * r, y);  
    ctx.lineTo(x + 450 * r, y - 200 * r);
    ctx.lineTo(x + 550 * r, y - 200 * r);
    ctx.lineTo(x + 550 * r, y);
    ctx.fillStyle = "lightyellow";
    ctx.stroke(); 
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 530 * r, y - 100 * r, 7 * r, 0, Math.PI * 2);
    ctx.fillStyle="black";
    ctx.fill();
}

function car(x, y) {   // 자동차 함수
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 100, y);
    ctx.lineTo(x + 100, y - 50);
    ctx.lineTo(x, y - 50);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fillStyle = "pink";
    ctx.fill();


    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y - 50, 40, 30);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "skyblue";
    ctx.fillRect(x + 60, y - 50, 40, 30);
    ctx.fill();
}

function first_wheel(x, y) {   // 자동차 왼쪽 바퀴 함수
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 0.5, true);
    ctx.fillStyle = "darkseagreen";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, 10, Math.PI * 0.5, Math.PI, false);
    ctx.fillStyle = "azure";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, 10,  Math.PI, Math.PI * 1.5, false);
    ctx.fillStyle = "darkseagreen";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, 10, Math.PI * 1.5, 0, false);
    ctx.fillStyle = "azure";
    ctx.fill();
}
 
function second_wheel(x, y) {   // 자동차 오른쪽 바퀴 함수
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 0.5, true);
    ctx.fillStyle = "darkseagreen";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, 10, Math.PI * 0.5, Math.PI, false);
    ctx.fillStyle = "azure";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, 10,  Math.PI, Math.PI * 1.5, false);
    ctx.fillStyle = "darkseagreen";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, 10, Math.PI * 1.5, 0, false);
    ctx.fillStyle = "azure";
    ctx.fill();
}

function firstWheel_trans (x, y, deg) {  // 왼쪽 바퀴 돌아가는 함수
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(deg);
    first_wheel(0, 0);
    ctx.restore();
}

function secondWheel_trans (x, y, deg) {  // 오른쪽 바퀴 돌아가는 함수
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(deg);
    second_wheel(0, 0);
    ctx.restore();
}

function sun(x, y) {    // 태양 함수
    ctx.beginPath();
    ctx.fillStyle = "orange";
    ctx.arc(x, y, 50, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.moveTo(x, y);
    ctx.arc(x, y, 30, 0, Math.PI * 0.5, false);
    ctx.fill();
}

function rotateSun(x, y, deg) {  // 태양 돌아가게 하는 함수
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(deg);
    sun(0, 0);
    ctx.restore();
}

function house_moving(x, y) {  // 집 움직이는 함수
    ctx.save();
    ctx.translate(x, y);
    city(0, 0);
    ctx.restore();
}

function city(x, y) {      // 마을 만드는 함수
    // 선태욱(x, y, 1 / 2);
    // 선태욱(x + 300, y, 1 / 4);
    // 선태욱(x + 450, y, 1 / 6);
    // 선태욱(x + 550, y, 3 / 7);

    for(var r = 0; r < 1000; r++) {
        선태욱(x + 800 * r, y, 1 / 2);
        선태욱((x + 300) + (800 * r), y, 1 / 4);
        선태욱((x + 450) + (800 * r), y, 1 / 6);
        선태욱((x + 550) + (800 * r), y, 3 / 7);
    }

    // var i = 0;
    // while(true) {
    //     선태욱(x + 800 * i, y, 1 / 2);
    //     선태욱((x + 300) + (800 * i), y, 1 / 4);
    //     선태욱((x + 450) + (800 * i), y, 1 / 6);
    //     선태욱((x + 550) + (800 * i), y, 3 / 7);
    //     i++;
    // }
}

function gameLoop() {
    clearCanvas();

    sky();
    ground();

    car(vx1, 600);
    firstWheel_trans(vx1 + 20, 600, dc);
    secondWheel_trans(vx1 + 80, 600, dc);

    car(vx2, 500);
    firstWheel_trans(vx2 + 20, 500, dc);
    secondWheel_trans(vx2 + 80, 500, dc);

    rotateSun(700, 70, dc);
    dc += 0.3;

    house_moving(hc, 400);
    hc += -3;

    vx1 += vel1;
    vx2 += -vel2;

    if (vx1 + 100 > vcanvas.width) {
        vel1 *= -1;
    }

    if (vx1 < 0) {
        vel1 *= -1;
    }

    if (vx2 + 100 > vcanvas.width) {
        vel2 *= -1;
    }

    if (vx2 < 0) {
        vel2 *= -1;
    }
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    setInterval(gameLoop, 33);
}