# VLR Lab Website

华中科技大学 **Vision and Learning Representation Group** 官网，基于 [Astro](https://astro.build) 构建的静态站点。

这是一个**内容驱动**的网站：**加论文、新闻、成员 = 加一个 Markdown 文件（+ 图片），然后提交 git，无需改代码、无需登录后台。** 字段在构建时自动校验，写错会有明确提示。

> 如果需要：加成员、发新闻、加论文。往下看「我要加内容」——**推荐让 AI agent 帮你做**，一句话的事。

---

## 我要加内容（两种方式）

### 方式一：让 AI agent 帮你做（推荐）

本仓库自带一套**贡献技能（skill）**，任何支持读写仓库、能跑命令的 AI 编程工具（Claude Code、Codex 等）都能用。agent 会替你解析素材、生成正确的内容文件、跑校验、提交并开 Pull Request。

1. **用 `git clone` 克隆本仓库**（不要下载 zip，否则 agent 无法自动提交/开 PR）。
2. 在仓库目录里打开你的 agent。**技能随仓库自带，无需额外安装**：
   - **Claude Code**：`.claude/skills/` 会被自动发现，输入 `/` 可看到 `add-member`、`publish-news`。
   - **Codex / 其它 agent**：启动时读根目录 [AGENTS.md](./AGENTS.md) 即可，无需配置。
3. 直接用自然语言说需求，例如：
   - 「帮我把这张照片和名字加到成员页：张三，硕士生」
   - 「把这个公众号链接发成一条实验室新闻：https://mp.weixin.qq.com/s/xxxx」
   - 「把这个 Word / PDF / Markdown 文件发成新闻」

agent 会自动：解析 → 生成文件 → `npm run check` 校验 → 建分支、commit、push、开 PR。你 review 合并即可（合并后自动部署）。

**agent 遵循的手册（人也能照着做）**：[`docs/agent/`](./docs/agent/) —— [add-member.md](./docs/agent/add-member.md)、[publish-news.md](./docs/agent/publish-news.md)、[README.md](./docs/agent/README.md)（共享的校验/Git/PR 流程）。前置条件见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

### 方式二：手动加文件

照 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) 的复制即用模板，在对应目录加一个 `.md`，然后：

```bash
npm run check                          # 校验（有错会指出哪个文件哪个字段）
git add -A && git commit -m "内容：新增 XXX"
git push                               # 到 GitHub 开 PR
```

---

## 网站结构

内容和代码分离：**改内容**只碰 `src/content/**` 和 `src/data/*.yaml`；**改结构/样式**才碰 `src/data/*.ts` 与 `src/components/**`。

```
src/
├── content.config.ts     # 各类内容的字段定义（schema）；加字段改这里
├── content/              # ★ 内容在这里：加 .md 即上线
│   ├── publications/     # 论文（每篇一个 .md）
│   ├── news/             # 新闻
│   ├── announcements/    # 通知公告
│   ├── team/             # 成员
│   └── research/         # 研究方向（6 个）
├── data/                 # 站点级配置
│   ├── site.ts           # 站名、邮箱、版权
│   ├── nav.ts            # 导航树
│   ├── footer.ts         # 页脚快速链接
│   ├── collaborators.yaml # 合作者
│   ├── friend-links.yaml  # 友情链接
│   └── hero-slides.yaml   # 首页大图轮播
├── assets/               # 图片，自动优化为 WebP/AVIF
│   └── brand/ hero/ papers/ news/ collaborators/ team/
├── components/           # 页面组件（布局 / 首页 / UI）
├── layouts/ · lib/ · styles/ · pages/
docs/agent/               # AI agent 贡献手册（见上方「方式一」）
.claude/skills/           # Claude Code 技能入口
AGENTS.md · CONTRIBUTING.md · CONTENT_GUIDE.md
```

**内容与图片的落点**（详见 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)）：

| 类型 | Markdown 目录 | 图片目录 |
|---|---|---|
| 论文 | `src/content/publications/` | `src/assets/papers/` |
| 新闻 | `src/content/news/` | `src/assets/news/` |
| 成员 | `src/content/team/` | `src/assets/team/` |
| 通知公告 | `src/content/announcements/` | — |

> 文件名用英文/拼音 + 连字符（如 `2025-cvpr-foo.md`）；以 `_` 开头或 `draft: true` 的内容会被忽略（可做草稿）。

---

## 本地开发

想在提交前预览效果、或改结构/样式时：

```bash
nvm use            # Node 20+（见 .nvmrc）
npm install        # 首次安装依赖
npm run dev        # 本地预览 http://localhost:4321
npm run check      # astro check：类型 + 内容 schema 校验（提交前必跑）
npm run build      # 生产构建 → dist/
npm run preview    # 本地预览生产构建
npm run format     # prettier 格式化
```

## 技术栈

- **Astro 6**（`output: 'static'`，TypeScript strict）
- **Tailwind CSS v4**（品牌 token 在 `src/styles/global.css` 的 `@theme`）
- **Embla Carousel**（首页 Hero / 新闻轮播）
- 无 jQuery / Swiper / Slick

## 部署（Cloudflare Pages）

1. 仓库推送到 GitHub。
2. Cloudflare Pages → 连接仓库 → 构建命令 `npm run build`、输出目录 `dist`。
3. 绑定自定义域名（自带 HTTPS + 全球 CDN + push 自动部署）。
4. 部署前把 `astro.config.mjs` 的 `site` 改成最终域名；`base` 保持 `'/'`。

## 附：老站素材提取（一次性，通常无需关心）

本站由旧的 Visual SiteBuilder 校园 CMS 站点重建而来。老站完整离线导出为两个归档（`*.vsbsitepackage` / `*.sto`，已 `.gitignore`）。

## 附：日后启用英文版（i18n）

当前不开启英文路由，仅保留入口占位。启用步骤见 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) 或问维护者：在 `astro.config.mjs` 加 `i18n` 配置、新建 `src/pages/en/`、把 `src/data/*.ts` 的 UI 文案抽成中英两份。
