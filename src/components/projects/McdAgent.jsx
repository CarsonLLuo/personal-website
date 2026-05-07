import { pickTheme } from '../../lib/theme.js';
import ProjectLayout from './ProjectLayout.jsx';

const META = [
  { label: 'Type',     value: 'Product' },
  { label: 'Year',     value: '2025' },
  { label: 'Role',     value: 'Developer' },
  { label: 'Stack',    value: 'Electron · React · TypeScript · Python' },
  { label: 'Status',   value: 'Live' },
];

const SECTIONS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'features',   label: 'Features' },
  { id: 'arch',       label: 'Architecture' },
  { id: 'tech',       label: 'Tech' },
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

export default function McdAgent({ isDark }) {
  const theme = pickTheme(isDark);

  return (
    <ProjectLayout sections={SECTIONS} isDark={isDark}>
      <article className="space-y-10">

        <header className="space-y-8">
          <div>
            <p className={`mb-3 font-display text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
              Product · AI Agent
            </p>
            <h1 className={`font-display text-2xl leading-snug transition-colors duration-700 ${theme('text-zinc-100', 'text-zinc-900')}`}>
              McDonald's Ordering Agent
            </h1>
            <p className={`mt-3 text-[1rem] leading-relaxed transition-colors duration-700 ${theme('text-zinc-400', 'text-zinc-500')}`}>
              调用麦当劳中国 MCP 开发的 AI 点餐 Desktop Agent。
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
            这是一个 macOS 桌面应用，通过调用麦当劳中国官方 MCP（Model Context Protocol）服务，提供一个对话式的优惠券与促销管理界面。
          </p>
          <p>
            用户可以用自然语言询问当前有哪些优惠、一键领取券包、查看钱包余量，以及浏览当月营销日历。背后是一个连接 MCP Server 的 AI Agent，真实调用麦当劳的 API，不是 Mock。
          </p>
        </Section>

        <Section id="features" title="Features" isDark={isDark}>
          <div>
            <FeatureRow
              isDark={isDark}
              title="对话式查询"
              desc="用自然语言直接问「现在有什么优惠」，Agent 实时拉取麦当劳 MCP 数据并返回结构化结果。"
            />
            <FeatureRow
              isDark={isDark}
              title="一键领券"
              desc="发现优惠券后可直接在界面内领取到账户，全流程无需跳转 App。"
            />
            <FeatureRow
              isDark={isDark}
              title="钱包管理"
              desc="实时查看已领取的券包余量与有效期，不遗漏任何快到期的优惠。"
            />
            <FeatureRow
              isDark={isDark}
              title="营销日历"
              desc="浏览月度促销计划，提前安排点餐时机。"
            />
            <FeatureRow
              isDark={isDark}
              title="完整 MCP 工具集成"
              desc="覆盖点餐、门店查询、历史订单、积分商城、营养数据等全量 MCP 工具，能力上限由 MCP 服务决定。"
            />
          </div>
        </Section>

        <Section id="arch" title="Architecture" isDark={isDark}>
          <p>
            应用分三层：Electron 壳负责桌面集成与原生系统调用，React + TypeScript 前端（位于 <code className={`rounded px-1 py-0.5 font-mono text-[0.88em] ${theme('bg-zinc-800 text-zinc-300', 'bg-zinc-100 text-zinc-700')}`}>mcagent-ui/</code>）处理对话界面，Node.js 后端作为 MCP 代理层桥接 AI 模型与麦当劳服务。
          </p>
          <p>
            后端暴露四个核心接口：<code className={`rounded px-1 py-0.5 font-mono text-[0.88em] ${theme('bg-zinc-800 text-zinc-300', 'bg-zinc-100 text-zinc-700')}`}>/api/chat</code>（Agent 对话）、<code className={`rounded px-1 py-0.5 font-mono text-[0.88em] ${theme('bg-zinc-800 text-zinc-300', 'bg-zinc-100 text-zinc-700')}`}>/api/tools</code>（MCP 工具列表）、<code className={`rounded px-1 py-0.5 font-mono text-[0.88em] ${theme('bg-zinc-800 text-zinc-300', 'bg-zinc-100 text-zinc-700')}`}>/api/mcp/call</code>（直接调用工具）、<code className={`rounded px-1 py-0.5 font-mono text-[0.88em] ${theme('bg-zinc-800 text-zinc-300', 'bg-zinc-100 text-zinc-700')}`}>/api/health</code>（健康检查）。
          </p>
          <p>
            首次启动时自动生成 <code className={`rounded px-1 py-0.5 font-mono text-[0.88em] ${theme('bg-zinc-800 text-zinc-300', 'bg-zinc-100 text-zinc-700')}`}>.env</code> 配置并安装依赖，做到开箱即用。
          </p>
        </Section>

        <Section id="tech" title="Tech" isDark={isDark}>
          <p>
            前端：React + TypeScript，Electron 封装为桌面应用。后端：Node.js（<code className={`rounded px-1 py-0.5 font-mono text-[0.88em] ${theme('bg-zinc-800 text-zinc-300', 'bg-zinc-100 text-zinc-700')}`}>server.mjs</code>）作为 MCP 代理，Python 负责辅助工具脚本。
          </p>
          <p>
            AI 模型默认接入 AIHubMix，模型为 <code className={`rounded px-1 py-0.5 font-mono text-[0.88em] ${theme('bg-zinc-800 text-zinc-300', 'bg-zinc-100 text-zinc-700')}`}>gemini-3-flash-preview</code>，MCP Server 连接麦当劳中国官方端点 <code className={`rounded px-1 py-0.5 font-mono text-[0.88em] ${theme('bg-zinc-800 text-zinc-300', 'bg-zinc-100 text-zinc-700')}`}>mcp.mcd.cn</code>。
          </p>
        </Section>

        <Section id="reflection" title="Reflection" isDark={isDark}>
          <p>
            这个项目的有趣之处在于「严肃地做了一件荒诞的事」。
          </p>
          <p>
            MCP 是一个值得认真对待的协议，而麦当劳是一个无比日常的场景。
          </p>
          <p>
            更重要的是它验证了一件事：MCP 作为工具调用协议，在 Agent 场景下确实能大幅降低集成成本。从对话到真实 API 调用的链路，比想象中短很多。
          </p>
        </Section>

        <div className={`border-t pt-8 transition-colors duration-700 ${theme('border-zinc-800', 'border-zinc-200')}`}>
          <a
            href="https://github.com/CarsonLLuo/mcd-agent"
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
