let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const isValidXcord = function (xCordOfHead) {
  return xCordOfHead >0 && xCordOfHead<numberOfCols-1;
}

const isValidYcord = function (yCordOfHead) {
  return yCordOfHead >0 && yCordOfHead < numberOfRows-1;
}

const isItWallBorder = function (position) {
  let coord=position.getCoord();
  return !(isValidXcord(coord[0])&&isValidYcord(coord[1]));
}

const isHeadTouchingWall = function (position) {
  return isItWallBorder(position);
}

const doesHeadAtInavlidPos = function (head) {
  return (isHeadTouchingWall(head)||snake.isHeadEatingBody());
}

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(doesHeadAtInavlidPos(head))
    stopGame();
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
