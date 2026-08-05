import Section from "./Section";
import { education } from "../data";

export default function Education() {
  return (
    <Section id="education" num="06" title="Education">
      <div className="flex flex-col gap-5">
        {education.map((e) => (
          <div key={e.school} className="glass-panel rounded-[14px] p-6 sm:p-7">
            <h3 className="text-lg font-semibold mb-1">{e.school}</h3>
            <div className="text-ink-dim text-base font-mono">{e.sub}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
