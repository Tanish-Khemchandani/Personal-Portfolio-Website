import { useEffect, useState } from "react";

// Tracks which section is currently "current" for nav highlighting.
//
// Deliberately NOT built on IntersectionObserver's entries list: that
// callback only reports elements whose intersection state just changed in
// this frame, not the full current state of every observed section. Picking
// the "topmost" among only those changed entries is unreliable — during a
// fast scroll, the section being entered and the one being left can both
// fire in the same batch, and comparing only those two out of context can
// pick the wrong one.
//
// Instead: on every scroll frame, read every section's actual position and
// deterministically pick the last one (in page order) whose top has crossed
// above the reference line. This always reflects true current scroll
// position, with nothing left to chance.
export default function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return;

    // Matches the navbar height + scroll-padding-top used elsewhere, so the
    // "current" section is whichever one sits just below the sticky navbar.
    const getOffset = () => (window.innerWidth < 640 ? 64 : 80) + 8;

    let ticking = false;

    const computeActive = () => {
      ticking = false;
      const offset = getOffset();
      let current = null;

      for (const el of elements) {
        const top = el.getBoundingClientRect().top;
        if (top <= offset) {
          current = el.id;
        } else {
          break;
        }
      }

      // Near the very bottom of the page, force the last section active even
      // if its top hasn't crossed the offset (short final sections otherwise
      // never get a turn).
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (scrolledToBottom) {
        current = elements[elements.length - 1].id;
      }

      setActive(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(computeActive);
      }
    };

    computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}
