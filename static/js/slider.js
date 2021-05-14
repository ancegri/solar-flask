const slides = document.getElementsByClassName("slider__slide");
var slideIndex = 0;
var slideDurationSeconds = 10;
var timeoutHandle;

window.addEventListener('load', slideAutomatization(false));

function getAbsoluteValue(slide) {
    return Math.abs(parseInt(slide.style.left.slice(0, -2)));
}

function changeSlide(direction) {
    slideAutomatization(true);
    if(direction == "next"){
        if(slideIndex < slides.length-1){
            for (let i = 0; i < slides.length; i++) {
                slideLeftPropertyValue = getAbsoluteValue(slides[i]);
                slides[i].style.left = "-"+(slideLeftPropertyValue+100)+"vw";
            }
            slideIndex++;
        }
    }
    else if(direction == "previous"){
        if(slideIndex > 0){ 
            for (let i = slides.length-1; i >= 0; i--) {
                slideLeftPropertyValue = getAbsoluteValue(slides[i]);
                slides[i].style.left = "-"+(slideLeftPropertyValue-100)+"vw";
            }
            slideIndex--;
        }
    }
}

function slideAutomatization(slideButtonPressed) {
    if(slideButtonPressed == true){
        window.clearTimeout(timeoutHandle);
        setTimeoutHandle();
    }else{
        setTimeoutHandle();
    }
    function setTimeoutHandle() {
        timeoutHandle = setTimeout(() => {
            if(slideIndex < slides.length-1) changeSlide("next");
            else if(slideIndex >= 0) changeSlide("previous");
        }, slideDurationSeconds*1000);
    }
}