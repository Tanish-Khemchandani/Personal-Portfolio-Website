import Section from "./Section";
import { skills } from "../data";

export default function Skills() {
  return (
    <Section id="skills" num="03" title="Skills">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((s) => (
          <div key={s.title} className="glass-panel rounded-[14px] p-6 roam-border transition-transform h-full">
            <h3
              className="text-lg text-accent mb-3.5 tracking-wide"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {s.title}
            </h3>
            <ul>
              {s.items.map((item) => (
                <li key={item} className="text-ink-dim text-base py-1 flex items-center gap-2.5">
                  <span className="text-accent-dim">▹</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
