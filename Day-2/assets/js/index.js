const toggle = document.getElementById("toggleBtn");
const body = document.body;

let savedTheme = localStorage.getItem("theme") || "light";
body.classList.add(savedTheme);

toggle.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    body.classList.replace("light", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.replace("dark", "light");
    localStorage.setItem("theme", "light");
  }
});