var slides_tmp = document.getElementsByClassName("slideshow-inner")[0];
    
var dots_tmp = document.getElementsByClassName("dots")[0];

var myTimer;
var slideIndex=0;
var slides;
var dots;

window.addEventListener("load",function() {
    play_btn = document.getElementById('auto_play');
    if (localStorage.getItem("auto_play")!=null){
        play_btn.innerHTML=localStorage.getItem("auto_play");
    }
    else {
        play_btn.innerHTML="pause";
    }
    play_btn.addEventListener('click', check);
    
    const len=4;
    
    for (var i=0;i<len;i++){
        var slide=document.createElement("div");
        slide.className = "slides";
        var img = document.createElement("img");
        img.src="img/"+(i+1)+".jpg";
        console.log(img.src);
        slide.appendChild(img);
        slides_tmp.append(slide);
        
        var dot = document.createElement("div");
        dot.className = "dot";
        dots_tmp.append(dot);
    }
    
    slides=document.getElementsByClassName("slides");  
    
    dots_tmp = Array.prototype.slice.call(document.querySelectorAll('.dots .dot'));
    for (const dot of dots_tmp) {
        dot.onclick = function () {
            currentSlide(dots_tmp.indexOf(dot)+1);
        }
    }

    dots=document.getElementsByClassName("dot");
    
    if (play_btn.innerHTML=="pause"){
        myTimer = setInterval(function(){plusSlides(1)}, 1700);
    }
    showSlides(slideIndex);
})


if (localStorage.getItem("last_slide")!=null){
    var indexStorage = localStorage.getItem("last_slide");
    slideIndex = parseInt(indexStorage,10);
}

document.getElementById('close').onclick = function () {
    console.log("closing");
    document.getElementById('component').hidden = true;
    clearInterval(myTimer);
    localStorage.setItem("last_slide",slideIndex);
}

function keyboardInput(e){
    switch(e.key){   
        case "ArrowLeft": 
            console.log("left");
            plusSlides(-1);
            clearInterval(myTimer);
            if (play_btn.innerHTML=="pause"){
               myTimer = setInterval(function(){plusSlides(1)}, 1700);
            }
            break;
            
        case "ArrowRight":
            console.log("right");
            plusSlides(1);
            clearInterval(myTimer);
            if (play_btn.innerHTML=="pause"){
               myTimer = setInterval(function(){plusSlides(1)}, 1700);
            }
            break;
            
        case "Escape":
            console.log("esc");
            document.getElementById('component').hidden = true;
            clearInterval(myTimer);
            localStorage.setItem("last_slide",slideIndex);
            break;
    }
}

addEventListener("keydown",keyboardInput);


function plusSlides(n){
  clearInterval(myTimer);
  if (n < 0){
    showSlides(slideIndex -= 1);
  } else {
   showSlides(slideIndex += 1); 
  }
    if (play_btn.innerHTML=="pause"){
        if (n == -1){
    myTimer = setInterval(function(){plusSlides(n + 2)}, 1700);
  } else {
    myTimer = setInterval(function(){plusSlides(n + 1)}, 1700);
  }
    }
}

function currentSlide(n){ 
  clearInterval(myTimer);
    if (play_btn.innerHTML=="pause"){
  myTimer = setInterval(function(){plusSlides(n + 1)}, 1700);
    }
  showSlides(slideIndex = n);   
}

function showSlides(n){
  var i;
  
  if (n > slides.length) {
      slideIndex = 1;
  }
  if (n < 1) {
      slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
    localStorage.setItem("last_slide",slideIndex);
}

check = () => {
    if (play_btn.innerHTML=="pause"){
        play_btn.innerHTML = "resume";
        localStorage.setItem("auto_play","resume");
        clearInterval(myTimer);
    } else {
        play_btn.innerHTML = "pause";
        localStorage.setItem("auto_play","pause");
        clearInterval(myTimer);
        myTimer = setInterval(function(){plusSlides(slideIndex)}, 1700);
    }
}
