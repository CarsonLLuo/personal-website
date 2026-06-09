import { pickTheme } from '../../lib/theme.js';
import ProjectLayout from './ProjectLayout.jsx';

const META = [
  { label: 'Type',     value: 'Product · Developer Tool' },
  { label: 'Year',     value: '2026' },
  { label: 'Role',     value: 'Designer / Developer' },
  { label: 'Stack',    value: 'Python · Shell · Claude Code Hooks · BetterTouchTool' },
  { label: 'Status',   value: 'MVP' },
];

const SECTIONS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'interface',  label: 'Interface' },
  { id: 'features',   label: 'Features' },
  { id: 'flow',       label: 'Flow' },
  { id: 'safety',     label: 'Safety' },
  { id: 'scope',      label: 'Scope' },
  { id: 'reflection', label: 'Reflection' },
];

function Section({ id, title, isDark, children }) {
  const theme = pickTheme(isDark);
  return (
    <section id={id} className="mb-16 scroll-mt-32">
      <h2 className={`mb-6 font-display text-lg transition-colors duration-700 ${theme('text-zinc-100', 'text-zinc-900')}`}>
        {title}
      </h2>
      <div className={`space-y-4 text-[0.97rem] leading-[1.9] transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-700')}`}>
        {children}
      </div>
    </section>
  );
}

function FeatureRow({ title, desc, isDark }) {
  const theme = pickTheme(isDark);
  return (
    <div className={`border-t py-5 transition-colors duration-700 ${theme('border-zinc-800', 'border-zinc-200')}`}>
      <p className={`mb-1.5 font-display text-[0.82rem] uppercase tracking-[0.18em] transition-colors duration-700 ${theme('text-zinc-400', 'text-zinc-500')}`}>
        {title}
      </p>
      <p className={`text-[0.97rem] leading-relaxed transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-600')}`}>
        {desc}
      </p>
    </div>
  );
}

function FlowLine({ label, desc, isDark }) {
  const theme = pickTheme(isDark);
  return (
    <div className={`grid gap-3 border-t py-4 transition-colors duration-700 sm:grid-cols-[180px_1fr] sm:gap-8 ${theme('border-zinc-800', 'border-zinc-200')}`}>
      <p className={`font-mono text-[0.78rem] transition-colors duration-700 ${theme('text-zinc-500', 'text-zinc-400')}`}>
        {label}
      </p>
      <p className={`text-[0.95rem] leading-relaxed transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-600')}`}>
        {desc}
      </p>
    </div>
  );
}

