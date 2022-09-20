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

/* 키보드 이벤트 타입
    onkeydown : 키를 눌렀을 때 발생, 물리키에 반응, 현재 눌린 문자와는 상관없이 물리 키에만 반응

    onkeyup : 키를 떼었을 때 발생
    
*/ 
              ✅ document 객체 : document 객체는 웹 페이지 그 자체를 의미한다.
                                  웹 페이지에 존재하는 HTML 요소에 접근하고자 할 때는 반드시 Document 객체부터 시작해야 한다.
                                  
                
