import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";

const cx = (...parts) => parts.filter(Boolean).join(" ");

function polygonCollapsed(point, vertexCount) {
  const pairs = Array.from({ length: vertexCount }, () => point).join(", ");
  return `polygon(${pairs})`;
}

// Coordinates are percentages of the snapshot reference box, to avoid the
// fractional-display-scale px-coordinate bug some browsers have on the
// first transition after load.
function getThemeTransitionClipPaths(variant, cx0, cy0, maxRadius, vw, vh) {
  const toX = (x) => `${(x / vw) * 100}%`;
  const toY = (y) => `${(y / vh) * 100}%`;
  const point = (x, y) => `${toX(x)} ${toY(y)}`;
  const toRadius = (r) => `${(r / (Math.hypot(vw, vh) / Math.SQRT2)) * 100}%`;

  switch (variant) {
    case "circle":
    default:
      return [`circle(0% at ${point(cx0, cy0)})`, `circle(${toRadius(maxRadius)} at ${point(cx0, cy0)})`];
    case "square": {
      const halfW = Math.max(cx0, vw - cx0);
      const halfH = Math.max(cy0, vh - cy0);
      const halfSide = Math.max(halfW, halfH) * 1.05;
      const end = [
        point(cx0 - halfSide, cy0 - halfSide),
        point(cx0 + halfSide, cy0 - halfSide),
        point(cx0 + halfSide, cy0 + halfSide),
        point(cx0 - halfSide, cy0 + halfSide),
      ].join(", ");
      return [polygonCollapsed(point(cx0, cy0), 4), `polygon(${end})`];
    }
    case "diamond": {
      const R = maxRadius * Math.SQRT2;
      const end = [point(cx0, cy0 - R), point(cx0 + R, cy0), point(cx0, cy0 + R), point(cx0 - R, cy0)].join(", ");
      return [polygonCollapsed(point(cx0, cy0), 4), `polygon(${end})`];
    }
  }
}

export default function AnimatedThemeToggler({
  className,
  duration = 400,
  variant = "circle",
  fromCenter = false,
  theme,
  onThemeChange,
  ...props
}) {
  const isControlled = theme !== undefined;
  const [internalIsDark, setInternalIsDark] = useState(false);
  const isDark = isControlled ? theme === "dark" : internalIsDark;
  const buttonRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const activeAnimRef = useRef(null);

  const cancelAnim = useCallback(() => {
    activeAnimRef.current?.cancel();
    activeAnimRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      cancelAnim();
      const root = document.documentElement;
      if (root.dataset.magicuiThemeVt !== "active") return;
      delete root.dataset.magicuiThemeVt;
      root.style.removeProperty("--magicui-theme-toggle-vt-duration");
      root.style.removeProperty("--magicui-theme-vt-clip-from");
    };
  }, [cancelAnim]);

  useEffect(() => {
    if (isControlled) return;
    const updateTheme = () => setInternalIsDark(document.documentElement.classList.contains("dark"));
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [isControlled]);

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current;
    if (!button || isTransitioningRef.current || document.documentElement.dataset.magicuiThemeVt === "active") return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x, y;
    if (fromCenter) {
      x = viewportWidth / 2;
      y = viewportHeight / 2;
    } else {
      const { top, left, width, height } = button.getBoundingClientRect();
      x = left + width / 2;
      y = top + height / 2;
    }

    const maxRadius = Math.hypot(Math.max(x, viewportWidth - x), Math.max(y, viewportHeight - y));

    const applyTheme = () => {
      const newTheme = !isDark;
      document.documentElement.classList.toggle("dark");
      if (isControlled) {
        onThemeChange?.(newTheme ? "dark" : "light");
      } else {
        setInternalIsDark(newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
      }
    };

    if (typeof document.startViewTransition !== "function") {
      applyTheme();
      return;
    }

    const clipPath = getThemeTransitionClipPaths(variant, x, y, maxRadius, viewportWidth, viewportHeight);

    const root = document.documentElement;
    root.dataset.magicuiThemeVt = "active";
    root.style.setProperty("--magicui-theme-toggle-vt-duration", `${duration}ms`);
    root.style.setProperty("--magicui-theme-vt-clip-from", clipPath[0]);
    const cleanup = () => {
      isTransitioningRef.current = false;
      delete root.dataset.magicuiThemeVt;
      root.style.removeProperty("--magicui-theme-toggle-vt-duration");
      root.style.removeProperty("--magicui-theme-vt-clip-from");
      cancelAnim();
    };

    isTransitioningRef.current = true;
    const transition = document.startViewTransition(() => {
      flushSync(applyTheme);
    });
    if (typeof transition?.finished?.finally === "function") {
      transition.finished.finally(cleanup).catch(() => {});
    } else {
      cleanup();
    }

    const ready = transition?.ready;
    if (ready && typeof ready.then === "function") {
      ready
        .then(() => {
          const anim = document.documentElement.animate(
            { clipPath },
            {
              duration,
              easing: "ease-in-out",
              fill: "forwards",
              pseudoElement: "::view-transition-new(root)",
            }
          );
          activeAnimRef.current = anim;
        })
        .catch(() => {});
    }
  }, [variant, fromCenter, duration, isDark, isControlled, onThemeChange, cancelAnim]);

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
      className={cx(className)}
      {...props}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
