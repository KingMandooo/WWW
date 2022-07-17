var vcanvas, ctx;

function wind_Wheel(x, y) {

    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fillStyle="red";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle="yellow";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 20, y);
    ctx.lineTo(x + 20, y + 100);
    ctx.lineTo(x - 20, y + 200);
    ctx.lineTo(x - 20, y);
    ctx.lineTo(x, y);
    ctx.lineWidth = 1;
    ctx.strokeStyle="green";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 20, y);
    ctx.lineTo(x + 20, y - 200);
    ctx.lineTo(x - 20, y - 100);
    ctx.lineTo(x - 20, y);
    ctx.lineTo(x, y);
    ctx.lineWidth = 1;
    ctx.strokeStyle="green";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 20);
    ctx.lineTo(x - 100, y + 20);
    ctx.lineTo(x - 200, y - 20);
    ctx.lineTo(x, y - 20);
    ctx.lineTo(x, y);
    ctx.lineWidth = 1;
    ctx.strokeStyle="green";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 20);
    ctx.lineTo(x + 100, y - 20);
    ctx.lineTo(x + 200, y + 20);
    ctx.lineTo(x, y + 20);
    ctx.lineTo(x, y);
    ctx.lineWidth = 1;
    ctx.strokeStyle="green";
    ctx.stroke();
    ctx.closePath();
}

function trans(x, y, deg) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(deg);
    wind_Wheel(0, 0);
    ctx.restore();
}

function clear() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

var dc = 0;

function loop() {
    clear();
    trans(400, 400, dc);

    dc += -0.02;
}

function 선태욱() {
    vcanvas = document.getElementById("표창");
    ctx = vcanvas.getContext("2d");

    setInterval(loop, 33);
}