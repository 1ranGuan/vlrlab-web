/**
 * i18n UI 字符串表 + 助手。中文为默认（根路径 /），英文在 /en/。
 * 新增语言 = 加一个 locale key；新增文案 = 在 zh/en 各加一行。
 */

export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh';

/** UI chrome 文案（导航、页脚、通用按钮等）。内容型数据（论文/新闻）不在此。 */
export const ui = {
  zh: {
    'nav.home': '首页',
    'nav.news': '新闻动态',
    'nav.team': '研究团队',
    'nav.publications': '研究成果',
    'nav.research': '研究方向',
    'nav.opensource': '开源资料',
    'nav.teaching': '教学相关',
    'nav.recruiting': '招聘招生信息',
    'nav.announcements': '通知公告',
    'nav.contact': '联系我们',
    'footer.friendLinks': '友情链接',
    'footer.contact': '联系我们',
    'home.latestPapers': '最新论文',
    'home.morePapers': '更多论文',
    'home.announcements': '通知公告',
    'home.moreAnnouncements': '更多通知公告',
    'home.news': '新闻',
    'home.moreNews': '更多新闻',
    'home.collaborators': '合作者',
    'lang.switch': 'English',
    'page.team.title': '研究团队',
    'page.team.subtitle': '教师、博士后、博士生、硕士生及历届成员。',
    'page.publications.title': '研究成果',
    'page.publications.subtitle': '计算机视觉、文档图像智能、自动驾驶、遥感、视频、工业与医疗视觉方向的代表性论文。',
    'page.research.title': '研究方向',
    'page.research.subtitle': '自动驾驶、文档图像智能、遥感检测、视频分析、工业检测、医疗辅助诊断。',
    'page.teaching.title': '教学相关',
    'page.recruiting.title': '招聘招生信息',
    'page.contact.title': '联系我们',
    'page.announcements.title': '通知公告',
    'page.news.title': '新闻动态',
    'page.news.subtitle': '团队大新闻、实验室动态与学术报告。',
    'page.opensource.title': '开源资料',
    'page.opensource.subtitle': '开源数据集、代码与预训练模型。',
    'page.opensource.body': '开源代码、数据集与预训练模型资料正在整理中，敬请期待。',
    'page.opensource.empty': '开源资料正在整理中，敬请期待。',
    'page.opensource.visit': '访问链接',
    'kind.dataset': '数据集',
    'kind.code': '代码',
    'kind.model': '模型',
    'common.readMore': '了解更多',
    'common.home': '首页',
  },
  en: {
    'nav.home': 'Home',
    'nav.news': 'News',
    'nav.team': 'People',
    'nav.publications': 'Publications',
    'nav.research': 'Research',
    'nav.opensource': 'Open Source',
    'nav.teaching': 'Teaching',
    'nav.recruiting': 'Join Us',
    'nav.announcements': 'Announcements',
    'nav.contact': 'Contact',
    'footer.friendLinks': 'Links',
    'footer.contact': 'Contact',
    'home.latestPapers': 'Latest Publications',
    'home.morePapers': 'More publications',
    'home.announcements': 'Announcements',
    'home.moreAnnouncements': 'More announcements',
    'home.news': 'News',
    'home.moreNews': 'More news',
    'home.collaborators': 'Collaborators',
    'lang.switch': '中文',
    'page.team.title': 'People',
    'page.team.subtitle': 'Faculty, postdocs, PhD and master students, and alumni.',
    'page.publications.title': 'Publications',
    'page.publications.subtitle':
      'Representative papers in computer vision, document image intelligence, autonomous driving, remote sensing, video, industrial and medical vision.',
    'page.research.title': 'Research',
    'page.research.subtitle':
      'Autonomous driving, document image intelligence, remote sensing, video analysis, industrial inspection, medical diagnosis.',
    'page.teaching.title': 'Teaching',
    'page.recruiting.title': 'Join Us',
    'page.contact.title': 'Contact',
    'page.announcements.title': 'Announcements',
    'page.news.title': 'News',
    'page.news.subtitle': 'Lab news, updates and academic talks.',
    'page.opensource.title': 'Open Source',
    'page.opensource.subtitle': 'Open-source datasets, code and pretrained models.',
    'page.opensource.body':
      'Open-source code, datasets and pretrained models are being organized. Stay tuned.',
    'page.opensource.empty': 'Open-source resources are being organized. Stay tuned.',
    'page.opensource.visit': 'Visit',
    'kind.dataset': 'Dataset',
    'kind.code': 'Code',
    'kind.model': 'Model',
    'common.readMore': 'Learn more',
    'common.home': 'Home',
  },
} as const;

export type UIKey = keyof (typeof ui)['zh'];

/** 团队角色 → 英文标签（英文团队页用）。 */
export const roleLabels: Record<string, string> = {
  教授: 'Faculty',
  博后: 'Postdocs',
  博士生: 'PhD Students',
  硕士生: 'Master Students',
  实验室助理: 'Lab Assistants',
  毕业生: 'Alumni',
  以往成员: 'Former Members',
};

/** 从 URL 路径判断语言（/en/... → en，否则 zh）。 */
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.replace(import.meta.env.BASE_URL, '/').split('/').filter(Boolean)[0];
  return seg === 'en' ? 'en' : 'zh';
}

/** 返回一个绑定了 locale 的翻译函数。 */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key] ?? key;
  };
}

/** 给定路径切换到另一语言的对应路径（简单前缀切换）。 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const rel = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  const parts = rel.split('/').filter(Boolean);
  const isEn = parts[0] === 'en';
  if (target === 'en') {
    return isEn ? pathname : `${base}/en${rel === '/' ? '' : rel}` || `${base}/en`;
  }
  // target zh: 去掉 en 前缀
  if (isEn) {
    const rest = '/' + parts.slice(1).join('/');
    return `${base}${rest === '/' ? '/' : rest}`;
  }
  return pathname;
}
