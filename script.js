document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     THEME SWITCH
  ===================== */

  const toggle = document.getElementById("theme-toggle");
  const body = document.body;
  const icon = document.querySelector(".slider .icon");

  function updateIcon(theme) {
    if (!icon) return;

    icon.innerHTML = theme === "dark"
      ? `<i data-lucide="moon"></i>`
      : `<i data-lucide="sun"></i>`;

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  body.setAttribute("data-theme", savedTheme);

  if (toggle) {
    toggle.checked = savedTheme === "dark";

    toggle.addEventListener("change", () => {
      const theme = toggle.checked ? "dark" : "light";

      body.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);

      updateIcon(theme);
    });
  }

  updateIcon(savedTheme);

  /* =====================
     PROJECT TABS
  ===================== */

  document.querySelectorAll(".project-card").forEach(card => {

    let data;

    try {
      data = JSON.parse(card.dataset.project);
    } catch (e) {
      console.error("Invalid JSON in project-card", e);
      return;
    }

    const tabs = card.querySelectorAll(".tab");
    const textEl = card.querySelector(".project-text");
    const track = card.querySelector(".project-tabs");

    if (!tabs.length || !textEl || !track) return;

    track.style.setProperty("--tab-count", tabs.length);

    // INITIAL LOAD
    const defaultTab = card.querySelector(".tab.active");
    if (defaultTab) {
      const defaultKey = defaultTab.dataset.tab;
      const defaultContent = data[defaultKey];

      if (defaultContent) {
        textEl.innerHTML = defaultContent.text;
      }
    }

    // INDICATOR POSITION
    const activeIndex = [...tabs].findIndex(t => t.classList.contains("active"));
    track.style.setProperty("--translateX", `calc(${activeIndex} * 100%)`);

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const key = tab.dataset.tab;
        const content = data[key];
        if (!content) return;

        textEl.innerHTML = content.text;

        track.style.setProperty("--translateX", `calc(${index} * 100%)`);
      });
    });

  });

  /* =====================
     APPROACH TABS (TEXT ONLY)
  ===================== */

  document.querySelectorAll(".approach").forEach(section => {

    const data = {
      workshops: {
        text: "I facilitate cross-functional workshops to bridge the gap between business requirements and technical feasibility. It’s not about sticky notes; it’s about extracting tribal knowledge and building a shared definition of success before a single pixel is moved."
      },
      flows: {
        text: "I map complex logic to ensure the system remains resilient under pressure. I focus heavily on 'the unhappy path'—handling errors, permissions, and high-density data states that typical flows ignore."
      },
      journeys: {
        text: "I look beyond the screen to the entire service ecosystem. By mapping front-of-house actions against back-of-house processes, I identify operational bottlenecks and automation opportunities."
      },
      architecture: {
        text: "I design scalable data structures, not just menus. I focus on relationships between objects so the system remains intuitive as it scales."
      },
      testing: {
        text: "I move beyond likability to measure efficacy. I validate hypotheses through rapid prototyping and longitudinal testing to de-risk product decisions."
      }
    };

    const tabs = section.querySelectorAll(".tab");
    const textEl = section.querySelector(".approach-text");

    if (!tabs.length || !textEl) return;

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const key = tab.dataset.tab;
        const content = data[key];

        textEl.innerHTML = content.text;
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

  if (navTrack) {
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
  }

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

/* =====================
   IMAGE PREVIEW (SAFE)
===================== */

const preview = document.querySelector(".image-preview");
const previewImg = preview?.querySelector("img");

document.querySelectorAll(".project-image img").forEach(img => {
  img.addEventListener("click", () => {
    if (!preview || !previewImg) return;

    previewImg.src = img.src;
    preview.classList.add("active");
  });
});

preview?.addEventListener("click", () => {
  preview.classList.remove("active");
});
