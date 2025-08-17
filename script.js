const playBtn = document.getElementById("playBtn");
const photo = document.getElementById("photo");
const music = document.getElementById("bg-music");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const images = ["assets/us1.jpg", "assets/us2.jpg", "assets/us3.jpg"];
let imgIndex = 0;

let confettiParticles = [];

function createConfetti() {
  const colors = ["#d63384", "#ffcd39", "#4dabf7", "#51cf66"];
  for (let i = 0; i < 150; i++) {
    confettiParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: 10,
      h: 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 5 + 2,
      angle: Math.random() * 360
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiParticles.forEach((p) => {
    ctx.fillStyle = p.color;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.angle * Math.PI) / 180);
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
    p.y += p.speed;
    if (p.y > canvas.height) p.y = -20;
  });
  requestAnimationFrame(drawConfetti);
}

playBtn.addEventListener("click", () => {
  // Reset
  imgIndex = 0;
  photo.src = images[imgIndex];

  // Play music (restart from beginning)
  music.currentTime = 0;
  music.play();

  // Image slideshow
  let interval = setInterval(() => {
    imgIndex++;
    if (imgIndex < images.length) {
      photo.src = images[imgIndex];
    } else {
      clearInterval(interval);
    }
  }, 10000); // change every 10s (3 images for 30s)

  // Confetti
  confettiParticles = [];
  createConfetti();
  drawConfetti();
});
