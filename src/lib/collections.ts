/**
 * 内容集合查询助手。首页与日后子页面共用，把「取最新 N / 置顶 / 排序」逻辑集中在此，
 * 组件只管渲染。改「首页显示几条」= 改 HOME 常量一处。
 */
import { getCollection, type CollectionEntry } from 'astro:content';

/** 首页各板块展示数量（集中配置）。 */
export const HOME = {
  papers: 16,
  announcements: 4,
  newsList: 3,
  newsSlider: 5,
} as const;

type Publication = CollectionEntry<'publications'>;
type News = CollectionEntry<'news'>;
type Announcement = CollectionEntry<'announcements'>;
type Team = CollectionEntry<'team'>;

/** 团队成员角色的固定展示顺序（老站栏目顺序）。 */
export const TEAM_ROLES = [
  '教师',
  '博后',
  '博士生',
  '硕士生',
  '实验室助理',
  '毕业生',
  '以往成员',
] as const;

/** 新闻分类的固定顺序。 */
export const NEWS_CATEGORIES = ['大新闻', '实验室动态', '学术报告'] as const;

const byDateDesc = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
  b.data.date.valueOf() - a.data.date.valueOf();

const notDraft = <T extends { data: { draft?: boolean } }>(e: T) => !e.data.draft;

/**
 * 首页「最新论文」：featured 置顶（按 order），其余按日期倒序，取前 HOME.papers 条。
 * 语义为「置顶而非过滤」——默认展示最新，featured 只是把代表作钉到最前。
 */
export async function getHomepagePublications(): Promise<Publication[]> {
  const all = (await getCollection('publications', notDraft)) as Publication[];
  const pinned = all
    .filter((p) => p.data.featured)
    .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
  const rest = all.filter((p) => !p.data.featured).sort(byDateDesc);
  return [...pinned, ...rest].slice(0, HOME.papers);
}

/** 全部论文（子页面用），featured 置顶 + 日期倒序。 */
export async function getAllPublications(): Promise<Publication[]> {
  const all = (await getCollection('publications', notDraft)) as Publication[];
  const pinned = all
    .filter((p) => p.data.featured)
    .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
  const rest = all.filter((p) => !p.data.featured).sort(byDateDesc);
  return [...pinned, ...rest];
}

/** 首页通知公告：pinned 置顶 + 日期倒序，取前 HOME.announcements 条。 */
export async function getHomepageAnnouncements(): Promise<Announcement[]> {
  const all = (await getCollection('announcements', notDraft)) as Announcement[];
  const pinned = all.filter((a) => a.data.pinned).sort(byDateDesc);
  const rest = all.filter((a) => !a.data.pinned).sort(byDateDesc);
  return [...pinned, ...rest].slice(0, HOME.announcements);
}

/** 首页新闻左侧图片轮播：showInSlider 的项，日期倒序，取前 HOME.newsSlider 条。 */
export async function getHomepageNewsSlider(): Promise<News[]> {
  const all = (await getCollection('news', notDraft)) as News[];
  return all
    .filter((n) => n.data.showInSlider)
    .sort(byDateDesc)
    .slice(0, HOME.newsSlider);
}

/** 首页新闻右侧列表：全部新闻按日期倒序，取前 HOME.newsList 条。 */
export async function getHomepageNewsList(): Promise<News[]> {
  const all = (await getCollection('news', notDraft)) as News[];
  return all.sort(byDateDesc).slice(0, HOME.newsList);
}

/* ── 子页面查询 ── */

/** 全部新闻（子页面用），按日期倒序。 */
export async function getAllNews(): Promise<News[]> {
  const all = (await getCollection('news', notDraft)) as News[];
  return all.sort(byDateDesc);
}

/** 全部成员按角色分组，组内按 order 升序。返回顺序 = TEAM_ROLES。 */
/**
 * 成员自动排序（无需手动维护 order）：
 *   1) 有 order 的排最前（仅用于置顶少数人，如 PI 白翔 order:0）；
 *   2) 学生按入学年份 enrollYear 降序（新入学在前）；
 *   3) 最后按姓名（localeCompare，中文按拼音/笔画近似）。
 * 加人/删人无需再调整顺序。
 */
function teamComparator(a: Team, b: Team): number {
  const ao = a.data.order ?? Infinity;
  const bo = b.data.order ?? Infinity;
  if (ao !== bo) return ao - bo; // 有 order 的靠前，且按 order 升序
  const ay = a.data.enrollYear ? Number(a.data.enrollYear) : -Infinity;
  const by = b.data.enrollYear ? Number(b.data.enrollYear) : -Infinity;
  if (ay !== by) return by - ay; // 入学年份降序（新的在前）
  return a.data.name.localeCompare(b.data.name, 'zh');
}

export async function getTeamByRole(): Promise<{ role: string; members: Team[] }[]> {
  const all = (await getCollection('team', notDraft)) as Team[];
  return TEAM_ROLES.map((role) => ({
    role,
    members: all.filter((m) => m.data.role === role).sort(teamComparator),
  })).filter((g) => g.members.length > 0);
}
