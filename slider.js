var indexStorage = localStorage.getItem("last_slide");
var slideIndex = parseInt(indexStorage,10);

var myTimer;

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
            if (play_btn.innerHTML=="pause"){
               myTimer = setInterval(function(){plusSlides(1)}, 1700);
            }
            break;
            
        case "ArrowRight":
            console.log("right");
            plusSlides(1);
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

window.addEventListener("load",function() {
    play_btn = document.getElementById('auto_play');
    play_btn.innerHTML=localStorage.getItem("auto_play");
    play_btn.addEventListener('click', check);
    showSlides(slideIndex);
    if (play_btn.innerHTML=="pause"){
        myTimer = setInterval(function(){plusSlides(1)}, 1700);
    }    
})

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
  var slides = document.getElementsByClassName("slides");
  var dots = document.getElementsByClassName("dot");
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
