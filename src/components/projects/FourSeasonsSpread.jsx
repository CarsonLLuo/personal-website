import { pickTheme } from '../../lib/theme.js';
import ProjectLayout from './ProjectLayout.jsx';

const META = [
  { label: 'Type',     value: 'Vibe Coding' },
  { label: 'Year',     value: '2025' },
  { label: 'Role',     value: 'Designer / Developer' },
  { label: 'Stack',    value: 'HTML · CSS · JavaScript' },
  { label: 'Status',   value: 'Live' },
];

const SECTIONS = [
  { id: 'overview',  label: 'Overview' },
  { id: 'features',  label: 'Features' },
  { id: 'design',    label: 'Design' },
  { id: 'tech',      label: 'Tech' },
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

export default function FourSeasonsSpread({ isDark }) {
  const theme = pickTheme(isDark);

  return (
    <ProjectLayout sections={SECTIONS} isDark={isDark}>
      <article className="space-y-10">

        <header className="space-y-8">
          <div>
            <p className={`mb-3 font-display text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
              Product · Vibe Coding
            </p>
            <h1 className={`font-display text-2xl leading-snug transition-colors duration-700 ${theme('text-zinc-100', 'text-zinc-900')}`}>
              四季牌阵 Tarot
            </h1>
            <p className={`mt-3 text-[1rem] leading-relaxed transition-colors duration-700 ${theme('text-zinc-400', 'text-zinc-500')}`}>
              日常与四季牌阵的塔罗抽取，纯前端实现，星空与金色美学。
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
            四季牌阵是一个纯前端的塔罗牌占卜 Web 应用，带有星空粒子动效与金色配色美学。它不依赖任何后端，所有逻辑在浏览器内完成。
          </p>
          <p>
            这是一次 Vibe Coding 实验——从一个模糊的感受出发，用代码把它变成一个可以触碰的东西。项目本身是轻的，但它背后的意图是认真的：把占卜这件事做得安静、漂亮、有仪式感。
          </p>
        </Section>

        <Section id="features" title="Features" isDark={isDark}>
          <div>
            <FeatureRow
              isDark={isDark}
              title="四季牌阵"
              desc="五步引导式牌阵，将大阿卡纳牌与春、夏、秋、冬四个季节意象一一配对，提供系统性的年度洞察。"
            />
            <FeatureRow
              isDark={isDark}
              title="每日一牌"
              desc="单张日常抽牌，附关键词解读与当日指引，适合作为每天的小停顿。"
            />
            <FeatureRow
              isDark={isDark}
              title="完整 78 张牌库"
              desc="大阿卡纳 22 张 + 小阿卡纳 56 张（权杖、圣杯、宝剑、星币各 14 张），支持正逆位解读。"
            />
            <FeatureRow
              isDark={isDark}
              title="Canvas 星空动效"
              desc="用 Canvas API 实现的动态粒子星空背景，加浮动光点效果，营造沉浸式氛围。"
            />
          </div>
        </Section>

        <Section id="design" title="Design" isDark={isDark}>
          <p>
            视觉上选择星空 + 金色的组合，是为了把「神秘」和「克制」放在一起。大量暗色背景配合金色文字与边框，让牌面本身成为画面的主角。
          </p>
          <p>
            字体使用 Cinzel（标题）与 Noto Serif SC（中文正文）的组合，前者带有古典的仪式感，后者保证中文的可读性与排版稳定性。两者搭配在一起，意外地合适。
          </p>
          <p>
            整体是静默的——没有跳出的提示框，没有强制引导。用户按自己的节奏来，抽牌、解读、离开。
          </p>
        </Section>

        <Section id="tech" title="Tech" isDark={isDark}>
          <p>
            纯原生技术栈：HTML + CSS + JavaScript ES Modules，Tailwind CSS 通过 CDN 引入，无构建工具依赖。整个项目是一个静态站点，用任意 HTTP 服务器即可运行。
          </p>
          <p>
            牌库数据以 JSON 形式存放在 <code className={`rounded px-1 py-0.5 font-mono text-[0.88em] ${theme('bg-zinc-800 text-zinc-300', 'bg-zinc-100 text-zinc-700')}`}>data/</code> 目录，JS 模块按职责拆分（牌组逻辑、动效、UI 交互），Python 脚本用于初始化数据处理。
          </p>
        </Section>

        <Section id="reflection" title="Reflection" isDark={isDark}>
          <p>
            这个项目用了Frontend-Design的Skill，只用了一句提示词就生成了一版初稿，之后的工作主要是调整细节、优化交互、丰富内容。它证明了 Vibe Coding 的一个核心理念：先有感觉，再用代码实现它。
          </p>
          <p>
            Vibe Coding 的本质是先有一种很confused的感觉，然后用LLM来把这种confusion不断具体化，最后变成一个可以触碰的东西。这个过程可能会很乱，但它的结果往往是意想不到的。
          </p>
          <p>
            嗯我想，塔罗本身是关于解读与投射的。一个把这件事做得安静的工具，是这个项目最想成为的东西。
          </p>
        </Section>

        <div className={`border-t pt-8 transition-colors duration-700 ${theme('border-zinc-800', 'border-zinc-200')}`}>
          <a
            href="https://github.com/CarsonLLuo/FourSeasonsSpread"
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
