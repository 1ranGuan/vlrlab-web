# AGENTS.md

本仓库是 VLR 实验室网站（Astro 6 静态站）。给 AI agent（Codex、Claude Code，或任何能读写文件、跑 shell 的 agent）的说明。

## 这个仓库怎么加内容

**加内容 = 加一个 Markdown 文件（+ 可选图片），不用改代码。** 字段由 `src/content.config.ts` 用 Zod 在构建时校验，`npm run check` 会报出精确错误。人工模板见 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)。

## 两类 AI 辅助贡献任务

用户常让你做这两件事——完整分步手册在 [`docs/agent/`](./docs/agent/)，请打开对应文件严格照做：

| 任务 | 手册 |
|---|---|
| 把某人的照片 + 姓名加到「实验室人员」页 | [`docs/agent/add-member.md`](./docs/agent/add-member.md) |
| 把 Word / Markdown / PDF / 公众号链接发成「实验室新闻」 | [`docs/agent/publish-news.md`](./docs/agent/publish-news.md) |

两个流程共用的**校验 → Git → PR 收尾流程**和通用约束（枚举、图片路径、日期格式等）见 [`docs/agent/README.md`](./docs/agent/README.md)。`.docx` 解析用 `python3 docs/agent/scripts/docx_to_text.py <文件>`（纯标准库）。

## 常用命令

```bash
npm install      # 首次；Node 20+
npm run dev      # 本地预览 http://localhost:4321
npm run check    # astro check：类型 + 内容 schema 校验（提交前必跑）
npm run build    # 生产构建 → dist/
```

## 硬性约束（否则构建失败）

- 成员 `role` 精确七选一：`教授 / 博后 / 博士生 / 硕士生 / 毕业生 / 实验室助理 / 以往成员`。
- 新闻 `category` 精确三选一：`大新闻 / 实验室动态 / 学术报告`。
- 图片必须真实存在于 `src/assets/<类型>/`，用相对路径引用（如 `../../assets/team/张三.jpg`）。
- 日期用 `YYYY-MM-DD`。文件名用英文/拼音 + 连字符；`_` 开头或 `draft: true` 会被忽略。
- 不要改动 `src/components/**`、`src/data/*.ts`、`src/content.config.ts` 等结构/代码文件来完成"加内容"任务。
