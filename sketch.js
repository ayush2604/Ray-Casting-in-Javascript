import 'boundary.js';
import 'ray.js';
import 'particle.js';
let walls = [];
let ray;
let particle;

let xoff = 0;
let yoff = 1000;
let width = 400;
let height = 400;
const sceneWidth = 400;
const sceneHeight = 400;
let sliderFOV;
let scene = [];
function setup(){
    createCanvas(2*width,height);
    for(let i=0; i<10; i++){
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        walls[i] = new Boundary(x1,y1,x2,y2);
    }
    walls.push(new Boundary(0,0,width,0));
    walls.push(new Boundary(0,0,0,height));  
    walls.push(new Boundary(width,height,width,0)); 
    walls.push(new Boundary(width,height,0,height));
    particle = new Particle();
    ray = new Ray(100,200);
    sliderFOV = createSlider(0,180,30);
    sliderFOV.position(25,425);
    sliderFOV.input(changeFOV);
}
function changeFOV(){
    const fov =  sliderFOV.value();
    particle.updateFOV(fov);
}
function draw(){
    if (keyIsDown(LEFT_ARROW)){
        particle.rotate(-0.05);
    }
    else if (keyIsDown(RIGHT_ARROW)) {
        particle.rotate(+0.05);
    }
    else if(keyIsDown(UP_ARROW)){
        particle.move(2);
    }
    else if(keyIsDown(DOWN_ARROW)){
        particle.move(-2);
    }
    background(0);
    for(let wall of walls) wall.show();
    //particle.update(mouseX, mouseY);
    //particle.update(noise(xoff)*width, noise(yoff)*height);
    // xoff += 0.01;
    // yoff += 0.01;
    particle.show();
    scene = particle.look(walls);
    const w = sceneWidth/scene.length;
    push();
    translate(sceneWidth, 0);
    for(i = 0; i< scene.length; i++){
        const b = map(scene[i],0,sceneWidth,255,0);
        const h = map(scene[i],0,sceneWidth,2*sceneHeight/3,0);
        noStroke();
        fill(b);
        rectMode(CENTER);
        rect(i*w + w/2, sceneHeight/2 , w+0.5 , h);
    }
    pop();
}