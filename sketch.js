var gamestate="level1";
var redscarf,ground,jumpred,redend;
var red1,ground1;
var jump,jump4;
var invisiblewall;
var batgroup,batimage;
var score;
var health;
var bg,bg1;
var key1,keygroup;
var over1,over2;
var box1;
var boxgroup,badgroup;
var bg2,back;


function preload(){
red1=loadAnimation("owl0.png","owl1.png","owl2.png","owl3.png","owl4.png","owl5.png");
jump=loadAnimation("jump0.png","jump1.png","jump2.png","jump3.png","jump4.png","jump5.png","jump6.png","jump7.png");
jump4=loadImage("jump6.png");
batimage=loadAnimation("bat0.png","bat1.png","bat2.png","bat3.png");
redend=loadAnimation("death0.png","death1.png","death2.png","death3.png","death4.png");
ground1=loadImage("ground0.png");
bg1=loadImage("jungle.jpg");
key1=loadImage("key.png");
over2=loadImage("game over.png");
box1=loadImage("treasure.png");
bg2=loadImage("sky.jpg");
}

function setup() {
  createCanvas(800,400);
score=0;
health=10;
bg=createSprite(400,200,800,400);
bg.addImage("bg",bg1);
bg.scale=2.53;
back=createSprite(400,200,800,400);
back.addImage("back",bg2);
back.scale=2.8;
back.visible=false;
over1=createSprite(400,200,800,400);
over1.addImage("over1",over2);
over1.visible=false;
over1.scale=2;
  redscarf=createSprite(170,350,33,54);
  redscarf.addAnimation("redscarf",red1);
  redscarf.scale=2.2;
 
  ground=createSprite(400,380,1800,40);
  ground.addImage("ground",ground1);
ground.x=ground.width/2;
  



invisiblewall=createSprite(400,260,1000,20);
invisiblewall.visible=false;
batgroup=new Group();
keygroup= new Group();
boxgroup=new Group();
badgroup=new Group();
}

function draw() {
  background("black");  
  ground.velocityX=-4;
  if(ground.x<300){
    ground.x=ground.width/2;
  }
 
  

if(redscarf.isTouching(batgroup)){
  batgroup.destroyEach();
  health=health-1;
}
if(health===0){
  //redscarf.addAnimation("redscarf",redend);
  //redscarf.changeAnimation("redscarf",redend);
  //redscarf.destroy();
  batgroup.destroyEach();
  keygroup.destroyEach();
}

  if(keyWentDown("RIGHT_ARROW")){
    redscarf.velocityX=4;

  }
  if(keyWentUp("RIGHT_ARROW")){
    redscarf.velocityX=0;

  }
  if(keyWentDown("LEFT_ARROW")){
    redscarf.velocityX=-4;

  }
  if(keyWentUp("LEFT_ARROW")){
    redscarf.velocityX=0;

  }


  if(redscarf.isTouching(invisiblewall)){
    redscarf.addAnimation("redscarf",red1);
  }
  redscarf.velocityY=redscarf.velocityY+0.9;
  //jumpred.velocityY=jumpred.velocityY+0.9;

  if(health===0){
    background("black");
    redscarf.destroy();
    ground.destroy();
    bg.visible=false;
    over1.visible=true;
  }

  redscarf.collide(ground);
 // jumpred.collide(ground);
console.log(redscarf.y);

  if(redscarf.isTouching(keygroup)){
    gamestate="level2";
  }
 
  if(gamestate==="level2"){
    background("black");
    bg.visible=false;
    back.visible=true;
    back.scale=2.3;
    ground.visible=false;
    keygroup.destroyEach();
    batgroup.destroyEach();
    //redscarf.destroy();
over1.visible=false;
    redscarf.x=World.mouseX;
    redscarf.y=World.mouseY;
    spawnbox();
    spawnbox2();

    if(redscarf.isTouching(badgroup)){
      badgroup.destroyEach();
    health=health-1;

    }
    if(redscarf.isTouching(boxgroup)){
      boxgroup.destroyEach();
      score+=1;
    }

    
if(health===0){
  boxgroup.destroyEach();
  badgroup.destroyEach();
  over1.visible=true;
  background("black");
}

if(score===5){
  
  gamestate="level3";
}

    textSize(20);
  fill(random(255),random(255),random(255));
    textFont("OCR A");
    text("SCORE: "+score ,550,30);
  }
if(gamestate==="level3"){
  background("green");
  bg.visible=false;

  keygroup.destroyEach();
    batgroup.destroyEach();
  boxgroup.destroyEach();
  badgroup.destroyEach();


  ground.velocityX=0;
  ground.visible=false;;
redscarf.velocityX=0;
redscarf.velocityY=0;
  redscarf.x=350;
  redscarf.y=330;

}

  drawSprites();

 textSize(20);
  fill(random(255),random(255),random(255));
    textFont("OCR A");
  // text("SCORE:"+score,550,90);
   text("HEALTH "+ health,550,100);
  

  spawnbat();
  spawnkey();
  
}
function spawnbat(){
  if(frameCount%50===0){
   var bat=createSprite(131,10,40,10);
    bat.x=Math.round(random(0,400));
    bat.addAnimation("bat",batimage);
    bat.scale=1.5;
    bat.velocityY=6;
    bat.lifetime=200;
    batgroup.add(bat);
    
  }
    
  }
  function spawnkey(){

    if(frameCount%10===0){
      var key=createSprite(400,350,20,20);
      key.x=Math.round(random(0,400));
      key.addAnimation("key",key1);
      key.scale=0.3;
      key.lifetime=40;
      keygroup.add(key);
    }
  }
  function spawnbox(){
    if(frameCount%2===0){
    var box=createSprite(random(0,800),random(0,400),40,40);
    box.lifetime=30;
    box.addImage("box",box1);
    box.scale=0.3;
    boxgroup.add(box);

    }
  }
  function spawnbox2(){
    if(frameCount%10===0){
    var badbox=createSprite(random(0,800),random(0,400),100,100);
    badbox.lifetime=30;
    
    badbox.scale=0.3;
   badgroup.add(badbox);
    }
  }