document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     THEME SWITCH
  ===================== */

  const toggle = document.getElementById("theme-toggle");
  const body = document.body;
  const icon = document.querySelector(".slider .icon");
  const transitionEl = document.querySelector(".theme-transition");

  function updateIcon(theme) {
    icon.innerHTML = theme === "dark"
      ? `<i data-lucide="moon"></i>`
      : `<i data-lucide="sun"></i>`;

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  body.setAttribute("data-theme", savedTheme);
  toggle.checked = savedTheme === "dark";
  updateIcon(savedTheme);

  toggle.addEventListener("change", () => {
    const theme = toggle.checked ? "dark" : "light";
  
    body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  
    updateIcon(theme);
  });

  /* =====================
     PROJECT TABS
  ===================== */

  document.querySelectorAll(".project-card").forEach(card => {

    const data = JSON.parse(card.dataset.project);
    const tabs = card.querySelectorAll(".tab");
    const textEl = card.querySelector(".project-text");
    const imageEl = card.querySelector(".project-image img");
    const track = card.querySelector(".project-tabs");

    track.style.setProperty("--tab-count", tabs.length);

    const activeIndex = [...tabs].findIndex(t => t.classList.contains("active"));
    track.style.setProperty("--translateX", `calc(${activeIndex} * 100%)`);

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const key = tab.dataset.tab;
        const content = data[key];
        if (!content) return;

        textEl.textContent = content.text;
        imageEl.src = content.image;

        track.style.setProperty("--translateX", `calc(${index} * 100%)`);
      });
    });

  });

  /* =====================
     APPROACH TABS
  ===================== */

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

  /* =====================
     EXPERIENCE
  ===================== */

  const toggleBtn = document.querySelector(".timeline-toggle");
  const moreSection = document.querySelector(".timeline-more");

  if (toggleBtn && moreSection) {
    toggleBtn.addEventListener("click", () => {
      const isHidden = moreSection.classList.contains("hidden");

      if (isHidden) {
        moreSection.classList.remove("hidden");
        toggleBtn.textContent = "Show less ↑";
      } else {
        moreSection.classList.add("hidden");
        toggleBtn.textContent = "Show more ↓";
      }
    });
  }

  /* =====================
     NAV UNDERLINE
  ===================== */

  const navLinks = document.querySelectorAll(".nav-links a");
  const navTrack = document.querySelector(".nav-links");

  navLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      const rect = link.getBoundingClientRect();
      const parentRect = navTrack.getBoundingClientRect();

      navTrack.style.setProperty("--nav-left", rect.left - parentRect.left + "px");
      navTrack.style.setProperty("--nav-width", rect.width + "px");
    });
  });

  navTrack.addEventListener("mouseleave", () => {
    navTrack.style.setProperty("--nav-width", "0px");
  });
});

/* =====================
   CASE STUDY PAGE
===================== */

const sections = document.querySelectorAll(".case-section");
const links = document.querySelectorAll(".case-link");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  links.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/* =====================
   BOTTOM NAV ACTIVE STATE
===================== */

const sections = document.querySelectorAll(".case-project");
const bottomLinks = document.querySelectorAll(".bottom-link");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 200;
    if (scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  bottomLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

});
