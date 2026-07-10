# 手册：发布一条实验室新闻

目标：把一篇来源文档（Word / Markdown / PDF / 微信公众号链接）解析后，发表为「实验室新闻」。新闻会自动出现在 `/news` 列表、对应分类页，以及（若有封面图）首页新闻轮播。

> 落点：Markdown → `src/content/news/<slug>.md`；封面图 → `src/assets/news/<slug>.<ext>`。
> 收尾（校验 / Git / PR）见 [README.md](./README.md) 的「共享收尾流程」。

## 步骤

### 1. 按输入源解析出「标题 + 正文（Markdown）+ 候选封面图」

根据用户给的来源，选对应方式：

- **微信公众号 / 网页链接**（`mp.weixin.qq.com` 等）：用当前 harness 的网页抓取能力取正文与标题。
  - Claude Code：用 `WebFetch`（或 tavily 的 extract）。
  - 其它 harness：用其等价的"抓取网页并转 Markdown"能力。
  - 记录文章首图的图片 URL，作为封面候选。同时保留原文链接备用（见第 3 步 `external`）。

- **PDF**：用 harness 的 PDF 读取能力提取文本。Claude Code 的 `Read` 工具可直接读 PDF。

- **Word `.docx`**：跑本目录的脚本（纯标准库，无需 pandoc）：
  ```bash
  python3 docs/agent/scripts/docx_to_text.py <路径/文件.docx>
  ```
  它把正文按段落打印为纯文本。若是老的 `.doc`（非 `.docx`）解析不了，提示用户在 Word 里另存为 `.docx` / `.md` / PDF 后重试。

- **Markdown / 纯文本文件**：直接读文件内容。

把解析结果整理成：一个**标题**、一段段清晰的**正文 Markdown**。

### 2. 归纳 frontmatter 字段

- `title`（必填）：取文档标题。
- `date`（必填，`YYYY-MM-DD`）：新闻日期。默认取今天；用户指定了就用用户的。
- `category`（必填，**精确三选一**）：`大新闻` / `实验室动态` / `学术报告`。无法判断时向用户确认，别猜。
- `excerpt`（可选）：从正文摘一两句作为列表摘要。
- `external`（可选）：若来源是公众号/外部文章且希望"点击跳原文"，填原文 URL。

### 3. 封面图入库

- 从来源提取首图（公众号首图 URL、或文档里的第一张图），下载到 `src/assets/news/`，命名为 `<slug>.jpg`（slug 见下）：
  ```bash
  curl -L -o src/assets/news/<slug>.jpg "<图片URL>"
  ```
  （若在代理后下载失败，可先 `proxy_on`。）
- 下载成功 → 在 frontmatter 写 `cover: ../../assets/news/<slug>.jpg` 和 `showInSlider: true`（进首页图片轮播）。
- **下载失败或来源无图 → 跳过 `cover`/`showInSlider`，不要阻断整个流程**（新闻仍可发，只是不进图片轮播）。

### 4. 写内容文件

在 `src/content/news/` 新建 `<slug>.md`。slug 用英文/拼音 + 连字符，最好带日期/主题，如 `2026-neurips-accept.md`、`2026-african-ocr-forum.md`。模板：

```markdown
---
title: 团队论文被 NeurIPS 2026 接收
date: 2026-07-10
category: 大新闻
excerpt: 近日，团队关于……的论文被 NeurIPS 2026 接收。
cover: ../../assets/news/2026-neurips-accept.jpg   # 有封面才写
showInSlider: true                                  # 有封面才写
external: https://mp.weixin.qq.com/s/xxxx           # 外链原文才写
---

这里放解析出来的新闻正文（Markdown 全文）。
```

只写实际有的字段，其余整行删除。正文放第 1 步解析出的 Markdown。

### 5. 收尾

按 [README.md](./README.md) 的「共享收尾流程」执行：`npm run check` → 建分支 `content/news-<slug>` → commit（`内容：发布新闻 <title>`）→ push → 开 PR。

渲染确认（可选，本地）：`npm run dev` 后看 `http://localhost:4321/news`，以及详情页 `http://localhost:4321/news/post/<slug>`（`external` 新闻不生成详情页，点击直接跳原文）。
