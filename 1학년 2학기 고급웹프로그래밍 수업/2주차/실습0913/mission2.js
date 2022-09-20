'use strict'; // 틀린 문법을 제대로 알려줌
var vcanvas, ctx;

function smileFace(x, y, r) {  // 웃는 얼굴 함수
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x - r/2, y - r/4, r/4, 0 ,Math.PI, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + r/2, y - r/4, r/4, 0 ,Math.PI, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y + r/4, r/3, 0 ,Math.PI, false);
    ctx.stroke();
}

function sadFace(x, y, r) {  // 우는 얼굴 함수
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x - r/2, y - r/4, r/4, 0 ,Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + r/2, y - r/4, r/4, 0 ,Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y + r/2, r/3, 0 ,Math.PI, true);
    ctx.stroke();
}

function angryFace(x, y, r) {  // 화난 얼굴 함수
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - r/5, y - r/5);
    ctx.lineTo(x - r/2, y - r/1.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + r/5, y - r/5);
    ctx.lineTo(x + r/2, y - r/1.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y + r/2, r/3, 0 ,Math.PI, true);
    ctx.stroke();
}

function surpriseFace(x, y, r) {  // 놀란 얼굴 함수
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x - r/2, y - r/4, r/4, 0 ,Math.PI * 2, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + r/2, y - r/4, r/4, 0 ,Math.PI * 2, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y + r/2, r/3, 0 ,Math.PI * 2, true);
    ctx.stroke();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    smileFace(100, 100, 50);    
    sadFace(300, 100, 50);
    angryFace(100, 300, 50);
    surpriseFace(300, 300, 50);
}