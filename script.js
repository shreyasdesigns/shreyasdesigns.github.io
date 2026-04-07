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

const icon = document.querySelector(".slider .icon");

function updateIcon(theme) {
  icon.innerHTML = theme === "dark"
    ? `<i data-lucide="moon"></i>`
    : `<i data-lucide="sun"></i>`;

  lucide.createIcons();
}

const transitionEl = document.querySelector(".theme-transition");

toggle.addEventListener("change", (e) => {
  const rect = e.target.getBoundingClientRect();

  document.documentElement.style.setProperty("--x", rect.left + "px");
  document.documentElement.style.setProperty("--y", rect.top + "px");

  transitionEl.animate(
    [
      { width: "0", height: "0", opacity: 1 },
      { width: "200vw", height: "200vw", opacity: 1 }
    ],
    { duration: 500, easing: "ease-out" }
  );
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

const tabTracks = document.querySelectorAll(".project-tabs");

tabTracks.forEach(track => {
  const tabs = track.querySelectorAll(".tab");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      track.style.setProperty("--tab-index", index);
      track.style.setProperty("--tab-count", tabs.length);

      track.style.setProperty(
        "--translateX",
        `calc(${index} * 100%)`
      );

      track.querySelector("::after");
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

// Experience Expand / Collapse

const toggleBtn = document.querySelector(".timeline-toggle");
const moreSection = document.querySelector(".timeline-more");

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

/* Nav Animation */

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