export default function ClaudeCodeTouchBarCompanion({ isDark }) {
  const theme = pickTheme(isDark);

  return (
    <ProjectLayout sections={SECTIONS} isDark={isDark}>
      <article className="space-y-10">

        <header className="space-y-8">
          <div>
            <p className={`mb-3 font-display text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
              Product · Developer Tool
            </p>
            <h1 className={`font-display text-2xl leading-snug transition-colors duration-700 ${theme('text-zinc-100', 'text-zinc-900')}`}>
              Claude Code Touch Bar Companion
            </h1>
            <p className={`mt-3 text-[1rem] leading-relaxed transition-colors duration-700 ${theme('text-zinc-400', 'text-zinc-500')}`}>
              把 MacBook Pro Touch Bar 变成 Claude Code 权限请求的低摩擦副屏。
            </p>
          </div>

          <dl className={`grid grid-cols-2 gap-x-8 gap-y-4 border-t pt-6 font-display text-[0.78rem] transition-colors duration-700 sm:grid-cols-3 ${theme('border-zinc-800 text-zinc-400', 'border-zinc-200 text-zinc-500')}`}>
            {META.map(({ label, value }) => (
              <div key={label}>
                <dt className={`mb-1 text-[0.68rem] uppercase tracking-[0.2em] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <Section id="overview" title="Overview" isDark={isDark}>
          <p>
            这是一个给 Claude Code 权限流做的轻量 companion：当终端里出现 <code className={`rounded px-1 py-0.5 font-mono text-[0.88em] ${theme('bg-zinc-800 text-zinc-300', 'bg-zinc-100 text-zinc-700')}`}>PermissionRequest</code> 时，它把当前请求压缩成 Touch Bar 上的一行上下文和几个可点击动作。
          </p>
          <p>
            它不替代 Claude Code 的主 TUI，也不试图把权限判断自动化。它只是把 agentic coding 中反复出现的小确认搬到第二块更近的交互表面上：读文件、允许编辑、拒绝命令、回到屏幕里 review。
          </p>
          <blockquote className={`border-l pl-5 font-display text-[1rem] leading-relaxed transition-colors duration-700 ${theme('border-zinc-700 text-zinc-200', 'border-zinc-300 text-zinc-800')}`}>
            Touch Bar 能否成为 AI coding agent 的低注意力权限确认界面，并在降低交互摩擦的同时维持安全意识？
          </blockquote>
        </Section>

        <Section id="interface" title="Touch Bar UI" isDark={isDark}>
          <p>
            UI 被压到四个小组件：<span className={`font-mono ${theme('text-zinc-300', 'text-zinc-700')}`}>[Context] [Action 1] [Action 2] [Action 3]</span>。第一个 item 只显示当前请求摘要，不是按钮，目的是让用户在触摸前仍然知道自己正在批准什么。
          </p>
          <figure className={`border-y py-5 transition-colors duration-700 ${theme('border-zinc-800', 'border-zinc-200')}`}>
            <div className="overflow-hidden rounded-md">
              <img
                src="/b611e3985a7e28de3ef4d3c1bbe31fe8.png"
                alt="Claude Code Touch Bar permission request showing Edit TODO.md with Yes, All edits, and No actions"
                className="h-12 w-full object-cover object-left sm:h-[60px]"
                loading="lazy"
              />
            </div>
            <figcaption className={`mt-3 font-display text-[0.72rem] uppercase tracking-[0.18em] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
              Real Touch Bar capture · Edit TODO.md
            </figcaption>
          </figure>
          <p>
            长路径、Bash 命令和文件操作会被压缩成短摘要。Touch Bar 不适合承载完整 diff 或长命令，它只负责给用户一个足够做低风险判断的上下文切片。
          </p>
        </Section>

        <Section id="features" title="Features" isDark={isDark}>
          <div>
            <FeatureRow
              isDark={isDark}
              title="Structured hook flow"
              desc="通过 Claude Code hook 输出结构化 decision，返回 allow、deny 和 updatedPermissions，而不是模拟键盘输入。"
            />
            <FeatureRow
              isDark={isDark}
              title="Touch Bar native rhythm"
              desc="BetterTouchTool 提供一个 context widget 和三个 action widget，保持 Touch Bar 上信息密度足够低。"
            />
            <FeatureRow
              isDark={isDark}
              title="Session actions"
              desc="对 Read 和编辑建议支持 Yes all session / All edits，把重复批准压到一次触摸里。"
            />
            <FeatureRow
              isDark={isDark}
              title="Verified permission loop"
              desc="已验证真实 PermissionRequest 的 Yes / No 闭环，以及 create / edit 请求中的 session-scoped edit permission。"
            />
            <FeatureRow
              isDark={isDark}
              title="Risk-aware actions"
              desc="高风险删除或 shell 命令不会直接给批准入口，只保留 Review / No，让危险操作回到主界面。"
            />
            <FeatureRow
              isDark={isDark}
              title="Glanceable summaries"
              desc="长路径和 Bash 命令会被压缩成短标签，Touch Bar 只承担该承担的那一点上下文。"
            />
          </div>
        </Section>

        <Section id="flow" title="Flow" isDark={isDark}>
          <div className={`border-b transition-colors duration-700 ${theme('border-zinc-800', 'border-zinc-200')}`}>
            <FlowLine
              isDark={isDark}
              label="PermissionRequest"
              desc="Claude Code 触发权限请求，hook 接管这一轮决策前的状态写入。"
            />
            <FlowLine
              isDark={isDark}
              label="touchbar_hook.py"
              desc="项目本地 hook 把请求转成 state.json，并等待 Touch Bar action 写回 response，最多等待 20 秒。"
            />
            <FlowLine
              isDark={isDark}
              label="BetterTouchTool"
              desc="四个 Shell Script / Task widgets 读取状态、展示上下文、把点击动作交给脚本。"
            />
            <FlowLine
              isDark={isDark}
              label="btt_action.py"
              desc="动作脚本写入 responses/<request_id>.json，hook 再把它翻译成 Claude Code 能识别的结构化结果。"
            />
            <FlowLine
              isDark={isDark}
              label="decision"
              desc="hook 返回 allow、deny 或 updatedPermissions；All edits 只在 Claude Code 提供 acceptEdits session suggestion 时显示。"
            />
          </div>
        </Section>

        <Section id="safety" title="Safety" isDark={isDark}>
          <p>
            这个项目的安全模型很克制：Touch Bar 是 companion interface，不是自动批准器。高风险或未知风险请求不能直接 approve，Review 也只是把决策交还给 Claude Code 的屏幕权限流。
          </p>
          <div>
            <FeatureRow
              isDark={isDark}
              title="Low"
              desc="普通 Read 和常规低风险 Bash 请求，可以显示 Yes / Yes all session / No。"
            />
            <FeatureRow
              isDark={isDark}
              title="Medium"
              desc="Write、Edit、MultiEdit，以及项目内明确单文件 rm，显示 Yes / No / Review 或 Yes / All edits / No。"
            />
            <FeatureRow
              isDark={isDark}
              title="High"
              desc="sudo、rm -rf、递归删除、通配符删除、项目外删除、chmod -R、chown -R、curl | sh、wget | sh、系统目录或 ~/.ssh 相关操作，只显示 Review / No。"
            />
            <FeatureRow
              isDark={isDark}
              title="Unknown"
              desc="无法判断风险时不允许直接批准，把不确定性留在主界面里处理。"
            />
          </div>
          <p>
            所有运行态数据都放在 <code className={`rounded px-1 py-0.5 font-mono text-[0.88em] ${theme('bg-zinc-800 text-zinc-300', 'bg-zinc-100 text-zinc-700')}`}>~/.claude-touchbar/</code>，状态文件原子写入，每个请求都有新的 request id。日志会避开 prompts、assistant messages 和文件内容，尽量只记录动作本身。
          </p>
        </Section>

        <Section id="scope" title="Scope" isDark={isDark}>
          <p>
            这个 MVP 有意避开了一些诱人的方向：不解析完整终端 TUI，不做 OCR 或像素识别，不做 diff viewer 内部导航，也不控制 <code className={`rounded px-1 py-0.5 font-mono text-[0.88em] ${theme('bg-zinc-800 text-zinc-300', 'bg-zinc-100 text-zinc-700')}`}>/config</code>、<code className={`rounded px-1 py-0.5 font-mono text-[0.88em] ${theme('bg-zinc-800 text-zinc-300', 'bg-zinc-100 text-zinc-700')}`}>/permissions</code> 这类内部菜单。
          </p>
          <p>
            它也不监听 autocomplete、<code className={`rounded px-1 py-0.5 font-mono text-[0.88em] ${theme('bg-zinc-800 text-zinc-300', 'bg-zinc-100 text-zinc-700')}`}>@</code> mention 或逐字输入，不支持多 session，不做键盘注入控制，也暂时不做原生 Swift / AppKit helper 和公开分发安装包。
          </p>
          <p>
            这些不是缺失功能，而是边界。项目把问题收窄到一个可验证的地方：真实 permission hook 能否通过一块低注意力硬件完成可靠决策。
          </p>
        </Section>

        <Section id="reflection" title="Reflection" isDark={isDark}>
          <p>
            很有幸在2025初在朋友那里拿到了一台全新未拆封的 MacBook Pro M1 2020，也因此有了这个项目的诞生。Touch Bar 是一个被时代淘汰的硬件，但它的设计初衷和交互特性在某些场景下是非常独特和有价值的。
          </p>
          <p>
            大家都觉得 Touch Bar不好用，但它其实是个很棒的低注意力交互表面：它比屏幕更近、更快、更容易触达，而且不需要切换窗口或上下文。对于一些频繁出现但又不需要太多信息的决策，Touch Bar 可以提供一个非常便捷的交互方式。
          </p>
          <p>
            很多人现在使用 Claude Code，都会直接打开 bypass permission 模式，库库一顿操作，确实很爽。开发者把自己从具体执行里抽离出来，把意图交给 agent，让代码像水一样往前流。
          </p>
          <p>
            但我总觉得，这种感觉背后其实藏着一个很有意思的产品问题：当 AI agent 越来越像一个可以自主行动的合作者时，我们到底应该在什么时候介入？哪些操作应该被快速允许，哪些操作应该被认真看一眼，哪些操作应该被明确拒绝？权限确认本身也许很烦，但“可控感”依然是 agentic coding 里非常重要的一部分。
          </p>
          <p>
            我一直很喜欢 Touch Bar。它有一种很奇妙的气质：它不像键盘那样固定，也不像屏幕那样抢占注意力。它是一条很窄、很安静、但始终贴近身体的界面。很多时候，我甚至觉得它像一块被放错时代的小型驾驶舱面板。它没有等来属于自己的黄金时代，却在 AI coding 这种新的工作流里突然变得合理起来。
          </p>
          <p>
            这也是这个项目最吸引我的地方：一个被时代淘汰的硬件，遇到了一个刚刚兴起的编程范式。Touch Bar 原本想解决的是“上下文操作”的问题，而 Claude Code 带来的恰好是大量上下文相关的微决策。Read 这个文件吗？允许这次 Edit 吗？运行这条 Bash 命令吗？这个请求需要 Review 吗？这些决策都很小，但它们频繁出现，并且会不断打断开发者的注意力。
          </p>
          <p>
            我希望 Claude Code Touch Bar Companion 能表达一种更温和的控制感：AI 可以跑得很快，但人依然可以用很低的成本参与关键节点。速度和控制并不一定要彼此牺牲。好的交互应该让人既保持心流，也保留判断权。
          </p>
        </Section>

        <div className={`border-t pt-8 transition-colors duration-700 ${theme('border-zinc-800', 'border-zinc-200')}`}>
          <a
            href="https://github.com/CarsonLLuo/Claude-Code-Touch-Bar-Companion"
            target="_blank"
            rel="noreferrer"
            className={`font-display text-[0.82rem] uppercase tracking-[0.18em] transition-colors duration-200 ${theme('text-zinc-500 hover:text-zinc-200', 'text-zinc-400 hover:text-zinc-800')}`}
          >
            View on GitHub ↗
          </a>
        </div>

      </article>
    </ProjectLayout>
  );
}
