var chef;
var enemies = [];
var arepas = [];
var lives;
var score;
var fries, hamburger, popcorn, pizza;
var chefLeft, chefRight;
var heart;
var arepa;
var wrongSound, gameoverSound, gamestartSound, scoreSound;
var gameStarted;
var bg, bg2;


function preload()
{
  // enemies images
  fries = loadImage('imagesandsound/Fries.png');
  hamburger = loadImage('imagesandsound/Hamburger.png');
  pizza = loadImage('imagesandsound/Pizza.png');
  popcorn = loadImage('imagesandsound/Popcorn.png');
  
  // chef images
  chefLeft = loadImage('imagesandsound/LeftChef.png');
  chefRight = loadImage('imagesandsound/RightChef.png');
  chefHappy = loadImage('imagesandsound/HappyChef.png')
  
  // heart image 
  heart = loadImage('imagesandsound/Heart.png');

  // arepa image
  arepa = loadImage('imagesandsound/Arepa.png');
  
  // backgrounds
  bg = loadImage("imagesandsound/BackgroundKitchen.png");
  bg2 = loadImage("imagesandsound/Intro.png");

  // game sounds 
  soundFormats('mp3');
  wrongSound = loadSound('imagesandsound/EatEnemy.mp3');
  gameoverSound = loadSound('imagesandsound/GameOver.mp3');
  scoreSound = loadSound('imagesandsound/EatArepa.mp3');
  gamestartSound = loadSound('imagesandsound/GameStart.mp3');
  
}

function setup() 
{
  createCanvas(800, 400);
  background(bg2);

  // create chef
  chef = new Chef();
  
  // default lives and score values
  lives = 3;
  score = 0;
  
  // create start game button
  startButton = createButton('Start Game');
  startButton.position(370, 200);
  startButton.mousePressed(startGame);

  
  
  gameStarted = false;
  
}

function draw() {
  

  if (gameStarted == true)
  {
    background(bg);

    // hide start button
    startButton.hide();
  
    // display Arepas Scored indicator
    fill(200);
    noStroke();
    textSize(20);
    textFont("Lato");
    text("Arepas Scored: " + score, 30, 50);
  
    // display number of lives
    switch(lives)
    {
      case 3: image(heart, 650, 30);
      image(heart, 690, 30);
      image(heart, 730, 30); break;
      case 2: image(heart, 690, 30);
      image(heart, 730, 30); break;
      case 1: image(heart, 730, 30); break;
    }

    // display chef
    chef.display();
  
    // random enemy hatching 
    var enemyHatch = Math.ceil(random(60));
    if(enemyHatch == 1)
    {
      enemies.push(new Enemy());
    }
  
    // random arepa hatching 
    var arepaHatch = Math.ceil(random(70));
    if(arepaHatch == 1)
    {
      arepas.push(new Arepa());
    }
  
    // loop each enemy
    for (var i=0; i<enemies.length; i++) 
    {
      // display enemy
      enemies[i].display();
    
      // if enemy reaches bottom of the screen
      if(enemies[i].ypos > 500)
      {
        // remove enemy - at position i remove 1 item
        enemies.splice(i, 1);
      
      } 
      else {
      
        // check if chef is touching enemy (wrong)
        var wrg = dist(enemies[i].xpos, enemies[i].ypos, chef.xpos, chef.ypos);
        

        if(wrg < 50)
        {
          // remove enemy
          enemies.splice(i, 1);

          // decrease lives by one
          lives --;
         
          // play wrong sound
          wrongSound.play();
        }
      }
    }

    // loop each arepa
    for (var j=0; j<arepas.length; j++) 
    {
      // display arepas
      arepas[j].display();
    
      // check if arepa reaches bottom of screen
      if(arepas[j].ypos > 500)
      {
        // remove arepa
        arepas.splice(j, 1);
    
      } 
      else {
    
        // check if chef is touching arepa
        var d2 = dist(arepas[j].xpos, arepas[j].ypos, chef.xpos, chef.ypos);
        if(d2 < 25)
        {
          // remove arepa
          arepas.splice(j, 1);
        
          // increase score by one
          score++;
        
          // play score sound
          scoreSound.play();
        }
      }
    }
  

  //gameState == GAME_OVER
  
    // check for game over
    if(lives <= 0)
    {

      // reset lives and score
      lives = 3;
      score = 0;
      
      // reset chef's position
      chef.xpos = 400;
      chef.direction = "stopped";
    
      // remove enemies and arepas
      enemies = [];
      arepas = [];
      
      // play gameover sound and stop gamestart sound
      gamestartSound.stop();
      gameoverSound.play();
      
      
      // set gameStarted to false
      gameStarted = false;
    }
  
  } else {
	  
    // show start button
    startButton.show();
    background(bg2);
	  
  }
}



    //START_GAME

