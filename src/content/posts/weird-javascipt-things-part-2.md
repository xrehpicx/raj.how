---
title: 'Weird JavaScipt things Part 2'
slug: 'weird-javascipt-things-part-2'
date: '2023-04-30'
description: ''
author: 'raj'
github: 'xrehpicx'
source: 'notion:a6005da2ee3e48c0a3d5c7faf5b1412a'
cover: 'https://images.unsplash.com/photo-1572053533540-e2c6940ad653?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb'
---

> [Weird Javascript things Part one](https://xrehpicx.medium.com/weird-javascript-things-d2e229ca058?source=user_profile---------1----------------------------)

**Javascript**

One of the most over used languages right next to python

People can't stop using it for everything from tools that build websites to full fledged desktop apps and even machine learning.

### **JavaScript can build anything**

One of the significant advantages of JavaScript is its simplicity, which makes it accessible to new programmers. This enables individuals to enter the field of programming and develop applications for multiple platforms by learning just one language.

Here are some examples of how JavaScript can be used to build different types of applications:

- **CLI system tools**: JavaScript can be utilized for building command-line interface (CLI) system tools using Node.js, a JavaScript runtime environment.

- **Desktop Apps for all platforms**: Frameworks like Electron and Tauri (for UI components) allow developers to create desktop applications for various platforms using JavaScript.

- **Mobile apps**: JavaScript can be employed for developing mobile applications using frameworks such as React Native and Capacitor, among others.

- **Websites**: There is an abundance of JavaScript frameworks and libraries available for web development, making it suitable for building websites. Some notable examples include React, Angular, Vue.js, and many more.

JavaScript's versatility and extensive ecosystem of frameworks and tools contribute to its widespread usage across different application domains.

# **The Abstractions**

![image](/images/posts/weird-javascipt-things-part-2/01-image-19c0e6cc7a.png)

Everything was made as simple as possible in order to promote the use of this language for all beginners. On top of this, v8's JIT and the garbage collector take care of most of the things that a programmer would have to be very aware of, such as memory and CPU optimization.

But what was the cost of this simplicity?

![image](/images/posts/weird-javascipt-things-part-2/02-image-784f14c594.png)

There are obvious issues with apps that use V8 and JavaScript, which may be fast enough for most tasks but consume a significant amount of memory. However, if a memory issue in these apps is noticeably problematic, it may simply be a result of bad code. This is what I consider the primary cost of simplicity.

### **Bad Code**

Sure, JavaScript is a language that almost anyone can learn and start coding with. However, if someone's programming education is primarily based on JavaScript, it might lead to the adoption of bad programming practices.

The thing is, many of the negative consequences of these practices can be somewhat mitigated by better documentation, using TypeScript, or taking advantage of the optimizations provided by the V8 engine. As a result, people can keep writing JavaScript code for years and mistakenly believe that their code is good, simply because it keeps working for them.

There are plenty of successful freelancers out there who might not even realize that their code has flaws. As long as it works for them and they can make a living from it, they may not see a need to improve it. They have a good understanding of their code, which contributes to their success.

So, while JavaScript allows for easy entry into programming and can be used for a wide range of applications, it's important to be mindful of the potential for bad programming practices and strive for continuous improvement.

### **Readability**

They say, "Code is read more than it's written," highlighting the importance of code being easy to read and understand. JavaScript was designed to make writing code simpler, but it doesn't always excel in terms of readability (which is where TypeScript comes in).

One challenge with JavaScript is that it doesn't have variable types. This can make debugging and future development more difficult, especially when multiple people are working on the code. Unlike traditional languages, JavaScript doesn't provide a straightforward way to know what a variable contains or how a function behaves when used elsewhere. Even the JavaScript engine, V8, doesn't directly address this issue. As a result, working with code written by others can be more challenging.

Fortunately, TypeScript has emerged as a solution. Nowadays, most production-level JavaScript code is written using TypeScript. TypeScript enforces variable types and proper usage of data, which reduces the need for extensive documentation to explain how a function returns data.

However, it's important to note that the challenges associated with JavaScript go beyond just its language design.

## **The Specifics**

Now, let's dive into some specific issues that can be quite dangerous if not properly managed in production.

### **The Regex Engine**

JavaScript's handling of regular expressions (regex) can pose challenges, especially when dealing with more complex regex patterns. In many cases, these tasks require external dependencies to handle effectively.

If you're interested in exploring this topic in more detail, I recommend reading the insights shared by Dulanka Karunasena in their article titled "Threats of Using Regular Expressions in JavaScript."

https://blog.bitsrc.io/threats-of-using-regular-expressions-in-javascript-28ddccf5224c

Dulanka goes into further examples and provides guidance on how to avoid these issues.

Exploring these resources will give you a deeper understanding of the potential pitfalls and ways to mitigate them when working with regular expressions in JavaScript.

### **Regex Statefulness**

Yep, using the global flag (`**/g**`) in regular expressions lets you keep track of the state of previous matches right within the expression itself. It's pretty handy, but you need to be careful when dealing with global regex variables that are used multiple times.

Here's the deal: when a regular expression has the global flag, it remembers where the previous match left off. So, if you're not careful, it can lead to some unexpected results.

To play it safe, always keep an eye on those global regex variables. If you're reusing them, make sure to reset the state when needed. You can do this by using the `**.lastIndex**` property or creating a fresh regular expression object.

By being aware of this statefulness and handling it correctly, you'll avoid any surprise outcomes in your code.

```javascript
const s = 'youtube.com/watch?v=hnaGZHe8wws';

const re1 = /^youtube\.com\/watch[a-zA-Z0-9_\-\?\&\=\/]+/g;

console.log(re1.test(s)); // true
console.log(re1.test(s)); // false
console.log(re1.test(s)); // true
console.log(re1.test(s)); // false
console.log(re1.test(s)); // true
console.log(re1.test(s)); // false
console.log(re1.test(s)); // true

const re2 = /^youtube\.com\/watch[a-zA-Z0-9_\-\?\&\=\/]+/;

console.log(re2.test(s)); // true
console.log(re2.test(s)); // true
console.log(re2.test(s)); // true
console.log(re2.test(s)); // true
console.log(re2.test(s)); // true
console.log(re2.test(s)); // true
```

### Key then Value

Alright, let's check out an example of iterating through a map.

```typescript
const amap = new Map<string, number>();
for (const [k, v] of amap) {
  // some logic here
}
```

In this code snippet, we use a `**for...of**` loop to go through the map and get the key and its corresponding value. It's pretty similar to how it works in many other languages. A lot of folks tend to go with this method for most map iterations.

But hey, here's where things get interesting. Let's take a look at the `**.forEach**` method:

```typescript
const ymap = new Map<string, number>();
ymap.forEach((v, k) => {
  /* something here */
});
```

The key difference here is that the `**.forEach**` method doesn't give us the key followed by its value. Instead, it takes a callback function where the value is the first parameter and the key is the second parameter.

This design choice was intentional and aimed at keeping things simple for beginners. However, it can be confusing for those coming from other languages or for those who prefer using `**for...of**` loops. One particular challenge arises when switching from `**.forEach**` to `**for...of**` because the latter is the only looping construct that supports `**await**`ing between iterations. This switch can lead to further confusion, especially if the map returns values of the same type for both keys and values, as TypeScript won't raise a warning in that case.

So, it's important to be aware of this difference and choose the iteration method that best suits your needs and programming style.

### Bitwise Operations

Let's talk about bitwise operations in JavaScript.

In JavaScript, the default numeric type is `**Number**`, which can represent both integer and floating-point values. However, all numeric values in JavaScript are represented as 64-bit floating-point numbers, following the IEEE 754 standard.

Now, let's look at an example:

```typescript
const some_number = 10_000_000_000;
some_number += 1;
// ofc this gives 10_000_000_001
```

This result makes sense till now, but

When we add 1 to `**some_number**`, we get the expected result.

Moving on to bitwise operations:

```typescript
const some_number = 10_000_000_000;
some_number | 0;
// 1410065408
```

Uh-oh! Performing any bitwise operation, like using the bitwise OR operator (`**|**`), converts the number into a 32-bit **signed** integer. This behavior is different from what you might expect if you're coming from languages like C or others.

So, if you're using bitwise operations in JavaScript to optimize your code, thinking it'll work similar to other languages, well, it won't. It's important to be aware of this difference.

If you find yourself in a situation where you're trying to optimize something for a Raspberry Pi or similar device, my personal opinion is to avoid using JavaScript or Python for such scenarios. But if you're stuck with JavaScript, just remember that everything is treated as a signed integer when it comes to bitwise operations.

Stay informed and keep these quirks in mind to avoid any unexpected results!

# Its Ok

JavaScript and TypeScript may not be the top choice for every situation, but they offer a range of amazing possibilities. One of their strengths is their beginner-friendly nature, allowing newcomers to see results quickly. Despite some quirks, JavaScript has fostered a supportive community of developers who empower and inspire each other. It opens doors to various opportunities and encourages creativity. The impact of JavaScript on the programming world cannot be ignored. So, let's embrace JavaScript and TypeScript, celebrate their potential, and continue to explore their vast capabilities!

## Conclusion

The video shared below discusses the reasons why using JavaScript specifically for desktop apps makes more sense than it may initially seem. It highlights how we often overlook the complexity of the apps we use and tend to blame the language rather than acknowledging the inherent complexity of the application itself, which can contribute to high memory usage.

[Video](https://www.youtube.com/watch?v=hnaGZHe8wws)

**A Fistful of Megabytes**

_by fasterthanlime_

This video inspired me to write a different type of part 2, aiming to highlight the peculiar aspects of JavaScript while also exploring why it ended up with so many abstractions in the first place.

For creative individuals looking to start programming, I still recommend starting with JavaScript/TypeScript as it remains an encouraging and visually engaging way to begin.

In the future, we may see the emergence of even more abstractions, and there may never be a point of "too much abstraction" as some may feel about how things are built since the OOP revolution.

Abstraction only becomes problematic when it conceals underlying issues instead of providing a simpler way to deal with them.

Rust is a perfect example of effective error handling and abstraction. The way Rust handles errors is more understandable than in many other languages. Learning about Rust's error handling not only deepens your understanding of the system but also prompts you to question why error handling is approached differently in other languages.

_Also, a shoutout to Go's error handling—it's awesome too!_
