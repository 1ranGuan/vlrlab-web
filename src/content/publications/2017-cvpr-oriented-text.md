---
title: '【CVPR 2017】Detecting Oriented Text in Natural Images by Linking Segments'
date: 2017-07-30
venue: CVPR 2017
thumbnail: ../../assets/papers/2017-cvpr-oriented-text.jpg
topics: [文档图像智能]
---

SegLink是一种自下而上的文本检测算法。大多数先进的文本检测算法是针对水平的拉丁文本，并且速度难以满足实时性应用。SegLink将文本分解为两个独立的可检测的元素，分别称为segment和link。segment指包围单词或者文本行的可旋转框。link则是用于连接相邻的segment，用以指示segment属于同一单词或者文本行。这两个元素都可以通过神经网络进行预测。link对各个segment进行链接，从而组成最终检测结果。在水平、旋转以及多语言文本数据集上的卓越表现说明了SegLink的精度高、速度快和灵活性强的特点。

SegLink is a bottom-up text detection algorithm. Most state-of-the-art text detection methods are specific to horizontal Latin text and are not fast enough for real-time applications. SegLink decompose text into two locally detectable elements, namely segments and links. A segment is an oriented box covering a part of a word or text line; A link connects two adjacent segments, indicating that they belong to the same word or text line. Both elements are detected by neural network. Final detections are produced by combining segments connected by links. The superior performance on horizontal, oriented, and multi-lingual text datasets demonstrate that SegLink is accurate, fast and flexible.

文章链接：https://openaccess.thecvf.com/content_cvpr_2017/papers/Shi_Detecting_Oriented_Text_CVPR_2017_paper.pdf

代码地址：https://github.com/bgshih/seglink

发表刊物：IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2017
