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
    this.duckCount = 0;
    this.jumpCount = 0;
  }

  learn() {
    if (this.horizon.obstacles[0].type === 'CACTUS_SMALL') {
      this.cactusSmallProximity = this.runner.tRex.midair ? this.cactusSmallProximity - 1 : this.cactusSmallProximity + 1;
    }
  }

  addBar(id) {
    const element = document.querySelector(id);
    const bar = document.createElement('span').classList.add('bar');
    element.appendChild(bar);
  }

  run() {
    this.updateCounter('speed-stats', this.runner.currentSpeed.toFixed(2));
    this.updateCounter('distance-stats', Math.round(this.runner.distanceRan / 100));
    if (!this.runner.crashed && this.horizonHasObstacles()) {
      this.updateCounter('width-stats', this.horizon.obstacles[0].width);
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
      this.updateCounter('crash-stats', this.runner.playCount);
      setTimeout(() => {
        this.resetCounters();
        document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: 32, which: 32 }))
      }, 2000);
    }
  }

  resetCounters() {
    this.jumpCount = 0;
    this.duckCount = 0;
    this.updateCounter('jump-stats', 0);
    this.updateCounter('duck-stats', 0);
  }

  dodgeCactus() {
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
      this.updateCounter('jump-stats', ++this.jumpCount)
      //setTimeout(() => document.dispatchEvent(this.jumpKeyUp), 600);
    }
  }

  duck() {
    if (!this.runner.tRex.ducking) {
      console.log('hasducked!');
      this.updateCounter('duck-stats', ++this.duckCount)
      document.dispatchEvent(this.duckKeyDown);
      setTimeout(() => document.dispatchEvent(this.duckKeyUp), 250);
    }
  }

  updateCounter(id, count) {
    document.querySelector(`#${id} > .bar-number`).textContent = count;
  }

  horizonHasObstacles() {
    if (this.horizon.obstacles.length > 0) {
      const obstacle = this.horizon.obstacles[0].typeConfig.type.split("_")[0].toLowerCase();
      document.querySelector("#obstacle-image").setAttribute("src", `./images/${obstacle}.svg`);
      return true;
    } else {
      return false;
    }
  }
}



