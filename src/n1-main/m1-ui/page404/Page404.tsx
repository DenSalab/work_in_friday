import {useEffect, useRef} from "react";

export const Page404 = (props: any) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        console.log(canvas);
        // @ts-ignore
        let ctx = canvas.getContext("2d");
        let ballRadius = 10;
        // @ts-ignore
        let x = canvas.width / 2;
        // @ts-ignore
        let y = canvas.height - 30;
        let dx = 2;
        let dy = -2;
        let paddleHeight = 10;
        let paddleWidth = 75;
        // @ts-ignore
        let paddleX = (canvas.width - paddleWidth) / 2;
        let rightPressed = false;
        let leftPressed = false;
        let brickRowCount = 5;
        let brickColumnCount = 3;
        let brickWidth = 75;
        let brickHeight = 20;
        let brickPadding = 10;
        let brickOffsetTop = 30;
        let brickOffsetLeft = 30;
        let score = 0;
        let lives = 3;

        let bricks: any = [];
        for (let c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                bricks[c][r] = {x: 0, y: 0, status: 1};
            }
        }

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        document.addEventListener("mousemove", mouseMoveHandler, false);

        function keyDownHandler(e: any) {
            if (e.code == "ArrowRight") {
                rightPressed = true;
            } else if (e.code == 'ArrowLeft') {
                leftPressed = true;
            }
        }

        function keyUpHandler(e: any) {
            if (e.code == 'ArrowRight') {
                rightPressed = false;
            } else if (e.code == 'ArrowLeft') {
                leftPressed = false;
            }
        }

        function mouseMoveHandler(e: any) {
            // @ts-ignore
            let relativeX = e.clientX - canvas.offsetLeft;
            // @ts-ignore
            if (relativeX > 0 && relativeX < canvas.width) {
                paddleX = relativeX - paddleWidth / 2;
            }
        }

        function collisionDetection() {
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                    let b = bricks[c][r];
                    if (b.status == 1) {
                        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                            dy = -dy;
                            b.status = 0;
                            score++;
                            if (score == brickRowCount * brickColumnCount) {
                                alert("YOU WIN, CONGRATS!");
                                document.location.reload();
                            }
                        }
                    }
                }
            }
        }

        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function drawPaddle() {
            ctx.beginPath();
            // @ts-ignore
            ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function drawBricks() {
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                    if (bricks[c][r].status == 1) {
                        let brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                        let brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "#0095DD";
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }

        function drawScore() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.fillText("Score: " + score, 8, 20);
        }

        function drawLives() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            // @ts-ignore
            ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
        }

        function draw() {
            // @ts-ignore
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBricks();
            drawBall();
            drawPaddle();
            drawScore();
            drawLives();
            collisionDetection();
            // @ts-ignore
            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                dx = -dx;
            }
            if (y + dy < ballRadius) {
                dy = -dy;
            }
            // @ts-ignore
            else if (y + dy > canvas.height - ballRadius) {
                if (x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
                } else {
                    lives--;
                    if (!lives) {
                        alert("GAME OVER");
                        document.location.reload();
                    } else {
                        // @ts-ignore
                        x = canvas.width / 2;
                        // @ts-ignore
                        y = canvas.height - 30;
                        dx = 2;
                        dy = -2;
                        // @ts-ignore
                        paddleX = (canvas.width - paddleWidth) / 2;
                    }
                }
            }
            // @ts-ignore
            if (rightPressed && paddleX < canvas.width - paddleWidth) {
                paddleX += 7;
            } else if (leftPressed && paddleX > 0) {
                paddleX -= 7;
            }

            x += dx;
            y += dy;
            requestAnimationFrame(draw);
        }

        draw();
    }, [])
    const canvasStyles = {
        border: "2px solid #0095DD",
        display: "inline-block",
        margin: "20px"
    }
    return (
        <div style={{textAlign: "center"}}>
            <h1 style={{color: "red"}}>404 page not found...</h1>
            <h2>Time to play :)</h2>
            <canvas id="myCanvas" ref={canvasRef} width="480" height="320" style={canvasStyles}/>
        </div>
    )
}
