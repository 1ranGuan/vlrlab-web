/**
 * 站点级配置（开发者维护）。稳定、需类型的信息放这里，而非内容集合。
 */
export const site = {
  name: 'Vision and Learning Representation Group',
  nameZh: '视觉与深度学习研究组',
  shortName: 'VLR Group',
  affiliation: '华中科技大学',
  affiliationEn: 'Huazhong University of Science and Technology',
  description:
    '华中科技大学 Vision and Learning Representation Group（VLR，白翔 / 刘永革团队）——计算机视觉、文档图像智能、自动驾驶感知、遥感检测、工业与医疗视觉方向的研究组。',
  // 部署到最终域名后更新。
  url: 'https://vlrlab.example.edu',
  copyrightYear: 2022,

  // 联系邮箱（老站页脚）。用 (at)/(dot) 混淆防爬，展示时还原。
  emails: [
    { label: 'xbai(at)hust(dot)edu(dot)cn', href: 'mailto:xbai@hust.edu.cn' },
    { label: 'xiang.bai(at)gmail(dot)com', href: 'mailto:xiang.bai@gmail.com' },
    { label: 'ylliu(at)hust(dot)edu(dot)cn', href: 'mailto:ylliu@hust.edu.cn' },
  ],

  // 顶部工具条的语言切换（英文版日后启用，暂指向占位）。
  englishHref: '/en/',
  englishLabel: 'English Version (Updating)',
} as const;

export type Site = typeof site;
