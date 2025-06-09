const toggleMenuButton = document.getElementById("toggle-menu");

toggleMenuButton.addEventListener("click", () => {
  document.querySelector("nav ul").classList.toggle("hidden");
  if (toggleMenuButton.innerHTML === "Закрыть навигацию") {
    toggleMenuButton.innerHTML = "Открыть навигацию";
  } else if (toggleMenuButton.innerHTML === "Close navigation") {
    toggleMenuButton.innerHTML = "Open navigation"
  } else if (toggleMenuButton.innerHTML === "Open navigation") {
    toggleMenuButton.innerHTML = "Close navigation"
  } else {
    toggleMenuButton.innerHTML = "Закрыть навигацию";
  }
});

window.addEventListener("resize", () => {
  if (innerWidth > 576) {
    document.querySelector("nav ul").classList.remove("hidden");
  } else if (toggleMenuButton.innerHTML === "Открыть навигацию" || toggleMenuButton.innerHTML === "Open navigation") {
    document.querySelector("nav ul").classList.add("hidden");
  }
});