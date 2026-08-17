const galleryImages = document.querySelector(".gallery-images");
const projectsCarousel = document.getElementById("projects-carousel");
const mockupsCarousel = document.getElementById("mockups-carousel");
const isScrolling = { projects: false, mockups: false };

function showNthImage(number, carousel) {
  let scrollWidth = 0;

  for (let image of carousel.children) {
    if (+image.id === number) {
      break;
    }
    scrollWidth += image.clientWidth;
  }

  carousel.scrollTo({ left: scrollWidth, behavior: "smooth" });
  currentGalleryImgNumber = number;
  const images = document.querySelectorAll(".gallery-images img");
  const description = images[currentGalleryImgNumber - 1].alt;
  document.querySelector(".description").innerHTML = description;
}

function moveLeft(carousel) {
  if (carousel.classList.contains("gallery-images")) {
    if (currentGalleryImgNumber > 1) {
      showNthImage(currentGalleryImgNumber - 1, carousel);
    } else {
      showNthImage(carousel.children?.length, carousel);
    }
  } else {
    const scrollFlag = carousel.id === "projects-carousel" ? "projects" : "mockups";

    if (carousel.scrollLeft > 0) {
      if (!isScrolling[scrollFlag]) {
        isScrolling[scrollFlag] = true;
        carousel.scrollBy({ left: -carousel.clientWidth, behavior: "smooth" });
      }
    } else {
      if (!isScrolling[scrollFlag]) {
        isScrolling[scrollFlag] = true;
        carousel.scrollBy({ left: carousel.scrollWidth, behavior: "smooth" });
      }
    }
  }
}

function moveRight(carousel) {
  if (carousel.classList.contains("gallery-images")) {
    if (currentGalleryImgNumber < carousel.children.length) {
      showNthImage(currentGalleryImgNumber + 1, carousel);
    } else {
      showNthImage(1, carousel);
    }
  } else {
    const scrollFlag = carousel.id === "projects-carousel" ? "projects" : "mockups";
    if (carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth) {
      if (!isScrolling[scrollFlag]) {
        isScrolling[scrollFlag] = true;
        carousel.scrollBy({ left: carousel.clientWidth, behavior: "smooth" });
      }
    } else {
      if (!isScrolling[scrollFlag]) {
        isScrolling[scrollFlag] = true;
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      }
    }
  }
}

let currentGalleryImgNumber = 1;

document.addEventListener("readystatechange", () => {
  const galleryPrevious = document.getElementById("gallery-prev");
  const galleryNext = document.getElementById("gallery-next");

  if (galleryPrevious && galleryNext && galleryImages) {
    galleryPrevious.addEventListener("click", () => moveLeft(galleryImages));
    galleryNext.addEventListener("click", () => moveRight(galleryImages));
  }

  const projectsPrevious = document.getElementById("projects-prev");
  const projectsNext = document.getElementById("projects-next");

  if (projectsPrevious && projectsNext && projectsCarousel) {
    projectsPrevious.addEventListener("click", () => moveLeft(projectsCarousel));
    projectsNext.addEventListener("click", () => moveRight(projectsCarousel));
    projectsCarousel.addEventListener("scrollend", () => { isScrolling.projects = false });
  }

  const mockupsPrevious = document.getElementById("mockups-prev");
  const mockupsNext = document.getElementById("mockups-next");

  if (mockupsPrevious && mockupsNext && mockupsCarousel) {
    mockupsPrevious.addEventListener("click", () => moveLeft(mockupsCarousel));
    mockupsNext.addEventListener("click", () => moveRight(mockupsCarousel));
    mockupsCarousel.addEventListener("scrollend", () => { isScrolling.mockups = false });
  }

  const animatedElems = document.querySelectorAll(".animated");

  for (let elem of animatedElems) {
    if (isElementInViewport(elem)) {
      setTimeout(() => elem.classList.add("shown"), elem.getAttribute("data-delay"));
    }
  }
});

function preventDefault(event) {
  event.preventDefault();
}

