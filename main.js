import './style.css'

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // 一度表示されたら監視を止める場合は unobserve
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// スタイルの微調整 (CSSへの追加を忘れていた active クラス)
const style = document.createElement('style');
style.textContent = `
  .reveal.active {
    opacity: 1;
    animation: fadeInUp 0.8s forwards;
  }
  .reveal {
    opacity: 0;
  }
`;
document.head.appendChild(style);
