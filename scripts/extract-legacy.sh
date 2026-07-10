#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# extract-legacy.sh — 从 VSB9 离线导出提取图片/附件到 Astro 项目
#
# 用户提供的两个归档（当前目录下，均为 ZIP）：
#   vlrg_all_260709.vsbsitepackage  = CMS 数据库导出 + 模板 + file/_webprj/images/ 真实图片
#   vlrg_all_260709_local.sto       = /_vsl/ 哈希媒体库（论文缩略图/新闻配图/PDF），含 .properties 边车
#
# 本脚本纯本地运行，无需网络/代理。产物：
#   legacy/                → 两个归档解包后的完整内容（已 .gitignore，供人工翻查内容/图片）
#   src/assets/brand/      → logo
#   src/assets/hero/       → 首页 Hero 轮播图
#   src/assets/collaborators/ → 合作者头像
#   public/files/          → PDF/docx 附件
#
# 论文缩略图/新闻配图存放在 .sto 的哈希目录里，文件名不可读；本脚本把整个 .sto
# 解包到 legacy/sto/ 供人工按 wbnews.xml 的 wbpicurl 映射挑选，不自动改名（避免误配）。
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

PKG="vlrg_all_260709.vsbsitepackage"
STO="vlrg_all_260709_local.sto"
LEGACY="legacy"

for f in "$PKG" "$STO"; do
  [[ -f "$f" ]] || { echo "✗ 缺少归档：$f（请放在项目根目录）"; exit 1; }
done

echo "▶ 解包归档到 $LEGACY/ …"
rm -rf "$LEGACY"
mkdir -p "$LEGACY/pkg" "$LEGACY/sto"
unzip -q -o "$PKG" -d "$LEGACY/pkg"
unzip -q -o "$STO" -d "$LEGACY/sto"

IMG="$LEGACY/pkg/file/_webprj/images"

echo "▶ 提取 logo → src/assets/brand/ …"
mkdir -p src/assets/brand
cp -f "$IMG/vlr-logo-text3.png" src/assets/brand/logo.png

echo "▶ 提取 Hero 轮播图 → src/assets/hero/ …"
mkdir -p src/assets/hero
# 顺序对应老站 index 的 swiper-slide（首张为 2025 毕业季，带 caption）
cp -f "$IMG/2025_1.jpg"        src/assets/hero/01-graduation-2025.jpg
cp -f "$IMG/1018.jpg"          src/assets/hero/02.jpg
cp -f "$IMG/1017.jpg"          src/assets/hero/03.jpg
cp -f "$IMG/hp4.png"           src/assets/hero/04.png
cp -f "$IMG/hone2high/39.png"  src/assets/hero/05.png
cp -f "$IMG/hone2high/22.jpg"  src/assets/hero/06.jpg
cp -f "$IMG/hone2high/21.jpg"  src/assets/hero/07.jpg
cp -f "$IMG/hone2high/19.jpg"  src/assets/hero/08.jpg
cp -f "$IMG/hone2high/18.jpg"  src/assets/hero/09.jpg
cp -f "$IMG/hone2high/17.jpg"  src/assets/hero/10.jpg
cp -f "$IMG/hone2high/15.jpg"  src/assets/hero/11.jpg
cp -f "$IMG/hone2high/13.jpg"  src/assets/hero/12.jpg
cp -f "$IMG/hone2high/12.jpg"  src/assets/hero/13.jpg
cp -f "$IMG/hp1-new2.png"      src/assets/hero/14.png
cp -f "$IMG/hp2.jpg"           src/assets/hero/15.jpg
cp -f "$IMG/hp3.jpg"           src/assets/hero/16.jpg

