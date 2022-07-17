var vcanvas, ctx;

function stu2_arc1(stu2_x1, stu2_y1, stu2_s1, stu2_e1) { // 첫줄 원
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.arc(stu2_x1, stu2_y1, 100, 0, Math.PI * 2, true);
    ctx.strokeStyle = "green";
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = "10";
    ctx.arc(stu2_x1, stu2_y1, 95, stu2_s1, stu2_e1, true);
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function stu2_arc2(stu2_x2, stu2_y2, stu2_s2, stu2_e2) { // 두번째줄 원
    ctx.beginPath();
    ctx.arc(stu2_x2, stu2_y2, 100, 0, Math.PI * 2, true);
    ctx.fillStyle = "green";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(stu2_x2, stu2_y2);
    ctx.arc(stu2_x2, stu2_y2, 100, stu2_s2, stu2_e2, true);
    ctx.fillStyle = "black";
    ctx.fill();
}

function stu2_arc3(stu2_x3, stu2_y3) { // 세 번째 줄 첫 번째 원
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.arc(stu2_x3, stu2_y3, 100, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(stu2_x3 - 50, stu2_y3, 50, Math.PI, 0, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(stu2_x3 + 50, stu2_y3, 50, 0, Math.PI, true);
    ctx.stroke();
}

function stu2_arc4(stu2_x4, stu2_y4) { // 세 번째 줄 두 번째 원
    ctx.beginPath();
    ctx.arc(stu2_x4, stu2_y4, 100, 0, Math.PI, true);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(stu2_x4, stu2_y4, 100, Math.PI, 0, true);
    ctx.fillStyle = "blue";
    ctx.fill();
}

function stu2_arc5(stu2_x5, stu2_y5) { // 세 번째 줄 세 번째 원
    ctx.beginPath();
    ctx.arc(stu2_x5, stu2_y5, 100, 0, Math.PI, true);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(stu2_x5, stu2_y5, 100, Math.PI, 0, true);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(stu2_x5 - 50, stu2_y5, 50, Math.PI, 0, true);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(stu2_x5 + 50, stu2_y5, 50, 0, Math.PI, true);
    ctx.fillStyle = "blue";
    ctx.fill();
}

function stu2_rotate1() { // 세 번째 줄 첫 번째 원 돌리기
    ctx.save();
    ctx.translate(150, 750);
    ctx.rotate(15);
    stu2_arc3(0, 0);
    ctx.restore();
}
 
function stu2_rotate2() { // 세 번째 줄 두 번째 원 돌리기
    ctx.save();
    ctx.translate(450, 750);
    ctx.rotate(15);
    stu2_arc4(0, 0);
    ctx.restore();
}

function stu2_rotate3() {  // 세 번째 줄 세 번째 원 돌리기
    ctx.save(); 
    ctx.translate(750, 750);
    ctx.rotate(15);
    // ctx.rotate(135);
    stu2_arc5(0, 0);
    ctx.restore();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    stu2_arc1(150, 150, Math.PI * 1.0, Math.PI * 0.5);
    stu2_arc1(450, 150, Math.PI * 0.5, Math.PI * 1.0);
    stu2_arc1(750, 150, Math.PI * 0.5, 0);

    stu2_arc2(150, 450, Math.PI * 1.0, Math.PI * 0.5);
    stu2_arc2(450, 450, Math.PI * 0.5, Math.PI * 1.0);
    stu2_arc2(750, 450, Math.PI * 0.5, 0)

    stu2_rotate1();
    stu2_rotate2();
    stu2_rotate3();
}