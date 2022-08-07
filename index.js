const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let yPosL = 150;
let yPosR = 150;

let xBall = 400;
let yBall = 200;

let direction = 0;
let angle = 0;

direction = Math.floor(Math.random() * 5) + 3;
angle = Math.floor(Math.random() * 359) + 1;

let paddleSpeed = 10;

function drawGame()
{
    let result = isGameOver();

    if (result)
    {
        return;
    }

    clearScreen();

    drawLeftPaddle();
    drawRightPaddle();

    checkCollision();
    drawBall();
    calculateBallPos();

    setTimeout(drawGame, 1000 / 60);
}

function clearScreen()
{
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);

    //draw dotted line
    ctx.fillStyle = "white";
    ctx.fillRect(395, 0 + 10, 10, 20);
    ctx.fillRect(395, 40 + 10, 10, 20);
    ctx.fillRect(395, 80 + 10, 10, 20);
    ctx.fillRect(395, 120 + 10, 10, 20);
    ctx.fillRect(395, 160 + 10, 10, 20);
    ctx.fillRect(395, 200 + 10, 10, 20);
    ctx.fillRect(395, 240 + 10, 10, 20);
    ctx.fillRect(395, 280 + 10, 10, 20);
    ctx.fillRect(395, 320 + 10, 10, 20);
    ctx.fillRect(395, 360 + 10, 10, 20);
    ctx.fillRect(395, 400 + 10, 10, 20);
}

function isGameOver()
{
    if (xBall <= 0)
    {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        ctx.fillText("Player 2 Wins!", canvas.width / 3, canvas.height / 3);
        return true;
    }

    if (xBall >= 800)
    {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        ctx.fillText("Player 1 Wins!", canvas.width / 3, canvas.height / 3);
        return true;
    }

    return false;
}

function drawBall()
{
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(xBall, yBall, 5, 0, Math.PI * 2);
    ctx.fill();
}

function checkCollision()
{
    if (yBall <= 0 || yBall >= 400)
    {
        angle *= -1;
    }

    if (xBall <= 110)
    {
        if (yBall >= yPosL && yBall <= yPosL + 100)
        {
            direction *= -1;
            angle *= -1;
            console.log("Hit paddle!");
        }
    }

    if (xBall + 10 >= 710)
    {
        if (yBall >= yPosR && yBall <= yPosR + 100)
        {
            direction *= -1;
            angle *= -1;
            console.log("Hit paddle!");
        }
    }
}

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function calculateBallPos()
{
    xBall += direction * Math.cos(degrees_to_radians(angle));
    yBall += direction * Math.sin(degrees_to_radians(angle));
}

function drawLeftPaddle()
{
    ctx.fillStyle = "white";
    ctx.fillRect(100, yPosL, 10, 100);
}

function drawRightPaddle()
{
    ctx.fillStyle = "white";
    ctx.fillRect(700, yPosR, 10, 100);
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event)
{
    //up
    if (event.keyCode == 87 && yPosL != 0)
    {
        yPosL -= paddleSpeed;
    }

    //down
    if (event.keyCode == 83 && yPosL != 300)
    {
        yPosL += paddleSpeed;
    }

    //up right
    if (event.keyCode == 38 && yPosR != 0)
    {
        yPosR -= paddleSpeed;
    }

    //down right
    if (event.keyCode == 40 && yPosR != 300)
    {
        yPosR += paddleSpeed;
    }
}

drawGame();