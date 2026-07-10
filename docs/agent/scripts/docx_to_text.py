#!/usr/bin/env python3
"""把 Word .docx 解析成纯文本（每段一行），打印到 stdout。

纯 Python 标准库实现，无需 pandoc / python-docx，任何 Python 3 都能跑。
用法：
    python3 docx_to_text.py <路径/文件.docx>

原理：.docx 是一个 zip 包，正文在 word/document.xml 里。
每个段落是一个 <w:p>，段落里的文字分散在若干 <w:t> 里；
<w:tab/> 视作制表符，<w:br/> / <w:cr/> 视作段内换行。
表格单元格 <w:p> 也会被逐段取出（不重建表格结构，只提取文字）。
"""

import sys
import zipfile
import xml.etree.ElementTree as ET

# WordprocessingML 命名空间
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def paragraph_text(p: ET.Element) -> str:
    """从一个 <w:p> 元素里按文档顺序拼出纯文本。"""
    parts = []
    for node in p.iter():
        tag = node.tag
        if tag == W + "t":
            parts.append(node.text or "")
        elif tag == W + "tab":
            parts.append("\t")
        elif tag in (W + "br", W + "cr"):
            parts.append("\n")
    return "".join(parts)


def docx_to_text(path: str) -> str:
    with zipfile.ZipFile(path) as z:
        with z.open("word/document.xml") as f:
            xml_bytes = f.read()

    root = ET.fromstring(xml_bytes)
    body = root.find(W + "body")
    if body is None:
        return ""

    lines = []
    # 只遍历 body 的直接/嵌套段落，按出现顺序输出
    for p in body.iter(W + "p"):
        text = paragraph_text(p).strip()
        if text:
            lines.append(text)
    return "\n\n".join(lines)


def main(argv):
    if len(argv) != 2:
        sys.stderr.write("用法: python3 docx_to_text.py <文件.docx>\n")
        return 2
    path = argv[1]
    if not path.lower().endswith(".docx"):
        sys.stderr.write(
            "只支持 .docx。若是老的 .doc，请在 Word 里另存为 .docx / .md / PDF 后重试。\n"
        )
        return 2
    try:
        text = docx_to_text(path)
    except FileNotFoundError:
        sys.stderr.write(f"文件不存在: {path}\n")
        return 1
    except zipfile.BadZipFile:
        sys.stderr.write(
            f"不是有效的 .docx（zip）文件: {path}\n"
            "若是老的 .doc，请另存为 .docx / .md / PDF 后重试。\n"
        )
        return 1
    except KeyError:
        sys.stderr.write("在 .docx 中找不到 word/document.xml，文件可能损坏。\n")
        return 1

    sys.stdout.write(text + "\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
