-------------------------------------
'use strict';
var vcanvas, ctx;

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");
}

function set_key(event) {        🎈🎈
    if(event.keyCode) {            // 만약 event.keyCode가 들어오면 if문 실행
        ctx.font = "30px Georgia";
        ctx.fillText("keyCode : " + event.keyCode, 200, 200);
    }
}   

function stop_key(event) {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

document.onkeydown = set_key;  // 물리키를 눌렀을 때 set_key() 함수 발생 
document.onkeyup = stop_key;   // 물리키를 땟을 때 stop_key() 함수 발생
-------------------------------------

/* 키보드 이벤트 타입
    onkeydown : 키를 눌렀을 때 발생, 물리키에 반응, 현재 눌린 문자와는 상관없이 물리 키에만 반응

    onkeyup : 키를 떼었을 때 발생
    
*/ 
              ✅ document 객체 : document 객체는 웹 페이지 그 자체를 의미한다.
                                  웹 페이지에 존재하는 HTML 요소에 접근하고자 할 때는 반드시 Document 객체부터 시작해야 한다.
                                  
                
               ✳️ Q. set_key와 stop_key 함수에서 매개변수 event는 도대체 무엇일까?

                   A. 이벤트 실행시, 이벤트에 등록된 함수가 실행된다.
                      이때 이 함수에 event 객가 매개변수로 주어진다는 뜻이다.
                      사용자는 코드에서 이를 받아도되고 받지 않아도 됩니다. 
                      
                      매개변수 이므로 꼭 변수명을 'event'로 사용할 필요는 없지만 보통 이벤트 객체의 의미로 'event'나 'e'로 많이 사용한다.

                    bt.onclick = function(event) {  // 이런 식으로..
                      event.속성
                      event.메서드
                    }
                             


--------------------------
'use strict';
var vcanvas, ctx;
var x, y;
var vel = 8;

function drawShip(sx, sy) {  // 비행선 함수
    ctx.beginPath();
    ctx.moveTo(sx - 15, sy);
    ctx.lineTo(sx, sy - 15);
    ctx.lineTo(sx + 60, sy);
    ctx.lineTo(sx, sy + 15);
    ctx.closePath();
    ctx.fillStyle="red";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(sx + 60, sy);
    ctx.lineTo(sx + 40, sy - 4);
    ctx.lineTo(sx + 40, sy + 4);
    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(sx - 30, sy - 8);
    ctx.lineTo(sx - 10, sy - 8);
    ctx.lineTo(sx - 10, sy - 13);
    ctx.lineTo(sx - 15, sy - 13);
    ctx.closePath();
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(sx - 30, sy + 8);
    ctx.lineTo(sx - 10, sy + 8);
    ctx.lineTo(sx - 10, sy + 13);
    ctx.lineTo(sx - 15, sy + 13);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(sx + 10, sy, 5, 0, Math.PI * 2);
    ctx.fillStyle = "skyblue";
    ctx.fill();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    x = 200;
    y = 200;

    drawShip(x, y);
}

function 움직이기(event) {                   
    if(event.keyCode === 37) { x -= vel; }  // Left
    if(event.keyCode === 38) { y -= vel; }  // UP
    if(event.keyCode === 39) { x += vel; }  // Right
    if(event.keyCode === 40) { y += vel; }  // Down

    drawShip(x, y);
}

function 가만히(event) {
    
}

document.onkeydown = 움직이기;
document.onkeyup = 가만히;
--------------------------------
