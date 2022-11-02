var backgroundIMG
var nave,naveIMG
var g = 0.05
var vx = 0
var vy = 0
var ground
var trust
var left
var right
var fuel = 100
var crash
var land
var obs, obsImg
var timer
var base, baseImg


function preload(){
backgroundIMG = loadImage("bg.png")
naveIMG = loadImage("normal.png")
trust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png")
crash = loadAnimation("crash1.png","crash2.png","crash3.png")
land = loadAnimation("landing1.png","landing2.png","landing_3.png")
left = loadAnimation("left_thruster_1.png","left_thruster_2.png")
right = loadAnimation("right_thruster_1.png","right_thruster_2.png")
normal = loadAnimation("normal.png")
baseImg = loadImage("lz.png")
obsImg = loadImage("obstacle.png")

trust.playing = true
trust.looping = false
left.looping = false
right.looping = false
crash.looping = false
land.looping = false
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);

  timer = 1500
  trust.frameDelay = 5
  right.frameDelay = 5
  left.frameDelay = 5
  crash.frameDelay = 10


  nave = createSprite(100,70,30,30)
  nave.addImage(naveIMG)
  nave.scale = 0.15
  nave.debug = false
  nave.setCollider("rectangle",0,5,500,650)

  nave.addAnimation("trusting",trust)
  nave.addAnimation("left",left)
  nave.addAnimation("right",right)
  nave.addAnimation("normal",normal)
  nave.addAnimation("crashing", crash)

  ground = createSprite(500,700,1000,20)

  obs = createSprite(420,430,50,100)
  obs.addImage(obsImg)
  obs.scale = 0.9
  obs.debug = false
  obs.setCollider("rectangle",-50,170,230,270)

  base = createSprite(880,590,50,30)
  base.addImage(baseImg)
  base.scale = 0.4
  base.debug = false
  base.setCollider("rectangle",0,180,400,100)

  rectMode(CENTER);
  textSize(15);
}

function draw() {
  background(51);
  image(backgroundIMG,0,0)

  push()
  textSize(20)
  fill("white")
  stroke("green")
  text("velocidade vertical " + round(vy),750,65)
  text("combustivel " + fuel,775,45)
  text("velocidade horizontal " + round(vx,2),730,85)
  pop()

  vy += g
  nave.position.y += vy
  nave.position.x += vx

  if (nave.collide(obs)==true) {
    nave.changeAnimation("crashing")
    stop()
  }

  var d = dist(nave.position.x,nave.position.y,base.position.x,base.position.y)

  if (d<=45&&(vy<2&&vy>-2)&&(vx<2&&vx>-2)) {
    console.log("normal")
    vx = 0
    vy = 0
    g = 0
    nave.changeAnimation("normal")


  }

  if (nave.collide(ground)==true) {
    console.log("collided")
    vx = 0
    vy = 0
    g = 0
    nave.changeAnimation("crashing")


  }

  nave.collide(ground)
  drawSprites();
}

function keyPressed() {
  if (keyCode == UP_ARROW && fuel>0) {
    impulsao()
    nave.changeAnimation("trusting")
    trust.nextFrame()
  }

  if (keyCode == RIGHT_ARROW && fuel>0){
    nave.changeAnimation("left")
    rightTrust()
  }

  if (keyCode == LEFT_ARROW && fuel>0){
    nave.changeAnimation("right")
    leftTrust()
  }
}

function impulsao() {
  vy = -1

  fuel -= 1
}

function rightTrust(){
  vx += 0.2

  fuel -= 1
}

function leftTrust(){
  vx -= 0.2

  fuel -= 1
}

function stop() {
vx = 0
vy = 0
fuel = 0
g = 0

}