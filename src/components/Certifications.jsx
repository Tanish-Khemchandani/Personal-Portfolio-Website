import Section from "./Section";
import { certifications } from "../data";

export default function Certifications() {
  return (
    <Section id="certifications" num="05" title="Certifications">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {certifications.map((c) => (
          <div key={c} className="flex items-center gap-3 px-4.5 py-4 glass-panel rounded-lg text-base text-ink-dim roam-border">
            <span className="text-accent font-mono text-lg">▹</span>
            {c}
          </div>
        ))}
      </div>
    </Section>
  );
}
