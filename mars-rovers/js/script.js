/*
==========================================================
NASA Mars Rovers – Main JavaScript File
Theme: Mission Control (Dark by Default)
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const darkModeToggle = document.getElementById("darkModeToggle");
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul');
    
    // --- PART 1: Theme Toggle Logic ---
    const applyTheme = (isDark) => {
        if (isDark) {
            // Dark mode is the base style (remove light-mode class)
            body.classList.remove('light-mode');
            if (darkModeToggle) darkModeToggle.textContent = 'Switch to Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            // Light mode requires adding the 'light-mode' class
            body.classList.add('light-mode'); 
            if (darkModeToggle) darkModeToggle.textContent = 'Switch to Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    };
    
    // Initial Load: Check for saved preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        applyTheme(false);
    } else {
        applyTheme(true); // Default to dark if no preference or 'dark' saved
    }

    // Event Listener for the button
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            // If it currently has 'light-mode', the next state should be dark (true)
            const currentIsLight = body.classList.contains('light-mode');
            applyTheme(currentIsLight); 
        });
    }

    // --- PART 2: Mobile Menu Logic ---
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('menu-open');
            
            // Toggle the icon between Hamburger and X
            if (navList.classList.contains('menu-open')) {
                menuToggle.innerHTML = '&#10005;';
            } else {
                menuToggle.innerHTML = '&#9776;';
            }
        });
    }

    // --- PART 3: Timeline Scroll Animation ---
    const events = document.querySelectorAll(".timeline .event");
    
    if (events.length > 0) {
        const revealOnScroll = () => {
            events.forEach(event => {
                const rect = event.getBoundingClientRect();
                
                // Reveal when the element is 100px from the bottom of the viewport
                if (rect.top < window.innerHeight - 100) {
                    event.classList.add("visible");
                }
            });
        };

        window.addEventListener("scroll", revealOnScroll);
        revealOnScroll(); // Run once on load to catch elements already in view
    }
});