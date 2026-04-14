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
      const imgEl = card.querySelector(".project-image img"); // Target the image
      const track = card.querySelector(".project-tabs");

      // Function to handle smooth image swap
      const updateImageSmoothly = (img, newSrc) => {
        if (!img || img.src.includes(newSrc)) return;
      
        img.classList.add("fade-out");
        setTimeout(() => {
          img.src = newSrc;
          img.onload = () => {
            img.classList.remove("fade-out");
          };
        }, 300);
      };
    
      if (!tabs.length || !textEl || !track) return;
  
      track.style.setProperty("--tab-count", tabs.length);
  
      // INITIAL LOAD
      const defaultTab = card.querySelector(".tab.active");
      if (defaultTab) {
        const defaultKey = defaultTab.dataset.tab;
        const defaultContent = data[defaultKey];
  
        if (defaultContent) {
          textEl.innerHTML = defaultContent.text;
          if (imgEl && defaultContent.image) { // Update initial image
              imgEl.src = defaultContent.image;
          }
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
  
          // Update Text
          textEl.innerHTML = content.text;
          
          // Update Image Source
          updateImageSmoothly(imgEl, content.image);
  
          track.style.setProperty("--translateX", `calc(${index} * 100%)`);
        });
      });
  
  });

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

function copyText(text, element) {
  navigator.clipboard.writeText(text).then(() => {
    // 1. Add success class for styling
    element.classList.add('copied');
    
    // 2. Find the icon inside the clicked box
    const icon = element.querySelector('[data-lucide]');
    
    // 3. Swap to 'check'
    icon.setAttribute('data-lucide', 'check');
    lucide.createIcons(); // Re-render to show the checkmark

    // 4. Reset back to 'copy' after 2 seconds
    setTimeout(() => {
      element.classList.remove('copied');
      icon.setAttribute('data-lucide', 'copy');
      lucide.createIcons(); // Re-render to show the copy icon again
    }, 2000);
  });
}

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
