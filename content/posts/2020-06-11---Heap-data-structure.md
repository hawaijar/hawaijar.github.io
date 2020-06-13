---
title: My mental model on Heap Structure
date: "2020-06-11T23:46:37.121Z"
template: "post"
draft: false
slug: "Heap-data-structure"
category: "Data Structure"
tags:
  - "Data Structure"
  - "Binary Tree"
  - "Array"
description: "A heap is a binary tree holding a distinct relation between every parent and their nodes - a parent's value (or key) is always less than (min-heap) or greater than (max-heap) their children "
socialImage: "/media/heap.jpg"
---

A heap is a binary tree holding a distinct relation between every parent and their nodes - a parent's value (or key) is always less than (min-heap) or greater than (max-heap) their children.

![Stacked, Balanced, Perfection. www.Studio51Film.com](/media/heap.jpg)

####TLDR 
Here's a quick take-away if you don't want to read the whole thing.

> A (min)heap data-structure (a.k.a Priority queue) is model as a binary tree where each parent node's value (or key) is always less than (or equal to) their children.

> They're conveniently implemented using an array.

> For a parent node at index 'n', you'll find their children at **2(n + 1)** and **2(n + 2)** indices.

> For a node at index 'n', you'll find its parent at index **Floor(n - 1)/2**

> For adding an element, we add at the end of the array and *bubble- up* the array(beginning).

> For deletion, we replace the first element with the last element and *bubble-down* the array(end).
---

We shall be explaining on "min-heap" though the same concept can be equivalently applied to "max-heap" as well.

The term "heap" doesn't reflect anything, at-least to me, on the nature of this tree (read - binary tree) and if you see the photo above, that's the real-world concept of a heap - a random collection of things placed hapahzardly on top of each other. However, the structure that we are discussing here maintains a strict ordering between the items and therefore doesn't resemble this mental modal whatsoever shape or form.

On top of this (difference between the real-concept and abstract-concept), almost all of the discussion on heap structure started right away explaining with Binary Tree structure and immediately implemented using the Array structure. <u>What is missing though is the explanation of why we model it as one structure (binary tree) but implemented with another structure (i.e. Array in this case)</u>. In order to understand this concern, we need to dive deeper and look again into the heap property and the algorithms to add and delete items from it.

Before that, you may ask me - how do I map (or hook) the concept of heap into my mental model? The way I remember is that <u>heap is nothing but a fancy name of “Priority Queue”</u> - a queue of things where each thing carries a weight called “priority” with it. In such queue, low priority element is served before an element with high priority (the reverse is true for max-heap)

With that interpretation, let's jump into the analysis.

1. Heap property - Every parent node (read as node's value) must be smaller  than or equal to its children (left & right child), In other words, every parent node must not be greater than its left and right sub-tree(s).

How would we satisfy this property using Binary Tree in all operations, notably during addition and deletion of items?

For binary search tree(BST), as the parent node is always between its left child and right child, insertion and deletion are easily done using a well-defined BST algorithms. 

For heap binary tree, let's start with a single node P. That is also a heap. No problem. Let's assume there're new items M and N coming in, and imagine that they're smaller than P. On what basis would you decide which one should be left and right child? You can't just decide randomly there. Again, if they are larger than P or if any one is larger than P, how would we decide the final arrangement without breaking the heap property. We can't arrange them randomly because it should work in all insertion and deletion operations.

Nonetheless, there're ways to implement this (https://stackoverflow.com/questions/18241192/implement-heap-using-a-binary-tree) arrangement using binary tree itself, but we'll not go into the details of them (perhaps another article to analyze theit complexity with that of Array implementation).

We will be looking at how Array might sove this issue of arranging parents and their child nodes (rather beautifully yet intituitively) though maintaining the heap property.

Before that, how do we map (or hook) into our mental model? The way I remember is that <u>heap is a fancy name of "Priority Queue"</u> - a queue of things where each thing carries a weight called "priority" with it. In such queue, low priority element is served before an element with high priority (the reverse is true for max-heap)

One key thing that you might already see in Array but not there in Tree is that - Array elements are uniquely ordered from 0, then 1, 2 and so on...And that's not the case with Tree and therefore we've different traversals of tree structure (Post Order, In order, Pre Order, Breadth-first, Depth-first etc). And most notably, an array index P, <u>is always less than any subsequent indices that come after it</u>. Sounds similar with the heap property?


Let's draw  binary tree representation of a min-heap structure and we'll see how it can be mapped to Array easily.

![Heap Binary Tree](/media/minheap.jpg)

The above binary tree can also be drawn as below. Why not? A tree could have wierd branches!😁

![A skewed heap binary tree](/media/waterfall.jpg)

And imagine, we map each element to an array as shown below -

![Binary Tree to Array mapping](/media/tree-array-map.jpg)

Voila! we mapped the binary tree into an array representation. And interesting thing is that, any array element can be treated as a parent node and all its children (which is on its right side, not necessarily adjacent one) will always be greater than or equal to its value. We now satisfied the heap property.

Also, for any array element (read as node in binary heap) at array index "n", you'll find its children (left and right child) at 2(n + 1) and 2(n + 2) respectively.

Finally, coming to the addition and deletion of items in Binary heap (refer TLDR above), the algorithm demands inserting element at the end or beginning of an array and that is a constant time, O(1) complexity in array, which is not so in a binary tree.

This explains the reason why we describes Heap structure as a Binary Tree but implemented rather as an Array structure.

I know this topic is in the longer side. We would also like to discuss the implementation and also two primary applications of heap data structure - 1) **Merging K-Sorted arrays** and 2) **Djikstra's shortest path algorithm**

We shall discuss these two in the next section. Stay tuned!

