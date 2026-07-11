// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 正式域名（含 https://，结尾不要斜杠）。site 影响 sitemap、canonical、og:url。
  // base 用自定义域名保持 '/'。
  site: 'https://vlrlab.com',
  base: '/',
  output: 'static',
  // Tailwind v4 通过 PostCSS 接入（postcss.config.mjs）。
  // 不用 @tailwindcss/vite：它与 Astro 6 的 rolldown-vite 解析器不兼容
  // （Missing field `tsconfigPaths`）。PostCSS 走 Astro 标准 CSS 管线，稳定。
  integrations: [sitemap()],
  image: {
    // sharp 为默认服务；Hero 大图在组件里用 <Image> 限定宽度并输出 AVIF/WebP。
    responsiveStyles: true,
  },
});
