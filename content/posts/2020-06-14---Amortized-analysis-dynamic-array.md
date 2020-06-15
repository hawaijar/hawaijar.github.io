---
title: Amortized analysis - Dynamic Array
date: "2020-06-14T23:46:37.121Z"
template: "post"
draft: false
slug: "algorithm-analysis"
category: "Alogorithm Analysis"
tags:
  - "Algorithm"
  - "Array"
description: "Amortized analysis - Dynamic Array"
socialImage: "/media/heap.jpg"
---
Amortized analysis tries to bring out the average cost of an algorithm that is composed of multiple types of operations. Asymptotic analysis (Big-O) tries to compute the worse case complexity of an algorithm assuming that all operations are same (computational cost) in nature. In some case, an algorithm may composed of different types of operations whose computational speeds are way different (each other or among themselves) and treating them at same par may not accurately render the overall complexity of those algorithms. In those cases, we need to find the average cost (or complexity) of an algorithm using Amortized analysis.

Let's say we've an algorithm that consists of two types of operations - F (for fast) and S (for slow). Also imagine that S's operations happen very less frequently than that of F's operations in the algorithm. On top of that, let's also assume that the executions of S's operations help to let more F's operations happen in the near future. In other words, execution of an S operation makes more F's operations happen in the near future. In such situation, how are we going to evaluate the overall complexity of an algorithm? That's where Amortized analysis are being used to solve such problem. 