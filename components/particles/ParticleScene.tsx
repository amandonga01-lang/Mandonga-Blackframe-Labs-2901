"use client";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { shapePoints, type ShapeName } from "@/lib/shapes";

/**
 * One point cloud for the whole page. Each section asks for a shape (data-shape="…"); points ease toward it
 * at slightly different speeds, so the cloud dissolves and re-forms like the reference instead of sliding.
 */

const vert = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vFade;
  uniform float uPixelRatio;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (9.0 / -mv.z);
    vColor = aColor;
    vFade = smoothstep(16.0, 4.0, -mv.z);
  }
`;
const frag = /* glsl */ `
  varying vec3 vColor;
  varying float vFade;
  uniform float uOpacity;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * uOpacity * vFade);
  }
`;

type Props = { shape: React.RefObject<ShapeName>; side: React.RefObject<number>; count: number; opacity: number };

function Cloud({ shape, side, count, opacity }: Props) {
  const points = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { viewport, gl } = useThree();

  const { geo, speed } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const start = shapePoints("scatter", count).slice();
    const size = new Float32Array(count);
    const color = new Float32Array(count * 3);
    const speed = new Float32Array(count);
    const red = new THREE.Color("#FE2E4B");
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      size[i] = 1.1 + Math.pow(Math.random(), 3) * 2.8;
      const c = r < 0.07 ? red : new THREE.Color().setScalar(0.72 + Math.random() * 0.28);
      color.set([c.r, c.g, c.b], i * 3);
      speed[i] = 0.025 + Math.random() * 0.05;
    }
    g.setAttribute("position", new THREE.BufferAttribute(start, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    g.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
    return { geo: g, speed };
  }, [count]);

  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.5) }, uOpacity: { value: opacity } },
      }),
    [gl, opacity],
  );

  useEffect(() => {
    const move = (e: PointerEvent) => (pointer.current = { x: (e.clientX / innerWidth) * 2 - 1, y: (e.clientY / innerHeight) * 2 - 1 });
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const target = shapePoints(shape.current ?? "scatter", count);
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const k = speed[i];
      const j = i * 3;
      // Ease toward the target, plus a tiny breathing drift so the shape never looks frozen.
      pos[j] += (target[j] + Math.sin(t * 0.6 + i) * 0.012 - pos[j]) * k;
      pos[j + 1] += (target[j + 1] + Math.cos(t * 0.5 + i * 1.3) * 0.012 - pos[j + 1]) * k;
      pos[j + 2] += (target[j + 2] - pos[j + 2]) * k;
    }
    geo.attributes.position.needsUpdate = true;
    if (group.current) {
      const g = group.current;
      const tx = (side.current ?? 0.25) * viewport.width;
      g.position.x += (tx - g.position.x) * 0.04;
      g.rotation.y += (-0.35 + Math.sin(t * 0.15) * 0.25 + pointer.current.x * 0.12 - g.rotation.y) * 0.03;
      g.rotation.x += (0.08 + pointer.current.y * 0.08 - g.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={group}>
      <points ref={points} geometry={geo} material={mat} frustumCulled={false} />
    </group>
  );
}

export default function ParticleScene({ shape, side, count, opacity, onReady }: Props & { onReady: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 7], fov: 40 }}
      onCreated={() => onReady()}
    >
      <Cloud shape={shape} side={side} count={count} opacity={opacity} />
    </Canvas>
  );
}
