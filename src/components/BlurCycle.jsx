import { useEffect, useRef, useState } from "react";

/**
 * Cycles through `phrases`, blurring each one out and the next one in.
 * Drop-in replacement for Typewriter — no Framer Motion, no external deps.
 * Adapted from the BlurIn component (TypeScript → plain JSX, cycling added).
 */
export default function BlurCycle({ phrases, interval = 2600 }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeOut = setTimeout(() => setVisible(false), interval);
    const swap = setTimeout(() => {
      setIndex((i) => (i + 1) % phrases.length);
      setVisible(true);
    }, interval + 420); // 420ms = blur-out transition duration

    return () => {
      clearTimeout(fadeOut);
      clearTimeout(swap);
    };
  }, [index, phrases, interval]);

  return (
    <span
      style={{
        display: "inline-block",
        filter: visible ? "blur(0px)" : "blur(18px)",
        opacity: visible ? 1 : 0,
        transition: "filter 0.42s ease, opacity 0.42s ease",
        willChange: "filter, opacity",
      }}
    >
      {phrases[index]}
    </span>
  );
}
