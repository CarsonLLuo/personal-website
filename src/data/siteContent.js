export const heroFragments = [
  // 时间与锚点
  '2023.09', 
  '2024.03.17', 
  '2025.??', 
  '二〇二三年秋',
  '4:00 AM',

  // 带有隐喻的代码/系统词汇
  'async function()', 
  'memory.clear()', 
  'temperature: 0.8', 
  '.then(resolve =>', 
  '// TODO',
  'loss.backward()',
  'attention_mask',

  // 中文呓语
  '记得那天下午', 
  '还没想好', 
  '未完成', 
  '为什么', 
  '那时候以为',
  '我不行',
  '我做不到',
  '我好笨',

  // 英文思绪
  'what if the model', 
  'not yet', 
  'unresolved', 
  'somewhere between', 
  'why does it', 
  'is this enough', 
  'what comes after', 
  'trace',
  'ghost in the telemetry',
  '...'
];

export const heroContent = {
  headingLead: '永远沉溺于',
  headingPast: '过去',
  headingConnector: '和',
  headingFuture: '未来',
  headingPunctuation: '。',
  identityLines: ['programmer, researcher,', 'writer, thinker.'],
  identityTagline: ['Somewhere between systems', '& human experience.'],
};

export const homeContent = {
  fragmentLabel: 'Fragment / present tense',
  intro:
    "We spend so much time building interfaces to reduce friction, forgetting that friction is where texture lives. Lately, I've been thinking about the ghosts in our telemetry-not the data we capture, but the hesitations, the backspaces, the human residue left behind in the spaces between inputs.",
  statementLines: [
    "I write code the way some people write letters - trying to say something precise to someone I haven't met.",
    'I research the way some people grieve - going back, again and again, to the same unresolved thing.',
    "Somewhere between building systems and understanding people, I keep making work that doesn't quite belong to either.",
  ],
};

export const aboutContent = {
  intro: [
    '你好，我是 Carson，也可以叫我小罗。这个页面写的是一些更慢、更个人的事实：我做什么、我为什么做、我现在站在什么时间点。',
    '我曾经很依赖酒精和咖啡因带来的速度感，后来被医生按下暂停键。现在我更在意长期的清醒、稳定的专注，以及那些能在深夜里留下痕迹的工作。',
    '很多时候，我会把自己放在过去和未来之间。写代码、做研究、记录生活，本质上都在回答同一个问题：人如何在系统里保持自己。',
  ],
  leftColumnSections: [
    {
      title: 'Education',
      type: 'timeline',
      items: [
        {
          title: 'Oxford Brookes University & 二仙桥恐龙大学',
          meta: 'BSc (Hons) Software Engineering · First Class Honours',
          period: '2021-2025 · 总成绩 72.125/100',
        },
        {
          title: 'KTH Royal Institute of Technology',
          meta: 'Interactive Media Technology',
          period: '2026-2028',
        },
      ],
    },
    {
      title: 'Internship',
      type: 'timeline',
      items: [
        {
          title: 'ModelBest × 清华大学教育学院 MAIC 团队',
          meta: 'Massive AI-empowered Course · 实习生',
          period: '聚焦教师一线研究、课堂参与度评估与 AI 功能落地',
        },
      ],
    },
    {
      title: 'Right Now',
      type: 'paragraph',
      content:
        '在北京实习中。继续学习、记录，也继续享受 Vibe Coding 带来的眩晕感。',
    },
  ],
  rightColumnSections: [
    {
      title: 'Skills & Tools',
      type: 'group-list',
      groups: [
        {
          label: 'Programming',
          items: ['Python', 'JavaScript / TypeScript', 'Java', 'C++', 'Dart', 'SQL / Redis'],
        },
        {
          label: 'AI / ML',
          items: ['PyTorch / TensorFlow', 'XGBoost / SVM', 'Transformer', 'SHAP / LIME', 'Prompt Engineering'],
        },
        {
          label: 'Product & Design',
          items: ['React / Next.js', 'Tailwind CSS', 'Flutter', 'Figma / Axure', 'KANO / SWOT'],
        },
      ],
    },
    {
      title: 'Interests',
      type: 'bullet-list',
      items: [
        'F1 车迷，偏爱 Papaya。',
        '拜仁慕尼黑与成都蓉城的长期支持者。',
        '独立摇滚 / 后摇 / shoegaze，也在尝试创造自己的声音。',
      ],
    },
    {
      title: 'Motto',
      type: 'paragraph',
      content: 'Cogito, ergo sum. / 我思故我在。',
    },
  ],
  links: [
    { label: 'Email', link: '#', icon: '↗' },
    { label: 'GitHub', link: '#', icon: '↗' },
    { label: 'X / Twitter', link: '#', icon: '↗' },
    { label: 'Resume', link: '#', icon: '↓' },
  ],
};
