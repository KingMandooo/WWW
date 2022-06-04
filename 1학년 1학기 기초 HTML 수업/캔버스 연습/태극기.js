var vcanvas, ctx;

function 태극 (x, y, r) {

    // x = 400;
    // y = 400;
    // r = 300;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI, true);
    ctx.fillStyle="red";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI, false);
    ctx.fillStyle="blue";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x - (r / 2), y, r / 2, 0, Math.PI, false);
    ctx.fillStyle="red";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + (r / 2), y, r / 2, 0, Math.PI, true);
    ctx.fillStyle="blue";
    ctx.fill();
}

function trans(x, y, r, deg) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(deg);
    태극(0, 0, r);
    ctx.restore();
}

var cx = 400;
var dd1 = 0.3;
var dd2 = 1;
var vel = 5;

function clear() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function gameloop() {
    clear();
    trans(cx, 400, 400, dd1);
    trans(cx, 400, 200, dd2);
    // cx += vel;
    dd1 += 0.03; 
    dd2 += -1;

    // if(cx + 50 > vcanvas.width) {
    //     vel *= -1;
    // }

    // if(cx - 50 < 0) {
    //     vel *= -1;
    // }

    // if(cx + 50 > vcanvas.width) {   <-- 이렇게 하면 cx가 증가 됐다 줄었다를 반복
    //     cx -= 5;                         그래서 X.
    //     dd -= 0.1; 
    // }
    // else {
    //     dd += 0.1;
    //     cx += 5;
    // }
      
}

function 선태욱 () {
    vcanvas = document.getElementById("myCountry");
    ctx = vcanvas.getContext("2d");

    setInterval(gameloop, 33);
}