import Reveal from "./Reveal";

export default function Section({ id, num, title, subtitle, children }) {
  return (
    <section id={id} className="min-h-screen flex items-start border-t border-line relative py-16 sm:py-20">
      <div className="max-w-295 mx-auto px-6 sm:px-8 relative z-1 w-full">
        <Reveal>
          <div className="flex items-baseline gap-3 sm:gap-3.5 mb-8 sm:mb-10">
            <span className="font-mono text-accent text-base sm:text-lg">{num}</span>
            <span
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {title}
            </span>
          </div>
          {subtitle && <p className="text-ink-dim text-base sm:text-lg -mt-6 sm:-mt-7 mb-7 sm:mb-9 max-w-155">{subtitle}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
