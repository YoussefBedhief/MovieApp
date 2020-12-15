window.addEventListener('scroll', function(){
    const logoImage = document.querySelector(".logo img");
    const mainNav = document.querySelector("#mainNav");
    const liElement = document.querySelector("#mainNav ul .search .icon span");
    const iconElement = document.querySelector("#mainNav ul .search .icon");
    const aElement = document.querySelectorAll("#mainNav a");





    if (window.pageYOffset > 0){
        logoImage.style.height = "64px";
        mainNav.style.background = "#333";
        liElement.classList.add('txtWhite');
        iconElement.classList.add('whiteBg');
        aElement[0].classList.add('iconBg');
        aElement[1].classList.add('iconBg');

    } else{
        logoImage.style.height = "84px";
        mainNav.style.background = "#eee";
        liElement.classList.remove('txtWhite');
        iconElement.classList.remove('whiteBg');
        aElement[0].classList.remove('iconBg');
        aElement[1].classList.remove('iconBg');
    }
});
    