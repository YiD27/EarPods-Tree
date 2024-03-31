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
  background(airpods);
  push();
  let minutes = Math.floor(currentTime / 60);
  let seconds = currentTime % 60;
  let formattedTime = nf(minutes, 2) + ':' + nf(seconds, 2);
  textSize(18);
  textStyle(BOLD);
  fill(0);
  text(formattedTime, 55, 100);
  pop();
  scale(0.3);
  
  translate(width / 2 + 690, 1400); // Starting spotify tree
  drawTree(angleSpotify, '#1DB954', '#1DB954', 0.8 , "Spotify");

  translate(0, 100); // Move to tiktok tree
  strokeWeight(0.2);
  drawTree(angleTiktok,  '#EE1D52','#69C9D0', 0.6, "TikTok");
  
  scale(0.6);
  translate(0, 0); // Move to empty tree
  drawTree(angleEmpty, 'white', 'yellow', 3, "Empty");
}

function drawTree(angle, color1, color2, strokeWeightVal,label) {
  let gradient = drawingContext.createLinearGradient(0, 0, 0, -100);
  gradient.addColorStop(0, color1); // Start color
  gradient.addColorStop(1, color2); // End color

  drawingContext.strokeStyle = gradient;
  drawBranch(angle, strokeWeightVal);
  
  // Add text indicating the tree type based on the current time
  if (label === 'Spotify' && currentTime >= 2 && currentTime <= 19) {
    textSize(45);
    fill('#1DB954');
    text(label, -630, -968);
  } else if (label === 'TikTok' && currentTime >= 20 && currentTime <= 31) {
    textSize(50);
    fill('#EE1D52');
    text("Tik", -630, -968);
    fill('#69C9D0');
    text("Tok", -580, -968);
  } if (label === 'Spotify' && currentTime >= 32 && currentTime <= 49) {
    textSize(50);
    fill('#1DB954');
    text(label, -630, -969);
  } else if (label === 'Empty' && currentTime >= 50 && currentTime <= 56) {
    textSize(90);
    fill(255)
    textStyle(BOLD);
    text(label, -1060, -1515);
  } else if (label === 'TikTok' && currentTime >= 57 && currentTime <= 60) {
    textSize(50);
    textStyle(NORMAL);
    fill('#EE1D52');
    text("Tik", -630, -968);
    fill('#69C9D0');
    text("Tok", -580, -968);
}
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
