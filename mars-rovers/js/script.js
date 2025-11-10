/* ==========================================================
   NASA Mars Rovers – Main JavaScript File
   Author: James Culwell
   Description: Handles dark mode toggle, accessibility focus,
   and timeline animations.
   ========================================================== */

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // ===== DARK MODE TOGGLE =====
  const darkModeToggle = document.getElementById("darkModeToggle");

  // Check saved preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Add event listener
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      // Save preference to localStorage
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }

  // ===== ACCESSIBILITY FOCUS RING =====
  let mouseDown = false;
  document.body.addEventListener("mousedown", () => {
    mouseDown = true;
    document.body.classList.add("using-mouse");
  });

  document.body.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      mouseDown = false;
      document.body.classList.remove("using-mouse");
    }
  });

  // ===== SIMPLE TIMELINE ANIMATION =====
  const events = document.querySelectorAll(".event");
  const revealOnScroll = () => {
    events.forEach(event => {
      const rect = event.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        event.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // run on load
});
