// Point-cloud targets for the home-page particle field. Every shape returns exactly `n` points (x, y, z)
// inside roughly a 3.4 × 2.4 box, so the cloud can morph between them. All shapes come from the edit bay.

export type ShapeName = "play" | "phone" | "timeline" | "mic" | "wave" | "globe" | "seed";

type Rand = () => number;
const mulberry = (seed: number): Rand => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

type P = [number, number, number];

/** Point on the perimeter of a rounded rectangle, t in [0,1). */
function roundedRectEdge(w: number, h: number, r: number, t: number): [number, number] {
  const straight = 2 * (w - 2 * r) + 2 * (h - 2 * r);
  const arc = 2 * Math.PI * r;
  let d = t * (straight + arc);
  const segs: [number, (u: number) => [number, number]][] = [
    [w - 2 * r, (u) => [-w / 2 + r + u, -h / 2]],
    [(Math.PI * r) / 2, (u) => { const a = -Math.PI / 2 + u / r; return [w / 2 - r + r * Math.cos(a), -h / 2 + r + r * Math.sin(a)]; }],
    [h - 2 * r, (u) => [w / 2, -h / 2 + r + u]],
    [(Math.PI * r) / 2, (u) => { const a = u / r; return [w / 2 - r + r * Math.cos(a), h / 2 - r + r * Math.sin(a)]; }],
    [w - 2 * r, (u) => [w / 2 - r - u, h / 2]],
    [(Math.PI * r) / 2, (u) => { const a = Math.PI / 2 + u / r; return [-w / 2 + r + r * Math.cos(a), h / 2 - r + r * Math.sin(a)]; }],
    [h - 2 * r, (u) => [-w / 2, h / 2 - r - u]],
    [(Math.PI * r) / 2, (u) => { const a = Math.PI + u / r; return [-w / 2 + r + r * Math.cos(a), -h / 2 + r + r * Math.sin(a)]; }],
  ];
  for (const [len, f] of segs) {
    if (d <= len) return f(d);
    d -= len;
  }
  return [-w / 2 + r, -h / 2];
}

const jitter = (r: Rand, a: number) => (r() - 0.5) * a;

function fill(n: number, parts: [number, (r: Rand) => P][], seed: number): Float32Array {
  const r = mulberry(seed);
  const out = new Float32Array(n * 3);
  const total = parts.reduce((s, [w]) => s + w, 0);
  let i = 0;
  for (const [w, gen] of parts) {
    const count = Math.round((w / total) * n);
    for (let k = 0; k < count && i < n; k++, i++) out.set(gen(r), i * 3);
  }
  while (i < n) out.set(parts[0][1](r), i++ * 3);
  // Shuffle so that morphs don't move in visible bands.
  for (let k = n - 1; k > 0; k--) {
    const j = Math.floor(r() * (k + 1));
    for (let c = 0; c < 3; c++) {
      const t = out[k * 3 + c];
      out[k * 3 + c] = out[j * 3 + c];
      out[j * 3 + c] = t;
    }
  }
  return out;
}

