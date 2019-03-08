var label = 'DH_mood_01100';
var bracketImg;
var skull;
var mainImg;

var xspacing = 50;
var w;
var theta = 0.0;
var amplitude = 40.0;
var period = 500.0;
var dx;
var yvalues;

var x = 0;
var y = 0;

var imgScale = 1.5;

var database;
var fruits;

var coordData;
var imgURL;
var testimg;
var newImg;

var bgColor = "#FCB888";

var divRatio;

var movImg;
// function preload() {
//  var bracketImg = loadImage('http://prod.static.giants.clubs.nfl.com/assets/images/imported/NYG/beckham-5917.jpg');
// }
// function preload() {
//     bracketImg = loadImage('box_thing.png');
// }

var config = {
    apiKey: "XXXXXXXXXXXXXXXXXXX",
    authDomain: "your-app.firebaseapp.com",
    databaseURL: "your-app.firebaseio.com",
    projectId: "your-app",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "228588020870"
  };

function preload() {
  firebase.initializeApp(config);
  database = firebase.database();
  refURL = database.ref('imageURL');
  refURL.on('value', updateURL, errData);
}


function setup() {


  createCanvas(1080, 1080);

  bracketImg = loadImage('images/box_thing.png');
  skull = loadImage('images/skull.png');
  // mainImg = createImage('https://crossorigin.me/https://www.saturdaysnyc.com/__data/m21821rt01-dusty_amber_01.1.jpg');
  // setTimeout(bringImage, 4000);

  // testimg = createImg(imgURL);
  // testimg.hide();

  // testimg = createImg(imgURL);
  


  // firebase.initializeApp(config);
  // database = firebase.database();
  refCoords = database.ref('coords');
  refCoords.on('value', gotData, errData);

  refLabel = database.ref('label');
  refScale = database.ref('scale');
  refColor = database.ref('bgColor');

  // testimg = createImg(imgURL);
  // testimg.hide();




  w = width+50;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w/xspacing));
    calcWave();

}

function draw() {
  // console.log(x);
  // console.log(y);
  background(bgColor);
  if (imgURL != null) {
    // testimg = createImg(imgURL).hide();
    testimg = createImg(imgURL).hide();
    push();
    scale(imgScale,imgScale);
    movImg = image(testimg, x,y);
    pop();

  }
   
  // setTimeout(renderImage, 6000);
  // testimg.hide();
  strokeWeight(0);
  rect(0, 0, 85, 1080);
  stroke(210, 210, 222);
  strokeWeight(1);
  line(85, 0, 85, 1080);
  doBracket(bracketImg);
  createLabel(label);

  renderWave();
  refLabel.on('value', changeLabel, errData);
  refScale.on('value', changeScale, errData);
  refColor.on('value', changeColor, errData);
  console.log(bgColor)

}

function createLabel(txt) {
  push();
  textSize(28);
  textFont("Roboto");
  fill(31, 32, 90);
  translate(54, 1050);
  rotate(-PI/2);
  text(txt, 0, 0);
  pop();

}

function doBracket(img) {
  image(img, 22, 30, 40, 40);

}


function calcWave() {
  theta += 0.02;
  var x = theta;
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*amplitude;
    x+=dx;
  }
}


function renderWave() {
  for (var x = 0; x < yvalues.length; x++) {
    image(skull,20+x*xspacing, height/10+yvalues[x]);
    image(skull,70+x*xspacing, height/1.15+yvalues[x]);
  }
}

function mousePressed() {
   startX = mouseX;
   startY = mouseY;
}

function mouseDragged() {
  var diffx = startX - mouseX;
  var diffy = startY - mouseY;
  x = x - diffx;
  y = y - diffy
  startX = mouseX;
  startY = mouseY;
}

function mouseReleased() {

  coordData = {
    coordX: x,
    coordY: y
  }
  database.ref('coords').update(coordData);
  print("firebase data send worked");
}

function gotData (data) {
    //console.log(data.val());
  var xycoord = data.val();
  // console.log(xycoord.coordX);
  // console.log(xycoord.coordY);
  x = xycoord.coordX;
  y = xycoord.coordY;
  // image(testimg, x,y,testimg.width,testimg.height); 

  }

function changeLabel(data) {
  var labelDat = data.val();
  label = labelDat.mainLabel;

}

function changeScale(data) {
  var labelScale = data.val();
  imgScale = labelScale.mainScale;

}

function changeColor(data) {
  var labelColor = data.val();
  bgColor = labelColor.mainColor;

}

function updateURL(data) {
  var urlDat = data.val();
  imgURL = urlDat.mainImage;
  console.log(imgURL);
  console.log("worked");
  // testimg = createImg(imgURL);
  // testimg.hide();
  
}

  function errData(err) {
  console.log('Error!');
    console.log(err);
}

function bringImage() {
  testimg = createImg('https://www.saturdaysnyc.com/__data/m21821rt01-dusty_amber_01.1.jpg');
  testimg.hide();
}

// function renderImage() {
//   image(testimg, x,y,testimg.width,testimg.height); 
// }
