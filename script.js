document.addEventListener("DOMContentLoaded", () => {
  // Particles.js initialization
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80 },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: {
          value: 0.5,
          random: true,
        },
        size: {
          value: 3,
          random: true,
        },
        move: {
          enable: true,
          speed: 2,
        },
      },
    });
  }

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
    { 
      threshold: 0.5,
      rootMargin: "-50px"
    }
  );

  sections.forEach((section) => observer.observe(section));

  // Skill bars animation
  const skillBars = document.querySelectorAll(".skill-bar");
  
  const skillsObserver = new IntersectionObserver((entries) => {
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
  }, { 
    threshold: 0.2,
    rootMargin: "0px"
  });

  if (skillBars.length > 0) {
    skillBars.forEach((bar) => {
      skillsObserver.observe(bar);
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

  // Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-menu a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
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
          block: "start"
        });
      }
    });
  });
});

//skills code 
document.addEventListener("DOMContentLoaded", function () {
  const skillBars = document.querySelectorAll(".skill-bar");

  skillBars.forEach((skillBar) => {
    let level = parseInt(skillBar.dataset.level); // Parse as integer

    // Ensure level is within 0-100 range
    level = Math.max(0, Math.min(100, level));

    // Map 0-100 to 75-95
    const adjustedLevel = 75 + level * 0.2; // 0.2 represents the 20% range (95-75=20)

    skillBar.style.setProperty("--level", `${adjustedLevel}%`);
  });
});

// Global Error Handling
window.addEventListener("error", function (e) {
  console.error("Runtime error:", e);
});