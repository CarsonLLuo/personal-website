import FadeIn from '../common/FadeIn.jsx';
import PageHeader from '../common/PageHeader.jsx';
import ProjectCard from '../common/ProjectCard.jsx';
import projectCollections from '../../data/projects.json';
import { pickTheme } from '../../lib/theme.js';

export default function ProjectsView({ isDark }) {
  const theme = pickTheme(isDark);

  return (
    <div className="min-h-screen space-y-16 pt-40">
      <FadeIn>
        <PageHeader title="Projects Index" description="A complete log of research and builds." isDark={isDark} />

        <div className="space-y-16">
          {projectCollections.map((collection) => (
            <div key={collection.id}>
              <h3
                className={`mb-7 font-display text-[11px] uppercase tracking-[0.24em] transition-colors duration-700 ${theme(
                  'text-zinc-500/80',
                  'text-zinc-400'
                )}`}
              >
                {collection.label}
              </h3>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
                {collection.items.map((project) => (
                  <ProjectCard key={project.name} project={project} isDark={isDark} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
