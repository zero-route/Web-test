const typingTextElement = document.getElementById('typing-text');
const iconHTML = '<i class="devicon-ionic-original"></i>';
const textToType = " Zero Route"; 

let charIndex = 0;
const typingSpeed = 120;

function startCleanTyping() {
  typingTextElement.innerHTML = iconHTML;
  const textSpan = document.createElement('span');
  typingTextElement.appendChild(textSpan);
  const typingInterval = setInterval(() => {
    if (charIndex < textToType.length) {
      textSpan.textContent += textToType.charAt(charIndex);
      charIndex++;
    } else {
      clearInterval(typingInterval);
    }
  }, typingSpeed);
}

startCleanTyping();

document.addEventListener("DOMContentLoaded", () => {
  const loadingBar = document.getElementById("loading");
  const header = document.querySelector("header");
  const mainPage = document.getElementById("main-page");

  loadingBar.addEventListener("animationend", () => {
    header.classList.add("fade-out");

    setTimeout(() => {
      header.style.display = "none";
      mainPage.classList.add("show");
    }, 800);
  });
});

 document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const navMenu = document.getElementById("nav-menu");
  const menuIcon = document.getElementById("menu-icon");

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-xmark");
    } else {
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    }
  });

  document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    }
  });
});

 document.addEventListener("DOMContentLoaded", () => {
  const rolesList = [
    '"Network Engineer"',
    '"Penetration Testing"',
    '"Full-Stack Developer"',
    '"Automation Engineer"',
    '"Robotic Engineer"',
    '"Electrical Engineer"',
    '"Tech Enthusiast"'
  ];

  const skillsList = [
    '"HTML5"',
    '"CSS3"',
    '"TailwindCSS"',
    '"JavaScript"',
    '"TypeScript"',
    '"React"',
    '"Node.js"',
    '"PHP"',
    '"Laravel"',
    '"Ruby"',
    '"Express.js"',
    '"MongoDB"',
    '"PostgreSQL"',
    '"MySql"',
    '"GitLab"',
    '"GitHub"',   
    '"Python"',
    '"C++"',
    '"C"',
    '"Java"',
    '"Arduino"',
  ];

  const mainPage = document.getElementById("main-page");
  let isStarted = false;

  function createTypingEffect(elementId, textList, startDelay = 0) {
    const typingElement = document.getElementById(elementId);
    if (!typingElement) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentText = textList[textIndex];

      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      let typingSpeed = isDeleting ? 60 : 100;

      if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textList.length;
        typingSpeed = 500;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, startDelay);
  }

  const observer = new MutationObserver(() => {
    if (mainPage && mainPage.classList.contains("show") && !isStarted) {
      isStarted = true;
      createTypingEffect("role-typing", rolesList, 300);
      createTypingEffect("skill-typing", skillsList, 600);
    }
  });

  if (mainPage) {
    observer.observe(mainPage, { attributes: true, attributeFilter: ["class"] });
  }
});
