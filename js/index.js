window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000;

var origimage = null;
var grayscaleimg = null;
var makeredimg = null;
var makerainbow = null;
var imgcanvas = null;
var window_filter_image = null;

function uploadfile(){
  imgcanvas = document.getElementById("mycan");
  var fileinput = document.getElementById("myfile");
  origimage = new SimpleImage(fileinput);
  alert("image loaded");
  origimage.drawTo(imgcanvas);
  
  makeredimg = new SimpleImage(fileinput);
  makerainbow = new SimpleImage(fileinput);
  grayscaleimg = new SimpleImage(fileinput);
  
}

function do1() {
  if(imageIsLoaded(grayscaleimg)){
    filterGray();
    grayImage.drawTo(imgcanvas);
  }
}

function do2 (){
  if(imageIsLoaded(makerainbow)){
    filterRainbow();
    makerainbow.drawTo(imgcanvas);
  }
}

function do3(){
  if(imageIsLoaded(makeredimg)){
    filterRed();
    makeredimg.drawTo(imgcanvas);
  }
}

function imagereset(){
   if(imageIsLoaded(origimage)){
      origimage.drawTo(imgcanvas);
   }
}

function imageIsLoaded(img) {
   if (img == null ||!img.complete()){
     alert("image has not been loaded");
     return false;
   } else {
      alert("image has been loaded");
     return true;
   }
}

function filterGray(){
  for (var pixel of grayscaleimg.values()){
    var avg = (pixel.getRed()+pixel.getBlue()+pixel.getGreen())/3;
    pixel.setRed(avg);
    pixel.setBlue(avg);
    pixel.setGreen(avg);
  }
  grayscaleimg.drawTo(imgcanvas);
}

function filterRed(){
  for (var pixel of makeredimg.values()){
    pixel.setRed(255);
  }
  makeredimg.drawTo(imgcanvas);
}

function filterRainbow(){
  var w = makerainbow.getWidth();
  var h = makerainbow.getHeight();
  for (var pixel of makerainbow.values()){
    if(pixel.getY() < h/3 ){
      pixel.setRed(255);
    } else
    if(pixel.getY() < 2*h/3){
      pixel.setGreen(255);
    } else {
      pixel.setBlue(255);
    }
  }
  makerainbow.drawTo(imgcanvas);
}

function windowFilter(window_filter_image, width, height, window_border_thickness){
  for(var img_pixel of window_filter_image.values()){
    if(img_pixel.getX()<= window_border_thickness ||img_pixel.getY()<= window_border_thickness ){
        img_pixel.setRed(0);
        img_pixel.setGreen(255);
        img_pixel.setBlue(0);
    }
    if(img_pixel.getX()>= width-window_border_thickness || img_pixel.getY()>= height-window_border_thickness ){
        img_pixel.setRed(0);
        img_pixel.setGreen(255);
        img_pixel.setBlue(0);
    }
    
   if(img_pixel.getX()>= 1/4*width && img_pixel.getX()<= (1/4*width)+window_border_thickness){
       img_pixel.setRed(255);
       img_pixel.setGreen(255);
       img_pixel.setBlue(0);
   }
   
   if(img_pixel.getX()>= 2/4*width && img_pixel.getX()<= (2/4*width)+window_border_thickness){
       img_pixel.setRed(0);
       img_pixel.setGreen(255);
       img_pixel.setBlue(0);
   }
   
   if(img_pixel.getX()>= 3/4*width && img_pixel.getX()<= (3/4*width)+window_border_thickness){
       img_pixel.setRed(0);
       img_pixel.setGreen(255);
       img_pixel.setBlue(0);
   }
   
   if(img_pixel.getY()>= (1/2*height) && img_pixel.getY()<= (1/2*height)+window_border_thickness){
       img_pixel.setRed(0);
       img_pixel.setGreen(255);
       img_pixel.setBlue(0);
   }
   
}
}

function applyWindowFilter(){
  if(imageIsLoaded(window_filter_image)){
    var window_border_thickness =10;
    var width= window_filter_image.getWidth();
    var height = window_filter_image.getHeight();
    windowFilter(window_filter_image,width,height, window_border_thickness);
    window_filter_image.drawTo(imgcanvas);
    
}
}