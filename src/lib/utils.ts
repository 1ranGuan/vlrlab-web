/** 通用工具函数。 */

import { site } from '@data/site';

/**
 * 给站内绝对路径拼上 Astro 的 base（GitHub Pages 项目站点需要）。
 * base 为 '/' 时原样返回。外链/锚点/mailto 不处理。
 */
export function withBase(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

/** 判断是否外部链接（用于决定 target/rel）。 */
export function isExternal(href: string): boolean {
  return /^(https?:)?\/\//.test(href);
}

const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

/** 日期 → { day: "04", ym: "2024-03" }，用于老站的方块日期徽章。 */
export function dateBadge(date: Date): { day: string; ym: string } {
  const day = String(date.getDate()).padStart(2, '0');
  const ym = `${date.getFullYear()}-${MONTHS[date.getMonth()]}`;
  return { day, ym };
}

/** 日期 → "2024-03-04"。 */
export function isoDate(date: Date): string {
  return `${date.getFullYear()}-${MONTHS[date.getMonth()]}-${String(date.getDate()).padStart(2, '0')}`;
}

/** 版权行文本。 */
export function copyright(): string {
  return `Copyright © ${site.copyrightYear}  ${site.name}`;
}
