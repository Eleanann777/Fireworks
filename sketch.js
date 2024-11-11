const fireworks = [];
let gravity;
var isPaused = false;
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  if (isPaused) {
    push();
    testSize(100);
    textAlign(CENTER, CENTER);
    text("PAUSED", width/2, hight/2);
    pop();
} else {
    colorMode(RGB);
    background(0, 0, 0, 25);
    
    if (random(1) < 0.04) {
      fireworks.push(new Firework());
    }
    
    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].show();
      
      if (fireworks[i].done()) {
        fireworks.splice(i, 1);
      }
    }
}
}
function keyPressed() {
 console.log("You pressed: " + key);
  if (key === 'p');
  isPaused = !isPaused;
  }
}
