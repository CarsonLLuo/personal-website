# CLAUDE.md

## Project

Vite + React 19 + Tailwind CSS v4 个人网站。单页应用，hash 路由，无后端。

## Stack

- React 19, JSX
- Tailwind CSS v4 (via @tailwindcss/vite plugin)
- Vite 7
- 无 TypeScript, 无 CSS-in-JS, 无路由库

## Vibe

这个网站不是标准 portfolio。它是 Carson 的个人场域。

风格：深色底 editorial tech。克制、安静、有锋面、有留白。
核心意象：时间感——过去的痕迹与未来的牵引共存。
气质：研究感、编辑感、夜晚的观察气息。冷静、清醒、具体，保留个人温度。

写代码时，视觉表达要和这个气质一致：
- 偏好留白和节奏，不堆砌视觉元素
- 动画克制，只在有明确目的时使用
- 排版优先，颜色收敛，对比度清晰
- 暗色模式是主基调，亮色模式是补充

## Code Rules

1. **先说为什么，再写代码。** 每次添加或修改代码前，先用一两句话解释为什么这样做是合理的。不要过度思考，不要罗列大段分析。
2. **直接行动。** 不要反复纠结方案选择，选最简洁的做法，做完让用户看效果。
3. **不要过度工程。** 不加多余抽象、不提前优化、不写用不上的代码。
4. **保持现有风格。** 遵循项目里已有的命名、文件结构和代码组织方式。
5. **Tailwind 优先。** 样式用 Tailwind utility class。只在 Tailwind 无法表达时写自定义 CSS（放在 index.css 的 @layer components 中）。
6. **组件保持简单。** 每个组件做一件事。props 传 isDark 控制主题，用 pickTheme() 辅助。

## File Structure

```
src/
  App.jsx              — 根组件，路由和全局状态
  main.jsx             — 入口
  index.css            — 全局样式和自定义 CSS 类
  constants/site.js    — 视图常量
  lib/theme.js         — 主题工具函数
  data/siteContent.js  — 所有内容数据
  hooks/               — 自定义 hooks
  components/
    common/            — 复用组件 (ProjectCard, NoteListItem, etc.)
    layout/            — 布局组件 (SiteNavigation)
    views/             — 页面视图 (HomeView, ProjectsView, etc.)
    home/              — 首页专用组件
    effects/           — 视觉效果组件 (FilmGrain, HeroScene)
```

## Commands

- `npm run dev` — 启动开发服务器
- `npm run build` — 生产构建
- `npm run preview` — 预览构建结果
