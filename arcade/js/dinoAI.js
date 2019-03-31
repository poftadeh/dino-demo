class DinoAI {
  constructor(runner) {
    this.jumpKeyDown = new KeyboardEvent('keydown', { keyCode: 32, which: 32 });
    this.jumpKeyUp = new KeyboardEvent('keyup', { keyCode: 32, which: 32 });
    this.duckKeyDown = new KeyboardEvent('keydown', { keyCode: 40, which: 40 });
    this.duckKeyUp = new KeyboardEvent('keyup', { keyCode: 40, which: 40 });
    this.runner = runner.instance_;
    this.horizon = runner.instance_.horizon;
    this.jump = this.jump.bind(this);
    this.run = this.run.bind(this);
    this.cactusSmallProximity = 150;
    this.cactusLargeProximity = 150;
    this.pterodactylProximity = 150;
  }

  learn() {
    if (this.horizon.obstacles[0].type === 'CACTUS_SMALL') {
      this.cactusSmallProximity = this.runner.tRex.midair ? this.cactusSmallProximity - 1 : this.cactusSmallProximity + 1;
    }
  }

  run() {
    if (!this.runner.crashed && this.horizonHasObstacles()) {
      switch (this.horizon.obstacles[0].typeConfig.type) {
        case 'CACTUS_SMALL':
        case 'CACTUS_LARGE':
          this.dodgeCactus();
          break;
        case 'PTERODACTYL':
            this.dodgePterodactyl();
          break;
        default:
          console.log('This should never print');
      }
    } else if (this.runner.crashed) {
      //this.learn();
      setTimeout(() => document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: 32, which: 32 })), 2000);
    }
  }

  dodgeCactus() {
    // jump, but not if already jumping
    if (this.horizon.obstacles[0].xPos <= this.cactusLargeProximity) {
      this.jump();
    }
  }

  dodgePterodactyl() {
    if (this.horizon.obstacles[0].xPos > this.pterodactylProximity) {
      return;
    }

    // bird is high
    if (this.horizon.obstacles[0].yPos === 75) {
      this.duck();
      // bird is eye-level
    } else if (this.horizon.obstacles[0].yPos > 75) {
      this.jump();
    } 
  }

  jump() {
    if (!this.runner.tRex.jumping || this.runner.crashed) {
      console.log('jumping!');
      document.dispatchEvent(this.jumpKeyDown);
      //setTimeout(() => document.dispatchEvent(this.jumpKeyUp), 600);
    }
  }

  duck() {
    if (!this.runner.tRex.ducking) {
      console.log('hasducked!');
      document.dispatchEvent(this.duckKeyDown);
      setTimeout(() => document.dispatchEvent(this.duckKeyUp), 250);
    }
  }

  horizonHasObstacles() {
    return this.horizon.obstacles.length > 0;
  }
}



