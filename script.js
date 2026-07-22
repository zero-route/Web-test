document.addEventListener("DOMContentLoaded", () => {
  const typingTextElement = document.getElementById('typing-text');
  const iconHTML = '<i class="devicon-ionic-original"></i>';
  const textToType = " Zero Route"; 
  let charIndex = 0;
  const typingSpeed = 120;

  if (typingTextElement) {
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

  const loadingBar = document.getElementById("loading");
  const header = document.querySelector("header");
  const mainPage = document.getElementById("main-page");

  if (loadingBar) {
    loadingBar.addEventListener("animationend", () => {
      header.classList.add("fade-out");
      setTimeout(() => {
        header.style.display = "none";
        mainPage.classList.add("show");
      }, 800);
    });
  }

  const menuBtn = document.getElementById("menu-btn");
  const navMenu = document.getElementById("nav-menu");
  const menuIcon = document.getElementById("menu-icon");

  if (menuBtn && navMenu && menuIcon) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("active");

      const isActive = navMenu.classList.contains("active");
      menuIcon.classList.toggle("fa-bars", !isActive);
      menuIcon.classList.toggle("fa-xmark", isActive);
    });

    document.addEventListener("click", (e) => {
      if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
        menuIcon.classList.add("fa-bars");
        menuIcon.classList.remove("fa-xmark");
      }
    });
  }

  const rolesList = [
    'Network Engineer',
    'Penetration Testing',
    'Full-Stack Developer',
    'Automation Engineer',
    'Robotic Engineer',
    'Electrical Engineer',
    'Tech Enthusiast'
  ];

  const skillsList = [
    'HTML5', 
    'CSS3', 
    'TailwindCSS', 
    'JavaScript', 
    'TypeScript', 
    'React', 
    'Node.js', 
    'PHP', 
    'Laravel', 
    'Ruby', 
    'Express.js', 
    'MongoDB', 
    'PostgreSQL', 
    'MySQL', 
    'GitLab', 
    'GitHub', 
    'Python', 
    'C++', 
    'C', 
    'Java', 
    'Arduino'
  ];

  let isStarted = false;

  function createTypingEffect(elementId, textList, startDelay = 0) {
    const typingElement = document.getElementById(elementId);
    if (!typingElement) return;

    let textIndex = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentText = `"${textList[textIndex]}"`;

      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typingElement.textContent = currentText.substring(0, charIdx + 1);
        charIdx++;
      }

      let speed = isDeleting ? 50 : 90;

      if (!isDeleting && charIdx === currentText.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textList.length;
        speed = 400;
      }

      setTimeout(typeEffect, speed);
    }

    setTimeout(typeEffect, startDelay);
  }

  if (mainPage) {
    const observer = new MutationObserver(() => {
      if (mainPage.classList.contains("show") && !isStarted) {
        isStarted = true;
        createTypingEffect("role-typing", rolesList, 300);
        createTypingEffect("skill-typing", skillsList, 600);
      }
    });

    observer.observe(mainPage, { attributes: true, attributeFilter: ["class"] });
  }
});
