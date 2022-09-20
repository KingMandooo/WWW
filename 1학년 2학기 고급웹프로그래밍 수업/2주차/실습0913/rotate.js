'use strict';
var vcanvas, ctx;

function taeguk(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI, true);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI, false);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x - r/2, y, r/2, 0, Math.PI, false);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + r/2, y, r/2, 0, Math.PI, true);
    ctx.fillStyle = "blue";
    ctx.fill();
}

function trans(x, y, r, deg) {
    ctx.save();  // 현재 빈캔버스의 모습을 저장함
    ctx.translate(x, y); // 캔버스의 위치를 (x,y)로 이동시켜줌
    ctx.rotate(deg); // 캔버스의 각도를 회전시킴
    taeguk(0, 0, r); // 태극기를 그려줌
    ctx.restore(); // save()했던 캔버스의 모습을 불러옴
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    trans(200, 200, 100, 2);
}
