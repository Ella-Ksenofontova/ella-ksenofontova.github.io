const menuWrapper = document.querySelector(".menu-wrapper");
const menuOpener = document.getElementById("menu-opener");
const menuCloser = document.getElementById("menu-closer");

if (menuWrapper && menuOpener && menuCloser) {
    menuOpener.addEventListener("click", () => menuWrapper.classList.add("open"));
    menuCloser.addEventListener("click", () => menuWrapper.classList.remove("open"));
}