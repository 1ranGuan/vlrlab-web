---
title: '【ECCV 2020】EPNet: Enhancing Point Features with Image Semantics for 3D Object Detection'
date: 2022-09-21
venue: ECCV 2020
thumbnail: ../../assets/papers/2020-eccv-epnet.png
topics: [自动驾驶]
---

在本文中，我们旨在解决 3D 检测任务中的两个关键问题，包括利用多个传感器（即 LiDAR 点云和相机图像）的融合，以及定位和分类置信度之间的不一致。为此，我们提出了一种新颖的融合模块，以逐点的方式用带有丰富语义信息的图像特征来增强点云特征。此外，采用一致性强制损失来鼓励定位和分类置信度的一致性。通过集成这两个组件，我们设计了一个名为 EPNet 的端到端可学习框架。在 KITTI 和 SUN-RGBD 数据集上的大量实验证明了 EPNet 优于最先进的方法。

文章链接：https://link.springer.com/chapter/10.1007/978-3-030-58555-6_3

开源代码：https://github.com/happinesslz/EPNet
