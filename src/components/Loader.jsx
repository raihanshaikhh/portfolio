import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME = "RAIHAN SHAIKH";

function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let raf;
    let current = 0;
    const start = performance.now();
    // Total ~2.2s, eased so it doesn't feel like a flat linear tick
    const DURATION = 2200;

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / DURATION, 1);
      // ease-out-quart — fast start, gentle settle near 100
      const eased = 1 - Math.pow(1 - t, 4);
      current = Math.floor(eased * 100);
      setProgress(current);

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => setDone(true), 400);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (done) {
      document.body.style.overflow = "";
      const t = setTimeout(() => onComplete?.(), 900);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#eeeeee] text-black"
        >
          {/* Name — ghost outline + progress-clipped solid fill */}
          <div className="relative select-none">
            <h1
              aria-hidden
              className="font-space text-[11vw] font-medium leading-none tracking-[-0.05em] text-black/10 md:text-[6.5vw]"
            >
              {NAME}
            </h1>

            <h1
              className="absolute inset-0 overflow-hidden whitespace-nowrap font-space text-[11vw] font-medium leading-none tracking-[-0.05em] text-black md:text-[6.5vw]"
              style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
            >
              {NAME}
            </h1>

            <span className="sr-only">Loading {progress}%</span>
          </div>

          {/* Progress bar + percentage */}
          <div className="mt-8 flex w-[70vw] max-w-xs items-center gap-4 md:mt-10">
            <div className="relative h-px flex-1 bg-black/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-black"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="w-10 shrink-0 text-right font-mono text-xs tabular-nums text-black/50">
              {progress}%
            </span>
          </div>

          {/* Eyebrow label — matches section labels elsewhere on the site */}
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-black/30 md:mt-8">
            Loading portfolio
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;