// let points = [
// [7,10],[12,6],[12,4],[9,1],[10,-2],[10,-7],[5,-10],[1,-11],[1,-13],[-3,-13],[-14,-4],[-13,4],
// [-11,9],[-12,13],[-10,16],[-8,17],[-5,13],[3,13],[7,16],[10,15],[10,13],[7,10]
// ]

// let points =[[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]];

let points = [
  [7, 0], [-3, 12], [-6, 4], [-2, 1], [-7, 3], [-4, -6], [-2, -2], [2, -4],
  [8, -3], [9, -1], [8, 2], [10, 3], [13, 3], [12, 4], [7, 4], [8, 2],
  [3, 4], [3, 6.5], [0, 9], [-3, 11], [-3, 6.5], [12, 3]
];
var fill_colors = ["ffbe0b-fb5607-ff006e-8338ec-3a86ff"];
var line_colors = ["ffbe0b-fb5607-ff006e-8338ec-3a86ff"];

function setup() {
  createCanvas(400, 400);
  background("#e8e8e8");
}

function draw() {
  translate(width / 2, height / 2);
  scale(1, -1);

  // Draw monkey face
  fill(fill_colors[0]);
  stroke(line_colors[0]);
  beginShape();
  for (let i = 0; i < points.length; i++) {
    let [x, y] = points[i];
    vertex(x, y);
  }
  endShape(CLOSE);

  // Draw monkey ears
  fill(fill_colors[1]);
  stroke(line_colors[0]);
  beginShape();
  vertex(-7, 8);
  vertex(-9, 3);
  vertex(-5, -6);
  vertex(-2, -3);
  endShape(CLOSE);

  beginShape();
  vertex(9, 2);
  vertex(12, 3);
  vertex(11, 3);
  vertex(10, 4);
  vertex(9, 4);
  vertex(5, 2);
  vertex(3, 4);
  vertex(3, 7.5);
  vertex(0, 9);
  vertex(-3, 14);
  vertex(-3, 9.5);
  vertex(10, 3);
  endShape(CLOSE);
}
var ball //目前要處理的物件，暫時放在ball變數內
var balls=[] //把生的"所有"物件

var bulle
var bullets=[]

var monster
var monsters=[]

var shipP

//function preload(){      //程式碼準備執行之前，比setup更早執行
 //elephant_sound = loadSound("sound/elephant.wav")
 //bullet_sound = loadSound("sound/Launching wire.wav")

//}

var score = 0

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP=createVector(width/2,height/2)  //預設砲台的位置在視窗的中間
  for(var i=0;i<20;i=i+1){ //i=0,1,2,3,4,5,6... 
    ball = new Obj({}) //產生一個Obj的class元件
    balls.push(ball) //把ball的物件放到balls陣列內
    } 
  
  for(var i=0;i<10;i=i+1){  
   monster = new Monster({}) 
   monsters.push(monster) 
 }
}

let gameOver = false;

function draw() {
  background(220);
  //for(var j=0;j<balls.length;j=j+1){
  // ball=balls[j]
  // ball.draw()
  // ball.update()
  //}
 if(keyIsPressed){
   if(key=="ArrowLeft"|| key=="a"){
   shipP.x=shipP.x-10

   }
   if(key=="ArrowRight"|| key=="d"){
   shipP.x=shipP.x+10

   }
   if(key=="ArrowUp"|| key=="w"){
   shipP.y=shipP.y-10

   }
   if(key=="ArrowDown"|| key=="s"){
   shipP.y=shipP.y+10

   }

 }

 for (let ball of balls) {
  ball.draw();
  ball.update();
  for (let bullet of bullets) {
    if (ball.isBallInRanger(bullet.p.x, bullet.p.y)) {
      balls.splice(balls.indexOf(ball), 1);
      bullets.splice(bullets.indexOf(bullet), 1);
      score = score - 1;
      // elephant_sound.play()
    }
  }
}

for (let bullet of bullets) {
  bullet.draw();
  bullet.update();
}

for (let monster of monsters) {
  if (monster.dead == true && monster.timenum > 10) {
    monsters.splice(monsters.indexOf(monster), 1);
  }

  monster.draw();
  monster.update();
  for (let bullet of bullets) {
    if (monster.isBallInRanger(bullet.p.x, bullet.p.y)) {
      bullets.splice(bullets.indexOf(bullet), 1);
      score = score + 1;
      monster.dead = true;
    }
  }
}

if (balls.length === 0 && monsters.length === 0) {
  textSize(50);
  textAlign(CENTER, CENTER);
  text("Game Over", width/2, height/2);
}

textSize(50);
text(score, 50, 50);

// 绘制砲台
push();
let dx = mouseX - width / 2;
let dy = mouseY - height / 2;
let angle = atan2(dy, dx);
translate(shipP.x, shipP.y);
fill("blue");
noStroke();
rotate(angle - 300);
triangle(-25, 25, 25, 25, 0, -50);
ellipse(0, 0, 40);
pop();
  }

  
  
 textSize(50)
  text(score,50,50)
  push() //重新規劃原點，在視窗中間
   let dx = mouseX - width/2
   let dy = mouseY - height/2 
   let angle = atan2(dy,dx)
   translate(shipP.x,shipP.y)
   fill("red")
   noStroke()
   rotate(angle-300)
   triangle(-25,25,25,25,0,-50) //設定三個點畫成一個三角形
   ellipse(0,0,40)
  pop() //恢復原本設定，原點(0,0)在視窗的左上角
function mousePressed(){

bullet = new Bullet({}) //在滑鼠按下的地方，產生一個新的bullet class元件
bullets.push(bullet)
//bullet_Sound.play()
}

function keyPressed(){
 if(key==" "){ //按下空白建發射飛彈，跟按下滑鼠功能一樣
 bullet = new Bullet({}) 
 bullets.push(bullet)
 //bullet_sound.play()
  }
}





