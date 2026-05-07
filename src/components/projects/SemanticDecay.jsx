import { pickTheme } from '../../lib/theme.js';
import ProjectLayout from './ProjectLayout.jsx';

const META = [
  { label: 'Type',     value: 'Research' },
  { label: 'Year',     value: '2025' },
  { label: 'Role',     value: 'Researcher' },
  { label: 'Duration', value: '3 months' },
  { label: 'Tools',    value: 'Python · Claude API · Autogen Studio · Annotation Studio' },
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

export default function SemanticDecay({ isDark }) {
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
              Semantic Decay: How Meaning Shifts in Long-Context Windows Over Time
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
            When a concept is introduced early in a long conversation, it enters the context with a specific meaning — shaped by the words used, the surrounding framing, and the implied purpose. This project studies what happens to that meaning across thousands of subsequent tokens: how it drifts, flattens, or fractures as the model's attention distributes across an expanding window.
          </p>
          <p>
            Semantic Decay is not primarily a study of forgetting. It is a study of <em>quiet distortion</em>: the way that key terms and constructs gradually acquire a slightly different operational definition as a conversation evolves, without either the model or the user explicitly noticing the shift.
          </p>
        </Section>

        <Section id="background" title="Background" isDark={isDark}>
          <p>
            Transformer-based language models process context as a weighted attention over all prior tokens. In theory, a 128k-token context window makes everything equally available to a model. In practice, attention is not uniform: tokens near the beginning and end of a context tend to receive disproportionate weight, while the middle of a long context is susceptible to underweighting — a phenomenon sometimes called the "lost in the middle" effect.
          </p>
          <p>
            But this project is interested in a subtler and less-studied phenomenon. Even when a model can technically retrieve a definition or construct from early in a context, the <em>functional meaning</em> of that construct may have shifted through repeated use and recontextualization. The word "agent" means something different in turn 3 of a conversation about agency theory than it does in turn 35 after a long tangent about tool-use architectures — and the model may not resolve this tension explicitly.
          </p>
          <p>
            This semantic slippage matters enormously for extended reasoning tasks, collaborative writing, and any domain where precision of language is load-bearing.
          </p>
        </Section>

        <Section id="method" title="Method" isDark={isDark}>
          <p>
            The study constructs paired conversation corpora in three domains — philosophy of mind, software architecture, and clinical psychology — chosen because each has a dense vocabulary of contested, polysemous, or highly context-sensitive terms.
          </p>
          <p>
            <strong className={theme('text-zinc-200', 'text-zinc-800')}>Probe injection</strong> — at fixed turn intervals (turns 5, 15, 30, 60), a standardized probe question is inserted: "What do you mean when you use the term X in this conversation?" Responses are collected and held for later comparison without interrupting the main dialogue thread.
          </p>
          <p>
            <strong className={theme('text-zinc-200', 'text-zinc-800')}>Semantic similarity scoring</strong> — probe responses are embedded and compared against the term's first-use definition using cosine similarity. The trajectory of similarity scores across turn positions forms the decay curve for each term.
          </p>
          <p>
            <strong className={theme('text-zinc-200', 'text-zinc-800')}>Human annotation</strong> — a subset of probe response pairs are reviewed by annotators who rate whether a meaningful semantic shift has occurred and, if so, classify its type: narrowing, broadening, metaphorical extension, or outright inconsistency.
          </p>
        </Section>

        <Section id="findings" title="Findings" isDark={isDark}>
          <p>
            Across all three domains, semantic similarity scores decline monotonically with turn distance, but not at a uniform rate. The steepest decay occurs between turns 5 and 20 — the period of most active conceptual construction — followed by a plateau as the conversation stabilizes around an implicit working definition that may differ substantially from the original.
          </p>
          <p>
            Human annotators identify two dominant decay patterns. In <strong className={theme('text-zinc-200', 'text-zinc-800')}>narrowing decay</strong>, a broad term gradually acquires a specific, locally-negotiated meaning that excludes senses the model would have invoked earlier. In <strong className={theme('text-zinc-200', 'text-zinc-800')}>drift decay</strong>, a term's meaning migrates continuously without settling — creating the appearance of coherent discourse while masking a lack of stable referent.
          </p>
          <p>
            Drift decay is significantly more common in open-ended reasoning and philosophical dialogue. Narrowing decay is more common in technical domains, where the pressure toward operational precision creates a different kind of semantic instability: a term becomes locally precise at the cost of losing its connection to broader usage.
          </p>
        </Section>

        <Section id="discussion" title="Discussion" isDark={isDark}>
          <p>
            The practical implication of semantic decay is uncomfortable for anyone relying on LLMs for extended intellectual collaboration: the model you are talking to in turn 60 is not operating with the same conceptual vocabulary as the model you were talking to in turn 5, even if the raw text of your definitions is still technically present in the window.
          </p>
          <p>
            One potential mitigation is periodic definitional anchoring — explicitly restating key term meanings at regular intervals in a long conversation. Initial experiments suggest this substantially reduces decay rates, at the cost of conversational fluency.
          </p>
          <p>
            The deeper implication concerns the epistemology of extended AI-assisted reasoning. If meaning drifts silently across a long context, conclusions reached at turn 80 may be internally valid given the locally-operative meanings at that point, while being subtly inconsistent with the premises established at turn 3. Detecting and surfacing this kind of structural incoherence may require tooling that does not yet exist — and building it is one of the longer-term aims of this project.
          </p>
        </Section>

      </article>
    </ProjectLayout>
  );
}
