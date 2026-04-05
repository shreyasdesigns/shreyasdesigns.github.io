const toggle = document.getElementById("theme-toggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.setAttribute("data-theme", "dark");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    body.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});
