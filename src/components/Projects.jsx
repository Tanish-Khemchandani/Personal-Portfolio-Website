import Section from "./Section";
import { projects } from "../data";

export default function Projects() {
  return (
    <Section id="projects" num="04" title="Projects">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <div key={i} className="relative glass-panel rounded-[14px] p-6 transition-all roam-border">
            <h3 className="text-lg font-semibold mb-2 pr-20">{p.name}</h3>
            <p className="text-ink-dim text-base mb-4">{p.desc}</p>
            <div className="flex gap-1.5 flex-wrap mb-4">
              {p.tags.map((t) => (
                <span key={t} className="font-mono text-xs bg-accent/10 text-accent px-2.5 py-1 rounded">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-sm text-accent hover:underline">↗ View Live</a>
              )}
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-sm text-accent hover:underline">{"</>"} View on GitHub ↗</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
