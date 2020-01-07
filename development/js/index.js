//features/1.2__carousel

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('li');

let active = 0;
slides[active].classList.add("visible");

next.addEventListener("click", function () {
    slides[active].classList.remove("visible");
    if (active >= slides.length - 1){
        active = 0
    } else{
        active ++;
    }
    slides[active].classList.add("visible")
});
prev.addEventListener("click", function () {
    slides[active].classList.remove("visible");
    if (active === 0){
        active = slides.length - 1;
    }
    else{
        active--;
    }
    slides[active].classList.add("visible")
});
