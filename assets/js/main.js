// assets/js/main.js


document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle (não mexer)
  const btn  = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  btn.addEventListener("click", () => {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  });

  // Hero letter-by-letter random fadeUp
   const heroTexts = {
    "hero-title": "WEB DESIGNER E DEVELOPER",
    "hero-sub1":  "Serviços premium de web design, desenvolvimento de Sistema Integrados com IAs personalizadas",
    "hero-sub2":  "para ajudar sua empresa a se destacar e vender mais."
  };

  Object.entries(heroTexts).forEach(([id, fullText]) => {
    const container = document.getElementById(id);
    container.innerHTML = "";

    // para cada letra na ordem do texto
    Array.from(fullText).forEach(char => {
      const span = document.createElement("span");
      // dentro do forEach de cada char
      if (char === ' ') {
      // usa NBSP para garantir que a span gere espaço
        span.textContent = '\u00A0';
      } else {
        span.textContent = char;
      }
      span.classList.add("text-span");
      // atraso randômico (0–2s)
      const delay = (Math.random() * 3).toFixed(2);
      // duração mais lenta (1s)
      span.style.animation = `fadeUp 1s ease-out ${delay}s forwards`;
      container.appendChild(span);
    });
  });

  // GSAP menu animation (não mexer)
  if (window.gsap) {
    gsap.from(".nav-link", { y: -20, opacity: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" });
    gsap.from(".nav-cta",  { y: -20, opacity: 0, duration: 0.4, delay: 0.5, ease: "power2.out" });
  }
});

// mais.js
document.addEventListener('DOMContentLoaded', () => {
  const sec = document.getElementById('servicos');
  if (!sec) return;

  // Caso o navegador não tenha IntersectionObserver, já mostra a seção
  if (!('IntersectionObserver' in window)) {
    sec.classList.add('visible');
    return;
  }

  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sec.classList.add('visible');
        observer.unobserve(sec);
      }
    });
  }, { threshold: 0.2 });
  
  obs.observe(sec);
});
