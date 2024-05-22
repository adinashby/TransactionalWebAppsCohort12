
# Introduction to JavaScript for Front-End and Back-End Development

Welcome to the JavaScript lecture series! In this course, we will focus on JavaScript's essential features and concepts that are crucial for both front-end and back-end development using Node.js and Express.js. This guide will serve as your introductory note to get you started.

## Table of Contents

1. [What is JavaScript?](#what-is-javascript)
2. [Setting Up Your Development Environment](#setting-up-your-development-environment)
3. [JavaScript Basics](#javascript-basics)
    - [Syntax and Structure](#syntax-and-structure)
    - [Variables and Data Types](#variables-and-data-types)
    - [Operators](#operators)
4. [Control Structures](#control-structures)
    - [Conditional Statements](#conditional-statements)
    - [Loops](#loops)
5. [Functions](#functions)
    - [Function Declaration](#function-declaration)
    - [Arrow Functions](#arrow-functions)
6. [Objects and Arrays](#objects-and-arrays)
7. [JavaScript in the Browser](#javascript-in-the-browser)
    - [DOM Manipulation](#dom-manipulation)
    - [Event Handling](#event-handling)
8. [Introduction to Node.js](#introduction-to-nodejs)
    - [Setting Up Node.js](#setting-up-nodejs)
    - [Modules and NPM](#modules-and-npm)
9. [Building a Simple Server with Express.js](#building-a-simple-server-with-expressjs)
    - [Setting Up Express.js](#setting-up-expressjs)
    - [Creating Routes](#creating-routes)
    - [Middleware](#middleware)

## What is JavaScript?

JavaScript is a versatile, high-level programming language that is a core technology of the World Wide Web. It allows you to create dynamic and interactive web pages. JavaScript can be run in the browser (front-end) as well as on the server (back-end) using environments like Node.js.

## Setting Up Your Development Environment

To begin coding in JavaScript, you need to set up your development environment:

1. **Install Node.js**: Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Download and install it from [nodejs.org](https://nodejs.org/).
2. **Choose a Code Editor**: Popular options include Visual Studio Code, Sublime Text, and Atom. Visual Studio Code is recommended for its integrated terminal and extensive plugin support.

## JavaScript Basics

### Syntax and Structure

JavaScript syntax is the set of rules that define a correctly structured JavaScript program. Basic syntax includes:

- Statements: JavaScript code is a sequence of statements.
- Semicolons: Used to separate statements.
- Comments: `//` for single-line and `/* */` for multi-line comments.

### Variables and Data Types

Variables store data values. Use `let`, `const`, or `var` to declare variables.

```javascript
let name = "John";
const age = 30;
var isStudent = true;
```

JavaScript data types include:

- Primitive: `String`, `Number`, `Boolean`, `Null`, `Undefined`, `Symbol`
- Non-primitive: `Object`, `Array`, `Function`

### Operators

Operators are used to perform operations on variables and values.

- Arithmetic: `+`, `-`, `*`, `/`, `%`
- Comparison: `==`, `===`, `!=`, `!==`, `<`, `>`, `<=`, `>=`
- Logical: `&&`, `||`, `!`

## Control Structures

### Conditional Statements

Conditional statements control the flow of code execution based on conditions.

```javascript
if (condition) {
    // code to be executed if condition is true
} else {
    // code to be executed if condition is false
}
```

### Loops

Loops are used to repeat a block of code.

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}

while (condition) {
    // code to be executed
}
```

## Functions

### Function Declaration

Functions are blocks of code designed to perform a particular task.

```javascript
function greet(name) {
    return `Hello, ${name}`;
}
```

### Arrow Functions

Arrow functions provide a concise way to write functions.

```javascript
const greet = (name) => `Hello, ${name}`;
```

## Objects and Arrays

Objects are collections of key-value pairs. Arrays are ordered lists of values.

```javascript
const person = {
    name: "John",
    age: 30
};

const numbers = [1, 2, 3, 4, 5];
```

## JavaScript in the Browser

### DOM Manipulation

The Document Object Model (DOM) represents the HTML structure of a web page.

```javascript
document.getElementById("demo").innerHTML = "Hello, World!";
```

### Event Handling

Events are actions that occur when a user interacts with the browser.

```javascript
document.getElementById("myButton").addEventListener("click", function() {
    alert("Button was clicked!");
});
```

## Introduction to Node.js

### Setting Up Node.js

To start using Node.js, ensure it is installed and create a new project.

```bash
npm init -y
```

### Modules and NPM

Modules are reusable pieces of code. NPM is the Node Package Manager used to manage modules.

```javascript
const fs = require('fs'); // Importing the File System module
```

## Building a Simple Server with Express.js

### Setting Up Express.js

Install Express.js using NPM and create a basic server.

```bash
npm install express
```

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

### Creating Routes

Routes define the endpoints of your web application.

```javascript
app.get('/about', (req, res) => {
    res.send('About Page');
});
```

### Middleware

Middleware functions are functions that have access to the request object, the response object, and the next middleware function in the application’s request-response cycle.

```javascript
app.use((req, res, next) => {
    console.log('Middleware function');
    next();
});
```

This concludes our introductory lecture on JavaScript for front-end and back-end development. Throughout this course, we will delve deeper into each of these topics to build robust and scalable web applications. Happy coding!
