import Section from "./Section";
import { experience } from "../data";

export default function Experience() {
  return (
    <Section id="experience" num="02" title="Experience">
      <div className="flex flex-col gap-6">
        {experience.map((e, i) => (
          <div
            key={i}
            className={`glass-panel rounded-[14px] p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-[170px_1fr] ${
              e.certificate ? "lg:grid-cols-[170px_1fr_200px]" : ""
            } gap-2 sm:gap-6 items-start`}
          >
            <div className="font-mono text-[15px] text-ink-dim pt-0.5">{e.date}</div>
            <div>
              <div className="text-xl font-semibold mb-1">{e.role}</div>
              <div className="text-accent text-lg mb-2.5" style={{ fontFamily: "var(--font-heading)" }}>
                {e.org}
              </div>
              <div className="text-ink-dim text-base max-w-140">{e.desc}</div>
              <div className="flex gap-2 flex-wrap mt-3">
                {e.tags.map((t) => (
                  <span key={t} className="font-mono text-xs bg-accent/10 text-accent px-2.5 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
              {e.certificate && (
                <a
                  href={e.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="roam-border lg:hidden block mt-5 w-full max-w-65 rounded-[10px] overflow-hidden border border-line transition-transform"
                  aria-label={`View certificate for ${e.role} at ${e.org}`}
                >
                  <img src={e.certificate} alt={`Certificate — ${e.role}, ${e.org}`} className="w-full h-auto block" />
                </a>
              )}
            </div>
            {e.certificate && (
              <a
                href={e.certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="roam-border hidden lg:block w-full rounded-[10px] overflow-hidden border border-line transition-transform justify-self-end"
                aria-label={`View certificate for ${e.role} at ${e.org}`}
              >
                <img src={e.certificate} alt={`Certificate — ${e.role}, ${e.org}`} className="w-full h-auto block" />
              </a>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
