
# Introduction to JavaScript

Welcome to the JavaScript lecture series! In this course, we will focus on JavaScript's essential features and concepts that are crucial for both front-end and back-end development using Node.js and Express.js. This guide will serve as your introductory note to get you started.

## Table of Contents

1. [What is JavaScript?](#1-what-is-javascript)
2. [Setting Up Your Development Environment](#2-setting-up-your-development-environment)
3. [JavaScript Basics](#3-javascript-basics)
    - [3.1 Syntax and Structure](#31-syntax-and-structure)
    - [3.2 Variables and Data Types](#32-variables-and-data-types)
    - [3.3 Operators](#33-operators)
4. [Control Structures](#4-control-structures)
    - [4.1 Conditional Statements](#41-conditional-statements)
    - [4.2 Loops](#42-loops)
5. [Functions](#5-functions)
    - [5.1 Function Declaration](#51-function-declaration)
    - [5.2 Arrow Functions](#52-arrow-functions)
6. [Objects and Arrays](#6-objects-and-arrays)
7. [JavaScript in the Browser](#7-javascript-in-the-browser)
    - [7.1 DOM Manipulation](#71-dom-manipulation)
    - [7.2 Event Handling](#72-event-handling)

## 1. What is JavaScript?

JavaScript is a versatile, high-level programming language that is a core technology of the World Wide Web. It allows you to create dynamic and interactive web pages. JavaScript can be run in the browser (front-end) as well as on the server (back-end) using environments like Node.js.

## 2. Setting Up Your Development Environment

To begin coding in JavaScript, you need to set up your development environment:

1. **Install Node.js**: Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Download and install it from [nodejs.org](https://nodejs.org/).
2. **Choose a Code Editor**: Popular options include Visual Studio Code, Sublime Text, and Atom. Visual Studio Code is recommended for its integrated terminal and extensive plugin support.

## 3. JavaScript Basics

### 3.1. Syntax and Structure

JavaScript syntax is the set of rules that define a correctly structured JavaScript program. Basic syntax includes:

- Statements: JavaScript code is a sequence of statements.
- Semicolons: Used to separate statements.
- Comments: `//` for single-line and `/* */` for multi-line comments.

### 3.2. Variables and Data Types

Variables store data values. Use `let`, `const`, or `var` to declare variables.

```javascript
let name = "John";
const age = 30;
var isStudent = true;
```

JavaScript data types include:

- Primitive: `String`, `Number`, `Boolean`, `Null`, `Undefined`, `Symbol`
- Non-primitive: `Object`, `Array`, `Function`

### 3.3. Operators

Operators are used to perform operations on variables and values.

- Arithmetic: `+`, `-`, `*`, `/`, `%`
- Comparison: `==`, `===`, `!=`, `!==`, `<`, `>`, `<=`, `>=`
- Logical: `&&`, `||`, `!`

## 4. Control Structures

### 4.1. Conditional Statements

Conditional statements control the flow of code execution based on conditions.

```javascript
if (condition) {
    // code to be executed if condition is true
} else {
    // code to be executed if condition is false
}
```

### 4.2. Loops

Loops are used to repeat a block of code.

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}

while (condition) {
    // code to be executed
}
```

## 5. Functions

### 5.1. Function Declaration

Functions are blocks of code designed to perform a particular task.

```javascript
function greet(name) {
    return `Hello, ${name}`;
}
```

### 5.2. Arrow Functions

Arrow functions provide a concise way to write functions.

```javascript
const greet = (name) => `Hello, ${name}`;
```

## 6. Objects and Arrays

Objects are collections of key-value pairs. Arrays are ordered lists of values.

```javascript
const person = {
    name: "John",
    age: 30
};

const numbers = [1, 2, 3, 4, 5];
```

## 7. JavaScript in the Browser

### 7.1. DOM Manipulation

The Document Object Model (DOM) represents the HTML structure of a web page.

```javascript
document.getElementById("demo").innerHTML = "Hello, World!";
```

### 7.2. Event Handling

Events are actions that occur when a user interacts with the browser.

```javascript
document.getElementById("myButton").addEventListener("click", function() {
    alert("Button was clicked!");
});
```