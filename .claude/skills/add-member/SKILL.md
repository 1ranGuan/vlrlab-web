---
name: add-member
description: 把一位实验室成员（照片 + 姓名 + 可选信息）加到 VLR 实验室网站的「人员」页，并自动开 PR。当用户想“添加成员/加入实验室人员/把我的照片和名字加到成员页/新成员入组/add a lab member/add team member/put my photo and name on the members page”时使用。
---

# 添加实验室成员

本技能的完整操作步骤见仓库内的 harness 无关手册：

- 流程：[`docs/agent/add-member.md`](../../../docs/agent/add-member.md)
- 共享的「校验 → Git → PR」收尾流程与通用约束：[`docs/agent/README.md`](../../../docs/agent/README.md)

请打开并严格按该手册执行：收集 `name`/`role`（精确七选一）等字段 → 把照片复制到 `src/assets/team/` → 在 `src/content/team/` 写 `<name>.md` → `npm run check` → 建分支、commit、push、开 PR。
