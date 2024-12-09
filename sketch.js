const fireworks = [];
let gravity;
let isPaused = false;
const craters = [];
const buildings = [];
const windows = [];
const staticClouds = [];
const stars = []; // Array to store stars

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);

  // Generate static clouds
  for (let i = 0; i < 7; i++) {
    staticClouds.push(new StaticCloud());
  }

  // Generate stars
  const numStars = 300;
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
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
    text("PAUSED", width / 2, height / 2);
    pop();
  } else {
    colorMode(RGB);
    background(0, 0, 0, 25);

    // Draw static clouds
    for (let cloud of staticClouds) {
      cloud.show();
    }

    // Launch fireworks
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

  // Draw stars
  for (let star of stars) {
    star.show();
  }

  // Draw moon and skyline
  drawMoon(alpha);
  drawSkyline(alpha);
  pop();
}

function drawSkyline(alpha) {
  push();
  if (buildings.length === 0) {
    const numBuildings = 30;
    let xOffset = 0;
    for (let i = 0; i < numBuildings; ++i) {
      let buildingHeight = random(height / 30, height / 3);
      let buildingWidth = random(width / 20, width / 10);
      let buildingLocation = xOffset;

      let spaceBetweenBuildings = 0;
      if (random() > 0.5) {
        spaceBetweenBuildings = random(1, 10);
      }

      xOffset = xOffset + buildingWidth + spaceBetweenBuildings;
      buildings.push([buildingLocation, height - buildingHeight, buildingWidth, buildingHeight]);
      makeWindows(buildingLocation, height - buildingHeight, buildingWidth, buildingHeight);
    }
  }
  noStroke();
  fill(100, 100, 100, alpha);

  for (let i = 0; i < buildings.length; i++) {
    let building = buildings[i];
    rect(building[0], building[1], building[2], building[3]);
  }

  for (let i = 0; i < windows.length; i++) {
    let window = windows[i];
    if (window[4]) {
      fill('yellow');
    } else {
      fill('grey');
    }
    rect(window[0], window[1], window[2], window[3]);
  }
  pop();
}

function makeWindows(x, y, w, h) {
  const wWindow = width / 42;
  const vSpacing = wWindow / 2;
  let hSpacing = (w - 2 * wWindow) / 3;
  let numRows = floor(h / (vSpacing + wWindow));

  for (let i = 0; i < numRows; i++) {
    let yOffset = (vSpacing + wWindow) * i;
    windows.push([hSpacing + x, vSpacing + y + yOffset, wWindow, wWindow, random() > 0.5]); 
    windows.push([(hSpacing * 2 + wWindow + x), vSpacing + y + yOffset, wWindow, wWindow, random() > 0.5]);
  }
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
      let craterX = moonX + random(-moonRadius, moonRadius);
      let craterY = moonY + random(-moonRadius, moonRadius);
      craters.push([craterX, craterY, craterWidth, craterHeight]);
    }
  }

  for (let i = 0; i < craters.length; i++) {
    let crater = craters[i];
    ellipse(crater[0], crater[1], crater[2], crater[3]);
  }

  drawingContext.restore();
  pop();
}

function keyPressed() {
  console.log("You pressed: " + key);
  if (key === 'p') 
    isPaused = !isPaused; 
}

function mousePressed() {
  for (let i = 0; i < windows.length; i++) {
    let w = windows[i];
    if (mouseX > w[0] && mouseX < w[0] + w[2] && mouseY > w[1] && mouseY < w[1] + w[3]) {
      w[4] = !w[4]; 
    }
  }
}

class StaticCloud {
  constructor() {
    this.x = random(width);  
    this.y = random(height / 3, height / 1.5); // Add clouds in mid sky
    this.size = random(50, 150);  
  }

  show() {
    fill(255, 255, 255, 80);  
    noStroke();
    ellipse(this.x, this.y, this.size, this.size / 2);  
  }
}

class Star {
  constructor() {
    this.x = random(width);

    // Randomly position stars in the top half, mid-sky, or bottom half of the canvas
    let zone = random();
    if (zone < 0.5) {
      this.y = random(height / 20, height / 3); // Most stars stay high in the sky
    } else if (zone < 0.8) {
      this.y = random(height / 3, height / 1.5); // Some stars appear in the mid-sky
    } else {
      this.y = random(height / 1.5, height); // A few stars appear near the bottom
    }

    this.brightness = random(150, 255);
    this.size = random(1, 3);
  }

  show() {
    noStroke();
    fill(255, 255, 255, this.brightness);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
