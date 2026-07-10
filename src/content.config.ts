import { defineCollection, reference } from 'astro:content';
import { z } from 'astro:schema';
import { glob, file } from 'astro/loaders';

/* ─────────────────────────────────────────────────────────────────────────
   VLR 内容集合定义（Astro 6 Content Layer API）

   设计原则：编辑改内容 = 改这里的 Markdown/YAML；开发者改结构 = 改 src/data/*.ts。
   新增论文/新闻/成员 = 在对应目录加一个 .md 文件并 git 提交，无需改任何组件。
   Zod schema 在 build 时校验字段，缺字段/格式错会以精确信息报错。
   ───────────────────────────────────────────────────────────────────────── */

// ── 研究成果：论文 ──
const publications = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/publications' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(), // 排序键，接受 "2023-01-15"
      venue: z.string().optional(), // "AAAI 2023" / "TPAMI 2022" / "中国科学 2022"
      badge: z.string().optional(), // "Oral" / "封面论文" / "Best Paper"
      authors: z.array(z.string()).default([]),
      thumbnail: image().optional(),
      links: z
        .object({
          pdf: z.string().optional(), // 可为站内 /files/xxx.pdf 或外链
          code: z.string().url().optional(),
          project: z.string().url().optional(),
          arxiv: z.string().url().optional(),
        })
        .default({}),
      topics: z.array(reference('research')).default([]), // 关联研究方向
      featured: z.boolean().default(false), // 置顶到首页最新论文最前
      order: z.number().optional(), // featured 之间的手动排序
      draft: z.boolean().default(false),
    }),
});

// ── 新闻动态 ──
const news = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      category: z.enum(['大新闻', '实验室动态', '学术报告']),
      excerpt: z.string().optional(), // 右侧列表摘要
      cover: image().optional(), // 左侧图片轮播用图
      external: z.string().url().optional(), // 部分新闻外链到微信公众号
      showInSlider: z.boolean().default(false), // 进入左侧 5 图轮播
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

// ── 通知公告 ──
const announcements = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/announcements' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string().default('通知公告'),
    external: z.string().url().optional(),
    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// ── 研究团队（本次仅播种，供日后子页面）──
const team = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      nameEn: z.string().optional(),
      role: z.enum(['教授', '博后', '博士生', '硕士生', '毕业生', '实验室助理', '以往成员']),
      photo: image().optional(),
      email: z.string().optional(),
      homepage: z.string().url().optional(),
      title: z.string().optional(), // 职称/头衔，如 "教授、博导"
      interests: z.array(z.string()).default([]),
      gradYear: z.number().optional(), // 毕业生/以往成员分组用
      enrollYear: z.coerce.string().optional(), // 入学年份（学生名前缀，如 "16"、"18"）
      order: z.number().default(999),
      draft: z.boolean().default(false),
    }),
});

// ── 研究方向（6 个固定方向）──
const research = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/research' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(), // 自动驾驶 / 文档图像智能 / …
      order: z.number().default(999),
      cover: image().optional(),
      summary: z.string().optional(),
    }),
});

// ── 编辑友好的 YAML 数据（file() loader）──
const collaborators = defineCollection({
  loader: file('./src/data/collaborators.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    url: z.string().url(),
    order: z.number().default(999),
  }),
});

const friendLinks = defineCollection({
  loader: file('./src/data/friend-links.yaml'),
  schema: z.object({
    id: z.string(),
    label: z.string(),
    url: z.string(), // 允许 '#' 占位（老站有未填项）
  }),
});

const heroSlides = defineCollection({
  loader: file('./src/data/hero-slides.yaml'),
  schema: z.object({
    id: z.string(),
    image: z.string(), // 对应 src/assets/hero/<image>
    caption: z.string().optional(),
    order: z.number().default(999),
  }),
});

// ── 开源资料：数据集 / 代码 / 模型 ──
const datasets = defineCollection({
  loader: file('./src/data/datasets.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    url: z.string().url(),
    venue: z.string().optional(), // 相关论文/来源，如 "ICDAR 2015"
    kind: z.enum(['dataset', 'code', 'model']).default('dataset'),
    order: z.number().default(999),
  }),
});

export const collections = {
  publications,
  news,
  announcements,
  team,
  research,
  collaborators,
  friendLinks,
  heroSlides,
  datasets,
};
