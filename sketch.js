let airpods;
let time = [];
let spotify = [];
let tiktok = [];
let empty = [];
let angleSpotify = 0; // Initial angle for Spotify tree
let angleTiktok = 0;  // Initial angle for Tiktok tree
let angleEmpty = 0;   // Initial angle for Empty tree
let prevAngleSpotify = 0; // Previous angle for Spotify tree
let prevAngleTiktok = 0;  // Previous angle for Tiktok tree
let prevAngleEmpty = 0;   // Previous angle for Empty tree
let currentTime = 0;   
let interval = 1000;   // milliseconds
let timer;             

function setup() {
  createCanvas(600, 800);
  airpods = loadImage('2.png');
  for (let i = 1; i <= 60; i++) {
    time.push(i);
  }
  for (let i = 0; i < time.length; i++) {
    if ((i >= 0 && i <= 17) || (i >= 31 && i <= 47)) {
      spotify.push(time[i]);
    }
    if ((i >= 18 && i <= 31) || (i >= 57 && i <= 59)) {
      tiktok.push(time[i]);
    }
    if ((i >= 48 && i <= 56)) {
      empty.push(time[i]);
    }
  }
  timer = setInterval(updateTimer, interval);
}

function updateTimer() {
  currentTime++;
  if (currentTime >= 60) {
    clearInterval(timer);
  }
  
  // Update angles for Spotify tree
  if ((currentTime >= 1 && currentTime <= 18) || (currentTime >= 32 && currentTime <= 48)) {
    angleSpotify = radians(map(currentTime, 1, 48, 0, 180));
    prevAngleSpotify = angleSpotify;
  } else {
    angleSpotify = prevAngleSpotify;
  }
  
  // Update angles for Tiktok tree
  if ((currentTime >= 19 && currentTime <= 31) || (currentTime >= 57 && currentTime <= 60)) {
    angleTiktok = radians(map(currentTime, 19, 60, 0, 360));
    prevAngleTiktok = angleTiktok;
  } else {
    angleTiktok = prevAngleTiktok;
  }
  
  // Update angles for Empty tree
  if (currentTime >= 49 && currentTime <= 57) {
    angleEmpty = radians(map(currentTime, 49, 60, 0, 180));
    prevAngleEmpty = angleEmpty;
  } else {
    angleEmpty = prevAngleEmpty;
  }
}

function draw() {
  background('yellow');
  background(airpods)
  scale(0.3);
  
  translate(width / 2 + 690, 1400); // Starting spotify tree
  drawTree(angleSpotify, '#1DB954', '#1DB954', 0.8);

  translate(0, 100); // Move to tiktok tree
  strokeWeight(0.2);
  drawTree(angleTiktok,  '#EE1D52','#69C9D0', 0.6);
  
  scale(0.6);
  translate(0, 0); // Move to empty tree
  drawTree(angleEmpty, 'white', 'yellow', 2.5);
}

function drawTree(angle, color1, color2, strokeWeightVal) {
  let gradient = drawingContext.createLinearGradient(0, 0, 0, -100);
  gradient.addColorStop(0, color1); // Start color
  gradient.addColorStop(1, color2); // End color

  drawingContext.strokeStyle = gradient;
  drawBranch(angle, strokeWeightVal);
}

function drawBranch(angle, strokeWeightVal) {
  strokeWeight(strokeWeightVal);
  line(0, 0, 0, -100);
  translate(0, -100);
  if (abs(angle) > 0.01) {
    push();
    rotate(angle);
    drawBranch(angle * 0.6, strokeWeightVal);
    pop();
    push();
    rotate(-angle);
    drawBranch(angle * 0.6, strokeWeightVal);
    pop();
  }
}
