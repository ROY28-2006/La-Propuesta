console.log("mf")
// Confetti animation
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const confettiPieces = [];

function randomColor() {
  const colors = [
    "#f8b500",
    "#ff6b81",
    "#6c5ce7",
    "#ffeaa7",
    "#55efc4",
    "#fd79a8",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function ConfettiPiece(x, y) {
  this.x = x;
  this.y = y;
  this.size = Math.random() * 8 + 5;
  this.color = randomColor();
  this.speedY = Math.random() * 3 + 2;
  this.speedX = (Math.random() - 0.5) * 2;
  this.opacity = Math.random();
}

ConfettiPiece.prototype.update = function () {
  this.y += this.speedY;
  this.x += this.speedX;
  if (this.y > confettiCanvas.height) {
    this.y = -10;
    this.x = Math.random() * confettiCanvas.width;
  }
};

ConfettiPiece.prototype.draw = function () {
  ctx.fillStyle = this.color;
  ctx.globalAlpha = this.opacity;
  ctx.fillRect(this.x, this.y, this.size, this.size);
  ctx.globalAlpha = 1;
};

function initConfetti() {
  for (let i = 0; i < 150; i++) {
    confettiPieces.push(
      new ConfettiPiece(
        Math.random() * confettiCanvas.width,
        Math.random() * confettiCanvas.height
      )
    );
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateConfetti);
}

function launchConfetti() {
  if (confettiPieces.length === 0) {
    initConfetti();
    animateConfetti();
  }
}

// Reveal the hidden wish
function revealWish() {
  document.getElementById("wish").style.display = "block";
  launchConfetti();

  // Start music if autoplay was blocked
  const music = document.getElementById("bg-music");
  if (music.paused) {
    music.play();
  }
}

window.addEventListener("resize", () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});
