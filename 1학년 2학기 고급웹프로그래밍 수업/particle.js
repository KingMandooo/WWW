'use strict';
var vcanvas, ctx;
var sp;
var rect = {};
var particle = [];

function clearCanvas() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function b2v(a, b) {
    return Math.random() * (b - a) + a;
}

function createParticle() {
    var nop, x, y, wh, hue, d1, d2, velx, vely;
    
    particle = [];
    nop = 200;
    
    for(var i = 0; i < nop; i++) {
        x = b2v(rect.x, rect.x + rect.w);
        y = b2v(rect.y, rect.y + rect.h);
        wh = b2v(1, 10);

        hue = rect.c;

        d1 = b2v(100, 220);
        d2 = b2v(100, 220);

        velx = (7 - wh) / 3 * b2v(-1, 1);
        vely = (7 - wh) / 3 * b2v(-1, 1);

        particle.push({px: x, py: y, pwh: wh, pc: hue, d1: d1, d2: d2, pvx: velx, pvy: vely});
    }
}

function drawParticle() {
    var hue, lightness;

    for(var i = 0; i < particle.length; i++) {
        hue = particle[i].pc;
        lightness = 80 * particle[i].d1 / particle[i].d2;

        ctx.fillStyle = "hsl(" + hue + ", 100%," + lightness + "%)";
        ctx.fillRect(particle[i].px + 300, particle[i].py, particle[i].pwh, particle[i].pwh);
        ctx.strokeStyle = "white";
        ctx.strokeRect(particle[i].px + 300, particle[i].py, particle[i].pwh, particle[i].pwh);
    }
}

function updateParticle() {
    var k = 1;

    for(var i = 0; i < particle.length; i++) {
        particle[i].px += k * particle[i].pvx;
        particle[i].py += k * particle[i].pvy;
        particle[i].d1 -= k * 2;

        if(particle[i].d1 < 0) {
            particle.splice(i, 1);
        }
    }
}

function createBlock() {
    var c;
    c = Math.round(Math.random() * 360);
    
    rect = {x: 200, y: 200, w: 100, h: 100, c: c};
}

function drawBlock() {
    var hue, saturation, lightness;
    hue = rect.c;
    saturation = 100;
    lightness = 50;

    ctx.fillStyle = "hsl(" + hue + "," + saturation + "%," + lightness + "%)";
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
}

function gameLoop() {
    clearCanvas();
    if(sp) {
        createBlock();
        createParticle();
    }
    drawBlock();
    drawParticle();
    updateParticle();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    createBlock();
    createParticle();
    setInterval(gameLoop, 20);
}

function set_key(event) {
    if(event.keyCode === 32) {sp = 1;}
}   

function stop_key(event) {
    if(event.keyCode === 32) {sp = 0;}
}

document.onkeydown = set_key;
document.onkeyup = stop_key;
