/**
 * 提取研究方向 & 信息页（教学/招聘/联系/成果子类）的正文，
 * 输出为纯文本/精简 HTML 片段，供子页面填充。
 * wbcontent 是第 29 个字段（index 28）。
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const xml = fs.readFileSync('/tmp/wbnews.xml', 'utf8');
const rows = [...xml.matchAll(/<r><!\[CDATA\[([\s\S]*?)\]\]><\/r>/g)].map((m) => m[1]);

const SEP = '';
function splitFields(raw) {
  return raw.replace(/,,/g, SEP).split(', ').map((p) => p.replaceAll(SEP, ',').trim());
}

// 目标树：研究方向 + 信息页
const TARGETS = {
  1116: 'research/自动驾驶', 1121: 'research/文档图像智能', 1147: 'research/遥感检测',
  1126: 'research/视频分析', 1131: 'research/工业检测', 1136: 'research/医疗辅助诊断',
  1002: 'info/teaching', 1004: 'info/recruiting', 1007: 'info/contact',
  1106: 'info/patents', 1108: 'info/books', 1109: 'info/talks',
  1110: 'info/projects', 1148: 'info/awards',
};

/** 粗清洗 HTML → 纯文本段落（保留换行/列表结构的近似）。 */
function htmlToText(html) {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .join('\n');
}

const out = {};
for (const raw of rows) {
  const f = splitFields(raw);
  const treeId = Number(f[3]);
  if (!TARGETS[treeId]) continue;
  const title = f[5]?.trim();
  const content = f[28] || f[20] || ''; // wbcontent，回退到 summary
  const text = htmlToText(content);
  const key = TARGETS[treeId];
  // 每个 key 取内容最长的一条
  if (!out[key] || text.length > out[key].text.length) {
    out[key] = { treeId, title, text };
  }
}

fs.writeFileSync('/tmp/legacy-pages.json', JSON.stringify(out, null, 2));
console.log('提取', Object.keys(out).length, '个页面 → /tmp/legacy-pages.json');
for (const [k, v] of Object.entries(out)) {
  console.log(`  ${k}: "${v.title}" (${v.text.length} 字)`);
}