const generators: Record<ShapeName, (n: number) => Float32Array> = {
  // A 16:9 frame with a play triangle: the first thing a video is.
  play: (n) =>
    fill(n, [
      [42, (r) => { const [x, y] = roundedRectEdge(3.4, 1.92, 0.22, r()); return [x + jitter(r, 0.04), y + jitter(r, 0.04), jitter(r, 0.25)]; }],
      [38, (r) => {
        // triangle: barycentric sample
        let u = r(), v = r();
        if (u + v > 1) { u = 1 - u; v = 1 - v; }
        const A: [number, number] = [-0.32, -0.42], B: [number, number] = [-0.32, 0.42], C: [number, number] = [0.42, 0];
        return [A[0] + u * (B[0] - A[0]) + v * (C[0] - A[0]), A[1] + u * (B[1] - A[1]) + v * (C[1] - A[1]), jitter(r, 0.18)];
      }],
      [20, (r) => [jitter(r, 3.2), jitter(r, 1.8), jitter(r, 0.6)]],
    ], 11),

  // A 9:16 phone with caption lines: short-form.
  phone: (n) =>
    fill(n, [
      [45, (r) => { const [x, y] = roundedRectEdge(1.2, 2.14, 0.2, r()); return [x + jitter(r, 0.03), y + jitter(r, 0.03), jitter(r, 0.2)]; }],
      [30, (r) => { const row = Math.floor(r() * 2); const w = row ? 0.5 : 0.78; return [jitter(r, w), -0.45 - row * 0.16 + jitter(r, 0.05), jitter(r, 0.1)]; }],
      [25, (r) => [jitter(r, 1.05), jitter(r, 1.95), jitter(r, 0.5)]],
    ], 22),

  // Clips on three tracks with a playhead: the edit itself.
  timeline: (n) => {
    const clips = [
      [-1.6, -0.5, 0.55], [-0.4, 0.5, 0.55], [0.7, 1.6, 0.55],
      [-1.4, -0.1, 0], [0.1, 1.1, 0], [1.25, 1.7, 0],
      [-1.7, -0.8, -0.55], [-0.6, 0.9, -0.55],
    ];
    return fill(n, [
      [80, (r) => { const c = clips[Math.floor(r() * clips.length)]; return [c[0] + r() * (c[1] - c[0]), c[2] + jitter(r, 0.32), jitter(r, 0.14)]; }],
      [12, (r) => [0.35 + jitter(r, 0.03), jitter(r, 1.9), jitter(r, 0.05)]],
      [8, (r) => [jitter(r, 3.6), [0.55, 0, -0.55][Math.floor(r() * 3)] - 0.2, jitter(r, 0.05)]],
    ], 33);
  },

  // A studio microphone: podcasts.
  mic: (n) =>
    fill(n, [
      [62, (r) => {
        // capsule surface: cylinder + hemispheres
        const a = r() * Math.PI * 2, R = 0.46;
        if (r() < 0.6) return [R * Math.cos(a), 0.25 + jitter(r, 0.9), R * Math.sin(a)];
        const phi = Math.acos(1 - r()), top = r() < 0.5 ? 1 : -1;
        return [R * Math.sin(phi) * Math.cos(a), 0.25 + top * (0.45 + R * Math.cos(phi) * 0.9), R * Math.sin(phi) * Math.sin(a)];
      }],
      [14, (r) => { const t = r(); const a = Math.PI * (1 + t); return [0.72 * Math.cos(a), 0.15 + 0.72 * Math.sin(a), jitter(r, 0.05)]; }],
      [10, (r) => [jitter(r, 0.05), -0.6 - r() * 0.6, jitter(r, 0.05)]],
      [14, (r) => { const a = r() * Math.PI * 2, rr = Math.sqrt(r()) * 0.6; return [rr * Math.cos(a), -1.22, rr * Math.sin(a) * 0.5]; }],
    ], 44),

  // An audio waveform: the conversation.
  wave: (n) => {
    const bars = 46;
    return fill(n, [
      [100, (r) => {
        const b = Math.floor(r() * bars);
        const x = -1.8 + (b / (bars - 1)) * 3.6;
        const env = Math.pow(Math.sin((b / (bars - 1)) * Math.PI), 1.2);
        const h = 0.12 + env * (0.4 + 0.6 * Math.abs(Math.sin(b * 1.7) * Math.cos(b * 0.6)));
        return [x + jitter(r, 0.035), jitter(r, 2 * h), jitter(r, 0.12)];
      }],
    ], 55);
  },

  // A globe: clients in the US, UK and beyond, edited from India.
  globe: (n) =>
    fill(n, [
      [78, (r) => { const u = r() * 2 - 1, a = r() * Math.PI * 2, s = Math.sqrt(1 - u * u); return [1.25 * s * Math.cos(a), 1.25 * u, 1.25 * s * Math.sin(a)]; }],
      [22, (r) => { const lat = [-0.6, 0, 0.6][Math.floor(r() * 3)], a = r() * Math.PI * 2, rr = 1.32 * Math.cos(lat); return [rr * Math.cos(a), 1.32 * Math.sin(lat), rr * Math.sin(a)]; }],
    ], 66),

  // Starting state only: a small loose ball that gathers into the first shape (no starfield).
  seed: (n) => fill(n, [[100, (r) => { const u = r() * 2 - 1, a = r() * Math.PI * 2, rr = 0.4 + r() * 1.2, s = Math.sqrt(1 - u * u); return [rr * s * Math.cos(a), rr * u, rr * s * Math.sin(a)]; }]], 77),
};

const cache = new Map<string, Float32Array>();
export function shapePoints(name: ShapeName, n: number) {
  const key = `${name}:${n}`;
  if (!cache.has(key)) cache.set(key, generators[name](n));
  return cache.get(key)!;
}
