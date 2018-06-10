// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of the instances
  this.x = x;
  this.y = y;
  this.speed = speed;
  // The image/sprite  uses a helper to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Updates the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

  this.x += this.speed * dt;
  //Resetting the position when enemy goes off the canvas
  if(this.x > 505){
    this.x = -100;
    this.speed = 100 + Math.floor(Math.random() * 300);
  }
  //Collision between player and enemies
  if (player.x < this.x + 60 &&
    player.x + 37 > this.x &&
    player.y < this.y + 25 &&
    30 + player.y > this.y) {
      player.x = 200;
      player.y = 380;
    }
  };

  // Draw the enemy on the screen, required method for game
  Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  //player class
  var Player = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
  };

  //Prevent player from moving out of the canvas
  Player.prototype.update = function() {
    if (this.y > 450) {
      this.y = 450;
    }

    if (this.x > 400) {
      this.x = 400;
    }

    if (this.x < 0) {
      this.x = 0;
    }

    // player reaching top of canvas and winning the game
    if (this.y < 0) {
      this.x = 200;
      this.y = 380;
    }
  };

  Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  var allEnemies = [];

  // Position "y" where the enemies will are created
  var enemyPosition = [60, 130, 215];
  var player = new Player(200, 380, 50);
  var enemy;

  enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
  });
  // This listens for key presses and sends the keys to your
  // Player.handleInput() method.

  Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
      case 'left':
      this.x -= this.speed + 50;
      break;
      case 'up':
      this.y -= this.speed + 30;
      break;
      case 'right':
      this.x += this.speed + 50;
      break;
      case 'down':
      this.y += this.speed + 30;
      break;
    }
  };
  document.addEventListener('keyup', function(e) {
    var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
  });
