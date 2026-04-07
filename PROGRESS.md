# PROGRESS.md

## 当前阶段：Main Page 内容落地

### Phase 1 — Main Page
- [ ] 替换 siteContent.js 中的占位内容为真实内容
- [ ] 确认首页叙事节奏（Hero → Fragment → Statement → Projects → Notes）
- [ ] 调整 Projects / Notes 预览区块的展示数量和排版

### Phase 2 — Archive 列表页
- [ ] ProjectsView 对接真实数据，确认分组和排序
- [ ] NotesView 对接真实数据，确认时间线展示
- [ ] AboutView 替换占位信息

### Phase 3 — 详情页
- [x] 确定内容格式：Project 用 JSX，Notes 用 MDX
- [ ] 设计详情页路由机制（扩展现有 hash 路由）
- [ ] 集成 MDX（用于 Notes）
- [ ] 实现 Project 详情页模板（JSX）
- [ ] 实现 Note 详情页模板（MDX）

### Phase 4 — 收尾
- [ ] 响应式适配检查
- [ ] 亮色模式检查
- [ ] 性能优化（图片、字体加载）
- [ ] 部署
