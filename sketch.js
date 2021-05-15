let canvas, img;
let particles = [];
function preload() {
  img = loadImage('img3.png');
}
class Particle {
  constructor(x, y, col) {
    this.history = [];
    this.pos = createVector(random(width), random(height));
    this.homeLoc = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.col = col;
    this.fresh = true;
    this.maxV = 15;
    this.maxF = 10;
  }
  interactionPoint(pt) {
    // this.history.push(pt);
  }
  behaviors() {
    var arrive = this.arrive(this.homeLoc);
    // var mouse = createVector(mouseX, mouseY);
    // var flee = this.flee(mouse);

    arrive.mult(1);
    // flee.mult(5);

    this.applyForce(arrive);
    // this.applyForce(flee);
  }
  arrive(tgt) {
    var desired = p5.Vector.sub(tgt, this.pos);
    var d = desired.mag();
    var speed = this.maxV;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxV);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxF);
    return steer;
  }
  applyForce(f) {
    // this.history.push(f.toString())
    this.acc.add(f);
  }
  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }
  show() {
    if (1) {//this.fresh
      stroke(...this.col);
      point(this.pos.x, this.pos.y);
      // this.fresh = false;
    }
  }
  fastDist(x, y) {
    return (this.pos.x - x) * (this.pos.x - x) + (this.pos.y - y) * (this.pos.y - y)
  }
}
function setup() {
  canvas = createCanvas(img.width * 0.9, img.height * 0.9);
  canvas.mouseMoved(interaction)
  pixelDensity(1);
  if (img.width > width)
    img.resize(width, 0);
  img.loadPixels();

  pix = img.pixels;
  let inc=180
  for (let i = 0; i < pix.length; i += inc) {
    if(pix[i + 3]!=0)
    particles.push(
      new Particle(
        (i / 4) % img.width,
        (i / 4) / img.width,
        [pix[i + 0], pix[i + 1], pix[i + 2]]))
  }
  strokeWeight(8);
  // img.unloadPixels()
}
function draw() {
  background(0)
  let off = 0;
  // off = frameCount % 10
  for (let i = 0 + off; i < particles.length; i += 1) {
    particles[i].behaviors()
    particles[i].update()
    // if(frameCount%2)
    particles[i].show()
  }
}

function interaction() {
  for (let p of particles) p.interactionPoint(createVector(mouseX, mouseY))
  // let radius = 50;
  // let x = floor(mouseX)
  // let y = floor(mouseY)
  // let hitParticles = particles.filter(p => { // function(p){}
  //   return p.fastDist(x, y) < radius * radius;
  // })
  // let mouseVec = createVector(x, y)
  // for (let p of hitParticles) {
  //   // p.fresh = true;
  //   p.applyForce(mouseVec.sub(p.pos).mult(0.15));
  //   // console.log({mx:x,my:y,mV:mouseVec,pos:p.pos})
  // }
}