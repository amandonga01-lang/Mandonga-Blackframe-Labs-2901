"use client";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * "The Timeline": an editing timeline turned into a 3D space.
 * All clips sample ONE contact-sheet video (public/hero/timeline-sheet.mp4) through their own UV region,
 * so the GPU decodes a single 720p stream. Matte planes, 1px muted edge, no glass, no particles.
 */

type Tile = { u: number; v: number; w: number; h: number }; // in 0..1 texture space (v from bottom)
const L = (i: number): Tile => ({ u: i * 0.5, v: 0.5, w: 0.5, h: 0.5 }); // top row: 640x360 landscapes
const V = (i: number): Tile => ({ u: (i * 202) / 1280, v: 0, w: 202 / 1280, h: 0.5 }); // bottom row: 202x360 verticals

type Clip = { tile: Tile; vertical: boolean; track: number; x: number };
// x = position along the track (world units). Track 1 is the middle; the "centre clip" is index CENTRE.
const CLIPS: Clip[] = [
  { tile: L(0), vertical: false, track: 0, x: -4.6 },
  { tile: V(0), vertical: true, track: 1, x: -2.9 },
  { tile: L(1), vertical: false, track: 2, x: -1.4 },
  { tile: V(1), vertical: true, track: 0, x: 0.2 },
  { tile: V(2), vertical: true, track: 1, x: 1.6 }, // centre clip
  { tile: V(3), vertical: true, track: 2, x: 3.0 },
  { tile: V(4), vertical: true, track: 0, x: 4.4 },
  { tile: V(5), vertical: true, track: 1, x: 5.8 },
];
const CENTRE = 4;
const TRACK_Y = [1.95, 0, -1.95];
const RADIUS = 0.09;

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** Rounded plane whose UVs map onto one tile of the contact sheet. */
function clipGeometry(w: number, h: number, tile: Tile) {
  const g = new THREE.ShapeGeometry(roundedRect(w, h, RADIUS), 6);
  const pos = g.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const px = (pos.getX(i) + w / 2) / w;
    const py = (pos.getY(i) + h / 2) / h;
    uv[i * 2] = tile.u + px * tile.w;
    uv[i * 2 + 1] = tile.v + py * tile.h;
  }
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return g;
}

function Scene({ texture, progress, pointer }: { texture: THREE.VideoTexture; progress: React.RefObject<number>; pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const playhead = useRef<THREE.Group>(null);
  const clipRefs = useRef<(THREE.Group | null)[]>([]);
  const { invalidate, viewport } = useThree();
  // Keep the timeline in the right half at any aspect ratio (wider screens push it further right).
  const baseX = viewport.width * 0.5 - 0.5;

  const data = useMemo(
    () =>
      CLIPS.map((c) => {
        const h = c.vertical ? 1.62 : 0.94;
        const w = c.vertical ? (h * 9) / 16 : (h * 16) / 9;
        return {
          ...c,
          x: c.x * 0.68 - 0.6, // keep all eight inside the frame
          w,
          h,
          geo: clipGeometry(w, h, c.tile),
          edge: new THREE.ShapeGeometry(roundedRect(w + 0.016, h + 0.016, RADIUS + 0.008), 6),
        };
      }),
    [],
  );
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ map: texture, color: new THREE.Color(0.86, 0.86, 0.86), toneMapped: false }), [texture]);
  const edgeMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#4B4A4B", toneMapped: false }), []);
  const trackMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#4B4A4B", transparent: true, opacity: 0.7, toneMapped: false }), []);
  const red = useMemo(() => new THREE.MeshBasicMaterial({ color: "#FE2E4B", toneMapped: false }), []);

  useFrame((state, dt) => {
    const p = progress.current ?? 0;
    const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
    // Mouse drift, max ~4°.
    const pt = pointer.current ?? { x: 0, y: 0 };
    if (group.current) {
      const maxR = (4 * Math.PI) / 180;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -0.5 + pt.x * maxR, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.1 - pt.y * maxR, 0.05);
    }
    // Playhead: idles slowly across, then on scroll travels to the centre clip.
    const idle = -3.6 + ((state.clock.elapsedTime * 0.3) % 7);
    const target = CLIPS[CENTRE].x * 0.68 - 0.6;
    const a = ease(p / 0.35);
    if (playhead.current) playhead.current.position.x = THREE.MathUtils.lerp(idle, target, a);
    // After the playhead lands, the other clips slide away along their tracks and the centre clip comes forward.
    const b = ease((p - 0.3) / 0.6);
    data.forEach((c, i) => {
      const g = clipRefs.current[i];
      if (!g) return;
      if (i === CENTRE) {
        g.position.set(c.x * (1 - b), TRACK_Y[c.track] * (1 - b), b * 2.2);
        g.scale.setScalar(1 + b * 1.6);
        g.rotation.y = 0.5 * b; // face the camera as it comes forward
      } else {
        const dir = c.x < target ? -1 : 1;
        g.position.set(c.x + dir * b * 9, TRACK_Y[c.track], 0);
        (g.children[0] as THREE.Mesh).visible = b < 0.98;
      }
    });
    if (texture.image && !(texture.image as HTMLVideoElement).paused) invalidate();
    void dt;
  });

  return (
    <group ref={group} rotation={[0.1, -0.5, 0]} position={[baseX, 0.1, -0.6]}>
      {TRACK_Y.map((y) => (
        <mesh key={y} position={[0.6, y - 0.75, -0.01]} material={trackMat}>
          <planeGeometry args={[16, 0.006]} />
        </mesh>
      ))}
      {data.map((c, i) => (
        <group key={i} ref={(el) => { clipRefs.current[i] = el; }} position={[c.x, TRACK_Y[c.track], 0]}>
          <group>
            <mesh geometry={c.edge} material={edgeMat} position={[0, 0, -0.002]} />
            <mesh geometry={c.geo} material={mat} />
          </group>
        </group>
      ))}
      <group ref={playhead} position={[0, 0, 0.02]}>
        <mesh material={red}>
          <planeGeometry args={[0.012, 6.4]} />
        </mesh>
        <mesh material={red} position={[0, 3.22, 0]}>
          <planeGeometry args={[0.09, 0.09]} />
        </mesh>
      </group>
    </group>
  );
}

export default function TimelineScene({ onReady, progress }: { onReady: () => void; progress: React.RefObject<number> }) {
  const pointer = useRef({ x: 0, y: 0 });
  const texture = useMemo(() => {
    const v = document.createElement("video");
    v.src = "/hero/timeline-sheet.mp4";
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.crossOrigin = "anonymous";
    v.preload = "auto";
    const t = new THREE.VideoTexture(v);
    t.colorSpace = THREE.SRGBColorSpace;
    t.minFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    return t;
  }, []);

  useEffect(() => {
    const v = texture.image as HTMLVideoElement;
    const ready = () => onReady();
    v.addEventListener("playing", ready, { once: true });
    v.play().catch(() => {});
    const move = (e: PointerEvent) => {
      pointer.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 };
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      v.pause();
      v.removeAttribute("src");
      v.load();
      texture.dispose();
    };
  }, [texture, onReady]);

  return (
    <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }} camera={{ position: [0, 0, 9], fov: 36 }} frameloop="always">
      <Scene texture={texture} progress={progress} pointer={pointer} />
    </Canvas>
  );
}
