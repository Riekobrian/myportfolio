document.addEventListener("DOMContentLoaded", () => {
  // Particles.js initialization with error handling
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

//   Enhanced Typewriter effect
    const typewriter = document.getElementById("typewriter");
    const text = "Hello, I'm John Doe, a web developer.";
    let index = 0;

    function type() {
      if (index < text.length) {
        typewriter.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
      }
    }
    type();


    

// addhere

// again


  function resetType() {
    let fadeOut = setInterval(() => {
      if (typewriter.textContent.length > 0) {
        typewriter.textContent = typewriter.textContent.slice(0, -1);
      } else {
        clearInterval(fadeOut);
        index = 0;
        setTimeout(type, 500);
      }
    }, 50);
  }

  // Parallax Effect
  document.addEventListener("mousemove", (e) => {
    const layers = document.querySelectorAll(".parallax-layer");
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    layers.forEach((layer, index) => {
      const depth = (index + 1) * 5;
      const translateX = mouseX * depth;
      const translateY = mouseY * depth;
      layer.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
  });

  // Start the typewriter effect
  type();

  // Enhanced Scroll Animation with Intersection Observer-2
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible", "show");
        }
      });
    },
    { threshold: 0.5 }
  );

//   sections.forEach((section) => observer.observe(section));

  //   // Skill bars animation (preserved from original)
  //   const skillObserver = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         const level = entry.target.getAttribute("data-level");
  //         entry.target.querySelector(".progress").style.width = `${level}%`;
  //       }
  //     });
  //   });

  document.querySelectorAll(".skill-bar").forEach((bar) => {
    skillObserver.observe(bar);
  });

  // Enhanced Navigation Highlight
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // Enhanced Form Submission with Error Handling
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

  // Improved Navigation Toggle (preserved from original)
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // New Feature: Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      try {
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      } catch (error) {
        console.error("Smooth scroll error:", error);
      }
    });
  });

  // New Feature: Parallax Effect
  document.addEventListener("scroll", () => {
    const parallaxLayers = document.querySelectorAll(".parallax-layer");
    const scrollPosition = window.pageYOffset;

    parallaxLayers.forEach((layer) => {
      const speed = parseFloat(layer.getAttribute("data-speed") || "0.5");
      const offset = scrollPosition * speed;
      layer.style.transform = `translateY(${offset}px)`;
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
