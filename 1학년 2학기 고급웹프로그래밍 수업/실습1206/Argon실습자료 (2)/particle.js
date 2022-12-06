var particle = [];

function b2v(a, b) {
    return a + (b - a) * Math.random();
}

function createParticle(a) {
    var i, nop, x, y, wh, color, d1, d2, velx, vely;
    nop = 200;
    for(i = 0; i < nop; i++) {
        x = a.x + b2v(0, a.wh);
        y = a.y + b2v(0, a.wh);
        wh = b2v(1, 5);
        color = a.c + Math.round(Math.random() * 10);  // arrEnemy의 색조 값을 가져오기
        // 뒤에 값을 더해주는 건 색깔을 비슷하지만 뭔가 더 효과를 부여하기 위해 하는거 같다.
        d1 = b2v(30, 120);
        d2 = b2v(30, 120);  // 그냥 이 값이 가장 자연스러움(교수님의 경험치)

        velx = (7 - wh) / 3 * b2v(-1, 1);  // 이것도 교수님 경험치(그냥 외우라는 말)
        vely = (7 - wh) / 3 * b2v(-1, 1);
        
        particle.push({px: x, py: y, pwh: wh, pc: color, d1: d1, d2: d2, pvx: velx, pvy: vely});
    }
}

function updateParticle() {   // 계수의 역할을 하는 k (속도를 조절해줌) 이거 꼼꼼히 보기 너무 계속 강조함
    var i, k = 1;
    for(i = 0; i < particle.length; i++) {
        particle[i].px += k * particle[i].pvx;  // 파편 사방으로 튀게하기
        particle[i].py += k * particle[i].pvy; 

        particle[i].d1 -= k * 2; // 검게 타게함

        if(particle[i].d1 < 0) {   // 완전히 검게 되면 제거하기
            particle.splice(i, 1);
        }
    }
}

function drawParticle() {
    var i, hue, lightness;
    for(i = 0; i < nop; i++) {
        hue = particle[i].pc;
        lightness = 80 * particle[i].d1 / particle[i].d2;  // 80 또한 경험치 (이게 가장 자연스럽다고 판단)
        // ctx.fillStyle = "white";
        ctx.fillStyle = "hsl(" + hue + ", 100%, " + lightness + "%)";
        ctx.fillRect(particle[i].px, particle[i].py, particle[i].px + particle[i].pwh, particle[i].py + particle[i].pwh);
    }
}

// arrEnemy.splic(i, 1) 지우기 전에 createParticle(arrEnemy[i]); 해주기