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

document.querySelectorAll(".project-card").forEach(card => {

  const data = JSON.parse(card.dataset.project);
  const tabs = card.querySelectorAll(".tab");
  const textEl = card.querySelector(".project-text");
  const imageEl = card.querySelector(".project-image img");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {

      // Update active state
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const key = tab.dataset.tab;
      const content = data[key];

      if (!content) return;

      // Update content
      textEl.textContent = content.text;
      imageEl.src = content.image;
    });
  });

});
