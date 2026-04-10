let index = 0;
const slides = document.getElementById("slides");
const totalSlides = document.querySelectorAll(".slide").length;

// SLIDER DOTS
const dots = document.querySelectorAll('.dot');
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    slides.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  });
});

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Update dots on auto slide
setInterval(() => {
  index = (index + 1) % totalSlides;
  requestAnimationFrame(() => {
    slides.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  });
}, 5000);

// SWIPE - Smooth dragging
let startX = 0;
let currentX = 0;
let isDragging = false;
let startTranslate = 0;

document.getElementById("slider").addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  isDragging = true;
  startTranslate = -index * 100;
  slides.style.transition = 'none'; // Disable transition during drag
}, { passive: true });

document.getElementById("slider").addEventListener("touchmove", e => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
  let diff = currentX - startX;
  let translate = startTranslate + (diff / window.innerWidth) * 100;
  slides.style.transform = `translateX(${translate}%)`;
}, { passive: true });

document.getElementById("slider").addEventListener("touchend", e => {
  if (!isDragging) return;
  isDragging = false;
  slides.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'; // Re-enable transition

  let diff = startX - currentX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) index++;
    else index--;
  }

  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;

  requestAnimationFrame(() => {
    slides.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  });
}, { passive: true });

// About button click animation - Optimized
document.querySelector('a[href="#about"]').addEventListener('click', function() {
  const paragraphs = document.querySelectorAll('#about p');
  paragraphs.forEach(p => {
    p.classList.add('jump');
    setTimeout(() => p.classList.remove('jump'), 600);
  });
});
