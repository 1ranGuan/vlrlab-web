---
title: '【ECCV 2020】Mask TextSpotter v3: Segmentation Proposal Network for Robust Scene Text Spotting'
date: 2020-11-27
venue: ECCV 2020
thumbnail: ../../assets/papers/2020-eccv-masktextspotterv3.png
topics: [文档图像智能]
---

Mask TextSpotter V3是首个端到端文本检测识别器Mask TextSpotter (ECCV 18, TPAMI 21) 的V3版本，在此前工作的基础上，该算法提出基于分割的候选生成网络，从而能更好处理各种不规则文本，此外，本算法还提出一种hard RoI masking机制，利用生成的候选多边形从特征图中提取对应信息，提供给后续模块。该算法刷新了各个benchmark的性能峰值，是Spotting算法的新标杆。

Mask TextSpotter V3 is the 3rd edition of the first end-to-end text spotter Mask TextSpotter (ECCV 18, TPAMI 21). Based on previous work, this method proposed Segmentation Proposal Network, for better handling various irregular text. Besides, this algorithm proposed hard RoI masking mechanism, which applies polygonal proposals to RoI features for later module. Mask TextSpotter V3 refreshes the performance peaks of various benchmarks and is a new SOTA for the text spotting area.

文章链接：https://link.springer.com/chapter/10.1007/978-3-030-58621-8_41

代码链接：https://github.com/MhLiao/MaskTextSpotterV3

发表刊物：European Conference on Computer Vision (ECCV), 2020
