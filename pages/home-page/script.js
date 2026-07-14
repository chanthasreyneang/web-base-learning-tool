// ================= HEADER =================
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

// ================= NAVIGATION =================
const navLinks = document.querySelectorAll(".nav-link");
const nav = document.getElementById("nav");
const pill = document.getElementById("navPill");
const activePill = document.getElementById("activePill");

function currentFile() {
  const path = window.location.pathname.split("/").pop();
  return path || "home.html";
}

function setActiveLink() {
  const current = currentFile();
  let matched = false;

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
      matched = true;
    } else {
      link.classList.remove("active");
    }
  });

  if (!matched) {
    document
      .querySelectorAll("[data-exact]")
      .forEach((el) => el.classList.add("active"));
  }
}

function positionActivePill(skipAnim = false) {
  const activeLink = nav.querySelector(".nav-link.active");

  if (!activeLink) {
    activePill.classList.remove("show");
    return;
  }

  if (skipAnim) {
    activePill.classList.add("no-anim");
  }

  const navRect = nav.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();

  activePill.style.width = `${linkRect.width}px`;
  activePill.style.transform = `translateX(${linkRect.left - navRect.left}px)`;

  activePill.classList.add("show");

  if (skipAnim) {
    void activePill.offsetWidth;
    activePill.classList.remove("no-anim");
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((item) => item.classList.remove("active"));

    this.classList.add("active");

    if (this.closest("#nav")) {
      positionActivePill();
    }
  });
});

// ================= HOVER PILL =================
const links = nav.querySelectorAll(".nav-link");

function movePillTo(el) {
  const navRect = nav.getBoundingClientRect();
  const rect = el.getBoundingClientRect();

  pill.style.width = `${rect.width}px`;
  pill.style.transform = `translateX(${rect.left - navRect.left}px)`;
}

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    nav.classList.add("has-hover");
    movePillTo(link);
  });
});

nav.addEventListener("mouseleave", () => {
  nav.classList.remove("has-hover");
});

window.addEventListener("resize", () => {
  positionActivePill(true);
});

setActiveLink();

requestAnimationFrame(() => {
  positionActivePill(true);
});

// ================= MOBILE MENU =================
const burger = document.getElementById("burger");
const mobileNav = document.getElementById("mobileNav");
const burgerIcon = document.getElementById("burgerIcon");

let open = false;

burger.addEventListener("click", () => {
  open = !open;

  mobileNav.classList.toggle("open", open);

  burgerIcon.innerHTML = open
    ? `
      <line x1="6" y1="6" x2="18" y2="18"/>
      <line x1="6" y1="18" x2="18" y2="6"/>
    `
    : `
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    `;
});

// ================= HERO SLIDER =================
const dotsWrap = document.getElementById("dotsWrap");
const centerCard = document.querySelector(".center-card");

const slides = [
  {
    icon: "bi-diagram-3",
    title: "Data Structure",
    subtitle: "& Algorithm",
    color: "#0d9488"
  },
  {
    icon: "bi-database",
    title: "Database",
    subtitle: "Management",
    color: "#2e7dff"
  },
  {
    icon: "bi-cup-hot",
    title: "Java",
    subtitle: "Programming",
    color: "#ef4444"
  },
  {
    icon: "bi-bar-chart",
    title: "Probability",
    subtitle: "& Statistics",
    color: "#8b5cf6"
  },
  {
    icon: "bi-code-slash",
    title: "Web",
    subtitle: "Development",
    color: "#22c55e"
  },
  {
    icon: "bi-cpu",
    title: "Computer",
    subtitle: "Architecture",
    color: "#f59e0b"
  }
];

let activeDot = 0;

function renderDots() {
  dotsWrap.innerHTML = "";

  slides.forEach((_, index) => {
    const dot = document.createElement("span");

    dot.className = `dot ${
      index === activeDot ? "active" : ""
    }`;

    dot.addEventListener("click", () => {
      activeDot = index;
      updateSlide();
    });

    dotsWrap.appendChild(dot);
  });
}

function updateSlide() {

  centerCard.classList.remove("slide-animation");

  setTimeout(() => {

    centerCard.innerHTML = `
      <i class="bi ${slides[activeDot].icon} node-icon"></i>
      <h5>${slides[activeDot].title}</h5>
      <span>${slides[activeDot].subtitle}</span>
    `;

    centerCard.style.color = slides[activeDot].color;

    centerCard.classList.add("slide-animation");

    renderDots();

  }, 150);
}

document.getElementById("nextBtn").addEventListener("click", () => {
  activeDot = (activeDot + 1) % slides.length;
  updateSlide();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  activeDot = (activeDot - 1 + slides.length) % slides.length;
  updateSlide();
});

setInterval(() => {
  activeDot = (activeDot + 1) % slides.length;
  updateSlide();
}, 4000);

renderDots();
updateSlide();