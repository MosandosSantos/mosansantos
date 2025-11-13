// assets/js/main.js

// ===========================================
// SMOOTH SCROLL
// ===========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===========================================
// CUSTOM CURSOR
// ===========================================
const cursor = document.createElement('div');
const cursorFollower = document.createElement('div');
cursor.classList.add('custom-cursor');
cursorFollower.classList.add('cursor-follower');
document.body.appendChild(cursor);
document.body.appendChild(cursorFollower);

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

// Smooth follow effect
function animateFollower() {
  const distX = mouseX - followerX;
  const distY = mouseY - followerY;

  followerX += distX * 0.1;
  followerY += distY * 0.1;

  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';

  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effects
document.querySelectorAll('a, button, .service-card, .cta-button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-hover');
    cursorFollower.classList.add('cursor-hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-hover');
    cursorFollower.classList.remove('cursor-hover');
  });
});

// ===========================================
// PARTICLES.JS CONFIGURATION
// ===========================================
if (typeof particlesJS !== 'undefined') {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#d2bea1'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        }
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#d2bea1',
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.5
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const btn  = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  btn.addEventListener("click", () => {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  });

  // Hero letter-by-letter random fadeUp
  const heroTexts = {
    "hero-title": "WEB DESIGNER E DEVELOPER",
    "hero-sub1":  "Serviços premium de web design, desenvolvimento de Sistemas Integrados com IAs personalizadas",
    "hero-sub2":  "para ajudar sua empresa a se destacar e vender mais."
  };

  Object.entries(heroTexts).forEach(([id, fullText]) => {
    const container = document.getElementById(id);
    container.innerHTML = "";

    Array.from(fullText).forEach(char => {
      const span = document.createElement("span");
      if (char === ' ') {
        span.textContent = '\u00A0';
      } else {
        span.textContent = char;
      }
      span.classList.add("text-span");
      const delay = (Math.random() * 3).toFixed(2);
      span.style.animation = `fadeUp 1s ease-out ${delay}s forwards`;
      container.appendChild(span);
    });
  });

  // GSAP menu animation
  if (window.gsap) {
    gsap.from(".nav-link", { y: -20, opacity: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" });
    gsap.from(".nav-cta",  { y: -20, opacity: 0, duration: 0.4, delay: 0.5, ease: "power2.out" });

    // GSAP ScrollTrigger for parallax effects
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      // Parallax effect for hero
      gsap.to(".hero-section", {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Animate service cards on scroll
      gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1
        });
      });
    }
  }

  // IntersectionObserver for fade-in sections
  const sec = document.getElementById('servicos');
  if (sec && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          sec.classList.add('visible');
          observer.unobserve(sec);
        }
      });
    }, { threshold: 0.2 });

    obs.observe(sec);
  } else if (sec) {
    sec.classList.add('visible');
  }

  // Magnetic button effect
  document.querySelectorAll('.cta-button, .project-button').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
});
