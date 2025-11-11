/*
==========================================================
NASA Mars Rovers – Main JavaScript File (Student Draft)
==========================================================
*/

// Wait until the entire HTML document is ready before running any code.
document.addEventListener("DOMContentLoaded", function() {
    
    // --- PART 1: Dark Mode Toggle Logic ---
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // 1. Initial Load: Check if the user saved a 'dark' theme preference last time.
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        // Update the button text to match the active state
        if (darkModeToggle) {
            darkModeToggle.textContent = 'Toggle Light Mode';
        }
    } else {
        // Default text for light mode
        if (darkModeToggle) {
            darkModeToggle.textContent = 'Toggle Dark Mode';
        }
    }

    // 2. Event Listener: Handle the click action.
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function() {
            body.classList.toggle("dark-mode"); // Adds/removes the CSS class

            // Check the new state and update localStorage and button text
            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
                darkModeToggle.textContent = 'Toggle Light Mode';
            } else {
                localStorage.setItem("theme", "light");
                darkModeToggle.textContent = 'Toggle Dark Mode';
            }
        });
    }

    // --- PART 2: Mobile Menu Logic ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            // Toggles the visibility class defined in the CSS media query
            navList.classList.toggle('menu-open');

            // Also, make the hamburger icon change to an 'X' symbol for a better user experience
            if (navList.classList.contains('menu-open')) {
                menuToggle.innerHTML = '&#10005;'; // X mark
            } else {
                menuToggle.innerHTML = '&#9776;'; // Hamburger icon
            }
        });
    }


    // --- PART 3: Accessibility Focus Ring Fix ---
    document.body.addEventListener("mousedown", function() {
        document.body.classList.add("using-mouse"); // Adds class when mouse button is pressed
    });

    document.body.addEventListener("keydown", function(e) {
        // If the user hits Tab, assume they are using keyboard navigation
        if (e.key === "Tab") {
            document.body.classList.remove("using-mouse"); // Removes class, so CSS shows the focus outline
        }
    });

    
    // --- PART 4: Scroll Animation (Timeline Reveal) ---
    const events = document.querySelectorAll(".timeline .event");

    // CRITICAL FIX: Only attach the scroll listener if the elements exist on the page.
    if (events.length > 0) {
        
        const revealOnScroll = function() {
            events.forEach(event => {
                const rect = event.getBoundingClientRect();

                // If the top of the element is less than (viewport height - 100px), reveal it.
                if (rect.top < window.innerHeight - 100) {
                    event.classList.add("visible");
                }
            });
        };

        // Attach the handler to the window scroll event
        window.addEventListener("scroll", revealOnScroll);
        revealOnScroll(); // Run once on page load to show any elements that are already in view
    }
});