function startGame()
{
  // change gameStarted variable
  gameStarted = true;
  
  // loop starting sound
  gamestartSound.loop();
  
}

    //KEY_PRESSED

function keyPressed()
{
  // if the right arrow was pressed
  if(keyCode == RIGHT_ARROW)
  {
    // change chef's direction property
    chef.direction = 'right';
  }
  
  // if the left arrow was pressed
  if(keyCode == LEFT_ARROW)
  {
    // change chef's direction property
    chef.direction = 'left';
  }
}




// CHEF CLASS

function Chef()
{
  // set default properties
  this.xpos = 400;
  this.ypos = 350;
  this.speed = 4;
  this.direction = "stopped";
  
  // chefCounter will determine which chef sprite to display (1 or 2) (right or left)
  this.chefCounter = 1;
}

Chef.prototype.display = function()
{
  // check for every fifth frame
  // is the current frameCount divisible by 5?
  if(frameCount % 5 === 0)
  {
    
  }
  
  imageMode(CENTER);
  
  // if chef is facing right
  if(this.direction == 'right')
  {
    // display the correct chef (left or right, this case right)
    switch(this.chefCounter)
    {
        case 1: image(chefRight, this.xpos, this.ypos); break;

    }
    
    // move chef to the right
    this.xpos = this.xpos + this.speed;
  }
  
  // if chef is facing left
  if(this.direction == 'left')
  {
    // display the correct chef (left or right, this case left)
    switch(this.chefCounter)
    {
        case 1: image(chefLeft, this.xpos, this.ypos); break;

    }
 
    // move chef to the left
    this.xpos = this.xpos - this.speed;
  }
  
  // if chef is just starting out (no move)
  if(this.direction == 'stopped')
  {
    image(chefHappy, this.xpos, this.ypos);
  }
  
  // wrap chef if chef reaches the edge of the screen
  if(this.xpos > 800)
  {
    this.xpos = 0;
  }
  if(this.xpos < 0)
  {
    this.xpos = width;
  }
}


// ENEMIES FUNCTION

function Enemy()
{
  // set default properties
  this.xpos = random(0, width);
  this.ypos = 0;
  this.speed = random(1, 4);
  this.type = Math.ceil(random(4));
}

Enemy.prototype.display = function()
{
  imageMode(CENTER);
  
  // show different enemy based on it's random value
  switch(this.type)
  {
    case 1: image(fries, this.xpos, this.ypos, 42, 50); break;
    case 2: image(hamburger, this.xpos, this.ypos, 48, 42); break;
    case 3: image(pizza, this.xpos, this.ypos, 42, 46); break;
    case 4: image(popcorn, this.xpos, this.ypos, 42, 48); break; 
  }
  this.ypos = this.ypos + this.speed;
}


// AREPA FUNCTION

function Arepa()
{
  this.xpos = random(0, 600);
  this.ypos = 0;
  this.speed = random(1, 4);
}

Arepa.prototype.display = function()
{
  imageMode(CENTER);
  
  image(arepa, this.xpos, this.ypos, 44, 44);
  this.ypos = this.ypos + this.speed;
}