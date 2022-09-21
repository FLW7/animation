const html = document.documentElement;
const main = $("#main");
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 395;
let currentFrame = (index) => `img/kitchen_c_${index.toString().padStart(3, "0")}.jpg`;

const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
    }
};

const img = new Image();
img.src = currentFrame(1);
canvas.width = 1900;
canvas.height = 1000;
img.onload = function () {
    context.drawImage(img, 0, 0);
};

const updateImage = (index) => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
};

// скорость скролла
let scrollSpeed = 350;
// скролл до мейна после анимации
function scrollAfterAnim(block, speed, e) {
    if (!block.hasClass("scrolled")) {
        $("html,body").stop().animate({ scrollTop: block.offset().top }, speed);
        e.preventDefault();
        setTimeout(() => {
            block.addClass("scrolled");
        }, speed);
    }
}

let scrollBefore = 0;
// функция отслеживающая направление скролла
function scrollDirection(e, frameIndex) {
    let scrolled = window.scrollY;
    // вверх
    if (scrollBefore > scrolled) {
        scrollBefore = scrolled;
        if ($("#main").hasClass("scrolled") && html.scrollTop < $("#main").offset().top) {
            $(".anim").removeClass("hide");
            $("#main").removeClass("scrolled");
        }
        // вниз
    } else {
        scrollBefore = scrolled;
        if (frameIndex == 394) {
            // скролл к мейну после завершения анимации
            scrollAfterAnim(main, scrollSpeed, e);
            $(".anim").addClass("hide");
        }
    }
}
const blue = document.querySelector(".blue");
window.addEventListener("scroll", (e) => {
    let scrollTop = html.scrollTop - document.querySelector(".anim").scrollTop;
    console.log("11", html.scrollTop - document.querySelector(".anim").scrollTop);
    scrollTop < 0 ? (scrollTop = 0) : (scrollTop = scrollTop);
    // console.log(scrollTop);
    console.log(document.querySelector(".anim").offsetHeight);
    const maxScrollTop = document.querySelector(".anim").offsetHeight / 2;
    const scrollFraction = scrollTop / maxScrollTop;

    let frameIndex = Math.min(frameCount - 1, Math.ceil(scrollFraction * frameCount));
    isNaN(frameIndex) ? (frameIndex = 1) : (frameIndex = frameIndex);
    // console.log(frameIndex);
    // показать/скрыть всплывающий текст
    if (frameIndex > 40) {
        $("#monitor-gui").removeClass("active");
        $("#monitor-gui").addClass("noactive");
    } else {
        $("#monitor-gui").removeClass("noactive");
        $("#monitor-gui").addClass("active");
    }

    // отслеживание направления скролла + показать\скрыть анимацию
    scrollDirection(e, frameIndex);

    requestAnimationFrame(() => updateImage(frameIndex + 1));
});

preloadImages();
