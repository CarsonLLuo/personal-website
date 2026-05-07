import { pickTheme } from '../../lib/theme.js';
import ProjectLayout from './ProjectLayout.jsx';

const META = [
  { label: 'Type',     value: 'Research' },
  { label: 'Year',     value: '2025' },
  { label: 'Role',     value: 'Researcher / Designer' },
  { label: 'Duration', value: '3 months' },
  { label: 'Tools',    value: 'Python · SPSS · MAIC' },
];

const SECTIONS = [
  { id: 'overview',    label: '研究概述' },
  { id: 'background',  label: '研究背景' },
  { id: 'design',      label: '研究设计' },
  { id: 'findings',    label: '研究发现' },
  { id: 'discussion',  label: '结论与展望' },
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

export default function TestResearchProject({ isDark }) {
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
              「心安之隅」与「屏中之偶」：生成式人工智能的教学效能与实践边界研究
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

        <Section id="overview" title="研究概述" isDark={isDark}>
          <p>
            本研究以吉林省某高中为实验场域，探究将课堂主讲型生成式人工智能（GAI）教学系统引入中学课堂的可行性与效能边界。实验以班级为单位开展准实验设计，实验组由 MAIC（全人工智能守护课堂）系统授课，对照组由真人教师授课，历时约两个月。
          </p>
          <p>
            研究采用量化统计与质性访谈相结合的混合方法，围绕学业表现、自我效能感、自我调节学习能力三个维度评估干预效果，并通过深度访谈提炼 GAI 课堂的质性特征。
          </p>
        </Section>

        <Section id="background" title="研究背景" isDark={isDark}>
          <p>
            生成式人工智能正在引发教育的深层变革。然而，技术普及不必然转化为教育普惠——在缺乏有效引导的技术环境中，教育资源更容易被高认知水平、高自主学习能力的学生所利用，弱势学习者往往在庞杂的信息与开放的操作环境中感到迷茫。
          </p>
          <p>
            目前，GAI 在教学中的实践场景呈现出"课后辅助为主，课堂主讲为辅"的格局。相比课后辅助型系统，能够独立承担知识传授、课堂互动、教学评估等核心教学环节的课堂主讲型 GAI 系统研究较为稀缺，尤其在基础教育阶段更是几乎空白。
          </p>
          <p>
            本研究希望填补这一空白：将 GAI 教学系统引入实体教室，构建"教师设计管理、GAI 系统施教"的课堂形态，并系统评估其对不同类型学习者的学业影响。
          </p>
        </Section>

        <Section id="design" title="研究设计" isDark={isDark}>
          <p>
            研究在高二年级信息技术课程（学考复习）中开展，实验组（1–5 班，约 198 人）由 MAIC 系统授课，对照组（6–10 班）由真人教师授课，两组课件与习题内容完全一致。数据采集周期为 2025 年 9 月至 11 月。
          </p>
          <p>
            <strong className={theme('text-zinc-200', 'text-zinc-800')}>量化测量</strong>方面，以前后测成绩差值（成绩增益）作为主要因变量，并通过已有量表测量自我调节学习与自我效能感，将低于均值者划入低组，考察干预效果的群体异质性。
          </p>
          <p>
            <strong className={theme('text-zinc-200', 'text-zinc-800')}>质性访谈</strong>方面，分两轮（初访 + 追访）开展深度访谈，对逐字稿进行开放编码与轴心编码，提炼 GAI 课堂的核心体验特征。
          </p>
        </Section>

        <Section id="findings" title="研究发现" isDark={isDark}>
          <p>
            量化结果显示，实验组在基线上显著弱于对照组（前测均值 47.4 vs 51.9），但在干预结束时后测成绩与对照组基本持平（73.2 vs 74.3，差异不显著）。以成绩增益衡量，实验组优势显著，且这一优势集中在低自我调节学习与低自我效能感群体中——即 GAI 课堂对弱势学习者的提升效应更大。
          </p>
          <p>
            质性访谈提炼出三个核心体验特征：
          </p>
          <p>
            <strong className={theme('text-zinc-200', 'text-zinc-800')}>心安之隅</strong>——GAI 课堂构建出具有私密性的学习场域，消解了弱势学习者怕答错、不敢提问的心理压力。"不用担心老师骂我"、"反正也没人知道你问的什么"，低焦虑的安全区让学生更敢于表达与探索。
          </p>
          <p>
            <strong className={theme('text-zinc-200', 'text-zinc-800')}>自察之梯</strong>——课程目录、倍速调节、字幕功能、随堂测验、课程回看等设计，为弱势学习者搭建了一套自我管理支架，帮助其在交互反馈中建立学习节奏。
          </p>
          <p>
            <strong className={theme('text-zinc-200', 'text-zinc-800')}>屏中之偶</strong>——尽管效果得到肯定，学生也指出 GAI 系统在情感联结与感染力方面存在短板：缺乏眼神交流与肢体互动，比喻有时"奇奇怪怪"，整体感觉"冷冰冰"。
          </p>
        </Section>

        <Section id="discussion" title="结论与展望" isDark={isDark}>
          <p>
            本研究证实了以 GAI 系统为主教学者、教师仅作设计和管理的课堂在数周时间内是可行的，且没有拉大学生群体间的学业差距，反而对弱势学习者呈现出更显著的提升效应。
          </p>
          <p>
            然而研究结论是审慎的：在控制前测基线差异后，组别效应不再显著，表明组间初始差异对结果有一定影响。GAI 课堂在原始比较中呈现优势，但尚不能排除基线因素的作用。
          </p>
          <p>
            未来的实践方向在于深化人机协同：GAI 系统继续发挥个性化教学与促进自主学习的长处，教师则在课堂中承担更多情感支持、深度引导与协作讨论的职能——让"心安之隅"与"自察之梯"持续发挥作用，同时弥补"屏中之偶"的情感短板。
          </p>
        </Section>

      </article>
    </ProjectLayout>
  );
}
