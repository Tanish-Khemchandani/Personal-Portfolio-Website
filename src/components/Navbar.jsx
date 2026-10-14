import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "../ThemeContext";
import tkLogo from "../assets/tk-logo.png";
import useActiveSection from "../useActiveSection";
import AnimatedThemeToggler from "./AnimatedThemeToggler";

const links = ["about", "experience", "skills", "projects", "certifications", "education", "contact"];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const active = useActiveSection(["top", ...links]);

  return (
    <nav className="sticky top-4 z-20 mx-4 sm:mx-6 lg:mx-8">
      <div className="rounded-full border border-line bg-bg/80 backdrop-blur-md shadow-lg">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6">
          <a href="#top" className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0" aria-label="Go to top">
            <img src={tkLogo} alt="TK logo" className="h-7 sm:h-9 lg:h-10 w-auto shrink-0" />
            <span
              className="hidden sm:inline text-accent whitespace-nowrap leading-none font-bold truncate text-base sm:text-xl lg:text-[30px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Tanish Khemchandani
            </span>
          </a>

          <div
            className="nav-pill hidden lg:inline-grid"
            style={{
              "--pos": links.indexOf(active) >= 0 ? links.indexOf(active) : 0,
              "--count": links.length,
            }}
          >
            {links.map((l, i) => (
              <a
                key={l}
                href={`#${l}`}
                aria-current={active === l ? "page" : undefined}
                onMouseEnter={() => {
                  document.querySelector(".nav-pill")?.style.setProperty("--pos", i);
                }}
                onMouseLeave={() => {
                  const ai = links.indexOf(active);
                  document.querySelector(".nav-pill")?.style.setProperty("--pos", ai >= 0 ? ai : 0);
                }}
                className="capitalize whitespace-nowrap"
              >
                {l}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4 justify-self-end shrink-0 relative">
            <AnimatedThemeToggler
              theme={theme}
              onThemeChange={() => toggleTheme()}
              variant="circle"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-line text-ink-dim hover:text-accent hover:border-accent-dim transition-colors shrink-0"
            />
            <a
              href="#contact"
              className="hex-btn font-mono hidden sm:inline-flex items-center justify-center mx-3"
              aria-label="Say hi — go to the contact section"
            >
              <span className="hex-btn__clip" aria-hidden="true">
                <span className="hex-btn__corner hex-btn__corner--lt" />
                <span className="hex-btn__corner hex-btn__corner--rb" />
                <span className="hex-btn__corner hex-btn__corner--rt" />
                <span className="hex-btn__corner hex-btn__corner--lb" />
              </span>
              <span className="hex-btn__arrow hex-btn__arrow--right" aria-hidden="true" />
              <span className="hex-btn__arrow hex-btn__arrow--left" aria-hidden="true" />
              <span className="hex-btn__label">say hi ↗</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={`nav-hamburger-icon ${open ? "is-open" : ""} lg:hidden w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-line text-ink-dim hover:text-accent hover:border-accent-dim transition-colors shrink-0`}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>

            <ul className={`nav-stagger-panel lg:hidden ${open ? "is-open" : ""}`}>
              {links.map((l) => (
                <li key={l}>
                  <a
                    href={`#${l}`}
                    onClick={() => setOpen(false)}
                    className={active === l ? "is-active" : ""}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
