new p5(); 

let nbWeeds = 60;
let rootNoise = new p5.Vector(random(123456), random(123456));
let mode = 1;
let radius = 220;
let noiseOn = true;
let center;

let weeds = [];

function setup() {
  createCanvas(600, 400);
  center = new p5.Vector(width / 2, height / 2);
  strokeWeight(1);

  for (let i = 0; i < nbWeeds; i++) {
    weeds[i] = new SeaWeed(i * TWO_PI / nbWeeds, 3 * radius);
    weeds[i].update();
  }
}

function draw() {
  background(50);
  noStroke();
  fill(20, 10, 20);
  rect(0, 0, width, height);
  
  rootNoise.add(new p5.Vector(.01, .01));
  strokeWeight(1);
  // for (let i = 0; i < nbWeeds; i++) {
  //   weeds[i].update();
  // }

  stroke(120, 0, 0, 220);
  strokeWeight(2);
  noFill();
  ellipse(center.x, center.y, 2 * radius, 2 * radius);
}


function SeaWeed(p_rad, p_length) {

  const DIST_MAX = 5.5; // length of each segment
  const maxWidth = 50; // max width of the base line
  const minWidth = 11; // min width of the base line
  const FLOTATION = -3.5; // flotation constant
  
  let mouseDist = 40; // mouse interaction distance
  let nbSegments = p_length / DIST_MAX;
  let pos = [];
  let rad = [];
  let color = [];
  
  let cosi = cos(p_rad);
  let sinu = sin(p_rad);

  let x = width / 2 + radius * cosi; // origin of the weed
  let y = height / 2 + radius * sinu;

  for (let i = 0; i < nbSegments; i++) {
    pos[i] = new p5.Vector();
  }

  for (let i = 1; i < nbSegments; i++) {
    pos[i] = new p5.Vector(pos[i - 1].x - DIST_MAX * cosi, pos[i - 1].y - DIST_MAX * sinu);
    rad[i] = 3;
  }

  const update = function(){
    let mouse = new p5.Vector(mouseX, mouseY);
    pos[0] = new p5.Vector(x, y);

    for (let i = 0; i < nbSegments; i++) {
      let n = noise(rootNoise.x + .002 * pos[i].x, rootNoise.y + .002 * pos[i].y);
      let noiseForce = (0.5 - n) * 7;

      if (noiseOn) {
        pos[i].x += noiseForce;
        pos[i].y += noiseForce;
      }

      let pv = new p5.Vector(cosi, sinu);
      pv.mult(map(i, 1, nbSegments, FLOTATION, .6 * FLOTATION));
      pos[i].add(pv);

      // let tmp = p5.Vector().sub(pos[i - 1], pos[i]);
      // tmp.normalize();
      // tmp.mult(DIST_MAX);
      // pos[i] = p5.Vector().sub(pos[i - 1], tmp);
    }

    beginShape();
    noFill();
    for (let i = 0; i < nbSegments; i++) {
      let r = rad[i];
      if (mode == 1) {
        // stroke(cols[i]);
        vertex(pos[i].x, pos[i].y);
      } else {
        // fill(cols[i]);
        noStroke();
        ellipse(pos[i].x, pos[i].y, 2, 2);
      }
    }
    endShape();
  }

  return {
    update: update,
  }
}



// class SeaWeed
// {
//   final static float DIST_MAX = 5.5;//length of each segment
//   final static float maxWidth = 50;//max width of the base line
//   final static float minWidth = 11;//min width of the base line
//   final static float FLOTATION = -3.5;//flotation constant
//   float mouseDist;//mouse interaction distance
//   int nbSegments;
//   PVector[] pos;//position of each segment
//   color[] cols;//colors array, one per segment
//   float[] rad;
//   MyColor myCol = new MyColor();
//   float x, y;//origin of the weed
//   float cosi, sinu;

//   SeaWeed(float p_rad, float p_length)
//   {
//     nbSegments = (int)(p_length/DIST_MAX);
//     pos = new PVector[nbSegments];
//     cols = new color[nbSegments];
//     rad = new float[nbSegments];
//     cosi = cos(p_rad);
//     sinu = sin(p_rad);
//     x = width/2 + radius*cosi;
//     y = height/2 + radius*sinu;
//     mouseDist = 40;
//     pos[0] = new PVector(x, y);
//     for (int i = 1; i < nbSegments; i++)
//     {
//       pos[i] = new PVector(pos[i-1].x - DIST_MAX*cosi, pos[i-1].y - DIST_MAX*sinu);
//       cols[i] = myCol.getColor();
//       rad[i] = 3;
//     }
//   }

//   void update()
//   {
//     PVector mouse = new PVector(mouseX, mouseY);

//     pos[0] = new PVector(x, y);
//     for (int i = 1; i < nbSegments; i++)
//     {
//       float n = noise(rootNoise.x + .002 * pos[i].x, rootNoise.y + .002 * pos[i].y);
//       float noiseForce = (.5 - n) * 7;
//       if(noiseOn)
//       {
//         pos[i].x += noiseForce;
//         pos[i].y += noiseForce;
//       }
//       PVector pv = new PVector(cosi, sinu);
//       pv.mult(map(i, 1, nbSegments, FLOTATION, .6*FLOTATION));
//       pos[i].add(pv);

//       //mouse interaction
//       //if(pmouseX != mouseX || pmouseY != mouseY)
//       {
//         float d = PVector.dist(mouse, pos[i]);
//         if (d < mouseDist)// && pmouseX != mouseX && abs(pmouseX - mouseX) < 12)
//         {
//           PVector tmpPV = mouse.get();       
//           tmpPV.sub(pos[i]);
//           tmpPV.normalize();
//           tmpPV.mult(mouseDist);
//           tmpPV = PVector.sub(mouse, tmpPV);
//           pos[i] = tmpPV.get();
//         }
//       }

//       PVector tmp = PVector.sub(pos[i-1], pos[i]);
//       tmp.normalize();
//       tmp.mult(DIST_MAX);
//       pos[i] = PVector.sub(pos[i-1], tmp);
      
//       //keep the points inside the circle
//       if(PVector.dist(center, pos[i]) > radius)
//       {
//         PVector tmpPV = pos[i].get();
//         tmpPV.sub(center);
//         tmpPV.normalize();
//         tmpPV.mult(radius);
//         tmpPV.add(center);
//         pos[i] = tmpPV.get();
//       }
//     }

//     updateColors();

//     if (mode == 0)
//     {
//       stroke(0, 100);
//     }     
//     beginShape();
//     noFill(); 
//     for (int i = 0; i < nbSegments; i++)
//     { 
//       float r = rad[i];
//       if (mode == 1)
//       {
//         stroke(cols[i]);
//         vertex(pos[i].x, pos[i].y);
//         //line(pos[i].x, pos[i].y, pos[i+1].x, pos[i+1].y);
//       } else
//       {
//         fill(cols[i]);
//         noStroke();
//         ellipse(pos[i].x, pos[i].y, 2, 2);
//       }
//     }
//     endShape();
//   }

//   void updateColors()
//   {
//     myCol.update();
//     cols[0] = myCol.getColor();
//     for (int i = nbSegments-1; i > 0; i--)
//     {
//       cols[i] = cols[i-1];
//     }
//   }
// }