// Simple dark mode toggle stored in localStorage
(function() {
  const toggles = document.querySelectorAll('#dark-toggle, #dark-toggle-2, #dark-toggle-3');

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    toggles.forEach(t => t.setAttribute('aria-pressed', theme === 'dark'));
  }

  // Load theme from storage or system preference
  const saved = localStorage.getItem('theme') ||
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  setTheme(saved);

  function toggle() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
  }

  toggles.forEach(t => t.addEventListener('click', toggle));

  // Improve keyboard accessibility
  document.addEventListener('keyup', e => {
    if (e.key === 'Tab') document.body.classList.add('user-tab');
  });
})();
