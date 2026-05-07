import FadeIn from '../common/FadeIn.jsx';
import { pickTheme } from '../../lib/theme.js';
import NoteLayout from '../notes/NoteLayout.jsx';
import notes from '../../data/notes.json';

const NOTE_FILES = import.meta.glob('../../data/notes/*.md', { query: '?raw', import: 'default', eager: true });

const NOTE_CONTENT = Object.fromEntries(
  Object.entries(NOTE_FILES).map(([path, content]) => {
    const slug = path.replace('../../data/notes/', '').replace('.md', '');
    return [slug, content];
  })
);

export default function NoteDetailView({ slug, isDark, onBack }) {
  const theme = pickTheme(isDark);
  const markdown = NOTE_CONTENT[slug];
  const meta = notes.find((n) => n.slug === slug);

  if (!markdown || !meta) {
    return (
      <div className="min-h-screen pt-40">
        <FadeIn>
          <p className={theme('text-zinc-400', 'text-zinc-500')}>Note not found.</p>
          <button onClick={onBack} className={`mt-4 text-sm ${theme('text-zinc-500 hover:text-zinc-300', 'text-zinc-400 hover:text-zinc-600')}`}>
            ← Back to Notes
          </button>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[900px] px-6">
      <div className="min-h-screen pt-40 pb-32">
        <FadeIn>
          <button
            onClick={onBack}
            className={`mb-10 flex items-center gap-1 font-sans text-sm transition-colors duration-200 ${theme(
              'text-zinc-500 hover:text-zinc-300',
              'text-zinc-400 hover:text-zinc-600'
            )}`}
          >
            ← Notes
          </button>
          <NoteLayout markdown={markdown} meta={meta} isDark={isDark} />
        </FadeIn>
      </div>
    </div>
  );
}
