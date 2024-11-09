const toggleMenuButton = document.getElementById("toggle-menu");

toggleMenuButton.addEventListener("click", () => {
  document.querySelector("nav ul").classList.toggle("hidden");
  if (toggleMenuButton.innerHTML === "Закрыть навигацию") {
    toggleMenuButton.innerHTML = "Открыть навигацию";
  } else {
    toggleMenuButton.innerHTML = "Закрыть навигацию";
  }
});

window.addEventListener("resize", () => {
  if (innerWidth > 576) {
    document.querySelector("nav ul").classList.remove("hidden");
  } else if (toggleMenuButton.innerHTML === "Открыть навигацию") {
    document.querySelector("nav ul").classList.add("hidden");
  }
});