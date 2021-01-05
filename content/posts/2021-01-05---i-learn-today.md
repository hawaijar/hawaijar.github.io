---
title: I learn today - Java Exceptions 101
date: "2021-01-05T06:09:25.475Z"
template: "post"
draft: false
slug: "i-learn-today-05-Jan-2021"
category: "Java"
tags:
  - "Java"
description: "Java Exceptions 101"
---
## ITEM 1:
> In Java, anything except primitives is _Object_ and by that definition, _Exceptions_ are _Objects. Exceptions indicate that some events that shouldn't have happened (or intended) occurred in the system.  Broadly, there're two exceptional events:    **Exceptions and Errors**
>
> **Exceptions and Errors** are sub-types of **Throwable**
```
		Object
		  |
		  |
	   Throwable
	     /  \
 		/    \
     Error   Exception
	 	

```

## ITEM 2:
> Exceptions are handled by enclosing the expected code/block (that might throw exceptions) with **try** / **catch or finally** block. Either **catch** or **finally** (or **both**) is required following the **try** block. If both are missing following the **try** block, it'll be a compilation issue.

## ITEM 3:
> There can be multiple **catch block/clause** following the **try** block. However, the order of **catch clauses** matter when they belong to parent/child relationships but not with siblings.

What this implies is that, when a try block is followed by multiple **catch clauses/blocks**, and if they're related to one another as Parent/Child hierarchy, then they should be arranged bottom up, with the most generic type at the bottom.

Here is an example. Imagine A, B, C are types of Exception and A is the root of this relationship. If we need to catch an exception based on them, here's what we need to layout -

```
	try {
		...
		...
	}
	catch(C) {
		...
	}
	catch(B) {
		...
	}
	catch(A) {
		...
	}
	finally {
		// code clean up
	}

```
If we reverse the layout with A being at the top, **it will consume exceptions that belong to B and C** and that doesn't make sense. So, the compiler will throw a compilation problem.

**However**, this rule doesn't apply when the exceptions are *siblings* to one another (not Parent/child type). In that situation, **the order doesn't matter**.

## ITEM 4:
> All exceptions (excpept Runtime exceptions and errors) **must be declared or handled** otherwise, compilation issue will occur as Compiler checks as a rule of **Checked Exception**

Below example will throw a compilation issue -

```
// inside a class

function bar() {
	throw new Exception();
}

function foo() {
	bar();
}

```
However, either _declare_ or _handle_ shall avoid compilation issue.

*Case 1: Declaring an exception*
```
function bar() {
	throw new Exception();
}

function foo() throws Exception {
	bar();
}
```
*Case 2: Handle an exception*
```
function bar() {
	throw new Exception();
}

function foo(){
	try {
		bar();
	}
	catch(Exception e) {
		...
	}
	
}
```

## ITEM 5:
> Finally clause, if present, runs regardless of whether an exception occurs or not.
- When exception doesn't occur in *try block*, *finally* will run
- When exception occurs and handles in any of the *catch block*, *finally* will also (run after them)
- If there is a *return* statement inside *try/catch* block, *finally* will also run (before returning)

*However*, *the only condition when finally shall not run is when JVM shuts down. E.g. When there is a System.exit() invocation inside try/catch block, finally shall not be invoked*

## ITEM 6:
> Runtime exceptions are never checked by compiler and hence called **Unchecked exceptions** E.g. **Null Pointer Exception**, **Arithmetic Exception**, **ArrayIndexOfBoundException** etc. - something that compiler can't check/verify before the code is executed. 

In this case, the *handle or declare* rule **is not applicable**.

## ITEM 7:

> **Errors** are not a subtype of Exception, they don’t need to be declared. You’re free to declare it if you like, but the compiler just doesn’t care one way or another when or how the Error is thrown or by whom.











