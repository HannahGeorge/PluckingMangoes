
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;

var treeObj, stoneObject, groundObject, launcherObject;
var mango1, mango2, mango3, mango4, mango5;
var world, boy;

function preload(){

	boy = loadImage("images/boy.png");

}

function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	mango1 = new Mango(1100, 100, 30);
	mango2 = new Mango(1020, 150, 20);
	mango3 = new Mango(1200, 205, 25);
	mango4 = new Mango(950, 195, 23);
	mango5 = new Mango(1125, 225, 22);

	stoneObject = new Stone(100, 400, 15);
	launcherObject = new Chain(stoneObject.body,{x: 240, y: 420});

	treeObj = new Tree(1050, 580);
	groundObject = new Ground(width/2, 600, width, 20);
	
	Engine.run(engine);

}

function draw() {
  background(230);
  //Add code for displaying text here!
  image(boy, 200, 340, 200, 300);
  
  treeObj.display();

  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  launcherObject.display();
  stoneObject.display();

  groundObject.display();

  detectCollision(stoneObject, mango1);
  detectCollision(stoneObject, mango2);
  detectCollision(stoneObject, mango3);
  detectCollision(stoneObject, mango4);
  detectCollision(stoneObject, mango5);

}

function mouseDragged(){

    Matter.Body.setPosition(stoneObject.body,{x: mouseX, y: mouseY});

}

function mouseReleased(){

    launcherObject.fly();
    
}

function detectCollision(stone, mango){

	mangoPos = mango.body.position;
	stonePos = stone.body.position;

	var distance = dist(stonePos.x, stonePos.y, mangoPos.x, mangoPos.y);

	if(distance <= mango.r + stone.r){

		Matter.Body.setStatic(mango.body, false);

	}
}

function keyPressed(){
	if(keyCode === 32){

		launcherObject.attach(stoneObject.body);

	}
}