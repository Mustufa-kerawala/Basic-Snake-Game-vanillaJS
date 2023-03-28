// Define the canvas and context variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Define the snake and food variables
var snake = [{x: 200, y: 200}];
var food = {x: 0, y: 0};

// Set the initial direction of the snake
var direction = "right";

// Generate a random location for the food
function generateFood() {
  food.x = Math.floor(Math.random() * 39) * 10;
  food.y = Math.floor(Math.random() * 39) * 10;
}

// Check if the snake has collided with the wall or itself
function checkCollision() {
  if (snake[0].x < 0 || snake[0].x >= canvas.width || 
      snake[0].y < 0 || snake[0].y >= canvas.height) {
    return true;
  }
  for (var i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      return true;
    }
  }
  return false;
}

// Update the position of the snake and check for collisions
function update() {
  // Move the snake in the current direction
  var head = {x: snake[0].x, y: snake[0].y};
  switch (direction) {
    case "up":
      head.y -= 10;
      break;
    case "down":
      head.y += 10;
      break;
    case "left":
      head.x -= 10;
      break;
    case "right":
      head.x += 10;
      break;
  }
  snake.unshift(head);
  
  // Check if the snake has collided with the food
  if (snake[0].x == food.x && snake[0].y == food.y) {
    generateFood();
  } else {
    snake.pop();
  }
  
  // Check for collisions with the wall or the snake's body
  if (checkCollision()) {
    clearInterval(interval);
    alert("Game Over!");
  }
}

// Draw the snake and the food on the canvas
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw the snake
  for (var i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }
  
  // Draw the food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);
}

// Handle key presses to change the direction of the snake
document.addEventListener("keydown", function(event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction != "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction != "up") {
        direction = "down";
     
      }
        break;
    case "ArrowLeft":
        if (direction != "right") {
        direction = "left";
        }
        break;
    case "ArrowRight":
        if (direction != "left") {
        direction = "right";
        }
        break;
    }
});

// Call the update and draw functions every 100 milliseconds
var interval = setInterval(function() {
    update();
    draw();
    }, 100);

// Generate the first piece of food
generateFood();

// Draw the first frame
draw();

// Path: index.html