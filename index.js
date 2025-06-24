var path = window.location.pathname;
var page = path.split("/").pop();

if (page.includes("cute")) {
  import ("./css/sitestyle.css");
  import("./css/cute.css");
  import("./js/index.js");
} else if (page.includes("old-web")) {
  import("./css/old-web.css");
  import("./js/old-web.js");
} else if (page.includes("index") || page.includes("en") || page === "") {
  import("./css/sitestyle.css");
  import("./js/index.js");
} else {
  import("./css/404.css");
}