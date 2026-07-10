---
name: publish-news
description: 把一篇来源文档（Word/.docx、Markdown、PDF、或微信公众号链接）解析后，发表为 VLR 实验室网站的「新闻」，并自动开 PR。当用户想“发布新闻/发实验室新闻/把这个 Word 文档发成新闻/把这篇 PDF 发成新闻/把这个公众号链接发成新闻/publish lab news/turn this article into a news post/from a WeChat (mp.weixin.qq.com) article”时使用。
---

# 发布实验室新闻

本技能的完整操作步骤见仓库内的 harness 无关手册：

- 流程：[`docs/agent/publish-news.md`](../../../docs/agent/publish-news.md)
- 共享的「校验 → Git → PR」收尾流程与通用约束：[`docs/agent/README.md`](../../../docs/agent/README.md)

请打开并严格按该手册执行：按来源类型解析出标题+正文（`.docx` 用 `python3 docs/agent/scripts/docx_to_text.py`，PDF 用 Read，公众号链接用 WebFetch）→ 归纳 `title`/`date`/`category`（精确三选一）→ 下载封面图到 `src/assets/news/` → 在 `src/content/news/` 写 `<slug>.md` → `npm run check` → 建分支、commit、push、开 PR。
