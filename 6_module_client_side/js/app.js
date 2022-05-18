

// GET ALL GAME COMPONENTS
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let instruction = document.getElementById('instruction')
let playground = document.getElementById('playground')
let inputName = document.getElementById('inputName')
let btnPlay = document.getElementById('btnPlay')
let rewindRange = document.getElementById('rewindRange')
let btnCancel = document.getElementById('btnCancel')
let btnRewind = document.getElementById('btnRewind')
let scoreEl= document.getElementById('score')
let timerEl = document.getElementById('timer')
let alertMessage = document.querySelector('.alert')
let message = document.getElementById('message')
canvas.width = 960
canvas.height = 600

// block
let blocks = []
let row = []
let background
let blockQuantity = {
    x: 48,
    y: 30
}
let blockSize = {
    w: canvas.width / blockQuantity.x,
    h: canvas.height / blockQuantity.y
}

// snake
let snakes = []
let snakeColor = 'yellow'
let snakeBorderColor = 'gray'
let snakePosition = []
let snakeLength  = 6
let snakeTemp
let d = 'right'

// food
let foods = []
let foodColor = 'lightgray'
let foodQuantity = 3



// INTERVAL
let resume = true
let timeGame
let playGame
let time

// GET PLAYER ACTION
inputName.addEventListener('input', (e)=>{
    if(e.target.value == '') btnPlay.setAttribute('disabled', true)
    else btnPlay.removeAttribute('disabled')
})

btnPlay.addEventListener('click', ()=>{
    localStorage.setItem('name', inputName.value)
    instruction.style.display = 'none'
    playground.style.display = 'block'
    init()
    start()
})
rewindRange.addEventListener('input', rewindGame)
btnRewind.addEventListener('click', ()=>{
    removeGameInterval()
    rewindRange.style.display = 'block'
    if(snakePosition.length < 10) {
        rewindRange.setAttribute('max', snakePosition.length -1) 
        rewindRange.value = snakePosition.length -1
    } else {
        rewindRange.setAttribute('max', 10) 
        rewindRange.value = 10
    }
    btnCancel.style.display = 'block'
    alertMessage.style.display = 'none'
})
btnCancel.addEventListener('click', ()=>{
    resumeGame()
    rewindRange.style.display = 'none',
    btnCancel.style.display = 'none'
})

// INIT ALL GAME COMPONENTS
function init() {
    for(let i = 0;i < blockQuantity.y;i++) {
        for(let j = 0;j < blockQuantity.x;j++) {
            background = (j%2==0 && i%2==1) || (j%2==1 && i%2==0) ? '#133954' : '#1c4e6b'
            row.push({
                background,
                x: j * blockSize.w,
                y: i * blockSize.h
            })
        }
        blocks.push(row)
    }

    for(let i = 0;i < snakeLength;i++) {
        snakes.push({
            x: (blockQuantity.x / 2 -i) * blockSize.w,
            y: (blockQuantity.y / 2) * blockSize.h
        })
    }
    for(let i = 0;i < foodQuantity;i++) {
        generateFood()
    }
}

// DRAW ALL GAME COMPONENTS
function drawBlock() {
    blocks.forEach((row,  rowIndex)=>{
        row.forEach((col, colIndex)=>{
            ctx.fillStyle = col.background
            ctx.fillRect(col.x, col.y, blockSize.w, blockSize.h)
        })
    })
}
function drawSnake() {
    snakes.forEach((snake,index)=>{
        ctx.fillStyle = snakeColor
        ctx.strokeStyle = snakeBorderColor
        ctx.fillRect(snake.x, snake.y, blockSize.w, blockSize.h)
        ctx.strokeRect(snake.x, snake.y, blockSize.w, blockSize.h)
    })
}

