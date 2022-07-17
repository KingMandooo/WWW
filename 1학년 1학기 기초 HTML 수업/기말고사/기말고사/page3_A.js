var vcanvas, ctx;
var stu2_xc = 500;
// var stu2_xc2 = 700;
var stu2_vel = 5;

function stu2_clear() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

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

function stu2_myCar(stu2_x, stu2_y) {
    ctx.strokeRect(stu2_x, stu2_y, 150, 40);
  
    ctx.beginPath();
    ctx.moveTo(stu2_x, stu2_y);
    ctx.lineTo(stu2_x + 30, stu2_y - 30);
    ctx.lineTo(stu2_x + 90, stu2_y - 30);
    ctx.lineTo(stu2_x + 120, stu2_y);
    ctx.stroke();
  
    ctx.beginPath();
    ctx.moveTo(stu2_x + 60, stu2_y);
    ctx.lineTo(stu2_x + 60, stu2_y - 30);
    ctx.stroke();
  
    ctx.strokeRect(stu2_x + 60, stu2_y + 5, 10, 5);
  
    ctx.beginPath();
    ctx.arc(stu2_x + 40, stu2_y + 40, 20, 0, Math.PI);
    ctx.arc(stu2_x + 40, stu2_y + 40, 10, 0, Math.PI);
    ctx.stroke();
  
    ctx.beginPath();
    ctx.arc(stu2_x + 115, stu2_y + 40, 20, 0, Math.PI);
    ctx.arc(stu2_x + 115, stu2_y + 40, 10, 0, Math.PI);
    ctx.stroke();
  }

//   function stu2_myCar2(stu2_x, stu2_y) {
//     ctx.strokeRect(stu2_x, stu2_y, 150, 40);
  
//     ctx.beginPath();
//     ctx.moveTo(stu2_x + 150, stu2_y);
//     ctx.lineTo(stu2_x + 120, stu2_y - 30);
//     ctx.lineTo(stu2_x + 60, stu2_y - 30);
//     ctx.lineTo(stu2_x + 30, stu2_y);
//     ctx.stroke();
  
//     ctx.beginPath();
//     ctx.moveTo(stu2_x + 90, stu2_y);
//     ctx.lineTo(stu2_x + 90, stu2_y - 30);
//     ctx.stroke();
  
//     ctx.strokeRect(stu2_x + 60, stu2_y + 5, 10, 5);
  
//     ctx.beginPath();
//     ctx.arc(stu2_x + 40, stu2_y + 40, 20, 0, Math.PI);
//     ctx.arc(stu2_x + 40, stu2_y + 40, 10, 0, Math.PI);
//     ctx.stroke();
  
//     ctx.beginPath();
//     ctx.arc(stu2_x + 115, stu2_y + 40, 20, 0, Math.PI);
//     ctx.arc(stu2_x + 115, stu2_y + 40, 10, 0, Math.PI);
//     ctx.stroke();
//   }

function stu2_city() {
    stu2_house(0, 500, 0.5);
    stu2_house(300, 500, 0.3);
    stu2_house(480, 500, 0.2);
    stu2_house(600, 500, 0.4);
    stu2_house(840, 500, 1);
   
}

function stu2_trans1(stu2_transX, stu2_transY) {
    ctx.save();
    ctx.translate(stu2_transX, stu2_transY);
    stu2_myCar(0, 0);
    ctx.restore();
}

// function stu2_trans2(stu2_transX, stu2_transY) {
//     ctx.save();
//     ctx.translate(stu2_transX, stu2_transY);
//     stu2_myCar2(0, 0);
//     ctx.restore();
// }

function stu2_loop1() {
    stu2_clear();
    stu2_city();
    stu2_trans1(stu2_xc, 700);
    stu2_xc += stu2_vel;

    if(stu2_xc + 150 > vcanvas.width) {
        stu2_vel *= -1;
    }

    if(stu2_xc < 0) {
        stu2_vel *= -1;
    }
}

// function stu2_loop2() {
//     stu2_clear();
//     stu2_city();
//     stu2_trans2(stu2_xc, 700);
//     stu2_xc -= stu2_vel;

//     // if(stu2_xc + 150 > vcanvas.width) {
//     //     stu2_vel *= -1;
//     // }

//     // if(stu2_xc - 30 < 0) {
//     //     stu2_vel *= -1;
//     // }
// }

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    setInterval(stu2_loop1, 33);
    // setInterval(stu2_loop2, 33);
}