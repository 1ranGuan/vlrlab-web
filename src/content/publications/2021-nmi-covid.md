---
title: '【Nature Machine Intelligence 2021】Advancing COVID-19 diagnosis with privacy-preserving collaboration in artificial intelligence'
date: 2021-12-01
venue: Nature Machine Intelligence 2021
thumbnail: ../../assets/papers/2021-nmi-covid.png
topics: [医疗辅助诊断]
featured: true
order: 3
---

人工智能为简化新冠肺炎诊断提供了有前途的解决方案；然而，对于安全性和可信性的担忧阻碍了大规模医学数据的收集，这对临床实践中训练出一个有效的通用模型提出了挑战。为解决这一问题，本文启动了统一的 CT-COVID AI 诊断倡议（UCADI），在该倡议中，AI 模型可以在联邦学习框架下在每个托管机构进行分布式训练和独立执行，而无需共享数据。该联邦学习框架模型大大优于所有本地模型（中国的测试灵敏度/特异性为0.973/0.951，英国为0.730/0.942），与专业放射科医生的表现相当。本文在多中心异构数据集上评估了该模型，为模型所做的决策提供了直观解释，并分析了联邦学习过程中模型性能和通信成本之间的权衡。本研究基于从中国和英国23家医院收集的3336名患者的9573例胸部CT，推动了在数字健康中利用联邦学习保护隐私的前景。

Artificial intelligence provides a promising solution for streamlining COVID-19 diagnoses; however, concerns surrounding security and trustworthiness impede the collection of large-scale representative medical data, posing a considerable challenge for training a well-generalized model in clinical practices. To address this, we launch the Unified CT-COVID AI Diagnostic Initiative (UCADI), where the artificial intelligence (AI) model can be distributedly trained and independently executed at each host institution under a federated learning framework without data sharing. Here we show that our federated learning framework model considerably outperformed all of the local models (with a test sensitivity/specificity of 0.973/0.951 in China and 0.730/0.942 in the United Kingdom), achieving comparable performance with a panel of professional radiologists. We further evaluated the model on the hold-out (collected from another two hospitals without the federated learning framework) and heterogeneous (acquired with contrast materials) data, provided visual explanations for decisions made by the model, and analyzed the trade-offs between the model performance and the communication costs in the federated training process. Our study is based on 9,573 chest computed tomography scans from 3,336 patients collected from 23 hospitals located in China and the United Kingdom. Collectively, our work advanced the prospects of utilizing federated learning for privacy-preserving AI in digital health.

论文链接：https://www.nature.com/articles/s42256-021-00421-z

数据链接：https://transform.england.nhs.uk/covid-19-response/data-and-covid-19/national-covid-19-chest-imaging-database-nccid/

代码链接：https://github.com/HUST-EIC-AI-LAB/UCADI
