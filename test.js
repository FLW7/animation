const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 395;
const currentFrame = index => (
  `img/kitchen_c_${index.toString().padStart(3, '0')}.jpg`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width = 1900;
canvas.height = 1000;
img.onload = function () {
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {

  // console.log(window.scrollY); // показываем пиксели

  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  console.log(frameIndex);
  if (frameIndex > 40) {
    $('#monitor-gui').removeClass("active");
    $('#monitor-gui').addClass("noactive");
  }
  else {
    $('#monitor-gui').removeClass("noactive");
    $('#monitor-gui').addClass("active");
  }

  if (frameIndex > 394) {
    // $("#hero-lightpass").css('display', 'none');
  }

  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages()