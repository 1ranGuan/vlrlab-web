# 贡献指南

本站基于 Astro，**加内容 = 加一个 Markdown 文件（+ 图片），无需改代码**。你可以手动改文件（见 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)），也可以让 **AI agent 帮你做**——推荐后者，尤其是发新闻。

## 用 AI agent 贡献（推荐）

任何支持读写仓库文件、能跑 shell 的 AI 编程 agent（Claude Code、Codex 等）都可用。

1. `git clone` 本仓库（用 `git clone`，不要下载 zip，否则无法自动提交/开 PR）。
2. 在仓库目录里打开你的 agent。
3. 直接用自然语言说明需求，例如：
   - **加成员**：「帮我把这张照片和名字（张三，硕士生）加到实验室人员页」
   - **发新闻**：「把这个公众号链接发成一条实验室新闻：https://mp.weixin.qq.com/s/xxxx」
   - 或「把这个 Word / PDF / Markdown 文件发成新闻」

agent 会：解析素材 → 生成内容文件 → 跑 `npm run check` 校验 → 新建分支、提交、推送、开 Pull Request。你 review 合并即可（合并后 Cloudflare 自动部署）。

### agent 遵循的手册

流程写在仓库里，与具体 agent 无关：

- 入口：[`AGENTS.md`](./AGENTS.md)（Codex 等自动读取）、`.claude/skills/`（Claude Code 自动发现）。
- 真源手册：[`docs/agent/`](./docs/agent/) —— [add-member.md](./docs/agent/add-member.md)、[publish-news.md](./docs/agent/publish-news.md)、[README.md](./docs/agent/README.md)（共享的校验/Git/PR 流程）。

## 前置条件

- **Node 20+**（`nvm use`，见 `.nvmrc`）——用于 `npm run check` 校验内容。
- **git**，且已 fork/配好自己的 remote（无写权限时先 fork 再 `git remote add origin <你的fork>`）。
- **GitHub CLI `gh`**（可选）——装了就能全自动开 PR；没装 agent 会给你手动 push 命令和 PR 链接。
- **Python 3**（可选）——仅当你要把 `.docx` Word 文档发成新闻时需要（解析脚本用纯标准库，无需 pandoc）。

## 手动贡献

不想用 agent？照 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) 的模板加文件，然后：

```bash
npm run check
git add -A && git commit -m "内容：新增 XXX"
git push        # 在你的分支上，然后到 GitHub 开 PR
```
