export const EASE = [0.22, 1, 0.36, 1] as const;
export const DUR = { fast: 0.6, base: 0.9, slow: 1.2 } as const;

/** Section timecodes count up through the page: 00:00:04:12, 00:00:08:24, ... (25 fps). */
export const sectionTimecode = (index: number, fps = 25) => {
  const totalFrames = index * (4 * fps + 12);
  const f = totalFrames % fps;
  const s = Math.floor(totalFrames / fps) % 60;
  const m = Math.floor(totalFrames / fps / 60) % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `00:${pad(m)}:${pad(s)}:${pad(f)}`;
};
