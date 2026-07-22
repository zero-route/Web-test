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
        createTypingEffect("role-typing2", rolesList, 200, false);
      }
    });

    observer.observe(mainPage, { attributes: true, attributeFilter: ["class"] });
  }
});

function createTypingEffect(elementId, textList, startDelay = 0, withQuotes = true) {
  const typingElement = document.getElementById(elementId);
  if (!typingElement) return;

  let textIndex = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = withQuotes ? `"${textList[textIndex]}"` : textList[textIndex];

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

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));

 fetch('https://api.github.com/users/zero-route')
  .then(res => res.json())
  .then(data => {
    const repoCountEl = document.getElementById('repo-count');
    if (repoCountEl) repoCountEl.textContent = data.public_repos;
  })
  .catch(() => {
    const repoCountEl = document.getElementById('repo-count');
    if (repoCountEl) repoCountEl.textContent = '-';
  });
  
function typeOnce(elementId, speed = 15, startDelay = 0) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const text = el.getAttribute('data-text') || '';
  el.textContent = '';
  el.classList.add('typing-cursor');

  let i = 0;

  function step() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(step, speed);
    } else {
      el.classList.remove('typing-cursor');
    }
  }

  setTimeout(step, startDelay);
}

const aboutDescEl = document.getElementById('about-desc');

if (aboutDescEl) {
  const aboutDescObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeOnce('about-desc', 15, 200);
        aboutDescObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  aboutDescObserver.observe(aboutDescEl);
}