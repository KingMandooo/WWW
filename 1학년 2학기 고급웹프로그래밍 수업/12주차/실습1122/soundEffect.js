'use strict';
var vcanvas, ctx;
var key1 = 0;
var key2 = 0;
var key3 = 0;
var key4 = 0;
var rc1 = {x: 100, y: 100, w: 50, h: 50};
var rc2 = {x: 200, y: 100, w: 50, h: 50};
var rc3 = {x: 300, y: 100, w: 50, h: 50};
var rc4 = {x: 400, y: 100, w: 50, h: 50};

function clearCanvas() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function drawRect() {
    ctx.beginPath();
    ctx.strokeRect(rc1.x, rc1.y, rc1.w, rc1.h);

    ctx.beginPath();
    ctx.strokeRect(rc2.x, rc2.y, rc2.w, rc2.h);

    ctx.beginPath();
    ctx.strokeRect(rc3.x, rc3.y, rc3.w, rc3.h);

    ctx.beginPath();
    ctx.strokeRect(rc4.x, rc4.y, rc4.w, rc4.h);
}

function play() {
    if(key1) {
        ctx.beginPath();
        ctx.fillRect(rc1.x, rc1.y, rc1.w, rc1.h);
        var myAudio1 = new Audio();
        myAudio1.src ="sound/Gun_1p.mp3";
        myAudio1.volume = 0.3;
        myAudio1.play();
    }
    if(key2) {
        ctx.beginPath();
        ctx.fillRect(rc2.x, rc2.y, rc2.w, rc2.h);
        var myAudio2 = new Audio();
        myAudio2.src ="sound/Gun_2p.mp3";
        myAudio2.volume = 0.3;
        myAudio2.play();
    }
    if(key3) {
        ctx.beginPath();
        ctx.fillRect(rc3.x, rc3.y, rc3.w, rc3.h);
        var myAudio3 = new Audio("sound/Gun_3p.mp3");
        // myAudio3.src ="sound/Gun_3p.mp3";
        myAudio3.volume = 0.3;
        myAudio3.play();
    }
    if(key4) {
        ctx.beginPath();
        ctx.fillRect(rc4.x, rc4.y, rc4.w, rc4.h);
        // var myAudio4 = new Audio();
        var myAudio4 = document.createElement("audio");
        myAudio4.src ="sound/Gun_4p.mp3";
        myAudio4.volume = 0.3;
        myAudio4.play();
    }
    
}

function gameLoop() {
    clearCanvas();
    drawRect();
    play();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");    

    setInterval(gameLoop, 100);
}

function set_key(event) {
    if(event.keyCode === 49) {key1 = 1;}
    if(event.keyCode === 50) {key2 = 1;}
    if(event.keyCode === 51) {key3 = 1;}
    if(event.keyCode === 52) {key4 = 1;}
}

function stop_key(event) {
    if(event.keyCode === 49) {key1 = 0;}
    if(event.keyCode === 50) {key2 = 0;}
    if(event.keyCode === 51) {key3 = 0;}
    if(event.keyCode === 52) {key4 = 0;}
}

document.onkeydown = set_key;
document.onkeyup = stop_key;