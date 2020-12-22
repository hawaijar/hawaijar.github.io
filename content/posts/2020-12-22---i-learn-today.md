---
title: I learn today - Collections.checkedList
date: "2020-12-22T06:11:49.475Z"
template: "post"
draft: false
slug: "i-learn-today-22-Dec-2020"
category: "Java"
tags:
  - "Java"
  - "Core Java"
  - "Language"
description: "An application of Proxy Pattern in Java language"
---

  ## WHAT IS A PROXY PATTERN?

  To me, it's a way of controlling access to a target object. 

  Let's see with an example -

  Say, we have a class Account as follow -

  ```java

  class Account {
    private int balance;
    public void credit(int amount) {
      balance += amount;
    }
    public void debit(int amount) {
      balance -= amount;
    }
  }
  ```
  One problem with the above _debit()_ is that we don't want to debit if there's no sufficient fund available. So we need a way to avoid direct access to these methods (credit & debit). One way is to create a mediator that checks these things and that's where the _proxy pattern_ comes into play.

  Here is the mediator class -

  ```java
  class AccountProxy {
    private Account account = new Account();
    public void credit(int amount) {
      account.balance += amount;
    }
    public void debit(int amount) {
      if(account.balance < amount) {
        throw new Exception("Insufficient fund to withdraw");
      }
      else {
        account.balance -= amount;
      }
    }
  }
  ```

  And here is the client code -

  ```java
  public static void main(String[] args) {
    AccountProxy p = new AccountProxy();
    p.credit(100);
    p.debit(120); // here, it'll throw an exception
  }
  ```

### How does these relate to _Collections.checkedList_?

Let's take an example and try to co-relate with the above Account example.

Say, we have our code like this -
```java
public class FloristTest {
	public static void main(String[] args) {
		Florist jane = new Florist();
		List<String> flowers = new ArrayList<>();
		jane.addFlowers(flowers);
		for(String flower: flowers) {
			System.out.println(flower);
		}
	}
}
```
In the above, we want to buy flowers from _Jane_, asking her to get some flowers. However, by mistake, she slip her 5 cents in the flower pot as shown below -

```java
public class Florist {
	private List flowers;
	public void addFlowers(List flowers) {
		flowers.add("Alyssa");
		flowers.add("Erica");
		flowers.add("Daisy");
		flowers.add(5); // invalid data!
	}
}
```

When we run our code (FloristTest.java), here's what is throwing an exception. Unfortunately, the exception is pointing at our code and that's not the case.

```
Exception in thread "main" java.lang.ClassCastException: class java.lang.Integer cannot be cast to class java.lang.String (java.lang.Integer and java.lang.String are in module java.base of loader 'bootstrap')
	at hawaijar.collections.FloristTest.main(FloristTest.java:10)

```

The point is that, though we defined our flowers as _List<String> flowers_, there's no way for the compiler to check the _unchecked list_ in the _addFlowers()_ because that's also valid syntax!

Imagine we're invoking hundreds of other third-party code and if they're using _unchecked list_, where anything (of Object type) is allowed to add, we'll have a problem in using those lists returned from them. And worse, finding from where the exception is causing would be a nightmare.

To help finding where the exception is throwing, just like our _Account Proxy_ whose sole purpose is to throw an exception when something unintended happen, Java API introduced _Collections.checkedXXX_ methods where _XXX_ could be of various collection types. In our case, we will be using _Collections.checkedList()_ to see how it finds out the right spot of the error.

Here's the updated class -

```java

public static void main(String[] args) {
		Florist jane = new Florist();
		List<String> flowers = new ArrayList<>();
		flowers = Collections.checkedList(flowers, String.class);
		jane.addFlowers(flowers);
		for(String flower: flowers) {
			System.out.println(flower);
		}
	}
  ```

  When running the programs, we'll see where the problem occurs as shown below -

  ```
  Exception in thread "main" java.lang.ClassCastException: Attempt to insert class java.lang.Integer element into collection with element type class java.lang.String
	at java.base/java.util.Collections$CheckedCollection.typeCheck(Collections.java:3097)
	at java.base/java.util.Collections$CheckedCollection.add(Collections.java:3145)
	at hawaijar.collections.Florist.addFlowers(Florist.java:12)
	at hawaijar.collections.FloristTest.main(FloristTest.java:10)

  ```

  See those two things -
  1. Exception in thread "main" java.lang.ClassCastException: Attempt to insert class java.lang.Integer element into collection with element type class java.lang.String
  2. at hawaijar.collections.Florist.addFlowers(Florist.java:12)

  So, here the _Collections.checkedList()_ is nothing more than a (run-time) proxy that checks if there's any unintended operations happen and finds where it happens when such an event occurs. 

  During development time, we can insert that one line ```flowers = Collections.checkedList(flowers, String.class);``` and once everything is clear of any exceptions, we can remove them before pushing the code to production. It's mentioned that there's a cost (slight) involve in using this check method and so it's better to comment out (or remove) before we move (our code) to production.
  