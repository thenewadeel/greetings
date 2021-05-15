let canvas, img;
let particles = [];
function preload() {
  img = loadImage('img3.jpg');
}
class Body{
  constructor(){
    
  }
}
class Particle {
  constructor(x, y, col) {
    this.pos = createVector(x, y);
    this.col = col;
    this.fresh = true;
  }
  show() {
    if (this.fresh) {
      stroke(...this.col);
      point(this.pos.x, this.pos.y);
      this.fresh = false;
    }
  }
  fastDist(x,y){
    return (this.pos.x-x)*(this.pos.x-x) + (this.pos.y-y)*(this.pos.y-y)
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
  for (let i = 0; i < pix.length; i += 16) {
    particles.push(
      new Particle((i / 4) % img.width,
        (i / 4) / img.width,
        [pix[i+0], pix[i + 1], pix[i + 2]]))
  }
  strokeWeight(4);
  // img.unloadPixels()
}
function draw() {
  background(0, 3)
  let off = 0;
  off = frameCount % 5
  for (let i = 0 + off; i < particles.length; i += 5) {
    particles[i].show()
  }
}

function interaction() {
  let radius = 50;
  let x = floor(mouseX)
  let y = floor(mouseY)
  // let l = particles.length;
  // let i = floor((x / 4) + (img.width * y / 4));
  let hitParticles = particles.filter(p => { // function(p){}
    return p.fastDist(x,y)<radius*radius;
    // return ((p.pos.x + radius >= x)
    //   && (p.pos.y + radius >= y)
    //   && (p.pos.x - radius <= x)
    //   && (p.pos.y - radius <= y))
  })
  for (let p of hitParticles) {
    p.fresh = true;
  }
}