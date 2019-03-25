const scope = () => {
  class DinoAI {
    constructor(runner) {
      this.jumpKeyEvent = new KeyboardEvent('keydown', { keyCode: 32, which: 32 });
      this.duckKeyEvent = new KeyboardEvent('keydown', { keyCode: 40, which: 40 });
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
            this.handleCactus();
            break;
          case 'PTERODACTYL':
            this.handlePterodactyl();
            break;
          default:
            console.log('4This should never print');
        }
      } else if (this.runner.crashed) {
        this.learn();
      }
    }

    handleCactus() {
      // jump, but not if already jumping
      if (this.horizon.obstacles[0].xPos <= CACTUS_CLOSE_PROXIMITY) {
        this.jump();
      }
    }

    handlePterodactyl() {
      // bird is high
      if (this.horizon.obstacles[0].yPos === 100 && this.horizon.obstacles[0].xPos <= PTERODACTYL_CLOSE_PROXIMITY) {
        this.jump();
        // bird is eye-level
      } else if (this.horizon.obstacles[0].yPos === 75 && this.horizon.obstacles[0].xPos <= PTERODACTYL_CLOSE_PROXIMITY) {
        this.jump();
      }
    }

    jump() {
      console.log('injump');
      if (!this.runner.tRex.midair) {
        document.dispatchEvent(this.jumpKeyEvent);
      }
    }

    duck() {
      console.log('induck');
      if (!this.runner.tRex.ducking) {
        console.log('hasducked!');
        document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40, which: 40 }));
        setTimeout(document.dispatchEvent.apply(new KeyboardEvent('keyup', { keyCode: 40, which: 40 }), 10000));
      }
    }

    horizonHasObstacles() {
      return this.horizon.obstacles.length > 0;
    }

    getFirstObstacle() {
      return this.horizon.obstacles[0];
    }
  }

  const dino = new DinoAI(Runner);
  // dino.duck();
  // dino.jump();
  setInterval(dino.run, 0);

  // const jumpthing = () => {
  //   var evt = new KeyboardEvent('keydown', { 'keyCode': 32, 'which': 32 });

  //   if (Runner.instance_.horizon.obstacles.length && Runner.instance_.horizon.obstacles[0].xPos <= 100)
  //     document.dispatchEvent(evt)
  // }
}

module.exports = `(${scope.toString()})()`;
