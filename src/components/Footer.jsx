import { contact } from "../data";
import ReactOrb from "./ReactOrb";
import BrandOrb from "./BrandOrb";

export default function Footer() {
  return (
    <footer className="pt-16 pb-10 text-center">
      <div className="max-w-295 mx-auto px-6 sm:px-8">
        <div className="flex justify-center items-center gap-6 mb-5">
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel rounded-full pl-2.5 pr-4 py-1.5 text-accent hover:underline inline-flex items-center gap-2"
          >
            <BrandOrb mode="linkedin" size={28} />
            LinkedIn
          </a>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel rounded-full pl-2.5 pr-4 py-1.5 text-accent hover:underline inline-flex items-center gap-2"
          >
            <BrandOrb mode="instagram" size={28} />
            Instagram
          </a>
        </div>
        <div className="font-mono text-[15px] text-ink-dim flex items-center justify-center gap-2 flex-wrap">
          <span>Built with</span>
          <ReactOrb size={40} />
          <span>and TailwindCSS. © 2026 Tanish Khemchandani.</span>
        </div>
      </div>
    </footer>
  );
}
