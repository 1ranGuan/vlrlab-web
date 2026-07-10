# 手册：添加一位实验室成员

目标：把一位成员（照片 + 姓名 + 可选信息）加到「实验室人员」页。成员页会自动按角色分组展示新成员，无需改任何代码。

> 落点：Markdown → `src/content/team/<name>.md`；头像 → `src/assets/team/<name>.<ext>`。
> 收尾（校验 / Git / PR）见 [README.md](./README.md) 的「共享收尾流程」。

## 步骤

### 1. 收集字段

必填：

- `name`：中文姓名，如 `张三`。
- `role`：**精确七选一** —— `教授` / `博后` / `博士生` / `硕士生` / `毕业生` / `实验室助理` / `以往成员`。

可选（用户提供才写，不填就省略该行）：

| 字段 | 说明 | 示例 |
|---|---|---|
| `nameEn` | 英文名 | `San Zhang` |
| `title` | 职称/头衔 | `教授、博士生导师` |
| `email` | 邮箱 | `zhangsan@hust.edu.cn` |
| `homepage` | 个人主页（须是合法 URL） | `https://…` |
| `interests` | 研究兴趣（数组） | `[目标检测, 视频理解]` |
| `enrollYear` | 入学年份（学生用，字符串） | `'22'` |
| `gradYear` | 毕业年份（毕业生/以往成员分组用，数字） | `2025` |
| `order` | 同组内排序，越小越靠前（默认 999） | `10` |

缺 `name` 或 `role` 时，向用户追问后再继续。若用户没给 `order`，可省略（排到本组末尾）。

### 2. 处理照片

- 让用户提供本地图片路径（或已放到某处的图片）。把它**复制**到 `src/assets/team/`，文件名用**中文姓名**（沿用现有约定，如 `张三.jpg`）。保留原扩展名（`.jpg` 或 `.png`）。

  ```bash
  cp <用户的图片路径> src/assets/team/张三.jpg
  ```

- frontmatter 里用相对路径引用：`photo: ../../assets/team/张三.jpg`。
- **没有照片**：省略整行 `photo`。成员卡片会自动显示姓名首字占位（见 `src/components/ui/MemberCard.astro`），不会报错。

### 3. 写内容文件

在 `src/content/team/` 新建 `<name>.md`（新成员直接用姓名，不需要老站那种 `-数字` 后缀）。模板：

```markdown
---
name: 张三
role: 硕士生
nameEn: San Zhang            # 可选
title: 教授、博士生导师       # 可选（一般只有教授/讲师填）
photo: ../../assets/team/张三.jpg   # 可选；没照片就删掉这行
email: zhangsan@hust.edu.cn  # 可选
homepage: https://…          # 可选
interests: [目标检测, 视频理解] # 可选
enrollYear: '22'             # 可选（学生）
order: 10                    # 可选
---

张三的个人简介（可选，支持 Markdown）。
```

只写用户实际提供的字段，其余整行删除。正文（简介）可留空。

### 4. 收尾

按 [README.md](./README.md) 的「共享收尾流程」执行：`npm run check` → 建分支 `content/add-member-<name>` → commit（`内容：新增成员 <name>`）→ push → 开 PR。
