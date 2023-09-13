/* global console, document, localStorage, window */

// If user does not have a theme preference, use system theme
if (!localStorage.theme) {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('dark');
    document.documentElement.classList.add('dark');
  } else {
    console.log('light');
    document.documentElement.classList.remove('dark');
  }
}

// If user has no theme preference, update theme when system theme changes
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches }) => {
    if (localStorage.theme) return;
    if (matches) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  });
