var dodger, dodgerimage,obstaclegroup, checkpointsound, deathsound, jumpsound, restart, restartimage, restartgroup;

function preload() {
  dodgerimage = loadImage("dodger.png");
  checkpointsound = loadSound("checkPoint (1).mp3");
  deathsound = loadSound("die (1).mp3");
  jumpsound = loadSound("jump (1).mp3");
  restartimage = loadImage("restart.png");
}

function setup() {
  createCanvas(300, 300);
    dodger = createSprite(150,270);
  dodger.addImage(dodgerimage);
  dodger.scale = 0.15;
  obstaclegroup = new Group();
  gamestate = "play";
  restart = createSprite(160,175);
  restart.addImage(restartimage);
  restart.scale = 0.35;
  restartgroup = new Group();
  restartgroup.add(restart);
}

function draw() {
  background(53,120,190);
  
  if (gamestate === "play"){
    dodger.visible = true;
    restartgroup.setVisibleEach(false);
    if (keyWentDown("left")){
      dodger.x = dodger.x -5;
      jumpsound.play();
    }
    if (keyWentDown("right")){
      dodger.x = dodger.x +5;
      jumpsound.play();
    }
     spawnObstacles();
    if (dodger.isTouching(obstaclegroup)){
      gamestate = "end";
      deathsound.play();
    }
  }
  else
    if (gamestate === "end"){
      restartgroup.setVisibleEach(true);
      if (mousePressedOver(restart)){
        gamestate = "play";
        checkpointsound.play();
      }
      dodger.visible = false;;
      textSize(15);
      fill("red");
      text("YOU DIED",150,150);
    }
  
  drawSprites();
}

function spawnObstacles() {
  if (World.frameCount % 70 === 0) {
    t = Math.round(random(20, 130));
    
    obstacle = createSprite(t,0);
    obstacleimage = loadImage("obstacle1.png");
    obstacle.addImage(obstacleimage);
    obstacle.scale = 0.1;
    obstaclegroup.add(obstacle);
    obstaclegroup.setVelocityYEach(10);
  }
}