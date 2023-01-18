const cnv = document.getElementById('cnv');
const ctx = cnv.getContext('2d');
var box = 12;
let snake = [];
snake[0] = { x: 10 * box, y: 40 * box }
let food = { x: Math.floor(Math.random() * (49 - 2) + 2) * box, y: Math.floor(Math.random() * (49 - 6) + 6) * box }
let footimg = new Image();
footimg.src = 'food.png'
let eat = new Audio();
eat.src = 'eat.mp3'
let dead = new Audio('dead.mp3')
let score = 0
let dir;
function draw() {
    ctx.fillStyle = 'khaki'
    ctx.fillRect(0, 0, 600, 600)
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "red" : "black";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.fillStyle = 'red';
    ctx.drawImage(footimg, food.x, food.y)
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, 50 * box, 6 * box)
    ctx.lineWidth = box * 2
    ctx.strokeStyle = 'green'
    ctx.strokeRect(0, 0, box * 50, box * 50)



    let hX = snake[0].x;
    let hY = snake[0].y;
    if (dir == "left") hX -= box;
    if (dir == "up") hY -= box;
    if (dir == "right") hX += box;
    if (dir == "down") hY += box;

    if (hX == food.x && hY == food.y) {
        eat.play()
        score++;
        food = { x: Math.floor(Math.random() * (49 - 2) + 2) * box, y: Math.floor(Math.random() * (49 - 6) + 6) * box }
    } else {
        snake.pop();

    }
    let newHead = {
        x: hX, y: hY
    }
    if (hX < box || hX > box * 48 || hY < box * 6 || hY > box * 48 || collisn(newHead, snake)) {
        ctx.fillStyle = 'blue'
        ctx.font = '50px Changa'
        if (localStorage.getItem('highscore') == null || parseInt(localStorage.getItem('highscore')) < score) {
            localStorage.setItem('highscore', score)
            ctx.fillText("Snake Master",13*box,20*box)
            ctx.font = '15px Changa'
            ctx.fillText("Press Enter to restart",13*box,30*box)
            ctx.font = '50px Changa'
            ctx.fillText(`${score}`, 13 * box, 25 * box)
        }else{
            ctx.fillText("Your Score",13*box,20*box)
            ctx.font = '15px Changa'
            ctx.fillText("Press Enter to restart",13*box,30*box)
            ctx.font = '50px Changa'
            ctx.fillText(`${score}`, 13 * box, 25 * box)
        }
        dead.play()
        ctx.fillStyle = 'rgba(255,145,0,0.5)'
        ctx.fillRect(5*box,12*box, 40 * box, 20 * box)
        clearInterval(game)
        document.onkeydown = function restart(event) {
            if (event.keyCode == 13) {
                food = { x: Math.floor(Math.random() * (49 - 2) + 2) * box, y: Math.floor(Math.random() * (49 - 6) + 6) * box }
                snake = [{ x: 10 * box, y: 40 * box }]
                score = 0
                game = setInterval(draw, 100)
                dir = ''
            }
        }

    }
    snake.unshift(newHead)

    ctx.fillStyle = 'white'
    ctx.font = '50px Changa'
    ctx.fillText(`${score}`, box * 3, box * 4)
    ctx.fillText(`${localStorage.getItem('highscore')}`,box*45,box*4);


}
function direction(event) {
    switch (event.keyCode) {
        case 37:
            if (dir != 'right') {
                dir = 'left'
            }
            break;
        case 38:
            if (dir != 'down') {
                dir = 'up'
            } break;
        case 39:
            if (dir != 'left') {
                dir = 'right'
            } break;
        case 40:
            if (dir != 'up') {
                dir = 'down'
            } break;

        default:
            break;
    }

}
document.addEventListener('keydown', direction)
function collisn(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false
}
let game = setInterval(draw, 100)
function direc(dire) {
    dir = dire;
}