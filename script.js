const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let frog = { x: 190, y: 360, width: 20, height: 20 };
let cars = [
  { x: 0, y: 300, width: 40, height: 20, speed: 2, color: "red" },
  { x: 100, y: 220, width: 40, height: 20, speed: -3, color: "yellow" },
  { x: 200, y: 140, width: 40, height: 20, speed: 2.5, color: "orange" },
  { x: 50, y: 60, width: 40, height: 20, speed: -4, color: "purple" }
];

// Movimento a griglia ad impulsi
window.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && frog.y > 0) frog.y -= 40;
  if (e.key === "ArrowDown" && frog.y < canvas.height - frog.height) frog.y += 40;
  if (e.key === "ArrowLeft" && frog.x > 0) frog.x -= 40;
  if (e.key === "ArrowRight" && frog.x < canvas.width - frog.width) frog.x += 40;
});

function resetFrog() {
  frog.x = 190;
  frog.y = 360;
}

function gameLoop() {
  // Aggiorna auto
  cars.forEach(car => {
    car.x += car.speed;
    if (car.speed > 0 && car.x > canvas.width) car.x = -car.width;
    if (car.speed < 0 && car.x < -car.width) car.x = canvas.width;

    // Collisione con la rana
    if (frog.x < car.x + car.width && frog.x + frog.width > car.x &&
        frog.y < car.y + car.height && frog.y + frog.height > car.y) {
      resetFrog();
    }
  });

  // Vittoria (raggiunto il bordo superiore)
  if (frog.y <= 20) {
    alert("Vittoria!");
    resetFrog();
  }

  // Disegna
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Zona sicura d'arrivo
  ctx.fillStyle = "darkgreen";
  ctx.fillRect(0, 0, canvas.width, 40);

  // Rana
  ctx.fillStyle = "lime";
  ctx.fillRect(frog.x, frog.y, frog.width, frog.height);

  // Auto
  cars.forEach(car => {
    ctx.fillStyle = car.color;
    ctx.fillRect(car.x, car.y, car.width, car.height);
  });

  requestAnimationFrame(gameLoop);
}

gameLoop();