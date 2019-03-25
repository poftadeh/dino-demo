const scope = () => {


  const CATCTUS_CRITICAL_DISTANCE = 85;

  class DinoAI {
    constructor(runner) {
      this.jumpKeyEvent = new KeyboardEvent('keydown', { keyCode: 32, which: 32 });
      this.duckKeyEvent = new KeyboardEvent('keydown', { keyCode: 40, which: 40 });
      this.runner = runner.instance_;
      this.horizon = runner.instance_.horizon;
      this.jump = this.jump.bind(this);
      this.run = this.run.bind(this);
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
          default:
        }
      }
    }

    handleCactus() {
      // jump, but not if already jumping
      if (this.horizon.obstacles[0].xPos <= 100) {
        this.jump();
      }
    }

    handlePterodactyl() {
      // bird is high
      if (this.horizon.obstacles[0].yPos === 100 && this.horizon.obstacles[0].xPos <= 100) {
        this.jump();
        // bird is eye-level
      } else if (this.horizon.obstacles[0].yPos === 75 && this.horizon.obstacles[0].xPos <= 100) {
        this.duck();
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
        document.dispatchEvent(this.duckKeyEvent);
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

  setInterval(dino.run, 0);

  // const jumpthing = () => {
  //   var evt = new KeyboardEvent('keydown', { 'keyCode': 32, 'which': 32 });

  //   if (Runner.instance_.horizon.obstacles.length && Runner.instance_.horizon.obstacles[0].xPos <= 100)
  //     document.dispatchEvent(evt)
  // }
}

module.exports = `(${scope.toString()})()`;
