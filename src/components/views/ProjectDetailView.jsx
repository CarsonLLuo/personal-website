import FadeIn from '../common/FadeIn.jsx';
import { pickTheme } from '../../lib/theme.js';
import TestResearchProject from '../projects/TestResearchProject.jsx';

const PROJECT_COMPONENTS = {
  'test-research-project': TestResearchProject,
};

export default function ProjectDetailView({ slug, isDark, onBack }) {
  const theme = pickTheme(isDark);
  const ProjectContent = PROJECT_COMPONENTS[slug];

  if (!ProjectContent) {
    return (
      <div className="min-h-screen pt-40">
        <FadeIn>
          <p className={theme('text-zinc-400', 'text-zinc-500')}>Project not found.</p>
          <button onClick={onBack} className={`mt-4 text-sm ${theme('text-zinc-500 hover:text-zinc-300', 'text-zinc-400 hover:text-zinc-600')}`}>
            ← Back to Projects
          </button>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40">
      <FadeIn>
        <button
          onClick={onBack}
          className={`mb-10 flex items-center gap-1 font-sans text-sm transition-colors duration-200 ${theme(
            'text-zinc-500 hover:text-zinc-300',
            'text-zinc-400 hover:text-zinc-600'
          )}`}
        >
          ← Projects
        </button>
        <ProjectContent isDark={isDark} />
      </FadeIn>
    </div>
  );
}
