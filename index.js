const carousel = document.querySelector(".gallery-carousel");

function showNthImage(number) {
  for (let child of carousel.children) {
    if (child.classList.contains("gallery-images")) {
      let scrollWidth = 0;
      let k = 1;

      for (let image of child.children) {
        if (+image.id === number) {
          break;
        }

        k++;
        scrollWidth += 185;
      }

      const galleryImages = document.querySelector(".gallery-images");
      galleryImages.classList.remove("auto-scroll");
      child.scrollTo(scrollWidth, 0);
    }
  }

  currentImgNumber = number;

  const images = document.querySelectorAll("img");
  const description = images[currentImgNumber - 1].alt;
  document.querySelector(".description").innerHTML = description;
}

function moveLeft() {
  if (currentImgNumber > 1) {
    showNthImage(currentImgNumber - 1);
  } else {
    showNthImage(5);
  }
}

function moveRight() {
  if (currentImgNumber < 5) {
    showNthImage(currentImgNumber + 1);
  } else {
    showNthImage(1);
  }
}

let currentImgNumber = 1;

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");
  for (let image of images) {
    const ratio = image.naturalHeight / image.naturalWidth;
    image.height = ratio * 175;
  }

  const previous = document.getElementById("previous");
  const next = document.getElementById("next");

  previous.addEventListener("click", moveLeft);
  next.addEventListener("click", moveRight);
});

function preventDefault(event) {
  event.preventDefault();
}

const galleryImages = document.querySelector(".gallery-images");
galleryImages.ontouchstart = () => {
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true;
      }
    });
    window.addEventListener("test", null, opts);
  } catch (e) {

  }

  const options = supportsPassive ? { passive: false } : false;

  window.addEventListener("mousewheel", preventDefault, options);
  window.addEventListener('touchmove', preventDefault, options);

  galleryImages.classList.add("auto-scroll");
  galleryImages.onpointermove = event => {
    galleryImages.scrollTo(galleryImages.scrollLeft - event.movementX, 0);
  }
};

galleryImages.ontouchend = () => {
  galleryImages.onpointermove = "";
  galleryImages.classList.remove("auto-scroll");
  
  if (galleryImages.scrollLeft - 185 * (currentImgNumber - 1) > 185 / 2 && currentImgNumber < 5) {
    moveRight();
  } else if (galleryImages.scrollLeft - 185 * (currentImgNumber - 1) < -185 / 2 && currentImgNumber > 1) {
    moveLeft();
  } else {
    showNthImage(currentImgNumber);
  }

  window.removeEventListener("mousewheel", preventDefault);
  window.removeEventListener('touchmove', preventDefault);
}