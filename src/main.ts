import './style.css'

// --- DOM Elements ---
const canvas = document.getElementById('strobeCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d', { alpha: false })!; // alpha: false for performance
const warningModal = document.getElementById('warningModal')!;
const acceptBtn = document.getElementById('acceptBtn')!;
const controls = document.getElementById('controls')!;
const startBtn = document.getElementById('startBtn') as HTMLButtonElement;
const stopBtn = document.getElementById('stopBtn') as HTMLButtonElement;
const hzDisplay = document.getElementById('hzDisplay')!;
const statusDisplay = document.getElementById('statusDisplay')!;
const speedSlider = document.getElementById('speedSlider') as HTMLInputElement;
const speedValue = document.getElementById('speedValue')!;
const appVersion = document.getElementById('appVersion')!;
const uiToggleBtn = document.getElementById('uiToggleBtn')!;

// --- State ---
let isRunning = false;
let isWhite = false;
let strobeAccumulator = 0;
// Hz Detection State
let frameCount = 0;
let lastFpsUpdate = performance.now();

// --- Initialization ---
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Ensure background is correct after resize
  if (!isRunning) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
window.addEventListener('resize', resize);
resize();

// Set Version
appVersion.textContent = `v${__APP_VERSION__}`;

// --- Core Loop ---
function loop(currentTime: number) {
  // 1. Hz Detection Logic
  frameCount++;
  const delta = currentTime - lastFpsUpdate;

  // Update FPS display every 500ms
  if (delta >= 500) {
    const fps = Math.round((frameCount * 1000) / delta);
    hzDisplay.textContent = fps.toString();
    
    frameCount = 0;
    lastFpsUpdate = currentTime;
  }

  // 2. Strobe Logic
  if (isRunning) {
    const speedFactor = parseInt(speedSlider.value) / 100;
    strobeAccumulator += speedFactor;

    if (strobeAccumulator >= 1) {
      // Toggle color
      isWhite = !isWhite;
      ctx.fillStyle = isWhite ? '#ffffff' : '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Decrease accumulator, keeping the remainder for smooth timing
      strobeAccumulator -= 1;
    }
  }

  requestAnimationFrame(loop);
}

// --- Controls ---
function startStrobe() {
  isRunning = true;
  strobeAccumulator = 1; // Force immediate toggle on first frame
  statusDisplay.textContent = "STROBING";
  statusDisplay.style.color = "#ff4444";
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopStrobe() {
  isRunning = false;
  statusDisplay.textContent = "Ready";
  statusDisplay.style.color = "white";
  startBtn.disabled = false;
  stopBtn.disabled = true;
  
  // Clear screen to black immediately
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  isWhite = false;
}

// --- Event Listeners ---
acceptBtn.addEventListener('click', () => {
  warningModal.classList.add('hidden');
  controls.classList.remove('hidden');
  uiToggleBtn.classList.remove('hidden');
  
  // Start the loop immediately to detect Hz, but don't strobe yet
  requestAnimationFrame(loop);
});

startBtn.addEventListener('click', startStrobe);
stopBtn.addEventListener('click', stopStrobe);

speedSlider.addEventListener('input', () => {
  speedValue.textContent = speedSlider.value;
});

uiToggleBtn.addEventListener('click', () => {
  controls.classList.toggle('controls-hidden');
  const isHidden = controls.classList.contains('controls-hidden');
  uiToggleBtn.textContent = isHidden ? 'Show UI' : 'Hide UI';
});
