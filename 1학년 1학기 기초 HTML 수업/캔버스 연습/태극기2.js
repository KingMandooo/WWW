var vcanvas, ctx;

function 태극(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI, true);
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI, false);
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x - (r / 2), y, r / 2, 0, Math.PI, false);
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + (r / 2), y, r / 2, 0, Math.PI, true);
    ctx.fillStyle = "blue";
    ctx.fill();
}

function clear() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height)
}

function trans(x, y, r, deg) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(deg);
    태극(0, 0, r);
    ctx.restore();
}

var dc1 = 0.1; // degree change
var dc2 = 0.1;


function loop() {
    clear();
    trans(400, 400, 400, dc1);
    dc1 += 0.05;

    trans(400, 400, 200, dc2);
    dc2 += -0.5;
}

function 선태욱() {
    vcanvas = document.getElementById("myCountry");
    ctx = vcanvas.getContext("2d");

    태극();
    setInterval(loop, 33);
}
