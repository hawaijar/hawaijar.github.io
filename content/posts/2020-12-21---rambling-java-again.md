---
title: Rambling about Java - Part I
date: "2020-12-21T23:46:37.121Z"
template: "post"
draft: false
slug: "Java"
category: "Java"
tags:
  - "Java"
  - "Core Java"
  - "Language"
description: "Learning again the most confusing parts of Java, one step at a time - Scope, Package"
socialImage: "/media/heap.jpg"
---

  ##ITEM 1: PACKAGE NAMES ARE LIKE FAMILY NAMES

  In Java, we arrange (or rather, group) files (source code) based on their common functionality, characteristics, or behaviors. Say, if we have Rose, Lily, Lavenders, etc, we would rather group them in a **flower** category. Similarly, we will put Dog, Cat, Horse in an **animal** category.

  In Java, source files are commonly (and recommended) to organize based on what functionality they're doing. We have **java.util.function** package containing all the classes (and interfaces) related to functional interface, for example.

  Within a package, each class can refer to the other classes without using the package name. It is like calling our family members by their first name say, __John__. However, if our John is in the public, there might be some other John(s) like __John Wick__, __John Woo__, __John carpenter__ etc. and therefore he would be better call out (outside the family) as __John Hawaijar__, where __Hawaijar__ being the last name (family name)

  Ironically, if we invite __John Wick__ to a family dinner, we would call him as simply __John__ and not __John Wick__ because we know he is John Wick (_Off course, we have to be sure of our facial gesture (and direction) when we call out John as we have our John too in the family!_)

  The way of inviting another person in the family and called by their first name is what the __import__ statement is doing in Java.

  When we say, 
  ```java
    import java.util.List;
    import java.util.Arrays;

    ....
    ....

    List people = Arrays.asList("John Wick", "John Doe", "John Hawaijar");
  ```
  We are inviting other classes in our class file and we don't need to use their fully qualified names.

  However, without importing the packages, we have to use the fully qualified name of those classes (just like we have to use a person's full name - first name, last name, in the public to avoid name conflicts) as shown below -
  ```java
  ...
  ...
  java.util.List people = java.util.Arrays.asList("John Wick", "John Doe", "John Hawaijar");

  ```

  #### Which one is better? 

  In most of the cases, we import packages and used their class names (as in the first example) because that makes the code clean and legible.


 _Note_: _I want to credit the title of this section to **Simon Roberts** as I run into this amazing metaphor when he talked about the package topic in his O'Reilly OCP course https://learning.oreilly.com/learning-paths/learning-path-oca/9780135944844/_