if (galleryImages) {
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

    if (galleryImages.scrollLeft - 185 * (currentGalleryImgNumber - 1) > 185 / 2 && currentGalleryImgNumber < 5) {
      moveRight(galleryImages);
    } else if (galleryImages.scrollLeft - 185 * (currentGalleryImgNumber - 1) < -185 / 2 && currentGalleryImgNumber > 1) {
      moveLeft(galleryImages);
    } else {
      showNthImage(currentGalleryImgNumber, galleryImages);
    }

    window.removeEventListener("mousewheel", preventDefault);
    window.removeEventListener('touchmove', preventDefault);
  }
}

if (projectsCarousel) {
  projectsCarousel.ontouchstart = () => {
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

    projectsCarousel.classList.add("auto-scroll");
    projectsCarousel.onpointermove = event => {
      projectsCarousel.scrollTo(projectsCarousel.scrollLeft - event.movementX, 0);
    }
  };

  projectsCarousel.ontouchend = () => {
    projectsCarousel.onpointermove = "";
    projectsCarousel.classList.remove("auto-scroll");

    const pixelsLeft = projectsCarousel.scrollLeft % projectsCarousel.clientWidth;
    if (pixelsLeft < projectsCarousel.clientWidth / 2) {
      projectsCarousel.scrollBy({ left: -pixelsLeft, behavior: "smooth" });
    } else {
      projectsCarousel.scrollBy({ left: projectsCarousel.clientWidth - pixelsLeft, behavior: "smooth" });
    }

    window.removeEventListener("mousewheel", preventDefault);
    window.removeEventListener('touchmove', preventDefault);
  }
}

if (mockupsCarousel) {
  mockupsCarousel.ontouchstart = () => {
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

    mockupsCarousel.classList.add("auto-scroll");
    mockupsCarousel.onpointermove = event => {
      mockupsCarousel.scrollTo(mockupsCarousel.scrollLeft - event.movementX, 0);
    }
  };

  mockupsCarousel.ontouchend = () => {
    mockupsCarousel.onpointermove = "";
    mockupsCarousel.classList.remove("auto-scroll");

    const pixelsLeft = mockupsCarousel.scrollLeft % mockupsCarousel.clientWidth;
    if (pixelsLeft < mockupsCarousel.clientWidth / 2) {
      mockupsCarousel.scrollBy({ left: -pixelsLeft, behavior: "smooth" });
    } else {
      mockupsCarousel.scrollBy({ left: mockupsCarousel.clientWidth - pixelsLeft, behavior: "smooth" });
    }

    window.removeEventListener("mousewheel", preventDefault);
    window.removeEventListener('touchmove', preventDefault);
  }
}


const menu = document.getElementById("menu");

if (menu) {
  const menuOpener = document.getElementById("menu-opener")
  if (menuOpener) {
    menuOpener.addEventListener("click", () => {
      menu.classList.add("open");
    })
  }

  const menuCloser = document.getElementById("menu-closer");
  if (menuCloser && menuOpener) {
    menuCloser.addEventListener("click", () => {
      menu.classList.remove("open");
    });

    const menuBackdrop = document.querySelector(".menu-backdrop");
    if (menuBackdrop) {
      menuBackdrop.addEventListener("click", () => {
        menu.classList.remove("open");
      })
    }

    document.body.addEventListener("click", event => {
      if (event.target && event.target.tagName === "A" && event.target.parentElement?.classList.contains("menu-item")) {
        menu.classList.remove("open");
      }
    });
  }
}

window.addEventListener("resize", () => {
  if (projectsCarousel) projectsCarousel.scrollTo({ left: 0, behavior: "smooth" });
  if (mockupsCarousel) mockupsCarousel.scrollTo({ left: 0, behavior: "smooth" });
});

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= ((window.innerHeight || document.documentElement.clientHeight) * 1.25) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const animatedElems = document.querySelectorAll(".animated");
window.addEventListener("scroll", () => {
  for (let elem of animatedElems) {
    if (isElementInViewport(elem)) {
      setTimeout(() => elem.classList.add("shown"), elem.getAttribute("data-delay"));
    }
  }
})