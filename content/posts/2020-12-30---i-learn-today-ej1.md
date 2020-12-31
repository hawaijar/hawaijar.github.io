---
title: I learn today - Effective Java - Item 1
date: "2020-12-30T06:09:25.475Z"
template: "post"
draft: false
slug: "i-learn-today-30-Dec-2020"
category: "Java"
tags:
  - "Java"
  - "Core Java"
  - "Language"
  - "Effective Java"
description: "Effective Java - Item 1 - CONSIDER STATIC FACTORY METHODS INSTEAD OF CONSTRUCTORS"
---

![Effective Java - Third Edition](https://images-na.ssl-images-amazon.com/images/I/41zLisPNN2L._SX258_BO1,204,203,200_.jpg)
> _Effective Java_ consists of several **"items,"** each presented in the form of a short, stand-alone essay that provides specific advice, insight into Java platform subtleties, and updated code examples. The comprehensive descriptions and explanations for each item illuminate what to do, what not to do, and why.
>
> The goal of the series is to extend the concept with my examples to complement the idea and understanding, though each item in the book contains enough examples and illustrations to prove the points.


  ## ITEM 1: CONSIDER STATIC FACTORY METHODS INSTEAD OF CONSTRUCTORS

  We know that _static_ members belong to _class_ and not to _instances_. And we also know that _constructors_ are the _only_ means of creating instances (until now!). Well, _this item_ introduces another way of creating instance - _static factory method_ and in some cases (which we'll be seeing with examples) yields a better way of creating instances.
  Let's see with an example -

  Say, we have a class _Book_ as follow -

  ```java

  class Book {
	public String name;
	public String author;
	public int ranking;
	public String publisher;
	// normal constructor(s)
	public Book(String name, String author, int ranking, String publisher) {
		this.name = name;
		this.author = author;
		this.ranking = ranking;
		this.publisher = publisher;
	}
	public Book(String name, String author) {
		this.name = name;
		this.author = author;
	}
	public Book(String name, String author, String publisher) {
		this.name = name;
		this.author = author;
		this.publisher = publisher;
	}
	// default constructor
	public Book(){}
  }
  ```

  As you can see above, there are four(4) constructors (it could be more!) that we would use based on different parameters.

  ##Key Takeaways 

  > One advantage of static factory methods is that, unlike constructors, they have names.

  Let's add a static method in the above class (assume the following code are inside the above Book class).
  As you can see, unlike a constructor(whose name always matches class name), we can define a meaningful factory method name.

  ```java
  public static Book createBook(
    String name, 
    String author, 
    String publisher, 
    boolean topRanking) {
      /* return an instance of book */
  }
  ```

  > A second advantage of static factory methods is that, unlike constructors, they are not required to create a new object each time they’re invoked

Below, we always return an initialized static property(_aka singleton_) when matching some input parameters

  ```java
  public static Book createBook(...) 
  {
    final private static Book TREASURE_ISLAND = 
    new Book("Treasure Island", "R.L Stevenson");

    if(name.equals("Treasure Island"))
    {
      return TREASURE_ISLAND;
    }
  }
  ```

  > A third advantage of static factory methods is that, unlike constructors, they can return an object of any subtype of their return type. A fourth advantage of static factories is that the class of the returned object can vary from call to call as a function of the input parameters.

  Let's add a few subclasses of the _Book_ class:

  ```java
  class Biography extends Book {
	final private Category category;
	public static Biography MY_EXPERIMENT_WITH_TRUTH =
			new Biography("My experiment with truth", "M.K Gandhi");
	private Biography(String name, String author) {
		super(name, author);
		this.category = Category.BIOGRAPHY;
	}
	@Override
	public String toString() {
		return "Biography{" +
				"name='" + name + "'\t" +
				"author='" + author + "'\t" +
				"category='" + category + "'" +
				'}';
	}
}
class Comics extends Book {
	final private Category category;
	public Comics(String name, String author, String publisher) {
		super(name, author, publisher);
		this.category = Category.COMICS;
	}

	@Override
	public String toString() {
		return "Comics{" +
				"name='" + name + "'\t" +
				"author='" + author + "'\t" +
				"category='" + category + "'" +
				'}';
	}
}
class Fiction extends Book {
	final private Category category;
	public Fiction(String name, String author, String publisher) {
		super(name, author, publisher);
		this.category = Category.FICTION;
	}
}
class Poem extends Book {
	final private Category category;
	public Poem(String name, String author, String publisher) {
		super(name, author, publisher);
		this.category = Category.POEM;
	}
}
```
The idea of this point is that, unlike constructor, static factory method can return instances of subclasses as shown below:

```java
if(
  publisher.toLowerCase().contains("dc") 
    || 
  publisher.toLowerCase().contains("marvel")
) 
{
  return new Comics(name, author, publisher);
}
else if(name.toLowerCase().contains("harry porter")) {
  return new Fiction(name, author, publisher);
}
else if(author.toLowerCase().contains("emily dickinson")) {
  return new Poem(name, author, publisher);
}
```

> A fifth advantage of static factories is that the class of the returned object need not exist when the class containing the method is written

This is the most complex point(at least to me), at first, to understand it. The idea is that we can define a generic static factory method that depends on the user's configuration that determines what class to be instantiated during the runtime.

Unlike constructors, the instance of the class is determined at the run time. Yes, something in the line of _dependency injection_, to be precise.

Here is the best example I could come up (after taking some time on the net) -
https://stackoverflow.com/questions/11823773/understanding-the-concept-behind-service-provider-framework-like-jdbc-using-the

```java
if(topRanking) 
{
  // Here, we don't know what's the 'top ranking book'.
  // Whoever, using this static factory method has to define 
  // their own 'top ranking book' based on their preferences 
  // and get the instance of it.
  return (Book) Class.forName(System.getProperty("top-ranking-book")).newInstance();
}

```

Here is the gist containing the complete working code -

`gist:hawaijar/42e798f6b0936798e93080933a8b8da6`

  
  