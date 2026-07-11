---
title: '【AAAI 2020】TANet: Robust 3D Object Detection from Point Clouds with Triple Attention'
date: 2022-09-21
venue: AAAI 2020
thumbnail: ../../assets/papers/2020-aaai-tanet.png
topics: [自动驾驶]
---

本文专注于探索点云中三维目标检测的鲁棒性，这在现有方法中很少讨论。本文观察到两个关键现象：1）困难的物体（例如行人）的检测精度不令人满意，2）当添加额外的噪声点时，现有方法的性能迅速下降。为了缓解这些问题，本文引入了一种新颖的三元注意力网络，命名为TANet，其主要包含一个三重注意模块和一个由粗到精回归模块。三元注意力模块通过同时考虑通道级、点级和体素级的注意力，增强了目标物的关键信息，同时抑制了不稳定的干扰点。此外，由粗到精回归模块在没有过多引入计算成本的情况下提高了定位的准确性。 在通用的自动驾驶数据集KITTI上，实验结果表明，在具有挑战性的噪声情况下，本文所提出的方法远远超出了当前最先进的方法。此外，在 KITTI 三维目标检测排行榜上，TANet在行人类上排名第一且能实现大约29 FPS的实时检测。

文章链接：https://ojs.aaai.org/index.php/AAAI/article/view/6837

开源代码：https://github.com/happinesslz/TANet
