# AI 贡献手册（agent playbook）

本目录是**让 AI agent 帮忙给 VLR 实验室网站贡献内容并自动开 PR** 的操作手册。它与具体的 agent 工具（harness）无关——Claude Code、Codex，或任何能读写本仓库文件、能跑 shell 的 agent，都可以遵循这里的步骤。

各 harness 的入口只是薄薄的指针（`.claude/skills/`、根目录 `AGENTS.md`），真正的流程都写在本目录，维护时只改这里一处。

## 支持的两类任务

| 我想做什么 | 看哪份手册 |
|---|---|
| 把某人的照片 + 姓名加到「实验室人员」页 | [add-member.md](./add-member.md) |
| 把一篇 Word / Markdown / PDF / 公众号文章发成「实验室新闻」 | [publish-news.md](./publish-news.md) |

两份手册各自描述"生成内容文件"的部分，最后都回到本文件下面的**共享收尾流程**（校验 → Git → PR）。

---

## 背景：这个网站怎么加内容

本站基于 **Astro 6 内容集合（Content Collections）**：**加内容 = 加一个 Markdown 文件（+ 可选图片），无需改代码**。字段由 [`src/content.config.ts`](../../src/content.config.ts) 用 Zod 在构建时严格校验，写错会有明确报错。人工维护者的完整模板见根目录 [CONTENT_GUIDE.md](../../CONTENT_GUIDE.md)——本手册与它保持一致，agent 不要自造字段。

内容与图片的落点：

| 类型 | Markdown 目录 | 图片目录 | 图片引用方式 |
|---|---|---|---|
| 成员 | `src/content/team/` | `src/assets/team/` | `photo: ../../assets/team/<文件名>` |
| 新闻 | `src/content/news/` | `src/assets/news/` | `cover: ../../assets/news/<文件名>` |

---

## 共享收尾流程：校验 → Git → PR

两份手册生成完内容文件后，都执行以下步骤。

### 1. 本地校验

在仓库根运行：

```bash
npm run check    # = astro check，含内容 schema 校验
```

- 若报"command not found / 缺依赖"，先 `npm install`（Node 20+，见 `.nvmrc`）。
- 若 `npm install` 网络超时（中国大陆校园网常见）：本机若配了 FlClash 代理，先在终端跑 `proxy_on` 再重试；代理不通时直连 registry 也可（见根 `README.md` 的网络提示与 `../../../CLAUDE.md`）。
- **报错就按提示修**（哪个文件、哪个字段），改完重跑，直到通过。常见错误：`date` 不是 `YYYY-MM-DD`、`role`/`category` 枚举值不精确、图片相对路径拼错或图片不存在、漏了必填的 `title`/`name`/`date`。

### 2. 判断并准备 Git 分支

```bash
git rev-parse --is-inside-work-tree 2>/dev/null
```

- **不是 git 仓库**（如用户下载的是 zip，而非 `git clone`）：到此为止——告诉用户"内容文件已写好并通过校验，但当前目录不是 git 仓库，无法自动提交/开 PR；请 `git clone` 本仓库后再运行，或手动把改动放进仓库"。不要擅自 `git init`。
- **是 git 仓库**：从默认分支拉出一个新分支：

```bash
git switch -c content/add-member-<name>     # 加成员
git switch -c content/news-<slug>           # 发新闻
```

### 3. 提交

```bash
git add -A
git commit -m "内容：新增成员 <name>"        # 加成员
# 或
git commit -m "内容：发布新闻 <title>"        # 发新闻
```

commit message 结尾附一行：

```
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
```

### 4. Push 并开 PR

先探测是否安装了 GitHub CLI 与是否配了远程：

```bash
command -v gh >/dev/null && echo "gh: yes" || echo "gh: no"
git remote -v
```

按三种情况处理：

- **有 `gh` 且有 remote**：
  ```bash
  git push -u origin <branch>
  gh pr create --fill
  ```
  把 `gh` 输出的 PR URL 回给用户。

- **没有 `gh`，但有 remote**：打印手动命令与 compare 链接，让用户点开网页开 PR：
  ```bash
  git push -u origin <branch>
  ```
  PR 链接：`<仓库网页地址>/compare/<branch>?expand=1`（把 remote 的 `git@github.com:owner/repo.git` / `https://github.com/owner/repo.git` 换算成 `https://github.com/owner/repo`）。

- **没有 remote**（例如从别人仓库 clone、还没配自己的 fork）：提示用户先在 GitHub fork 本仓库，然后
  ```bash
  git remote add origin <你的 fork 地址>
  ```
  再回到上一步 push。

> **对外操作确认**：push 和开 PR 是发布性动作。若用户没有明确说"直接提交/开 PR 就行"，在 push 前先把将要执行的命令列给用户确认一次。

---

## 通用约束（务必遵守，否则 `npm run check` 会失败）

- **枚举必须精确**：成员 `role` 只能是 `教授 / 博后 / 博士生 / 硕士生 / 毕业生 / 实验室助理 / 以往成员`；新闻 `category` 只能是 `大新闻 / 实验室动态 / 学术报告`。
- **图片必须真实存在**且放在对应 `src/assets/<类型>/` 下，用相对路径引用（`image()` 校验器会检查文件是否存在）。
- **日期**统一 `YYYY-MM-DD`。
- **文件名**用英文/拼音 + 连字符 `-`；以 `_` 开头的文件或 `draft: true` 的条目会被忽略（可用于草稿）。
