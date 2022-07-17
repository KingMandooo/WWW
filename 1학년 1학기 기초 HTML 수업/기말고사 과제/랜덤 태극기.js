var vcanvas, ctx;
var dc = 0;
var dc2 = 0;
var color1, color2;

function clear() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function Taeguk(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI, true);
    ctx.fillStyle = color1;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI, false);
    ctx.fillStyle = color2;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x - (r / 2), y, r / 2, 0, Math.PI, false);
    ctx.fillStyle = color1;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x + (r / 2), y, r / 2, 0, Math.PI, true);
    ctx.fillStyle = color2;
    ctx.fill();
    ctx.closePath();
}

function trans(x, y, deg, r) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(deg);
    Taeguk(0, 0, r);
    ctx.restore();
}

color1 = randomColor();
color2 = randomColor();

function randomColor() {
    var x, y, z;
    
    x = Math.floor(Math.random() * 256);  // 0 <= random <= 255.99..  floor()로 소수점 없애기   0 <= x <= 255
    y = Math.round(Math.random() * 255);  // 0 <= random <= 254.99..  round()로 반올림   0 <= y <= 255
    z = Math.floor(Math.random() * 256);  // 0 <= z <= 255

    return 'rgb(' + x + ',' + y + ',' + z + ')';
}

function loop() {
    clear();
    trans(400, 400, dc, 200);
    trans(400, 400, dc2, 50);
    dc -= 0.3;
    dc2 += 0.5;
}

function 선태욱() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    setInterval(loop, 33);
}