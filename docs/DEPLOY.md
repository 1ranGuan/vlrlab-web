# 部署指南（Cloudflare Pages + GitHub + 自定义域名）

本站是 Astro 静态站点，部署到 **Cloudflare Pages**：连接 GitHub 仓库后，每次 `git push` 自动构建并发布，自带免费 HTTPS 与全球 CDN。

> 一次性配置约 20–30 分钟。之后维护者加内容只需推送到 GitHub，网站自动更新。

---

## 总览

```
本地仓库 ──push──▶ GitHub 仓库 ──自动触发──▶ Cloudflare Pages 构建(npm run build)
                                                    │
                                            发布 dist/ 到全球 CDN
                                                    │
                                          绑定自定义域名 vlrlab.com（HTTPS）
```

需要三个账号（都免费）：**GitHub**、**Cloudflare**、**域名注册商**（域名）。

---

## 第 1 步：域名（已在阿里云注册 vlrlab.com）

在任一注册商购买域名（本项目已在阿里云注册 `vlrlab.com`）：

- 国际：Cloudflare Registrar（**最推荐**，见下方说明）、Namecheap、Porkbun、GoDaddy
- 国内：阿里云万网、腾讯云

> **强烈建议直接用 Cloudflare Registrar 买**：域名和托管在同一家，DNS 自动配好，省去第 5 步的手动改 DNS。若在别处买，按第 5 步改 DNS 即可。

买好后先不用管，记住域名即可。

---

## 第 2 步：把代码推到 GitHub

### 2.1 在 GitHub 建一个空仓库

1. 登录 <https://github.com> → 右上角 **+** → **New repository**
2. 仓库名随意（如 `vlrlab-web`），**Private 或 Public 均可**
3. **不要**勾选 "Add README / .gitignore / license"（本地已有）
4. 创建后，复制它给出的仓库地址（形如 `git@github.com:你的用户名/vlrlab-web.git` 或 `https://github.com/你的用户名/vlrlab-web.git`）

### 2.2 本地推送

本地仓库已 `git init` 并完成首次 commit（见文末）。执行：

```bash
cd /path/to/vlrlab_web
git remote add origin <上一步复制的仓库地址>
git push -u origin main
```

> 若用 HTTPS 地址且提示登录：GitHub 已不支持密码，需用 **Personal Access Token**（Settings → Developer settings → Tokens）当密码；或改用 SSH 地址。
> 网络：若 push 超时，本机可先 `proxy_on`（FlClash 代理）再重试。

推送成功后，刷新 GitHub 仓库页面应能看到全部代码。

---

## 第 3 步：Cloudflare Pages 连接仓库

1. 注册/登录 <https://dash.cloudflare.com>
2. 左侧 **Workers 和 Pages** → **创建** → 选 **Pages** 选项卡 → **连接到 Git**
3. 授权 Cloudflare 访问你的 GitHub，选中刚建的仓库
4. **构建设置**（关键，照填）：

   | 项 | 值 |
   |---|---|
   | 框架预设 Framework preset | **Astro**（选了会自动填下面两项） |
   | 构建命令 Build command | `npm run build` |
   | 构建输出目录 Build output directory | `dist` |
   | 根目录 Root directory | 留空（仓库根） |

   > Node 版本已由仓库里的 `.node-version`（=22）指定，无需手动设。
   > 若框架预设里没有 Astro，手动填上面的「构建命令」和「输出目录」即可。

5. 点 **保存并部署 Save and Deploy**

Cloudflare 会拉代码、跑 `npm run build`、发布 `dist/`。约 1–3 分钟后给你一个 `xxx.pages.dev` 的临时地址——打开它就能看到网站了（此时已可用，只是还没绑自定义域名）。

---

## 第 4 步：绑定自定义域名 vlrlab.com

1. 在该 Pages 项目页 → **自定义域 Custom domains** → **设置自定义域**
2. 输入你的域名（如 `vlrlab.com`，以及可选的 `www.vlrlab.com`）→ 继续
3. 之后分两种情况：

