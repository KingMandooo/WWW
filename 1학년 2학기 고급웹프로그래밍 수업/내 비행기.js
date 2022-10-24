function drawShip() {
    if (stype === 1) {
        ctx.fillStyle = "green";
        ctx.fillRect(x + 40, y - 5, 20, 10);
    }
    if (stype > 1) {
        ctx.fillStyle = "green";
        ctx.fillRect(x + 10, y - 15, 10, 30);
    }
    if (stype === 3) {
        ctx.fillStyle = "green";
        ctx.fillRect(x, y - 20, 10, 40);
    }

    ctx.beginPath();
    ctx.moveTo(x - 15, y);
    ctx.lineTo(x, y - 15);
    ctx.lineTo(x + 60, y);
    ctx.lineTo(x, y + 15);
    ctx.closePath();
    ctx.fillStyle="red";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + 60, y);
    ctx.lineTo(x + 40, y - 4);
    ctx.lineTo(x + 40, y + 4);
    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x - 30, y - 8);
    ctx.lineTo(x - 10, y - 8);
    ctx.lineTo(x - 10, y - 13);
    ctx.lineTo(x - 15, y - 13);
    ctx.closePath();
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x - 30, y + 8);
    ctx.lineTo(x - 10, y + 8);
    ctx.lineTo(x - 10, y + 13);
    ctx.lineTo(x - 15, y + 13);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 10, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "skyblue";
    ctx.fill();
}
