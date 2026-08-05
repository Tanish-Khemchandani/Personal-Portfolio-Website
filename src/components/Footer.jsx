import { contact } from "../data";

export default function Footer() {
  return (
    <footer className="pt-16 pb-10 text-center">
      <div className="max-w-295 mx-auto px-6 sm:px-8">
        <div className="flex justify-center items-center gap-6 mb-5">
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel rounded-full px-4 py-1.5 text-accent hover:underline"
          >
            LinkedIn
          </a>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel rounded-full px-4 py-1.5 text-accent hover:underline"
          >
            Instagram
          </a>
        </div>
        <div className="font-mono text-[15px] text-ink-dim">
          Built with React.js and TailwindCSS. © 2026 Tanish Khemchandani.
        </div>
      </div>
    </footer>
  );
}
