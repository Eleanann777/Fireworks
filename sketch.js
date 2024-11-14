const fireworks = [];
let gravity;
var isPaused = false;
const craters = [];
const buildings = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  // Draw background stuff, pass in an Alpha level for the fill colors to allow the fireworks to shine through.
  drawBackground(100);
  
  if (isPaused) {
    push();
    textSize(100);
    textAlign(CENTER, CENTER);
    text("PAUSED", width/2, height/2);
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

function drawBackground(alpha) {
  push();
  // Switch to RGB color mode since it's easier to use
  colorMode(RGB);
  // Can add more stuff to the background here
  drawMoon(alpha);
  drawSkyline(alpha);
  pop();
}

function drawMoon(alpha) {
  push();
  const moonRadius = min(width, height) / 5;
  const moonX = width / 3;
  const moonY = height / 2.5;
  
  noStroke();
  // Make sure to use the opacity for all fills
  fill(200, alpha);
  circle(moonX, moonY, moonRadius);
  fill(100, alpha);
  
  // Clip the craters to the moon
  drawingContext.save();
  push();
  circle(moonX, moonY, moonRadius);
  pop();  
  drawingContext.clip();
  
  // Craters
  // Make the craters the first time, but after that draw the same ones
  if (craters.length === 0) {
    const numCraters = 10;
    for (let i = 0; i < numCraters; ++i) {
      let craterWidth = random(moonRadius / 4, moonRadius / 1.5);
      let craterHeight = random(moonRadius / 4, moonRadius / 1.5);
      let craterX = moonX + random(-moonRadius, moonRadius) ;
      let craterY = moonY + random(-moonRadius, moonRadius);
      craters.push([craterX, craterY, craterWidth, craterHeight]);
    }
  }
  
  // Draw the craters
  craters.forEach((crater) => {
    ellipse(...crater);  
  });
  
  drawingContext.restore();
  pop();
}

function drawSkyline(alpha) {
  push();
  
  // Make the buildings the first time, but after that draw the same ones
  if (buildings.length === 0) {
    // TODO: Add more buildings
    // HINT: Look at Craters
    let buildingHeight = random(height/30, height/4);
    let buildingWidth = random(width/20, width/10);
    let buildingLocation = 0; // This means it will be all the way to the left.
    buildings.push([buildingLocation, height - buildingHeight, buildingWidth, buildingHeight]);
  }
  
  noStroke();
  fill(100, alpha);
  buildings.forEach(building => rect(...building));
  pop();
}

function keyPressed() {
  console.log("You pressed: " + key);
  if (key === 'p') {
   isPaused = !isPaused;
  }
}
