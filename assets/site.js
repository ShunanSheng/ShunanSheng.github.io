"use strict";

// Navigation remains usable without JavaScript; this follows the reading position.
const navigationLinks = [...document.querySelectorAll('.navigation a[href^="#"]')];
const sections = navigationLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);

function updateCurrentSection() {
  let current = sections[0];
  const threshold = Math.min(180, window.innerHeight * 0.3);
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= threshold) current = section;
  }
  for (const link of navigationLinks) {
    if (current && link.hash === `#${current.id}`) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
}

let updatePending = false;
window.addEventListener("scroll", () => {
  if (updatePending) return;
  updatePending = true;
  window.requestAnimationFrame(() => {
    updateCurrentSection();
    updatePending = false;
  });
}, { passive: true });
window.addEventListener("resize", updateCurrentSection);
window.addEventListener("hashchange", updateCurrentSection);
updateCurrentSection();
