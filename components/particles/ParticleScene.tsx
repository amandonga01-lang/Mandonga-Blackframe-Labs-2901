"use client";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { shapePoints, type ShapeName } from "@/lib/shapes";

// Soft round points; size attenuates with depth.
const vert = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  uniform float uPixelRatio;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (9.0 / -mv.z);
    vColor = aColor;
  }
`;
const frag = /* glsl */ `
  varying vec3 vColor;
  void main() {
    float a = smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5));
    gl_FragColor = vec4(vColor, a);
  }
`;

const SEQUENCE: ShapeName[] = ["globe", "play", "mic", "phone", "wave", "timeline"];
const HOLD = 3.6; // seconds each shape holds

function Cloud({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  const { geo, speed } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const size = new Float32Array(count);
    const color = new Float32Array(count * 3);
    const speed = new Float32Array(count);
    const red = new THREE.Color("#FE2E4B");
    for (let i = 0; i < count; i++) {
      size[i] = 1.1 + Math.pow(Math.random(), 3) * 2.6;
      const c = Math.random() < 0.07 ? red : new THREE.Color().setScalar(0.72 + Math.random() * 0.28);
      color.set([c.r, c.g, c.b], i * 3);
      speed[i] = 0.03 + Math.random() * 0.05;
    }
    g.setAttribute("position", new THREE.BufferAttribute(shapePoints("seed", count).slice(), 3));
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
        uniforms: { uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.5) } },
      }),
    [gl],
  );

  useEffect(() => {
    const move = (e: PointerEvent) => (pointer.current = { x: (e.clientX / innerWidth) * 2 - 1, y: (e.clientY / innerHeight) * 2 - 1 });
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const target = shapePoints(SEQUENCE[Math.floor(t / HOLD) % SEQUENCE.length], count);
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const k = speed[i], j = i * 3;
      pos[j] += (target[j] - pos[j]) * k;
      pos[j + 1] += (target[j + 1] - pos[j + 1]) * k;
      pos[j + 2] += (target[j + 2] - pos[j + 2]) * k;
    }
    geo.attributes.position.needsUpdate = true;
    const g = group.current;
    if (g) {
      g.rotation.y += (-0.3 + Math.sin(t * 0.2) * 0.3 + pointer.current.x * 0.15 - g.rotation.y) * 0.04;
      g.rotation.x += (0.08 + pointer.current.y * 0.08 - g.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <points geometry={geo} material={mat} frustumCulled={false} />
    </group>
  );
}

/** Renders only while `active` (in view); otherwise the loop is stopped completely. */
export default function ParticleScene({ count, active, onReady }: { count: number; active: boolean; onReady: () => void }) {
  return (
    <Canvas dpr={[1, 1.5]} frameloop={active ? "always" : "never"} gl={{ alpha: true, antialias: false }} camera={{ position: [0, 0, 6.4], fov: 40 }} onCreated={() => onReady()}>
      <Cloud count={count} />
    </Canvas>
  );
}
