import Section from "./Section";
import { languages } from "../data";

export default function About() {
  return (
    <Section id="about" num="01" title="About">
      <div className="glass-panel rounded-[14px] p-7 sm:p-9">
        <p className="text-ink-dim text-lg max-w-160 leading-[1.8]">
          I hold a <strong className="text-ink font-semibold">Bachelor of Computer Applications</strong> from
          <b> The Maharaja Sayajirao University of Baroda</b>, and I'm currently working as a{" "}
          <strong className="text-ink font-semibold">Software Development Intern at Hyunix Technologies</strong>,
          building hands-on experience with the MERN stack.
        </p>
        <p className="text-ink-dim text-lg max-w-160 leading-[1.8] mt-4">
          I believe in learning in plain language and putting it straight into practice — the goal is always
          tangible, working outcomes over theory for its own sake. Alongside development, I'm genuinely interested in
          technology and management, and I'm always looking for the next thing to build or learn.
        </p>
        <div className="flex flex-wrap gap-2.5 mt-7">
          {languages.map((l) => (
            <span key={l.name} className="font-mono text-sm text-ink-dim border border-line px-3 py-1.5 rounded-full">
              {l.name} — {l.level}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