### 情况 A：域名就在 Cloudflare（第 1 步用 Cloudflare Registrar 买的）
Cloudflare 自动添加 DNS 记录，几分钟后域名生效、HTTPS 证书自动签发。**完成。**

### 情况 B：域名在别处买的
Cloudflare 会提示你去注册商后台加一条 DNS 记录（通常是 `CNAME` 指向 `xxx.pages.dev`，根域名可能给 `A`/`CNAME flattening` 记录）。按提示在注册商 DNS 面板添加即可。见第 5 步。

---

## 第 5 步（仅情况 B）：在注册商配 DNS

到你买域名的注册商 DNS 管理页，按 Cloudflare 给出的提示添加记录。典型：

| 类型 | 名称/主机 | 值 |
|---|---|---|
| CNAME | `www` | `你的项目.pages.dev` |
| CNAME 或 A | `@`（根域名） | 按 Cloudflare 提示（多为 `你的项目.pages.dev` 或指定 IP） |

保存后等待 DNS 生效（几分钟到几小时）。Cloudflare 会自动签发 HTTPS 证书。

> 更省事的做法：把整个域名的 **Nameserver（NS）改成 Cloudflare 的**（Cloudflare 免费套餐引导你做），之后所有 DNS 都在 Cloudflare 管，绑定 Pages 一键完成。

---

## 第 6 步：把 site 改成最终域名

域名生效后，改一处配置让 sitemap / SEO 链接正确：

1. 编辑 [`astro.config.mjs`](../astro.config.mjs)，把 `site` 改成你的域名：
   ```js
   site: 'https://vlrlab.com',   // ← 换成你的真实域名（结尾无斜杠）
   ```
2. 提交推送：
   ```bash
   git add astro.config.mjs
   git commit -m "chore: 设置正式域名"
   git push
   ```
   推送后 Cloudflare 自动重新构建部署。**全部完成。**

---

## 日常维护：以后怎么更新网站

加内容（论文/新闻/成员等，见 [CONTENT_GUIDE.md](../CONTENT_GUIDE.md)）后：

```bash
npm run check        # 本地校验（可选但推荐）
git add -A
git commit -m "内容：新增 XXX"
git push             # 推送后 Cloudflare 自动构建、发布，约 1–2 分钟上线
```

无需登录 Cloudflare 后台，push 即部署。可在 Cloudflare Pages 项目页看每次部署状态与日志。

---

## 常见问题

- **构建失败**：看 Cloudflare 部署日志。最常见是内容文件字段写错——本地先 `npm run check` 能提前发现。
- **Node 版本问题**：本仓库 `.node-version` 已锁 22；若日志报 Node 版本不符，确认该文件在仓库里。
- **图片没优化/很大**：`src/assets/` 下的图会被 Astro 自动转 WebP/AVIF；`public/` 下的原样输出。确保内容图片放在 `src/assets/**` 并用 `<Image>` 引用（现有组件已如此）。
- **国内访问慢**：Cloudflare 免费版在中国大陆走海外节点，速度不稳定。这是免费方案的固有限制；若日后需要国内加速，可评估国内云厂商（阿里云/腾讯云 + CDN），但需 ICP 备案。构建产物是纯静态文件，换平台不影响代码。
- **想先不绑域名**：跳过第 4–6 步，直接用 `xxx.pages.dev` 访问即可，域名随时可后补。

---

## 备选：不用 GitHub，命令行直传（wrangler）

若暂时不想用 GitHub，可用 Cloudflare 的 CLI 直接传 `dist/`：

```bash
npm run build
npx wrangler pages deploy dist --project-name vlrlab
```

首次会引导登录 Cloudflare。缺点：没有 push 自动部署，每次更新要手动跑这两条命令。**推荐还是用 GitHub 方式（第 2–3 步）。**
