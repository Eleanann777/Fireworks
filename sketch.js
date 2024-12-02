// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

const fireworks = [];
let gravity;
let isPaused = false;
const craters = [];
const buildings = [];
const windows = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  
  drawBackground(100);
  
  if (isPaused) {
    push();
    strokeWeight(20);
    stroke("black");
    fill("white");
    textSize(100);
    textAlign(CENTER, CENTER);
    textFont("Impact");
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
  
  colorMode(RGB);
  drawMoon(alpha);
  drawSkyline(alpha);
  pop();
}

function drawSkyline(alpha) {
  push();
  if(buildings.length === 0) {
    const numBuildings = 30;
    let xOffset = 0;
    for (let i = 0; i < numBuildings; ++i) {
      let buildingHeight = random(height/30, height/3);
      let buildingWidth = random(width/20, width/10);
      let buildingLocation = xOffset; 
      
      let spaceBetweenBuildings = 0;
      if (random() > 0.5) {
        spaceBetweenBuildings = random(1, 10);
      }
      
      xOffset = xOffset + buildingWidth + spaceBetweenBuildings;
      buildings.push([buildingLocation, height - buildingHeight, buildingWidth, buildingHeight]);
    }
  }
  noStroke();
  fill(100, 100, 100, alpha);
  
  for(let i = 0; i < buildings.length; i++) {
    let building = buildings[i];
    rect(building[0], building[1], building[2], building[3]);
    
  }
  
  fill(100, 100, 23, alpha);
  for (let i = 0; i < windows.length; i++) {
    let window = windows[i];
    rect(window[0], window[1], window[2], window[3]);
    
  }
 
  pop();

}
function drawMoon(alpha) {
  push();
  const moonRadius = min(width, height) / 5;
  const moonX = width / 3;
  const moonY = height / 2.5;
  
  noStroke();
  
  circle(moonX, moonY, moonRadius);
  fill(100, alpha);
  
  
  drawingContext.save();
  push();
  circle(moonX, moonY, moonRadius);
  pop();  
  drawingContext.clip();
  
 
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
  
  
  for(let i = 0; i < craters.length; i++)   {
    let crater = craters[i];
    ellipse(crater[0], crater[1], crater[2], crater[3]);
  }
 
  drawingContext.restore();
  pop();
}

function keyPressed() {
  console.log("You pressed: " + key);
  if (key === 'p') 
    if (isPaused) {
      isPaused = false;
    } else {
      isPaused = true;
    }
  
}
