var vcanvas, ctx; 
var pi = pi * Math.PI;

function 선태욱() {
    vcanvas = document.getElementById("house"); 
    ctx = vcanvas.getContext("2d");   
    
    // 집 모양

    // 집 본체
    ctx.beginPath();
    ctx.moveTo(200,400); 
    ctx.lineTo(200,700);
    ctx.lineTo(800,700);
    ctx.lineTo(800,400);
    ctx.lineTo(200,400);
    ctx.fillStyle = "yellow";
    ctx.stroke(); 
    ctx.fill();

    // 지붕
    ctx.beginPath();
    ctx.moveTo(200,400);
    ctx.lineTo(200,150);
    ctx.lineTo(700,400);
    ctx.fillStyle = "red";
    ctx.stroke(); 
    ctx.fill();

    // 굴뚝
    ctx.beginPath();
    ctx.moveTo(700,400);
    ctx.lineTo(700,200);
    ctx.lineTo(770,200);
    ctx.lineTo(770,400);
    ctx.stroke(); 
    ctx.fillStyle = "black";
    ctx.stroke(); 
    ctx.fill();

    // 창문
    ctx.beginPath();
    ctx.arc(400, 520, 100, 0, 10);
    ctx.fillStyle="skyblue";
    ctx.fill();
    ctx.stroke(); 

    ctx.beginPath();
    ctx.moveTo(400,420);  
    ctx.lineTo(400,620);
    ctx.moveTo(500,520);
    ctx.lineTo(300,520);
    ctx.stroke(); 

    //문
    ctx.beginPath();
    ctx.moveTo(650,700);  
    ctx.lineTo(650,500);
    ctx.lineTo(750,500);
    ctx.lineTo(750,700);
    ctx.fillStyle = "lightyellow";
    ctx.stroke(); 
    ctx.fill();

    ctx.beginPath();
    ctx.arc(730, 600, 7, 0, 10);
    ctx.fillStyle="black";
    ctx.fill();
}