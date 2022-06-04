var vcanvas, ctx; 

function 선태욱(x, y) {
    vcanvas = document.getElementById("house"); 
    ctx = vcanvas.getContext("2d");   
    
    // 값
    x = 200;  
    y = 400;

    // 집 본체
    ctx.beginPath();
    ctx.moveTo(x, y); 
    ctx.lineTo(x, y + 300);
    ctx.lineTo(x + 600, y + 300);
    ctx.lineTo(x + 600, y);
    ctx.lineTo(x, y);
    ctx.fillStyle = "yellow";
    ctx.stroke(); 
    ctx.fill();

    // 지붕
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 250);
    ctx.lineTo(x + 500, y);
    ctx.fillStyle = "red";
    ctx.stroke(); 
    ctx.fill();

    // 굴뚝
    ctx.beginPath();
    ctx.moveTo(x + 500, y);
    ctx.lineTo(x + 500, y - 200);
    ctx.lineTo(x + 570, y - 200);
    ctx.lineTo(x + 570, y);
    ctx.stroke(); 
    ctx.fillStyle = "black";
    ctx.stroke(); 
    ctx.fill();

    // 창문
    ctx.beginPath();
    ctx.arc(x + 200, y + 120, 100, 0, Math.PI * 2);
    ctx.fillStyle="skyblue";
    ctx.fill();
    ctx.stroke(); 

    ctx.beginPath();
    ctx.moveTo(x + 200 , y + 20);  
    ctx.lineTo(x + 200, y + 220);
    ctx.moveTo(x + 300, y + 120);
    ctx.lineTo(x + 100, y + 120);
    ctx.stroke(); 

    //문
    ctx.beginPath();
    ctx.moveTo(x + 450, y + 300);  
    ctx.lineTo(x + 450, y + 100);
    ctx.lineTo(x + 550, y + 100);
    ctx.lineTo(x + 550, y + 300);
    ctx.fillStyle = "lightyellow";
    ctx.stroke(); 
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 530, y + 200, 7, 0, Math.PI * 2);
    ctx.fillStyle="black";
    ctx.fill();
}
