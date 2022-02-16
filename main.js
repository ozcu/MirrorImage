import './style.css'
import p5 from "p5";



const sketch = p5 => {

 // let img 
  let video
  let vScale = 16

/*   p5.preload =() =>{

    img = p5.loadImage('assets/test.jpg')
    
  } */

  // Variables scoped within p5
  const canvasWidth = p5.windowWidth;
  const canvasHeight = p5.windowHeight;


  // Setup function

  p5.setup = () => {


    //p5.createCanvas(img.width,img.height)
    let canvas = p5.createCanvas(canvasWidth,canvasHeight)

    p5.pixelDensity(1)    

    video = p5.createCapture(p5.VIDEO)
    video.size(640/vScale,480/vScale)
    video.hide()
  
   
  };

  // Draw function

  p5.draw = () => {
    p5.background(0)

    video.loadPixels()


    for(let row=0;row<video.height;row++){
      for(let col = 0;col <video.width;col++){
        let index = ((video.width -col+1) + (row *video.width))*4
        let r = video.pixels[index+0]
        let g = video.pixels[index+1]
        let b = video.pixels[index+2]

        let brightness = (r+g+b)/3
        p5.fill(255)
        let w = p5.map(brightness,0,255,0,vScale)
        p5.noStroke()
        p5.rectMode(p5.CENTER)
        p5.rect((canvasWidth-640)/2+col*vScale,(canvasHeight-480)/2+row*vScale,w,w)
        //p5.ellipse(col*vScale,row*vScale,w,w)


      }
    } 
      
  }
}

new p5(sketch);

export default sketch;

p5.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight)
    
}