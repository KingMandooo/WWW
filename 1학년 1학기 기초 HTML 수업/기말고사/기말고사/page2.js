var vcanvas, ctx;

function stu2_house(stu2_houseX, stu2_houseY, stu2_houseR) {  // 집 함수
    // 집 본체
    ctx.beginPath();
    ctx.moveTo(stu2_houseX, stu2_houseY); 
    ctx.lineTo(stu2_houseX, stu2_houseY - 300 * stu2_houseR);
    ctx.lineTo(stu2_houseX + 600 * stu2_houseR, stu2_houseY - 300 * stu2_houseR);
    ctx.lineTo(stu2_houseX + 600 * stu2_houseR, stu2_houseY);
    ctx.lineTo(stu2_houseX, stu2_houseY);
    ctx.stroke(); 

    // 지붕
    ctx.beginPath();
    ctx.moveTo(stu2_houseX, stu2_houseY - 300 * stu2_houseR);
    ctx.lineTo(stu2_houseX + 200 * stu2_houseR, stu2_houseY - 500 * stu2_houseR);
    ctx.lineTo(stu2_houseX + 500 * stu2_houseR, stu2_houseY - 300 * stu2_houseR);
    ctx.stroke(); 

    // 굴뚝
    ctx.beginPath();
    ctx.moveTo(stu2_houseX + 500 * stu2_houseR, stu2_houseY - 300 * stu2_houseR);
    ctx.lineTo(stu2_houseX + 500 * stu2_houseR, stu2_houseY - 450 * stu2_houseR);
    ctx.lineTo(stu2_houseX + 570 * stu2_houseR, stu2_houseY - 450 * stu2_houseR);
    ctx.lineTo(stu2_houseX + 570 * stu2_houseR, stu2_houseY - 300 * stu2_houseR);
    ctx.stroke(); 
    ctx.stroke(); 

    // 창문
    ctx.beginPath();
    ctx.arc(stu2_houseX + 200 * stu2_houseR, stu2_houseY - 160 * stu2_houseR, 100 * stu2_houseR, 0, Math.PI * 2);
    ctx.fillStyle="red";
    ctx.fill();
    ctx.stroke(); 

    ctx.beginPath();
    ctx.moveTo(stu2_houseX + 200 * stu2_houseR, stu2_houseY - 60 * stu2_houseR);  
    ctx.lineTo(stu2_houseX + 200 * stu2_houseR, stu2_houseY - 260 * stu2_houseR);
    ctx.moveTo(stu2_houseX + 300 * stu2_houseR, stu2_houseY - 160 * stu2_houseR);
    ctx.lineTo(stu2_houseX + 100 * stu2_houseR, stu2_houseY - 160 * stu2_houseR);
    ctx.stroke(); 

    //문
    ctx.beginPath();
    ctx.moveTo(stu2_houseX + 450 * stu2_houseR, stu2_houseY);  
    ctx.lineTo(stu2_houseX + 450 * stu2_houseR, stu2_houseY - 200 * stu2_houseR);
    ctx.lineTo(stu2_houseX + 550 * stu2_houseR, stu2_houseY - 200 * stu2_houseR);
    ctx.lineTo(stu2_houseX + 550 * stu2_houseR, stu2_houseY);
    ctx.fillStyle = "blue";
    ctx.stroke(); 
    ctx.fill();
}

function stu2_first(stu2_x, stu2_y) { // 첫 번째 줄 집 for 문
    for(var i = 0; i < 4; i++) {
        stu2_house(stu2_x + (300 * i), stu2_y, 0.5);
    }
}

function stu2_second(stu2_x2, stu2_y2) { // 두 번째 줄 집 for 문
    for(var i = 0; i < 2; i++) {
        stu2_house(stu2_x2 + (600 * i), stu2_y2, 1);
    }
}

function stu2_third(stu2_x3, stu2_y3) { // 세 번째 줄 집 for 문
    for(var i = 0; i < 1; i++) {
        stu2_house(stu2_x3 + (1200 * i), stu2_y3, 2);
    }
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    stu2_first(750, 300);
    stu2_second(750, 850);
    stu2_third(750, 1900);
}