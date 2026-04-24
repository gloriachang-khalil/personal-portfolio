const cards = document.querySelectorAll("[data-speed]");
const railLinks = document.querySelectorAll(".rail-link");
const sections = [...document.querySelectorAll("section[id]")];

window.addEventListener("mousemove", (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 18;
  const y = (event.clientY / window.innerHeight - 0.5) * 18;

  cards.forEach((card) => {
    const speed = Number(card.dataset.speed || 1);
    card.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

window.addEventListener("mouseleave", () => {
  cards.forEach((card) => {
    card.style.transform = "";
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      railLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`,
        );
      });
    });
  },
  {
    rootMargin: "-45% 0px -45% 0px",
    threshold: 0,
  },
);

sections.forEach((section) => observer.observe(section));
