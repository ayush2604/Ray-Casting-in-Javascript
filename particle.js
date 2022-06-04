import 'ray.js';
class Particle{
    constructor(){
        this.fov = 30;
        this.pos = createVector(width/2, height/2);
        this.heading = 0;
        this.rays = [];
        for(let i=-this.fov; i< this.fov; i+= 0.5){
            this.rays.push(new Ray(this.pos, radians(i)));
        }
    }
    updateFOV(fov){
        this.fov = fov;
        this.rays = [];
        for(let i=-this.fov; i< this.fov; i+= 0.5){
            this.rays.push(new Ray(this.pos, radians(i) + this.heading));
        }
    }
    rotate(angle){
        this.heading += angle;
        let idx = 0;
        for(let i = -this.fov; i < this.fov; i+=0.5){
            this.rays[idx].setAngle(radians(i) + this.heading);
            idx +=1;
        }
    }
    move(amt){
        const vel = p5.Vector.fromAngle(this.heading);
        vel.setMag(amt);
        this.pos.add(vel);
    }
    update(x,y){
        this.pos.set(x,y);
    }
    look(walls){
        const scene = [];
        for(let i = 0; i< this.rays.length; i++){
            const ray = this.rays[i];
            let closest = null;
            let record = Infinity;
            for (let wall of walls){
                const pt = ray.cast(wall);
                if (pt){
                    let d = p5.Vector.dist(this.pos,pt);
                    const a = ray.dir.heading() - this.heading;
                    d = d*cos(a);
                    if (d<record){
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest){
                stroke(255,100);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
                scene[i] = record;
            }
            else scene[i] = Infinity;
        }
        return scene;
    }
    show(){
        fill(255);
        ellipse(this.pos.x,this.pos.y,4);
        for (let ray of this.rays){
            ray.show();
        }
    }
}