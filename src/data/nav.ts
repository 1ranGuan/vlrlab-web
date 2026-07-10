/**
 * 主导航树（开发者维护）。保留老站的栏目与层级。
 *
 * 目前多数子页面尚未重建；`href` 暂时指向老站的 .htm 路径以避免死链。
 * 重建对应子页面后，把 href 改成新站内部路由（如 '/publications'）即可。
 */
export interface NavItem {
  label: string;
  href: string;
  /** 子菜单 */
  children?: { label: string; href: string }[];
}

export const nav: NavItem[] = [
  { label: '首页', href: '/' },
  {
    label: '新闻动态',
    href: '/news',
    children: [
      { label: '大新闻', href: '/news/大新闻' },
      { label: '实验室动态', href: '/news/实验室动态' },
      { label: '学术报告', href: '/news/学术报告' },
    ],
  },
  {
    label: '研究团队',
    href: '/team',
    children: [
      { label: '教授', href: '/team/教授' },
      { label: '博后', href: '/team/博后' },
      { label: '博士生', href: '/team/博士生' },
      { label: '硕士生', href: '/team/硕士生' },
      { label: '毕业生', href: '/team/毕业生' },
      { label: '实验室助理', href: '/team/实验室助理' },
      { label: '以往成员', href: '/team/以往成员' },
    ],
  },
  {
    label: '研究成果',
    href: '/publications',
    children: [
      { label: '代表作论文', href: '/publications?featured=1' },
      { label: '论文', href: '/publications' },
      { label: '专利及软著', href: '/achievements/patents' },
      { label: '主要获奖', href: '/achievements/awards' },
      { label: '专著书籍', href: '/achievements/books' },
      { label: '讲座视频', href: '/achievements/talks' },
      { label: '支持的项目', href: '/achievements/projects' },
    ],
  },
  {
    label: '研究方向',
    href: '/research',
    children: [
      { label: '自动驾驶', href: '/research/自动驾驶' },
      { label: '文档图像智能', href: '/research/文档图像智能' },
      { label: '遥感检测', href: '/research/遥感检测' },
      { label: '视频分析', href: '/research/视频分析' },
      { label: '工业检测', href: '/research/工业检测' },
      { label: '医疗辅助诊断', href: '/research/医疗辅助诊断' },
    ],
  },
  { label: '开源资料', href: '/opensource' },
  { label: '教学相关', href: '/teaching' },
  { label: '招聘招生信息', href: '/recruiting' },
  { label: '联系我们', href: '/contact' },
];

/**
 * 顶层导航的 UI key（用于英文版按 i18n 表取标签）。与上面的 nav 顺序一一对应。
 * 英文首页壳子阶段：英文导航只做顶层，子菜单暂不展开；未翻译的子页面 href 回落到中文页。
 */
import { type Locale, ui } from '@/i18n/ui';

// 英文导航：key → 是否有英文页(en 路由) 或回落到中文页。
// 新闻按需求不做英文富文本，故 news 回落中文站。
const NAV_KEYS = [
  { key: 'nav.home', en: '/en/' },
  { key: 'nav.news', en: '/news' }, // 回落中文（英文不做新闻富文本）
  { key: 'nav.team', en: '/en/team' },
  { key: 'nav.publications', en: '/en/publications' },
  { key: 'nav.research', en: '/en/research' },
  { key: 'nav.opensource', en: '/en/opensource' },
  { key: 'nav.teaching', en: '/en/teaching' },
  { key: 'nav.recruiting', en: '/en/recruiting' },
  { key: 'nav.contact', en: '/en/contact' },
] as const;

/**
 * 按语言返回顶层导航。
 * - zh：返回完整 nav（含子菜单）。
 * - en：仅顶层，标签用英文；指向对应 /en/ 路由（新闻回落中文站）。
 */
export function getNav(locale: Locale): NavItem[] {
  if (locale === 'zh') return nav;
  return NAV_KEYS.map((n) => ({
    label: ui.en[n.key as keyof (typeof ui)['en']],
    href: n.en,
  }));
}
