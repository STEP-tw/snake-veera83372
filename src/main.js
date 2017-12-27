let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;


const doesSnakeCollidedWithWall = function (position) {
  let maxX=numberOfCols-1;
  let maxY=numberOfRows-1;
  return !position.isItBetweenMaxAndMinCoord(maxX,maxY);
}

const doesSnakeCollided = function (head) {
  return (doesSnakeCollidedWithWall(head)||snake.isEatingItself());
}

const stopGameIfSnakeCollided = function (head) {
  if(doesSnakeCollided(head)) stopGame();
}

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  stopGameIfSnakeCollided(head);
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }


}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}

let stopGame=function () {
  clearInterval(animator);
  let replay=document.getElementById('replay');
  replay.onclick=restartGame;
  replay.style['visibility']="visible";
}

const restartGame= function () {
  location.reload();
}

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
