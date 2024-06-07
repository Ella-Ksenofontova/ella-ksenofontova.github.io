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
})