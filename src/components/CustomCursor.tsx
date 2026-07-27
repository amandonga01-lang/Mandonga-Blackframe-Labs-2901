import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoverType, setHoverType] = useState<"default" | "button" | "showreel">("default");
  const [isVisible, setIsVisible] = useState(false);

  // Position trackers
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide cursor on touch devices or screens <=1024px
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 1024;
    if (isTouchDevice) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    // Listeners for hover types
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find closest element with specific cursor action
      const clickable = target.closest("button, a, select, input, [role='button'], .clickable, label");
      const showreel = target.closest("[data-cursor='showreel']");

      if (showreel) {
        setHoverType("showreel");
      } else if (clickable) {
        setHoverType("button");
      } else {
        setHoverType("default");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    // Spring animation loop
    const springFactor = 0.22;
    let animationFrameId: number;

    const updateCursor = () => {
      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;

      cursorPos.current.x += dx * springFactor;
      cursorPos.current.y += dy * springFactor;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    updateCursor();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999] will-change-transform hidden xl:block"
    >
      {/* Reticle container */}
      <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300">
        
        {hoverType === "showreel" ? (
          // Action Bubble Style
          <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-[#C69214] text-black font-mono text-[9px] font-bold uppercase tracking-widest scale-100 transition-all duration-300 shadow-[0_10px_30px_rgba(198,146,20,0.3)] border border-white/20">
            <span className="block animate-pulse">VIEW EDIT</span>
          </div>
        ) : (
          // Simple Dot Style
          <div className="relative flex items-center justify-center transition-all duration-300">
            {/* Center Dot */}
            <div
              className={`rounded-full transition-all duration-300 ${
                hoverType === "button"
                  ? "w-12 h-12 border-2 border-[#1A1A1A] bg-transparent opacity-40 scale-110"
                  : "w-3 h-3 bg-[#1A1A1A] opacity-80"
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
