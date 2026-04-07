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

// Project Tab Switching

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


// Design Approach Tab Switching

document.querySelectorAll(".approach").forEach(section => {

  const data = {
    workshops: {
      text: "Facilitating workshops to align stakeholders and define problems.",
      image: "https://via.placeholder.com/600x400?text=Workshops"
    },
    flows: {
      text: "Mapping user flows to structure interactions and identify gaps.",
      image: "https://via.placeholder.com/600x400?text=Flows"
    },
    journeys: {
      text: "Understanding end-to-end user journeys across touchpoints.",
      image: "https://via.placeholder.com/600x400?text=Journeys"
    },
    architecture: {
      text: "Breaking down features into scalable systems and capabilities.",
      image: "https://via.placeholder.com/600x400?text=Architecture"
    },
    testing: {
      text: "Validating designs through usability testing and iteration.",
      image: "https://via.placeholder.com/600x400?text=Testing"
    }
  };

  const tabs = section.querySelectorAll(".tab");
  const textEl = section.querySelector(".approach-text");
  const imageEl = section.querySelector(".approach-visual img");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {

      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const key = tab.dataset.tab;
      const content = data[key];

      textEl.textContent = content.text;
      imageEl.src = content.image;
    });
  });

});
