
const copyBtn = document.getElementById('copyIp');
const toast = document.getElementById('toast');

copyBtn?.addEventListener('click', async () => {
  const ip = copyBtn.dataset.ip;
  try {
    await navigator.clipboard.writeText(ip);
  } catch (e) {
    const ta = document.createElement('textarea');
    ta.value = ip;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  toast.textContent = 'IP скопирован: ' + ip;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
