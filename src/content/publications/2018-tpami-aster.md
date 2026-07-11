---
title: '【TPAMI 2018】ASTER: An Attentional Scene Text Recognizer with Flexible Rectification'
date: 2018-06-25
venue: TPAMI 2018
thumbnail: ../../assets/papers/2018-tpami-aster.png
topics: [文档图像智能]
---

Aster是一个用于处理各种形变、不规则布局文本的识别算法，是RARE (CVPR 2016)的扩展版。 Aster包含了一个矫正网络以及一个识别网络，是可以端到端训练的神经网络。矫正网络通过Thin-Plate Spline变换将文本进行矫正。识别网络则是一个带有注意力机制的sequence-to-sequence模型，可以识别出被矫正图像上的字符序列。ASTER在文本图像识别任务以及端到端的整图文本识别任务中都展现了优异的性能。

ASTER is an extended version of the RARE (CVPR 2016) text recognition algorithm to handle text with distortions or irregular layout. Aster is an end-to-end neural network model that comprises a rectification network and a recognition network. The rectification network can rectify the text by a flexible Thin-Plate Spline transformation. The recognition network is an attentional sequence-to-sequence model that predicts a character sequence from the rectified image. ASTER shows superior performance on cropped text recognition and end-to-end recognition tasks.

文章链接：https://ieeexplore.ieee.org/abstract/document/8395027

代码地址：https://github.com/bgshih/aster

发表刊物：IEEE transactions on pattern analysis and machine intelligence (TPAMI), 2018
