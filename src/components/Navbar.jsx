import { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../ThemeContext";
import tkLogo from "../assets/tk-logo.png";
import useActiveSection from "../useActiveSection";

const links = ["about", "experience", "skills", "projects", "certifications", "education", "contact"];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const active = useActiveSection(["top", ...links]);

  return (
    <nav className="sticky top-4 z-20 mx-4 sm:mx-6 lg:mx-8 rounded-full border border-line bg-bg/80 backdrop-blur-md shadow-lg">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6">
        <a href="#top" className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0" aria-label="Go to top">
          <img src={tkLogo} alt="TK logo" className="h-7 sm:h-9 lg:h-10 w-auto shrink-0" />
          <span
            className="text-accent whitespace-nowrap leading-none font-bold truncate text-base sm:text-xl lg:text-[30px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Tanish Khemchandani
          </span>
        </a>

        <div className="hidden lg:flex justify-center gap-9 text-lg text-ink-dim">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              className={`hover:text-accent transition-colors capitalize whitespace-nowrap underline decoration-2 underline-offset-4 ${
                active === l ? "text-accent decoration-accent" : "decoration-transparent hover:decoration-accent"
              }`}
            >
              {l}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4 justify-self-end shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-line text-ink-dim hover:text-accent hover:border-accent-dim transition-colors shrink-0"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="#contact"
            className="hidden sm:inline-block font-mono text-sm lg:text-base border border-accent-dim text-accent px-4 lg:px-5 py-2 lg:py-2.5 rounded-md hover:bg-accent/10 hover:border-accent transition-colors whitespace-nowrap"
          >
            say hi ↗
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-line text-ink-dim hover:text-accent hover:border-accent-dim transition-colors shrink-0"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden mt-2 rounded-2xl border border-line bg-bg px-4 sm:px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              onClick={() => setOpen(false)}
              className={`capitalize transition-colors py-2.5 text-lg underline decoration-2 underline-offset-4 ${
                active === l ? "text-accent decoration-accent" : "text-ink-dim decoration-transparent hover:text-accent hover:decoration-accent"
              }`}
            >
              {l}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="sm:hidden mt-2 font-mono text-sm border border-accent-dim text-accent px-4 py-2.5 rounded-md text-center hover:bg-accent/10 transition-colors"
          >
            say hi ↗
          </a>
        </div>
      )}
    </nav>
  );
}
