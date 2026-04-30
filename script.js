// ──────── Scroll reveal ────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

// ──────── Nav scroll effect ────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ──────── DNA Helix Canvas ────────
const canvas = document.getElementById('dna-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  let time = 0;

  function drawHelix() {
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const amplitude = 50;
    const steps = 30;
    const spacing = h / steps;

    for (let i = 0; i < steps; i++) {
      const y = i * spacing;
      const phase = (i * 0.3) + time;

      const x1 = cx + Math.sin(phase) * amplitude;
      const x2 = cx + Math.sin(phase + Math.PI) * amplitude;

      // Connecting bars
      const alpha = 0.08 + Math.abs(Math.sin(phase)) * 0.07;
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.strokeStyle = `rgba(107, 143, 113, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Strand 1 dots
      const depth1 = (Math.sin(phase) + 1) / 2;
      const r1 = 2.5 + depth1 * 2;
      ctx.beginPath();
      ctx.arc(x1, y, r1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(107, 143, 113, ${0.15 + depth1 * 0.35})`;
      ctx.fill();

      // Strand 2 dots
      const depth2 = (Math.sin(phase + Math.PI) + 1) / 2;
      const r2 = 2.5 + depth2 * 2;
      ctx.beginPath();
      ctx.arc(x2, y, r2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(196, 168, 130, ${0.15 + depth2 * 0.35})`;
      ctx.fill();
    }

    time += 0.008;
    requestAnimationFrame(drawHelix);
  }

  drawHelix();
}
