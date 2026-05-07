import { pickTheme } from '../../lib/theme.js';
import ProjectLayout from './ProjectLayout.jsx';

const META = [
  { label: 'Type',     value: 'Research' },
  { label: 'Year',     value: '2025' },
  { label: 'Role',     value: 'Researcher' },
  { label: 'Duration', value: '3 months' },
  { label: 'Tools',    value: 'Python · Jupyter · GPT-4o API' },
];

const SECTIONS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'background', label: 'Background' },
  { id: 'method',     label: 'Method' },
  { id: 'findings',   label: 'Findings' },
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

export default function LatentBehaviors({ isDark }) {
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
              Latent Behaviors: Studying Emergent Hesitations in LLM Interactions
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
            Large language models do not always answer with uniform confidence. Across extended conversations, subtle shifts appear — hedged phrasing, self-correction loops, mid-sentence pivots, qualifications that arrive after rather than before a claim. This project calls these patterns <em>latent behaviors</em>: systematic response tendencies that emerge not from explicit prompting but from the accumulated context of a dialogue.
          </p>
          <p>
            The goal is to characterize and taxonomize these hesitation-adjacent behaviors across different model families, conversation lengths, and task types, with the aim of better understanding where LLM confidence ends and confabulation begins.
          </p>
        </Section>

        <Section id="background" title="Background" isDark={isDark}>
          <p>
            Much alignment and evaluation research focuses on the accuracy of individual model outputs. Less attention has been paid to the <em>dynamics</em> of how a model's response style changes as a conversation deepens — particularly in long-context settings where earlier turns have settled into a kind of implicit contract between user and model.
          </p>
          <p>
            Anecdotal observation suggests that models sometimes behave differently in turn 2 versus turn 20 of the same thread: becoming more deferential, more verbose in hedging, or paradoxically more overconfident when the user's framing has been consistently reinforced. These patterns may carry meaningful signal about model calibration and the structural limits of in-context reasoning.
          </p>
        </Section>

        <Section id="method" title="Method" isDark={isDark}>
          <p>
            The study constructs a corpus of multi-turn dialogues across three task domains: factual Q&A, open-ended reasoning, and creative generation. Conversations are sampled at controlled turn counts (5, 10, 20, 40 turns) and analyzed along two axes:
          </p>
          <p>
            <strong className={theme('text-zinc-200', 'text-zinc-800')}>Linguistic markers</strong> — hedging frequency (e.g., "I think", "it's possible that", "you might consider"), self-revision phrases, and uncertainty qualifiers are extracted and tracked across turn position.
          </p>
          <p>
            <strong className={theme('text-zinc-200', 'text-zinc-800')}>Behavioral signatures</strong> — response length variance, topic drift rate, and claim retraction patterns are computed as aggregate session-level features.
          </p>
          <p>
            A lightweight annotation scheme tags each hesitation instance by type (epistemic, affective, procedural) and maps it against ground-truth accuracy where available.
          </p>
        </Section>

        <Section id="findings" title="Findings" isDark={isDark}>
          <p>
            Preliminary results show a non-linear relationship between turn count and hedging density: hesitation markers tend to <em>decrease</em> in the early-to-middle turns of a conversation — perhaps as models align to the user's established register — before rising sharply in the latter third as context pressure accumulates.
          </p>
          <p>
            The pattern is more pronounced in reasoning tasks than in factual or creative ones. In reasoning chains where the model has committed to an early inference, retraction behavior in later turns is often syntactically buried — phrased as elaboration rather than correction — suggesting a tendency to preserve surface consistency at the cost of logical coherence.
          </p>
          <p>
            Across model families, the timing and intensity of these patterns differs, but the underlying shape is recognizable: a period of apparent confidence followed by a drift toward qualification that rarely fully acknowledges earlier error.
          </p>
        </Section>

        <Section id="discussion" title="Discussion" isDark={isDark}>
          <p>
            These findings matter for interface design as much as for model evaluation. If latent hesitation behaviors carry reliable signal about response quality, they could serve as passive indicators in conversation UX — soft affordances that surface uncertainty without requiring explicit confidence scores.
          </p>
          <p>
            The deeper question is whether these behaviors reflect genuine internal uncertainty being surfaced, or are instead learned stylistic patterns that mimic calibration without grounding it in anything meaningful. Disentangling these two possibilities is the central open problem this project continues to investigate.
          </p>
        </Section>

      </article>
    </ProjectLayout>
  );
}
