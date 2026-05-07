import { pickTheme } from '../../lib/theme.js';
import ProjectLayout from './ProjectLayout.jsx';

const META = [
  { label: 'Type',     value: 'Product' },
  { label: 'Year',     value: '2025.07' },
  { label: 'Role',     value: 'Designer / Developer' },
  { label: 'Stack',    value: 'React · TypeScript · Django · MySQL' },
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

export default function RateMyProfCDUT({ isDark }) {
  const theme = pickTheme(isDark);

  return (
    <ProjectLayout sections={SECTIONS} isDark={isDark}>
      <article className="space-y-10">

        <header className="space-y-8">
          <div>
            <p className={`mb-3 font-display text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
              Product · Community Tool
            </p>
            <h1 className={`font-display text-2xl leading-snug transition-colors duration-700 ${theme('text-zinc-100', 'text-zinc-900')}`}>
              Rate My Prof 4 CDUTZY
            </h1>
            <p className={`mt-3 text-[1rem] leading-relaxed transition-colors duration-700 ${theme('text-zinc-400', 'text-zinc-500')}`}>
              成都理工大学OBU中英特供版教师匿名评分平台。
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
            Rate My Prof 4 CDUTZY 是一个专为成都理工大学（中英合作办学项目 软件工程专业）学生设计的匿名教师评分平台，对标 Rate My Professors，中英双语特供版。
          </p>
        </Section>
        <Section id="features" title="Features" isDark={isDark}>
          <div>
            <FeatureRow
              isDark={isDark}
              title="教师档案"
              desc="集中展示教师学术背景、开设课程与综合评分，一个页面了解一位老师。"
            />
            <FeatureRow
              isDark={isDark}
              title="匿名评价"
              desc="多维度匿名评分（难度 + 质量），附课程标签（严格打分、内容充实等），真实但不具名。"
            />
            <FeatureRow
              isDark={isDark}
              title="搜索与筛选"
              desc="按教师姓名、课程、院系检索，快速定位目标信息。"
            />
            <FeatureRow
              isDark={isDark}
              title="数据可视化"
              desc="平均分、重修率等统计数据可视化展示，帮助学生做出更有根据的选课决策。"
            />
            <FeatureRow
              isDark={isDark}
              title="管理后台"
              desc="完整的 CRUD 管理界面，覆盖教师、评价与用户的全量管理操作。"
            />
          </div>
        </Section>

        <Section id="arch" title="Architecture" isDark={isDark}>
          <p>
            前后端完全分离。Django REST Framework 提供 API 层，JWT 处理认证；React + TypeScript 前端通过接口拉取数据，Material-UI 提供组件基础。MySQL 8.0 作为数据层。
          </p>
          <p>
            教师初始数据通过 <code className={`rounded px-1 py-0.5 font-mono text-[0.88em] ${theme('bg-zinc-800 text-zinc-300', 'bg-zinc-100 text-zinc-700')}`}>teachers_data_final.json</code> 导入，<code className={`rounded px-1 py-0.5 font-mono text-[0.88em] ${theme('bg-zinc-800 text-zinc-300', 'bg-zinc-100 text-zinc-700')}`}>setup_database.py</code> 负责初始化数据库。团队协作时用统一的验证与同步命令保持数据一致性。
          </p>
          <p>
            API 端点按资源划分：教师（含统计聚合）、评价（含「有帮助」标记）、认证（JWT 登录 + 刷新）。
          </p>
        </Section>

        <Section id="tech" title="Tech" isDark={isDark}>
          <p>
            后端：Python 3.9+，Django + Django REST Framework，Simple JWT 认证，MySQL 8.0。
          </p>
          <p>
            前端：Node.js 16+，React + TypeScript，Material-UI。
          </p>
        </Section>

        <Section id="reflection" title="Reflection" isDark={isDark}>
          <p>
            感觉是一个很nerd的项目哈哈哈。
          </p>
          <p>
            这个项目让我第一次完整走完「从需求到全栈落地」的路径。后端 API 设计、数据库建模、前端状态管理、认证流程。
          </p>
          <p>
            对于匿名的话，受到了某小红书博主的启发，其实会更考虑去中心化的方案，即上链。
          </p>  
          <p>
            但是去中心化又该如何保证评论的真实性和相关性呢？这是个有趣的挑战。
          </p>
        </Section>

        <div className={`border-t pt-8 transition-colors duration-700 ${theme('border-zinc-800', 'border-zinc-200')}`}>
          <a
            href="https://github.com/CarsonLLuo/RateMyProf4CDUT-OBU"
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
