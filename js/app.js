
// ================================= ENEMY Class ===================================

class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  };

  update(deltaTime) {
    // random individual speed for each enemy object
    let random = Math.floor(Math.random() * 10) + 5;
    this.x += this.speed * deltaTime;

    if( this.x > 500){ //if enemy is out of canvas
        this.x = -100;
        this.speed = 50 * random; // new random speed is provided
    }

    this.checkCollisions();
  };

  checkCollisions() {
    if (   this.x + 80 > player.x
        && this.x - 80 < player.x
        && this.y + 50 > player.y
        && this.y - 50 < player.y) {
          // player re-enters initial position if hit by enemy
          player.x = 200;
          player.y = 400;
    }
  };

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

}

// ================================= PLAYER Class ===================================

class Player {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
  };

  update(deltaTime){}

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  checkWinning() {
    if (this.y < 0){
        alert("Nice - You made it!");

        // Reset player position
        this.x = 200;
        this.y = 400;
      }
  }

  handleInput(key) {
    const moveRange = {
      x      : 100,
      y      : 85,
      boundX : 300,
      boundY : 400
    }

    // Move player on the canvas. No action if player tries to move outside bounds
    switch (key) {

      case 'right':
        if (this.x > moveRange.boundX) {
            break;
        } else {
            this.x += moveRange.x;
        }   break;

      case 'left':
        if (this.x < moveRange.x) {
            break;
        } else {
            this.x -= moveRange.x;
        }   break;

      case 'up':
          this.y -= moveRange.y;
          this.checkWinning();
            break;

      case 'down':
        if (this.y >= moveRange.boundY) {
            break;
          } else {
              this.y += moveRange.y;
          } break;
        }
      }
    };

    // ========================== INIT GAME ================================== //

    const player = new Player();
    const allEnemies = [];
    const numOfEnemies = 3;
    let yPos = 0;
    for (let i = 0 ; i < numOfEnemies; i++){
        yPos += 70;
        // If more enemies are added in the future...
        if(yPos > 210) {
          yPos = 70;
        }
        // Init enemy objects
        allEnemies.push(new Enemy(501, yPos, 0));
    }



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
