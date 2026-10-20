/* ==========================================================
   STAGE 3 + 9: THEME TOGGLE with localStorage
   ========================================================== */
const root = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function currentTheme() {
  const saved = root.getAttribute("data-theme");
  if (saved) return saved;
  // First visit: follow the visitor's system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  themeBtn.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
  );
  try { localStorage.setItem("theme", theme); } catch (e) { /* storage blocked */ }
}

applyTheme(currentTheme());

themeBtn.addEventListener("click", () => {
  applyTheme(currentTheme() === "dark" ? "light" : "dark");
});

/* ==========================================================
   STAGE 4: MOBILE HAMBURGER MENU
   ========================================================== */
const menuBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuBtn.addEventListener("click", () => {
  setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
});

// Close the menu after choosing a link, or when pressing Escape
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => setMenu(false))
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

/* ==========================================================
   STAGE 6: SCROLL REVEAL ANIMATION
   ========================================================== */
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 80 + "ms"; // small stagger
    observer.observe(el);
  });
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

/* Highlight the nav link of the section currently on screen */
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-links a");
if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) =>
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}

/* ==========================================================
   STAGE 8: CONTACT FORM VALIDATION
   ========================================================== */
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

function setError(input, message) {
  const field = input.closest(".field");
  field.classList.toggle("invalid", Boolean(message));
  document.getElementById(input.id + "-error").textContent = message;
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

function validate() {
  const name = form.elements.name;
  const email = form.elements.email;
  const message = form.elements.message;
  let ok = true;

  if (name.value.trim().length < 2) {
    setError(name, "Please enter your name (at least 2 characters).");
    ok = false;
  } else setError(name, "");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    setError(email, "Please enter a valid email address.");
    ok = false;
  } else setError(email, "");

  if (message.value.trim().length < 10) {
    setError(message, "Your message should be at least 10 characters.");
    ok = false;
  } else setError(message, "");

  return ok;
}

// Paste your Formspree endpoint here, e.g. "https://formspree.io/f/abcdwxyz".
// While it is empty the form runs in demo mode (validates but sends nothing).
const FORM_ENDPOINT = "";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "";
  statusEl.style.color = "";

  if (!validate()) {
    // Move focus to the first problem for keyboard / screen reader users
    form.querySelector("[aria-invalid='true']").focus();
    return;
  }

  if (!FORM_ENDPOINT) {
    statusEl.textContent = "Demo mode: your message is valid, but no form service is connected yet.";
    form.reset();
    return;
  }

  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  statusEl.textContent = "Sending...";

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });
    if (!response.ok) throw new Error("Request failed");
    statusEl.textContent = "Thanks! Your message has been sent.";
    form.reset();
  } catch (err) {
    statusEl.textContent = "Sorry, something went wrong. Please try again later.";
    statusEl.style.color = "#e5484d";
  } finally {
    submitBtn.disabled = false;
  }
});

// Clear an error as soon as the visitor starts fixing it
form.addEventListener("input", (e) => {
  if (e.target.matches("input, textarea")) setError(e.target, "");
});

/* Footer year */
document.getElementById("year").textContent = new Date().getFullYear();
