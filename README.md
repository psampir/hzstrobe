# HzStrobe

**HzStrobe** is a lightweight, high-performance web utility designed to detect your monitor's refresh rate and perform a high-frequency strobe test.

[**🔴 Live Demo**](https://pawelsampir.github.io/FlashTest/) *(Link placeholder - will be active after deployment)*

---

## ⚠️ PHOTOSENSITIVE EPILEPSY WARNING

**READ BEFORE USING:** This application generates rapid flashing lights (strobe effects) which can trigger seizures in people with photosensitive epilepsy.

*   **DO NOT USE** this tool if you or anyone in your household has a history of epilepsy or seizures.
*   **IMMEDIATELY STOP** using the tool if you experience dizziness, altered vision, eye or face twitching, jerking or shaking of arms or legs, disorientation, confusion, or momentary loss of awareness.

---

## Features

*   **Real-time Hz Detection**: Accurately measures monitor refresh rate using the browser's `requestAnimationFrame` loop.
*   **Variable Strobe Speed**: Adjust the strobe frequency from 0% (static) to 100% (every frame) to test motion clarity and pixel response times.
*   **High Performance**: Built with the HTML5 Canvas API (`alpha: false`) for maximum rendering efficiency and timing precision.
*   **Zero Bloat**: Written in Vanilla TypeScript with no runtime framework dependencies.

## Technical Details

### Why Canvas 2D?
While WebGL or WebGPU offer lower-level access, the bottleneck for a screen strobe application is the browser's compositor and VSync implementation. The Canvas 2D API is fully hardware-accelerated in modern browsers and provides the most direct path to `requestAnimationFrame` without the overhead of shader compilation or buffer management.

### Timing Logic
The application measures the delta between frame callbacks to calculate an instantaneous FPS. The strobe effect uses an accumulator-based system to ensure smooth frequency scaling regardless of the monitor's native refresh rate.

## Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/pawelsampir/FlashTest.git
    cd FlashTest
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Build for production:
    ```bash
    npm run build
    ```

## License

MIT License. See [LICENSE](LICENSE) for details.