# 比例修复：老站这些 Hero 图上传时被横向拉伸成 ~2.25:1（人物压扁变形）。
# 按 16:9 反推压缩宽度（高度不变）恢复正常比例；已接近 16:9 的（毕业照）跳过。
echo "▶ 修复 Hero 横向拉伸 → 统一 16:9 …"
for f in src/assets/hero/*.jpg src/assets/hero/*.png; do
  [ -f "$f" ] || continue
  read w h < <(sips -g pixelWidth -g pixelHeight "$f" 2>/dev/null | awk '/pixelWidth/{w=$2}/pixelHeight/{h=$2}END{print w,h}')
  [ -z "$w" ] || [ -z "$h" ] || [ "$h" -le 0 ] && continue
  ratio=$(echo "scale=3;$w/$h"|bc)
  if (( $(echo "$ratio > 1.85" | bc -l) )); then
    neww=$(echo "($h*16/9+0.5)/1" | bc)
    sips --resampleHeightWidth "$h" "$neww" "$f" >/dev/null 2>&1
    printf "  %-24s %sx%s → %sx%s (16:9)\n" "$(basename $f)" "$w" "$h" "$neww" "$h"
  fi
done

echo "▶ 提取合作者头像 → src/assets/collaborators/ …"
mkdir -p src/assets/collaborators
cp -f "$IMG/fabio.png"           src/assets/collaborators/fabio-roli.png
cp -f "$IMG/alan.png"            src/assets/collaborators/alan-yuille.png
cp -f "$IMG/zhuowen.png"         src/assets/collaborators/zhuowen-tu.png
cp -f "$IMG/serge.png"           src/assets/collaborators/serge-belongie.png
cp -f "$IMG/jiebo.png"           src/assets/collaborators/jiebo-luo.png
cp -f "$IMG/MarcelloPelillo.jpg" src/assets/collaborators/marcello-pelillo.jpg
cp -f "$IMG/longin.png"          src/assets/collaborators/longin-jan-latecki.png
cp -f "$IMG/LaurentNajman.png"   src/assets/collaborators/laurent-najman.png
cp -f "$IMG/Isabelle_Bloch.jpg"  src/assets/collaborators/isabelle-bloch.jpg
cp -f "$IMG/qitian2.png"         src/assets/collaborators/qi-tian.png
cp -f "$IMG/sven.png"            src/assets/collaborators/sven-dickinson.png

echo "▶ 提取 PDF/docx 附件 → public/files/ …"
mkdir -p public/files
find "$LEGACY/sto" -type f \( -iname '*.pdf' -o -iname '*.docx' \) -exec cp -f {} public/files/ \; 2>/dev/null || true

echo "▶ 提取论文缩略图 → src/assets/papers/ …"
mkdir -p src/assets/papers
# 老站 /_vsl/<hash> 路径 → .sto 的 local/<hash> → 语义化文件名。
# 若日后新增论文，缩略图直接放 src/assets/papers/ 并在 front-matter 引用即可，无需改此脚本。
copy_local() { # $1=hash 相对路径  $2=目标文件
  local src="$LEGACY/sto/local/$1"
  [[ -f "$src" ]] && cp -f "$src" "$2" || echo "  MISS: $1"
}
copy_local "7/0A/A4/F4F6270488BB22C50D27AB38CDB_2D1D8C27_15D82.png" src/assets/papers/2023-aaai-stereodistill.png
copy_local "9/27/B1/7C59AE494B095F1CBBA2B946026_BF770794_4DD65.png" src/assets/papers/2022-eccv-idol.png
copy_local "F/83/E0/8073C4C650D1C26DA8DD60F4ADF_15E3ACAB_19642.png" src/assets/papers/2022-tip-tadtr.png
copy_local "6/0D/9A/4B9A823374F982868852AB45686_E6EB44F1_6008D.png" src/assets/papers/2022-eccv-seqformer.png
copy_local "0/34/FB/169249839D911A30DCD8BD724C5_19691396_C6A28.png" src/assets/papers/2020-eccv-epnet.png
copy_local "C/7F/86/6E40D7B9D3519CF6FB0455D3E9D_82D82FFC_C73B.png" src/assets/papers/2020-aaai-tanet.png
copy_local "6/16/E8/8611648C5EDF8838248066AAE11_9AEE0BE4_13785.png" src/assets/papers/2022-scichina-defect-survey.png
copy_local "8/2F/E4/FF27BCB860800BB824390A5B668_404E8F77_3EDB9.png" src/assets/papers/2022-tpami-dbnet.png
copy_local "A/DE/53/9F55BEF3E13AB077DAF4AA14821_72B1E4BC_13EA1.png" src/assets/papers/2021-nmi-covid.png
copy_local "9/F6/F8/595F3571B36BC5F7FE72EAFE33E_1FAC1442_12BBA.png" src/assets/papers/2021-media-covid.png
copy_local "4/04/F0/1C50CFFF6E01EFCEBC154120441_4D2354B4_8D8B.png" src/assets/papers/2020-eccv-masktextspotterv3.png
copy_local "0/03/0F/087A9579A6FC2353FBCC45880B0_2BA9D294_408CA.png" src/assets/papers/2020-tpami-gliding-vertex.png
copy_local "A/F0/9B/C1C63E66B9D63155463300298CF_59B052BB_70F94.jpg" src/assets/papers/2018-cvpr-dota.jpg
copy_local "7/EE/A2/0BCDBAB8892208CB735E026A0FA_1EC1A657_17EE6.png" src/assets/papers/2018-tpami-aster.png
copy_local "1/F8/1E/64ACDB7CF1311B1677490E43D1B_14AB8A54_12F61.jpg" src/assets/papers/2017-cvpr-oriented-text.jpg
copy_local "C/F1/AF/E1ACA4492C63A28F4638D116B36_ADB759C6_1A7F9.png" src/assets/papers/2017-tpami-crnn.png

echo "▶ 提取新闻配图 → src/assets/news/ …"
mkdir -p src/assets/news
copy_local "C/3F/7F/CCA253405EBFA58B6FA5FB61748_6E660943_226C4.jpg"  src/assets/news/hljj-internet-plus-gold.jpg
copy_local "1/48/E3/23307CF95601551210341D2BF73_76AA2419_1C582.jpg"  src/assets/news/baidu-ding-erui.jpg
copy_local "8/D9/07/41E8B43DEFD2D5E222E9ED7D9AA_D122E23F_371C0.jpeg" src/assets/news/hubei-engineering-center.jpeg
copy_local "3/EA/B8/B56DCD0D859E4A218146250C730_B5D679D1_18436.png"  src/assets/news/ai-camp-2022.png

echo ""
echo "✓ 完成。图片已就位：src/assets/{brand,hero,collaborators,papers,news}/"
echo "  其余论文缩略图/新闻配图在 $LEGACY/sto/local/ （哈希命名），可按 wbnews.xml 的 wbpicurl 人工挑选。"
echo "  内容正文见 $LEGACY/pkg/data/wbnews.xml。"
