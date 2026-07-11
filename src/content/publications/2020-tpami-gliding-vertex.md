---
title: '【TPAMI 2020】Gliding Vertex on the Horizontal Bounding Box for Multi-Oriented Object Detection'
date: 2019-11-21
venue: TPAMI 2020
thumbnail: ../../assets/papers/2020-tpami-gliding-vertex.png
topics: [遥感检测]
---

本文提出了一个简单而有效的检测多方向对象的框架。该方法不直接回归四个顶点，而是滑动每个对应边上的水平边界框的顶点，以准确描述多方向对象。具体来说，本文回归了四个长度比，这四个长度比值表征了每一侧的相对滑动偏移量。这可以避免定向对象顺序标签点的混淆问题。为了进一步解决近水平对象的混淆问题，我们还引入了一个基于对象与其水平边界框之间面积比的倾斜因子，指导每个对象的水平或定向检测的选择。我们将这五个额外的目标变量添加到Faster R-CNN的检测头中，这需的额外计算时间是可以忽略的。大量实验结果表明，该方法在多个多方向目标检测基准上都取得了优异的性能，包括航空图像中的目标检测、场景文本检测、鱼眼图像中的行人检测。

In this paper, we propose a simple yet effective framework to detect multi-oriented objects. Instead of directly regressing the four vertices, we glide the vertex of the horizontal bounding box on each corresponding side to accurately describe a multi-oriented object. Specifically, We regress four length ratios characterizing the relative gliding offset on each corresponding side. This may facilitate offset learning and avoid the confusion issue of sequential label points for oriented objects. To further remedy the confusion issue for nearly horizontal objects, we also introduce an obliquity factor based on the area ratio between the object and its horizontal bounding box, guiding the selection of horizontal or oriented detection for each object. We add these five extra target variables to the regression head of faster R-CNN, which requires ignorable extra computation time. Extensive experimental results demonstrate that without bells and whistles, the proposed method achieves superior performances on multiple multi-oriented object detection benchmarks including object detection in aerial images, scene text detection, and pedestrian detection in fisheye images.

[论文链接]

[代码链接]
