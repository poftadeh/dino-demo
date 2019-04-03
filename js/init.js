document.body.classList.add('offline');
new Runner('.interstitial-wrapper');
const dino = new DinoAI(Runner);
// dino.duck();
dino.jump();
setInterval(dino.run, 0);