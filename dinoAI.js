const scope = () => {


  const CATCTUS_CRITICAL_DISTANCE = 85;

  class DinoAI {
    constructor(runner) {
      this.jumpKeyEvent = new window.KeyboardEvent('keydown', { keyCode: 32, which: 32 });
      this.duckKeyEvent = new KeyboardEvent('keydown', { keyCode: 40, which: 40 });
      this.runner = runner;
      // this.horizon = runner.instance_.horizon;
      this.jump = this.jump.bind(this);
      this.run = this.jump.bind(this);
      console.log('LOGG', this.jumpKeyEvent, this.duckKeyEvent);
    }

    run() {
      console.log(this, this.jumpKeyEvent);
    }

    jump() {
      console.log('injump', this.jumpKeyEvent);
      document.dispatchEvent(this.jumpKeyEvent);
    }

    duck() {
      document.dispatchEvent(this.duckKeyEvent);
    }

    horizonHasObstacles() {
      return this.horizon.obstacles.length > 0;
    }

    getFirstObstacle() {
      return this.horizon.obstacles[0];
    }
  }

  const dino = new DinoAI();
  dino.run();
  dino.jump();

  setInterval(dino.jump, 0);

  // const jumpthing = () => {
  //   var evt = new KeyboardEvent('keydown', { 'keyCode': 32, 'which': 32 });

  //   if (Runner.instance_.horizon.obstacles.length && Runner.instance_.horizon.obstacles[0].xPos <= 100)
  //     document.dispatchEvent(evt)
  // }
}

module.exports = `(${scope.toString()})()`;
