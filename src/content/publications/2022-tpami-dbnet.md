---
title: '【TPAMI 2022】Real-Time Scene Text Detection with Differentiable Binarization and Adaptive Scale Fusion'
date: 2022-03-03
venue: TPAMI 2022
thumbnail: ../../assets/papers/2022-tpami-dbnet.png
topics: [文档图像智能]
featured: true
order: 2
---

DBNet++是DBNet (AAAI 2020) 文本检测算法的扩展版。该算法主要解决基于分割的文本检测方法需要复杂的后处理将像素级别的结果组合成文字行，导致预测时速度慢的问题。通过提出新颖的可微分二值化和自适应尺度融合模块，DBNet++达到了SOTA的性能，同时具备实时的运行速度。该算法被工业界广泛采用，如微信，OpenCV等。

DBNet++ is an extended version of the DBNet (AAAI 2020) text detection algorithm. The algorithm mainly addresses the problem that segmentation-based text detection methods require complex post-processing to combine pixel-level results into text lines, which leads to slow speedup in prediction. By proposing novel differentiable binarization and adaptive scale fusion modules, DBNet++ achieves SOTA performance with real-time runtime speed. The algorithm is widely adopted by industry, such as WeChat, OpenCV, etc.

文章链接：https://ieeexplore.ieee.org/abstract/document/9726868

代码地址：https://github.com/MhLiao/DB

发表刊物：IEEE transactions on pattern analysis and machine intelligence (TPAMI), 2022
