"use client";
import { useEffect, useState, type RefObject } from "react";

// On touch devices only one preview plays at a time: the card most in view.
let current: string | null = null;
const listeners = new Set<(id: string | null) => void>();
const set = (id: string | null) => {
  current = id;
  listeners.forEach((l) => l(id));
};

/** Returns true when this card should play its preview. Desktop: hover. Touch: most-visible card. */
export function useSinglePreview(id: string, ref: RefObject<HTMLElement | null>, hovered: boolean) {
  const [active, setActive] = useState(false);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(!window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!touch) return;
    const l = (cur: string | null) => setActive(cur === id);
    listeners.add(l);
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio > 0.7) set(id);
        else if (current === id) set(null);
      },
      { threshold: [0, 0.7, 1] },
    );
    if (el) io.observe(el);
    return () => {
      listeners.delete(l);
      io.disconnect();
      if (current === id) set(null);
    };
  }, [touch, id, ref]);

  return touch ? active : hovered;
}
