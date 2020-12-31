---
title: I learn today - Event Loop, Message Queue, Job Queue
date: "2020-12-31T06:09:25.475Z"
template: "post"
draft: false
slug: "i-learn-today-31-Dec-2020"
category: "Node"
tags:
  - "Node"
  - "Javascript"
description: "Understanding Event Loop, Message Queue, Job Queue"
---
_Disclaimer_: I don't have the energy to explain in length these topics. They are the most boring things, at least to me, to spend a day. Given a couple of references below. There's a lot out there that explains with a lot of fiery energy (including a video) on the net. In this topic, however, I would like to point one thing in particular that I learn it today - _Job Queue_

## What is an Event Loop?
To me, I imagine this way - for every javascript file, **in the end**, there's an invisible _while loop_ sitting there to check whether some events had happened and invoke them if that occurred, otherwise exit the loop and terminate the program.

Sounds confusing? Here is a rough idea -

Imagine we have written the world's best **main.js** file as shown below -

```javascript

console.log("Hello World!");

```
Here's what I imagine a Node (or browser) does in this file. 
```javascript
// your code
console.log("Hello World!");
...
...
// last line of your code - line: 1000
// below is the event-loop inserted by the platform - node/browser
while(is there any events pending in the message queue OR job queue?) {
	push them into the call stacks
}
// program.exit(0);
```
I know that's the most simplified (or stupid?) way of looking at it but that's how I create a mental model of Event Loop 🤷

Okay, what's that mean in general? Well, for every function calls, we push them in the Stack. And so long as something is running in the Stack (meaning, there're at least one function calls), the event loop can't do anything. 

The control reaches the above _invisible_ while loop only when your program passes line no. 1000. If there's any long time-consuming CPU/bound processing going on in your code (e.g infinite while loop, calculating Fibonacci w/o using memoization, calculating the age of the universe, finding alien traces in Mars, etc..), the control will delay reaching the event loop, thereby freezing any external asynchronous tasks (mouse events, timers, I/O operations) to execute their handlers. 

What's that mean in practice? It means, if that happens in your browser, you can't see the actual content of your page no matter how hard you try! If you're using Chrome, you might notice sometime a pop-up window showing something like below. That's the sign of the presence of long-running JS code in the Stack.

![long running script in Chrome](https://arnaudbuchholz.github.io/blog/post/Timeout%20and%20WebWorker/Chrome%20long%20running%20script.png)

When your code runs, it runs along with the so-called Event Loop and they're running in the same single thread. Your code may invoke async operations but it won't go/jump to their handlers right away because they're handled in separate data-structures (different from Stack) in either **Message Queue** or **Job Queue**. But your code runs line after line no matter whether a line is invoking async operations or not. When it comes across async operations (like _setTimer_, _Promises_, IO/operations), it just delegates (to respective handlers - Web APIs) and continues execution of the main flow (your JS code). 

> Let's cut the long story to the short.

In the beginning, there was only **Message Queue** to handle Async/operations (UI events - onClick, onLoad, setTimer(), setInterval(), I/O in case of Node). 

Here's a simplified code -
```javascript

function foo() 
{
	console.log("I'm foo");
}
function bar() {
	console.log("I'm bar");
}
console.log("Main script");
setTimer(foo, 0);
console.log("Program pretends to end here");
setTimer(bar,0);

```
And here's the result of the program -
```
Main script
Program pretends to end here
I'm foo
I'm bar
```
It runs line by line starting from the first line.
- First, - it defines a function variable called "foo" (first pass of JS parsing) - we're not executing in the first pass.
- Next it defines another function variable called "bar". These are the scope variables of the global context.

- There are no variables define after that. So, the second pass of JS (Execution stage) starts.
- Starting with console.log, printing **Main script**.
- Next it registers (or delegates) invocation of setTimeout() to Web-APIs/handlers.
- Next, another console.log, printing **Program pretends to end here**.
- Finally, register another setTimeout() to Web-Apis.
...
...
- Then we hit the invisible Event loop (while loop). Since the setTimeOuts() are registered at 0ms, they'll immediately timeout and return one by one in the message queue (following FIFO).
- Since, the call stack is empty now, EL (Event Loop, hereafter) pushed the 'foo' function on the Stack, and on executing prints out **I'm foo**. 
- The same happens for bar and printing **I'm bar** respectively.

## Is that all?
Not yet but we're very close to the end.

I said earlier, **in the beginning** because we have another one to discuss further - _Job Queue_

With the introduction of **Promises** in the _EcmaScript 2015 aka ES6_, we have an efficient way of handling async/operations.
In the above, traditional way of handling async/ops using _setTimeout()_, _UI Events_ etc, EL can't push any _tasks_ in the _Message Queue_ unless anything is remaining in the Stack. 

*Note*: _Task_ refers to the fulfilled events waiting in the _Message Queue_ to be picked up by EL.

However, in the case of _Promises_, they're waiting in another data structure called _Job Queue_ or _Micro-task Queue_. In this case, EL can preempt function invocations in the Stack if there are any fulfilled Promises waiting in the _Job Queue_. That means, after every running any function (when it's popped from the Stack), EL checks if there's fulfilled _promises_ (in _Job Queue_) and pick those and push to the Stack for their execution. What's that mean? It means, EL doesn't need to wait for all functions in the Stack to complete, it can preempt running the next function in the Stack if any Promises is waiting in the _Job Queue_.

Let's check with an example -

```javascript
function foo()
{
	console.log("I'm foo");
}
function bar() {
	console.log("I'm bar");
}
console.log("Main script");
setTimeout(foo, 0);
new Promise((resolve, reject) => {
   resolve("After bar() before foo()");
}).then(resolve => console.log(resolve));

bar();
```

Here's the result after running the above code -

```
Main script
I'm bar
After bar() before foo()
I'm foo
```

Let's go line by line of the code -

- First, - it defines a function variable called "foo".
- Second,- it defines another function variable called "bar". 
- There are no variables define after that. So, the second pass of JS (Execution stage) starts.
- Starting with console.log, printing **Main script**.
- Next it registers (or delegates) invocation of setTimeout() to Web-APIs/handlers.
- **Next** it registers/invokes a new Promise operation and when done it'll be available in the _Job Queue_
- _Next_, we invoked bar() and prints out **I'm bar**
- _After bar() has been executed, EL checks whether there's any fulfilled promise(s) in the _Job Queue_ and found one there.
  It pushes its handler to the Stack and prints out **After bar() before foo()**_
...
...
- Then the setTimeOuts() expires and pushes to the message queue (following FIFO).
- Since, the call stack is empty now, EL (Event Loop, hereafter) pushed the 'foo' function on the Stack, and on executing prints out **I'm foo**. 

_Whew.. that's too long but I feel I'm just scratching the details without actually going deeper into it. And I'm sure I won't be doing that in the future_ 😬 _. Below are a few references if you want to swim deeper into the ocean_.

**References**
- https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
- https://flaviocopes.com/javascript-event-loop/
- https://www.youtube.com/watch?v=8aGhZQkoFbQ






