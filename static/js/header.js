let header = document.getElementById("header__principal");
let header__title = document.querySelector("#header__principal h1");
let header__nav = document.querySelector("#header__principal nav");

window.addEventListener('scroll', ()=>{
    header.classList.toggle('header--scroll', scrollY > 0);
    header__title.classList.toggle('header__title--scroll', scrollY > 0);
    header__nav.classList.toggle('header__nav--scroll', scrollY > 0);
});