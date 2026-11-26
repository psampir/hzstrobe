# HzStrobe

Lightweight web utility that measures your monitor's refresh rate and runs a variable-frequency strobe test.

Live app: [psampir.github.io/hzstrobe](https://psampir.github.io/hzstrobe/)

> [!WARNING]
> **Photosensitive epilepsy warning.** This application generates rapid flashing lights (strobe effects) that can trigger seizures in people with photosensitive epilepsy. Do not use it if you or anyone in your household has a history of epilepsy or seizures. Stop immediately if you experience dizziness, altered vision, eye or face twitching, disorientation, or loss of awareness.

## What it does

- Measures the display refresh rate in real time via `requestAnimationFrame` and shows the current Hz.
- Adjustable strobe frequency, from 0% (static) to 100% (toggles on every frame).
- Hideable UI toggle for unobstructed full-screen testing.
- No runtime dependencies; vanilla TypeScript.

## How it works

### Canvas 2D

WebGL and WebGPU offer lower-level access, but the bottleneck for a screen strobe is the browser's compositor and VSync implementation, not the drawing API. Canvas 2D is fully hardware-accelerated in modern browsers and gives the most direct path to `requestAnimationFrame` without shader compilation or buffer management. The context is created with `alpha: false`, so the compositor skips per-frame alpha blending.

### Timing logic

The frame loop counts callbacks and divides them by the elapsed time, updating the Hz readout every 500 ms. The strobe itself is driven by an accumulator: each frame adds the slider's frequency factor (0 to 1) to it, and whenever it reaches 1 the canvas toggles between black and white and the remainder is carried over. Toggle rate therefore scales smoothly with the slider regardless of the monitor's native refresh rate.

## Development

Requires Node.js 20.19+.

```bash
npm install
npm run dev
npm run build
```

## License

MIT; see [LICENSE](LICENSE).
