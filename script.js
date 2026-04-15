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
     APPROACH ACCORDION
  ===================== */

  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('active');
    });
  });


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
     MOBILE NAV
  ===================== */

  const toggle = document.querySelector('.nav-toggle');
  const close = document.querySelector('.nav-close');
  const overlay = document.querySelector('.nav-overlay');
  const links = document.querySelectorAll('.overlay-menu a');
  
  const toggleMenu = () => {
    overlay.classList.toggle('is-open');
  };
  
  toggle.addEventListener('click', toggleMenu);
  close.addEventListener('click', toggleMenu);
  
  // Close when a link is clicked
  links.forEach(link => {
    link.addEventListener('click', toggleMenu);
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
    METRIC COUNTER
===================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PROJECT TABS LOGIC
    document.querySelectorAll(".project-card").forEach(card => {
        // ... (Your existing tab logic goes here) ...
    });

    // 2. METRIC COUNTER LOGIC (The complete, self-contained block)
    const runCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const textNode = Array.from(el.childNodes).find(node => 
            node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ""
        );
        
        if (el.getAttribute('data-counting') === 'true') return;
        el.setAttribute('data-counting', 'true');

        let current = 0;
        const timer = setInterval(() => {
            current += Math.ceil(target / 40);
            if (current >= target) {
                if (textNode) textNode.textContent = target;
                clearInterval(timer);
            } else {
                if (textNode) textNode.textContent = current;
            }
        }, 40);
    };

    const metricItems = document.querySelectorAll('.metric-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    metricItems.forEach(item => observer.observe(item));
});

// Initial run to render icons on page load
lucide.createIcons();