function drawFood() {
    foods.forEach((food,index)=>{
        ctx.fillStyle = foodColor
        ctx.fillRect(food.x, food.y, blockSize.w, blockSize.h)
    })

    if(foods.length < foodQuantity) {
        generateFood()
    }
}
function draw() {
    drawBlock()
    drawSnake()
    updateSnake()
    drawFood()
    scoreEl.innerText = snakes.length
}
// UPDATE SNAKE
function updateSnake() {
    let snakeX = snakes[0].x
    let snakeY = snakes[0].y

    if(d == 'right') snakeX += blockSize.w
    if(d == 'left') snakeX -= blockSize.w
    if(d == 'down') snakeY += blockSize.h
    if(d == 'up') snakeY -= blockSize.h

    let eat = isSnakeEateFood()
    if(!eat) snakes.pop()

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snakes.unshift(newHead)

    if(snakes[0].x < 0 || snakes[0].x + blockSize.w > canvas.width || snakes[0].y < 0 || snakes[0].y + blockSize.h > canvas.height) gameOver()

    snakes.forEach((snake, index)=>{
        if(index > 0) {
            if(snakes[0].x == snake.x && snakes[0].y == snake.y) gameOver()
        }
    })
}
// GET KEYBOARD ACTION
function direction(e) {
    if(e.key == 'w' && d!='down') {
        d = 'up'
        updateSnake()
    }
    if(e.key == 'a' && d!='right') {
        d = 'left'
        updateSnake()
    }
    if(e.key == 's' && d!='up') {
        d = 'down'
        updateSnake()
    }
    if(e.key == 'd' && d!='left') {
        d = 'right'
        updateSnake()
    }
}
// IS SNAKE EAT FOOD
function isSnakeEateFood() {
    let eaten = false
    let foodEatenIndex
    foods.forEach((food,index)=>{
        if(snakes[0].x == food.x && snakes[0].y == food.y)
        if(index != null) {
            eaten = true
            foodEatenIndex = index
            foods.splice(foodEatenIndex, 1)
        }
    })
    return eaten
}
// GENERATE FOOD
function generateFood() {
    let food = {
        x: Math.floor(Math.random() * blockQuantity.x) * blockSize.w,
        y: Math.floor(Math.random() * blockQuantity.y) * blockSize.h,
    }
    if(snakes.every(snakes=>snakes.x == food.x && snakes.y == food.y)) generateFood()
    foods.push(food)
}
// GAME TIMER
let second = 0
let minute = 0
let hour = 0
function timer() {
    second += 1
    if(second == 60) {
        second = 0
        minute += 1
    } else if(minute == 60) {
        minute = 0
        hour += 1
    }
    time = `${hour < 10 ? 0 : ''}${hour}:${minute < 10 ? 0 : ''}${minute}:${second < 10 ? 0 : ''}${second}`
    timerEl.innerText = time
}
// SAVE SNAKE POSITION
function saveSnakePosition() {
    if(snakePosition.length > 10) {
        snakePosition.splice(0,1)
    }
    let snake = snakes.slice()
    snakePosition.push(snake)
}
// REWIND SNAKE
function rewindGame(e) {
    let index = e.target.value
    if(snakePosition[index] == undefined) {
        snakePosition = snakes
    }
    console.log(snakePosition.length)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawBlock()
    snakePosition[index].forEach((snake,index)=>{
        ctx.fillStyle = snakeColor
        ctx.strokeStyle = snakeBorderColor
        ctx.fillRect(snake.x, snake.y, blockSize.w, blockSize.h)
        ctx.strokeRect(snake.x, snake.y, blockSize.w, blockSize.h)
    })
}
// GAME PLAY
function start() {
    setGameInterval()
}
function setGameInterval() {
    document.addEventListener('keydown', direction)
    document.addEventListener('keydown', (e)=>{
        if(e.code == 'Space') {
            removeGameInterval()
            rewindRange.style.display = 'block'
            if(snakePosition.length < 10) {
                rewindRange.setAttribute('max', snakePosition.length -1) 
                rewindRange.value = snakePosition.length -1
            } else {
                rewindRange.setAttribute('max', 10) 
                rewindRange.value = 10
            }
            btnCancel.style.display = 'block'
            alertMessage.style.display = 'none'
        }
    })
    playGame = setInterval(draw, 250)
    timeGame = setInterval(timer, 1000)
    snakeTemp = setInterval(saveSnakePosition, 250)
}
function resumeGame() {
    if(resume == true) start()
    else {
        ctx.clearRect(0,0,canvas.width,canvas.height)
        drawBlock()
        snakePosition[snakePosition.length - 1].forEach((snake,index)=>{
            ctx.fillStyle = snakeColor
            ctx.strokeStyle = snakeBorderColor
            ctx.fillRect(snake.x, snake.y, blockSize.w, blockSize.h)
            ctx.strokeRect(snake.x, snake.y, blockSize.w, blockSize.h)
        })
    }
}
function removeGameInterval() {
    document.removeEventListener('keydown', direction)
    clearInterval(playGame)
    clearInterval(timeGame)
    clearInterval(snakeTemp)
}
function gameOver() {
    removeGameInterval()
    resume = false
    let playerName = localStorage.getItem('name')
    alertMessage.style.display = 'flex'
    message.innerText = `Game over! Good game ${playerName}, :D your score is ${snakes.length} and your time is ${time}`
}