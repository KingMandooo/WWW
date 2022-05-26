var vcanvas, ctx; 
var pi = pi * Math.PI;

function myLine(x1, y1, x2, y2) {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();      
}

function myCircle(x1, y1, x2, y2, pi) {
    ctx.beginPath();
    ctx.arc(x1, y1, x2, y2, pi);
    ctx.stroke();      
}

function myHouse() {
    vcanvas = document.getElementById("house"); 
    ctx = vcanvas.getContext("2d");  

    // 집 모양
    myLine(200,400,200,700); 
    myLine(200,700,800,700);
    myLine(800,700,800,400);
    myLine(800,400,200,400);
    myLine(200,400,200,150);
    myLine(200,150,700,400);
    myLine(700,400,700,200);
    myLine(700,200,770,200);
    myLine(770,200,770,400);

    // 창문
    myCircle(400,520,100,0,10);

    myLine(400,420,400,620);  
    myLine(400,620,400,520);
    myLine(500,520,300,520);

    //문
    myLine(650,700,650,500);  
    myLine(650,500,750,500);
    myLine(750,500,750,700);

    myCircle(730,600,7,0,10);
    ctx.fill();
}