import { pickTheme } from '../../lib/theme.js';
import ProjectLayout from './ProjectLayout.jsx';

const META = [
  { label: 'Type',     value: 'Research' },
  { label: 'Year',     value: '2025' },
  { label: 'Role',     value: 'Designer / Researcher' },
  { label: 'Duration', value: '2 months' },
  { label: 'Tools',    value: 'Figma · React · User Studies' },
];

const SECTIONS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'background', label: 'Background' },
  { id: 'framework',  label: 'Framework' },
  { id: 'prototypes', label: 'Prototypes' },
  { id: 'discussion', label: 'Discussion' },
];

function Section({ id, title, isDark, children }) {
  const theme = pickTheme(isDark);
  return (
    <section id={id} className="scroll-mt-32 mb-16">
      <h2 className={`mb-6 font-display text-lg transition-colors duration-700 ${theme('text-zinc-100', 'text-zinc-900')}`}>
        {title}
      </h2>
      <div className={`space-y-4 font-sans text-[0.97rem] leading-[1.9] transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-700')}`}>
        {children}
      </div>
    </section>
  );
}

export default function CognitiveScaffolds({ isDark }) {
  const theme = pickTheme(isDark);

  return (
    <ProjectLayout sections={SECTIONS} isDark={isDark}>
      <article className="space-y-10">

        <header className="space-y-8">
          <div>
            <p className={`mb-3 font-display text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
              Research
            </p>
            <h1 className={`font-display text-2xl leading-snug transition-colors duration-700 ${theme('text-zinc-100', 'text-zinc-900')}`}>
              Cognitive Scaffolds: Dynamic UI Structures for Complex Learning
            </h1>
          </div>

          <dl className={`grid grid-cols-2 gap-x-8 gap-y-4 border-t pt-6 font-display text-[0.78rem] transition-colors duration-700 sm:grid-cols-3 ${theme('border-zinc-800 text-zinc-400', 'border-zinc-200 text-zinc-500')}`}>
            {META.map(({ label, value }) => (
              <div key={label}>
                <dt className={`mb-1 text-[0.68rem] uppercase tracking-[0.2em] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
                  {label}
                </dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <Section id="overview" title="Overview" isDark={isDark}>
          <p>
            Cognitive Scaffolds is a design research project exploring how user interface structures can dynamically adjust to a learner's current state of understanding — not just their explicit actions. The central premise is that effective learning environments don't simply present information; they shape the <em>cognitive surface</em> through which a learner engages with it.
          </p>
          <p>
            The project develops a framework for UI patterns that temporarily support a learner's working memory and attention during high-complexity tasks, then progressively withdraw as competence consolidates — mirroring the original pedagogical metaphor from Vygotsky's zone of proximal development.
          </p>
        </Section>

        <Section id="background" title="Background" isDark={isDark}>
          <p>
            Existing EdTech interfaces are largely static: they deliver content in a fixed format regardless of whether the learner is encountering a concept for the first time or revisiting it after deep familiarity. Adaptive learning systems have begun to address this through content sequencing, but rarely through interface structure itself.
          </p>
          <p>
            A growing body of cognitive load research suggests that the <em>form</em> of information presentation is as consequential as its content. Extraneous load — friction introduced by interface complexity rather than the task itself — actively degrades learning outcomes, particularly for novices navigating unfamiliar domains.
          </p>
          <p>
            This project asks: what would it look like if an interface could sense cognitive load state and reshape its own structure in response — simplifying layouts, foregrounding procedural cues, or expanding contextual anchors exactly when they are needed and no more?
          </p>
        </Section>

        <Section id="framework" title="Framework" isDark={isDark}>
          <p>
            The scaffold framework is organized around three levels of structural support, each corresponding to a phase in the learning arc:
          </p>
          <p>
            <strong className={theme('text-zinc-200', 'text-zinc-800')}>Anchor mode</strong> — for initial exposure. The interface surfaces explicit structure cues: step markers, progress anchors, visible breadcrumb trails, and reduced visual noise. The goal is orientation over exploration.
          </p>
          <p>
            <strong className={theme('text-zinc-200', 'text-zinc-800')}>Bridge mode</strong> — for active construction. Supporting elements remain accessible but no longer lead. The learner's own interaction history becomes the primary navigation layer, with the interface receding to create room for effortful processing.
          </p>
          <p>
            <strong className={theme('text-zinc-200', 'text-zinc-800')}>Fluency mode</strong> — for consolidation. The interface strips to its functional minimum, treating the learner as an expert who no longer benefits from explicit structural support. Scaffolding is invisible because it is no longer needed.
          </p>
          <p>
            Transitions between modes are triggered by a combination of implicit behavioral signals (dwell time, error rate, navigation pattern variance) rather than explicit self-report.
          </p>
        </Section>

        <Section id="prototypes" title="Prototypes" isDark={isDark}>
          <p>
            Two prototype contexts have been built and tested: a code learning environment for introductory programming, and a research reading tool for academic literature review.
          </p>
          <p>
            In the programming context, Anchor mode surfaces inline syntax hints and step-by-step decomposition panels that collapse as the learner's error rate drops. Bridge mode introduces blank-fill challenges while keeping the decomposition accessible via hover. Fluency mode offers a clean editor with no structural support beyond syntax highlighting.
          </p>
          <p>
            In the reading context, Anchor mode highlights key claims and provides embedded concept definitions. Bridge mode adds a side-by-side annotation layer. Fluency mode presents the plain text with no supplementary overlay.
          </p>
          <p>
            User studies with 24 participants (12 novice, 12 intermediate) showed a significant reduction in self-reported cognitive load at the Anchor→Bridge transition, and a measurable improvement in retention scores compared to a fixed-format control condition.
          </p>
        </Section>

        <Section id="discussion" title="Discussion" isDark={isDark}>
          <p>
            The most persistent design tension in this project is the risk of over-scaffolding: an interface that keeps offering support beyond the point of need can inhibit the productive struggle that consolidates learning. Getting the withdrawal timing right is harder than getting the initial scaffold right.
          </p>
          <p>
            The implicit behavioral signals used to trigger transitions are also fragile. Dwell time can indicate confusion or deep engagement with equal plausibility; error rate depends on task calibration. The framework currently relies on multi-signal heuristics rather than a rigorous model of cognitive state — a limitation that future iterations will need to address, potentially through richer physiological or eye-tracking proxies.
          </p>
          <p>
            Despite these open questions, the core thesis seems defensible: interface structure is not neutral, and learning environments that treat it as a dynamic variable rather than a fixed delivery mechanism have meaningful design space left to explore.
          </p>
        </Section>

      </article>
    </ProjectLayout>
  );
}
