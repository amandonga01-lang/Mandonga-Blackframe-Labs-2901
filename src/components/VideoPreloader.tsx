import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";

interface VideoPreloaderProps {
  onComplete: () => void;
}

export default function VideoPreloader({ onComplete }: VideoPreloaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasCompletedRef = useRef(false);
  const [fadeVideo, setFadeVideo] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [logoFadingOut, setLogoFadingOut] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const completePreloader = () => {
      if (hasCompletedRef.current) return;
      hasCompletedRef.current = true;
      document.body.style.overflow = "";
      onComplete();
    };

    const startVideo = async () => {
      const video = videoRef.current;
      if (!video) return;

      video.muted = true;
      video.playsInline = true;
      video.playbackRate = 1.35;

      try {
        await video.play();
      } catch {
        setFadeVideo(true);
        setShowLogo(true);
      }
    };

    startVideo();

    const videoFadeTimer = setTimeout(() => {
      setFadeVideo(true);
      setShowLogo(true);
    }, 4200);

    const logoFadeOutTimer = setTimeout(() => {
      setLogoFadingOut(true);
      setIsFadingOut(true);
    }, 5700);

    const completeTimer = setTimeout(() => {
      completePreloader();
    }, 6100);

    return () => {
      clearTimeout(videoFadeTimer);
      clearTimeout(logoFadeOutTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (hasCompletedRef.current) return;
    setLogoFadingOut(true);
    setIsFadingOut(true);
    setTimeout(() => {
      if (hasCompletedRef.current) return;
      hasCompletedRef.current = true;
      document.body.style.overflow = "";
      onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[999] bg-[#FBFBFA] flex flex-col justify-center items-center transition-opacity duration-300 select-none overflow-hidden ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ minHeight: "100svh" }}
    >
      {/* Skip Intro */}
      <button
        onClick={handleSkip}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 z-[1000] flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/85 hover:bg-[#1A1A1A] border border-[#E2E2DF] hover:border-[#1A1A1A] rounded-full font-mono text-[9px] sm:text-[10px] tracking-widest text-[#1A1A1A] hover:text-white uppercase transition-all duration-300 shadow-sm clickable"
      >
        <span>Skip</span>
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Video Container */}
      <div
        className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-[300ms] ${
          fadeVideo ? "opacity-0" : "opacity-100"
        }`}
      >
        <video
          ref={videoRef}
          src="/intro.mp4"
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
          disablePictureInPicture
          onLoadedData={(e) => {
            const vid = e.currentTarget;
            vid.playbackRate = 1.35;
            vid.play().catch(() => {
              setFadeVideo(true);
              setShowLogo(true);
            });
          }}
          onCanPlay={(e) => {
            const vid = e.currentTarget;
            vid.playbackRate = 1.35;
            vid.play().catch(() => {
              setFadeVideo(true);
              setShowLogo(true);
            });
          }}
          className="absolute inset-0 w-full h-full object-cover scale-110 sm:scale-105"
        />

        {/* Ambient Overlay inside video */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
      </div>

      {/* Absolute Centered Golden Logo Reveal Block */}
      {showLogo && (
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-50">
          <div className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64">
            
            {/* Einstein Lensing Rings SVG Backdrop */}
            <svg className="absolute w-[340px] h-[340px] sm:w-[450px] sm:h-[450px] pointer-events-none select-none overflow-visible z-0" viewBox="0 0 200 200">
              {/* Inner Accretion Core Glow */}
              <motion.circle
                cx="100"
                cy="100"
                r="30"
                fill="none"
                stroke="#C69214"
                strokeWidth="0.75"
                strokeOpacity="0.2"
                initial={{ scale: 0, opacity: 0 }}
                animate={logoFadingOut ? { scale: 1.4, opacity: 0 } : { scale: 1.2, opacity: 0.35 }}
                transition={{ duration: logoFadingOut ? 0.3 : 1.2, ease: [0.25, 1, 0.5, 1] }}
              />

              {/* Einstein Lensing Ring - Horizontal Painting Outward */}
              <motion.ellipse
                cx="100"
                cy="100"
                rx="85"
                ry="10"
                fill="none"
                stroke="#C69214"
                strokeWidth="1.25"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
                animate={logoFadingOut ? { opacity: 0, scale: 1.1 } : { pathLength: 1, opacity: 0.9, scale: 1 }}
                transition={{ duration: logoFadingOut ? 0.3 : 1.2, ease: [0.25, 1, 0.5, 1] }}
                style={{ rotate: "-6deg", transformOrigin: "100px 100px" }}
              />

              {/* Outer Distortion Disks - Spiraling/Rotating into view */}
              <motion.circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#C69214"
                strokeWidth="0.5"
                strokeDasharray="50 15 110 25"
                initial={{ rotate: 0, scale: 0.6, opacity: 0 }}
                animate={logoFadingOut ? { opacity: 0, scale: 1.2 } : { rotate: 360, scale: 1, opacity: 0.5 }}
                transition={{
                  rotate: { duration: 3.5, ease: "linear", repeat: Infinity },
                  default: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
                }}
                style={{ transformOrigin: "100px 100px" }}
              />

              <motion.circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke="#C69214"
                strokeWidth="0.5"
                strokeDasharray="120 40 140 15"
                initial={{ rotate: 180, scale: 0.7, opacity: 0 }}
                animate={logoFadingOut ? { opacity: 0, scale: 1.2 } : { rotate: -180, scale: 1, opacity: 0.3 }}
                transition={{
                  rotate: { duration: 4.5, ease: "linear", repeat: Infinity },
                  default: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
                }}
                style={{ transformOrigin: "100px 100px" }}
              />
            </svg>

            {/* Central Golden Logo Image */}
            <motion.img
              src="/Gold_BLACKFRAME_labs_logo.png"
              alt="Blackframe Labs Cinematic Reveal Logo"
              className="relative w-40 sm:w-52 h-auto object-contain z-10"
              initial={{ scale: 0.8, opacity: 0, filter: "blur(6px)" }}
              animate={
                logoFadingOut
                  ? { scale: 0.94, opacity: 0, filter: "blur(8px)" }
                  : { scale: 1, opacity: 1, filter: "blur(0px)" }
              }
              transition={{
                duration: logoFadingOut ? 0.3 : 1.2,
                transitionEnd: { display: logoFadingOut ? "none" : "block" },
                ease: logoFadingOut ? "easeInOut" : [0.25, 1, 0.5, 1]
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
