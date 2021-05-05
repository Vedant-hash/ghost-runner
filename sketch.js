var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg)
  tower.velocityY=1;
  doorGroup=new Group();
  climbersGroup=new Group();
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg)
  ghost.scale=0.3;
  
  invisibleBlockGroup=new Group();
}

function draw(){
  background(0);
  if(gameState==="play"){
  if(keyDown("left_arrow")){
    ghost.x-=3;
    
  }
  if(keyDown("right_arrow")){
    ghost.x+=3;
    
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
    
  }
  ghost.velocityY+=0.8; 
  if(tower.y>400){
    tower.y=300;
  }
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
  ghost.destroy();
    gameState="end";
  }
  spawnDoors();
drawSprites();
  }  
  if(gameState==="end"){
    fill("yellow")
    textSize(30)
    text("game Over",230,250)
  }
}

function spawnDoors() {
 if(frameCount%240===0){
   door=createSprite(200,0);
   door.addImage(doorImg);
   door.velocityY=1;
   door.x=Math.round(random(120,400));
   door.lifetime=600;
   doorGroup.add(door);
   climber=createSprite(200,50);
   climber.addImage(climberImg);
   climber.velocityY=1;
   climber.x=door.x;
   climber.lifetime=600;
   climbersGroup.add(climber);
   ghost.depth=door.depth;
   ghost.depth+=1;
   
   invisibleBlock=createSprite(200,65,climber.width,2);
   invisibleBlock.velocityY=1;
   invisibleBlock.x=door.x;
   invisibleBlock.lifetime=600;
   invisibleBlockGroup.add(climber);
   invisibleBlock.debug=true;
 }
}

