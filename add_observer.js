const fs = require('fs');

let code = fs.readFileSync('src/pages/Projects.js', 'utf8');

const hook = `
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll('.grid-item');
    items.forEach((item) => observer.observe(item));
`;

// Find where window.addEventListener('scroll', handleScroll); is and insert after it.
code = code.replace("window.addEventListener('scroll', handleScroll);", "window.addEventListener('scroll', handleScroll);\n" + hook);

fs.writeFileSync('src/pages/Projects.js', code);

let css = fs.readFileSync('src/pages/Projects.css', 'utf8');
const styles = `
.grid-item {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.grid-item.visible {
  opacity: 1;
  transform: translateY(0);
}
.grid-item.item2 { transition-delay: 0.1s; }
.grid-item.item3 { transition-delay: 0.2s; }
.grid-item.item5 { transition-delay: 0.1s; }
.grid-item.item6 { transition-delay: 0.2s; }
.grid-item.item8 { transition-delay: 0.1s; }
`;
if (!css.includes('.grid-item.visible')) {
  fs.writeFileSync('src/pages/Projects.css', css + styles);
}
