
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Toggle navigation");
  menuButton.textContent = isOpen ? "×" : "☰";
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Toggle navigation");
    menuButton.textContent = "☰";
  });
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    const subject = encodeURIComponent("Website enquiry from " + name);
    const body = encodeURIComponent("Name: " + name + "\\nEmail: " + email + "\\n\\nProject details:\\n" + message);
    const formNote = document.querySelector("#form-note");
    if (formNote) formNote.textContent = "Opening your email app to send your message.";
    window.location.href = "mailto:Business@rdsdigital.in?subject=" + subject + "&body=" + body;
  });
}

const statsSection = document.querySelector(".stats-section");
const countUpNumbers = document.querySelectorAll(".count-up");

function animateCount(element) {
  const target = Number(element.dataset.target);
  const duration = 1600;
  const startTime = performance.now();

  function updateCount(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(target * easedProgress).toLocaleString("en-US");

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = target.toLocaleString("en-US");
    }
  }

  requestAnimationFrame(updateCount);
}

if (statsSection && countUpNumbers.length) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    statsSection.classList.add("is-visible");
    countUpNumbers.forEach((number) => {
      number.textContent = Number(number.dataset.target).toLocaleString("en-US");
    });
  } else if ("IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statsSection.classList.add("is-visible");
          countUpNumbers.forEach(animateCount);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    statsObserver.observe(statsSection);
  } else {
    statsSection.classList.add("is-visible");
    countUpNumbers.forEach(animateCount);
  }
}
