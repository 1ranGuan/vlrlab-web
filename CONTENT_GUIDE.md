# 内容维护指南

本站内容都放在仓库里，**新增/修改内容 = 加或改一个文件，然后提交 git**，无需改代码、无需登录后台。下面是每类内容的操作方法与模板，复制即用。

修改后本地预览：`npm run dev` → 打开 http://localhost:4321 。
提交前跑一次 `npm run check`，若字段写错会给出明确报错。

---

## 目录速查

| 要改什么 | 去哪里 |
|---|---|
| 论文 | `src/content/publications/` 加 `.md` |
| 新闻 | `src/content/news/` 加 `.md` |
| 通知公告 | `src/content/announcements/` 加 `.md` |
| 成员 | `src/content/team/` 加 `.md` |
| 研究方向 | `src/content/research/`（共 6 个） |
| 合作者 | `src/data/collaborators.yaml` 加一段 |
| 友情链接 | `src/data/friend-links.yaml` 加一行 |
| 首页大图轮播 | `src/data/hero-slides.yaml` |
| 联系邮箱 / 版权 | `src/data/site.ts` |
| 导航菜单 | `src/data/nav.ts` |

> 文件名用英文/拼音、单词间用连字符 `-`，如 `2025-cvpr-foo.md`。以 `_` 开头的文件会被忽略（可做草稿）。

---

## 一、加一篇论文

在 `src/content/publications/` 新建 `.md`，例如 `2025-cvpr-foo.md`：

```markdown
---
title: '【CVPR 2025】Foo: A New Method for Bar'
date: 2025-03-01                       # 日期，决定排序（越新越靠前）
venue: CVPR 2025                       # 会议/期刊（可选）
badge: Oral                            # 角标，如 Oral / 封面论文 / Best Paper（可选）
thumbnail: ../../assets/papers/foo.jpg # 缩略图（可选，见下）
links:                                 # 链接（都可选）
  arxiv: https://arxiv.org/abs/xxxx
  code: https://github.com/xxx/foo
  pdf: /files/foo.pdf                  # 站内 PDF 放 public/files/
topics: [文档图像智能]                  # 关联研究方向（可选，须是下方 6 个之一）
featured: true                         # 置顶到首页最前（可选，代表作用）
order: 1                               # featured 之间的先后（可选，越小越前）
---

这里可以写论文摘要（可选，正文支持 Markdown）。
```

**缩略图**：把图片放进 `src/assets/papers/`，`thumbnail` 按上例用相对路径 `../../assets/papers/<文件名>` 引用。不填则显示占位。

保存后，它会**自动**出现在首页「最新论文」（按日期排序；`featured: true` 会被钉到最前）。

---

## 二、加一条新闻

在 `src/content/news/` 新建 `.md`：

```markdown
---
title: 团队论文被 NeurIPS 2025 接收
date: 2025-06-01
category: 大新闻          # 必填，三选一：大新闻 / 实验室动态 / 学术报告
excerpt: 近日，团队论文…   # 摘要，显示在首页右侧列表（可选）
cover: ../../assets/news/foo.jpg  # 配图，进左侧图片轮播需要（可选）
external: https://mp.weixin.qq.com/s/xxxx  # 若外链到公众号等（可选）
showInSlider: true        # 是否进首页左侧图片轮播（需配 cover）
---

新闻正文（可选）。
```

- 首页右侧「新闻」列表：自动取最新 3 条。
- 首页左侧图片轮播：取 `showInSlider: true` 且有 `cover` 的最新 5 条。

---

## 三、加一条通知公告

在 `src/content/announcements/` 新建 `.md`：

```markdown
---
title: '【VLR公告】2025 年招生说明'
date: 2025-05-01
category: 通知公告        # 可选，默认「通知公告」
external: https://…       # 若外链（可选）
pinned: true              # 置顶（可选）
---
```

首页「通知公告」自动取最新 4 条（`pinned` 优先）。

---

## 四、加一位成员

在 `src/content/team/` 新建 `.md`，如 `zhang-san.md`：

```markdown
---
name: 张三
nameEn: San Zhang         # 可选
role: 博士生              # 必填，七选一：教授/博后/博士生/硕士生/毕业生/实验室助理/以往成员
photo: ../../assets/team/zhang-san.jpg  # 头像（可选）
email: zhangsan@hust.edu.cn             # 可选
homepage: https://…                     # 可选
interests: [目标检测, 视频理解]          # 研究兴趣（可选）
gradYear: 2025            # 毕业年份，用于毕业生/以往成员分组（可选）
order: 10                # 同组内排序，越小越前（可选）
---

个人简介（可选）。
```

> 头像放 `src/assets/team/`。成员页面尚在建设中，但现在录入的数据日后会自动呈现。

---

## 五、合作者 / 友情链接 / 首页大图

这三类是简单列表，改对应 YAML 即可。

**合作者** `src/data/collaborators.yaml`（加一段；头像放 `src/assets/collaborators/<id>.png`，文件名须等于 `id`）：

```yaml
- id: san-zhang
  name: San Zhang
  url: https://zhang.example.edu/
  order: 12
```

**友情链接** `src/data/friend-links.yaml`（加一行）：

```yaml
- id: some-lab
  label: Some Lab
  url: https://somelab.edu/
```

**首页大图轮播** `src/data/hero-slides.yaml`（图片放 `src/assets/hero/`，按 `image` 名匹配）：

```yaml
- id: event-2026
  image: event-2026.jpg
  caption: 2026 年某活动   # 可选，显示在图片左下角
  order: 0                 # 越小越靠前
```

---

## 六、改邮箱 / 版权 / 导航

- 联系邮箱、版权年份、站名：`src/data/site.ts`
- 顶部与主导航菜单项：`src/data/nav.ts`

这两个是代码文件，改动请谨慎，改完务必 `npm run check` 确认无误。

---

## 七、提交上线

```bash
npm run check      # 校验（有错会指出哪个文件哪个字段）
git add -A
git commit -m "内容：新增 XXX 论文"
git push           # Cloudflare Pages 自动构建并发布
```

若 `npm run check` 报错，多半是：日期格式不对（应 `YYYY-MM-DD`）、`category`/`role` 不在允许的取值里、图片路径拼错、或漏了必填的 `title`/`date`。按提示改正即可。
