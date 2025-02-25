// p5.js Particle System
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  clear(); // Transparent background to show CSS gradient
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].isOffScreen()) {
      particles.splice(i, 1);
      particles.push(new Particle());
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.size = random(2, 5);
    this.alpha = random(50, 255);
    this.color = random(1) > 0.5 ? "#00ff88" : "#0066ff"; // Match CSS vars
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.5; // Gradual fade
  }

  show() {
    noStroke();
    fill(this.color, this.alpha);
    ellipse(this.x, this.y, this.size);
  }

  isOffScreen() {
    return (
      this.x < 0 ||
      this.x > width ||
      this.y < 0 ||
      this.y > height ||
      this.alpha <= 0
    );
  }
}

// Main Portfolio Logic
document.addEventListener("DOMContentLoaded", () => {
  // Typewriter effect
  const typewriter = document.getElementById("typewriter");
  const text = "Hello, I'm Rieko Brian, a Data Scientist.";
  let index = 0;

  function type() {
    if (index < text.length) {
      typewriter.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }
  type();

  // Smooth scroll with intersection observer
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible", "show");
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.5, rootMargin: "-50px" },
  );

  sections.forEach((section) => observer.observe(section));

  // Skill bars animation
  const skillBars = document.querySelectorAll(".skill-bar");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const level = entry.target.getAttribute("data-level");
          const progressBar = entry.target.querySelector(".progress");
          if (progressBar) {
            progressBar.style.width = `${level}%`;
            progressBar.style.opacity = "1";
          }
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px" },
  );

  if (skillBars.length > 0) {
    skillBars.forEach((bar) => {
      skillObserver.observe(bar);
    });
  }

  // Enhanced Form Submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      try {
        const formData = new FormData(this);
        const response = await fetch("/submit", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("Thank you for reaching out! I will get back to you soon.");
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        console.error("Form submission error:", error);
        alert("Something went wrong. Please try again.");
      }
    });
  }

  // Navigation Toggle with ARIA
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
      navToggle.setAttribute("aria-expanded", isExpanded);
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Global Error Handling
window.addEventListener("error", function (e) {
  console.error("Runtime error:", e);
});
