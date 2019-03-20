const CATCTUS_CRITICAL_DISTANCE = 85;

export default class DinoAI {
  constructor(runner, horizon, document) {
    this.jumpKeyEvent = new KeyboardEvent('keydown', { keyCode: 32, which: 32 });
    this.duckKeyEvent = new KeyboardEvent('keydown', { keyCode: 40, which: 40 });
    this.runner = runner;
    this.horizon = horizon;
    this.document = document;
  }

  run() {

  }

  cactusIsClose() {
    return 
  }

  jump() {
    this.document.dispatchEvent(this.jumpKeyEvent);
  }

  duck() {
    this.document.dispatchEvent(this.duckKeyEvent);
  }
}


const jumpthing = () => {
  var evt = new KeyboardEvent('keydown', { 'keyCode': 32, 'which': 32 });

  if (Runner.instance_.horizon.obstacles.length && Runner.instance_.horizon.obstacles[0].xPos <= 100)
    document.dispatchEvent(evt)
}