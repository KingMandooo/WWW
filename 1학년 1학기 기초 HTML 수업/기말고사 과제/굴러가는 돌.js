var ctx, vcanvas;
var x_changer = 50;
var x_vel = 5;
var y_changer = 50;
var y_vel = 5;
var xy_changer = 50;
var xy_vel = 5;
var deg_changer = 0;

function 나는야돌맹이(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "grey";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, r / 2, 0, Math.PI, true);
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, r / 2, 0, Math.PI, false);
    ctx.strokeStyle = "white";
    ctx.stroke();
}

function clear() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function trans(x, y, deg, r) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(deg);
    나는야돌맹이(0, 0, r);
    ctx.restore();
}

function loop() {
    clear();
    trans(x_changer, 400, deg_changer, 50);
    x_changer += x_vel;
    deg_changer += 0.03;

    if(x_changer + 50 >= vcanvas.width) {
        x_vel *= -1;
    }

    if(x_changer - 50 <= 0) {
        x_vel *= -1;
    }

    trans(400, y_changer, deg_changer, 50);
    y_changer += y_vel;
    deg_changer += 0.03;

    if(y_changer + 50 >= vcanvas.height) {
        y_vel *= -1;
    }

    if(y_changer - 50 <= 0) {
        y_vel *= -1;
    }

    trans(xy_changer, xy_changer, deg_changer, 50);
    xy_changer += xy_vel;
    deg_changer += 0.03;

    if(xy_changer + 50 >= vcanvas.height) {
        xy_vel *= -1;
    }

    if(xy_changer - 50 <= 0) {
        xy_vel *= -1;
    }
}

function 선태욱() {
    vcanvas = document.getElementById("Rock");
    ctx = vcanvas.getContext("2d");

    setInterval(loop, 33);
}