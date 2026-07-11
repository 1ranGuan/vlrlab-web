---
title: '【TPAMI 2017】An End-to-End Trainable Neural Network for Image-based Sequence Recognition (CRNN)'
date: 2017-03-29
venue: TPAMI 2017
thumbnail: ../../assets/papers/2017-tpami-crnn.png
topics: [文档图像智能]
featured: true
order: 5
---

CRNN全称为Convolutional Recurrent Neural Network，主要用于端到端地对图像中不定长文本序列进行识别，不需要先对单个字符进行切割，而是将文本识别转化为时序依赖的序列到序列学习问题。预测过程中，先使用标准的CNN网络提取文本图像的特征，再利用双向LSTM将特征向量进行融合以提取字符序列的上下文特征，然后得到每列特征的概率分布，最后通过基于时序连接序列解码(CTC)的转录层将特征向量解码为目标字符串序列。实验结果表明了该算法在场景文字识别中的优越性和实用性。

CRNN, Convolutional Recurrent Neural Network, is mainly used for end-to-end recognition of variable-length text sequences in images. It is not necessary to segment a single character first but to convert the text recognition task into a sequence-to-sequence learning problem. In the prediction process, the convolutional neural network is first used to extract the features of the text image, and then the bidirectional LSTM is used to fuse the feature vectors to extract the contextual information of the character sequence. After obtaining the probability distribution of each column of features, the CTC-based transcription layer decodes the feature vector into the target string sequence. The experimental results show the superiority and practicability of this algorithm in scene text recognition.

文章链接：https://ieeexplore.ieee.org/abstract/document/7801919/

代码地址：https://github.com/bgshih/crnn

发表刊物：IEEE transactions on pattern analysis and machine intelligence (TPAMI), 2017
