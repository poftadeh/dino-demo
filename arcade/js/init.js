document.body.classList.add('offline');
new Runner('.interstitial-wrapper');
document.querySelector('canvas').tabIndex= 2;
const dino = new DinoAI(Runner);
// dino.duck();
dino.jump();
setInterval(dino.run, 0);