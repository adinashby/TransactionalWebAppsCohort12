
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
    - [7.3 Local Storage](#73-local-storage)
8. [Old Var, Use Strict, and Nullish Coalescing](#8-old-var-use-strict-and-nullish-coalescing)
    - [8.1 Old Var](#81-old-var)
    - [8.2 Use Strict](#82-use-strict)
    - [8.3 Nullish Coalescing Operator `??`](#83-nullish-coalescing-operator-)
9. [Differences between `==` and `===`](#9-differences-between--and-)
10. [Introduction to File Operations](#10-introduction-to-file-operations)
11. [Reading Files in Node.js](#11-reading-files-in-nodejs)
    - [11.1. Reading Files Synchronously](#111-reading-files-synchronously)
    - [11.2. Reading Files Asynchronously](#112-reading-files-asynchronously)
12. [Writing Files in Node.js](#13-writing-files-in-nodejs)
    - [12.1. Writing Files Synchronously](#121-writing-files-synchronously)
    - [12.2. Writing Files Asynchronously](#122-writing-files-asynchronously)
13. [Interacting with Files in the Browser](#14-interacting-with-files-in-the-browser)
    - [13.1. Reading Files Using the File API](#131-reading-files-using-the-file-api)
    - [13.2. Writing Files Using the File API](#132-writing-files-using-the-file-api)
14. [Example Application: File Reader and Writer](#14-example-application-file-reader-and-writer)
    - [14.1. Node.js File Operations](#141-nodejs-file-operations)
    - [14.2. Browser File Operations](#142-browser-file-operations)


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

You can also create new elements, modify existing ones, and remove them:

```javascript
let newElement = document.createElement("p");
newElement.textContent = "This is a new paragraph.";
document.body.appendChild(newElement);

let existingElement = document.getElementById("existingElement");
existingElement.style.color = "blue";

document.body.removeChild(existingElement);
```

### 7.2 Event Handling

Events are actions that occur when a user interacts with the browser. You can add event listeners to handle these events.

```javascript
document.getElementById("myButton").addEventListener("click", function() {
    alert("Button was clicked!");
});

document.getElementById("myInput").addEventListener("input", function(event) {
    console.log(event.target.value);
});
```

### 7.3 Local Storage

Local Storage allows you to store data in the browser. The data persists even after the browser is closed.

```javascript
// Save data
localStorage.setItem('username', 'JohnDoe');

// Retrieve data
let username = localStorage.getItem('username');
console.log(username);

// Remove data
localStorage.removeItem('username');

// Clear all data
localStorage.clear();
```

## 8. Old Var, Use Strict, and Nullish Coalescing

### 8.1 Old Var

Before ES6, `var` was used to declare variables. Unlike `let` and `const`, `var` has function scope, which can lead to unexpected behavior.

```javascript
function example() {
    var x = 10;
    if (true) {
        var x = 20; // same variable
        console.log(x); // 20
    }
    console.log(x); // 20
}
```

### 8.2 Use Strict

The `"use strict"` directive helps catch common coding errors and "unsafe" actions such as defining global variables.

```javascript
"use strict";

function example() {
    x = 10; // This will cause an error because x is not declared
}
```

### 8.3 Nullish Coalescing Operator `??`

The nullish coalescing operator `??` returns the right-hand operand when the left-hand operand is `null` or `undefined`.

```javascript
let user;
console.log(user ?? 'Guest'); // 'Guest'

user = 'John';
console.log(user ?? 'Guest'); // 'John'
```

## 9. Differences between `==` and `===`

The `==` operator compares values for equality, performing type conversion if necessary. The `===` operator compares both value and type for strict equality.

```javascript
console.log(5 == '5');  // true (type conversion happens)
console.log(5 === '5'); // false (no type conversion)

console.log(null == undefined); // true
console.log(null === undefined); // false
```

## 10. Introduction to File Operations

File operations in JavaScript are essential for a variety of tasks such as data storage, data processing, and application configuration. On the server side, Node.js provides powerful modules like `fs` (file system) to interact with the file system. In the browser, the File API allows users to interact with files, such as reading their contents or uploading them to a server.

## 11. Reading Files in Node.js

### 11.1. Reading Files Synchronously

Using the `fs` module in Node.js, you can read files synchronously. This means the code execution will wait until the file is completely read.

```javascript
const fs = require('fs');

try {
  const data = fs.readFileSync('example.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}
```

### 11.2. Reading Files Asynchronously

Reading files asynchronously is often preferred in Node.js because it does not block the event loop.

```javascript
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

## 12. Writing Files in Node.js

### 12.1. Writing Files Synchronously

You can write to files synchronously using the `writeFileSync` method. This will block the event loop until the file is written.

```javascript
const fs = require('fs');

const data = 'Hello, World!';

try {
  fs.writeFileSync('example.txt', data, 'utf8');
  console.log('File written successfully');
} catch (err) {
  console.error(err);
}
```

### 12.2. Writing Files Asynchronously

Writing files asynchronously allows other operations to continue while the file is being written.

```javascript
const fs = require('fs');

const data = 'Hello, World!';

fs.writeFile('example.txt', data, 'utf8', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File written successfully');
});
```

## 13. Interacting with Files in the Browser

### 13.1. Reading Files Using the File API

The File API allows you to read files selected by the user. This is useful for file uploads and processing files on the client side.

```html
<input type="file" id="fileInput" />
<script>
  document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
      console.log(e.target.result);
    };

    reader.readAsText(file);
  });
</script>
```

### 13.2. Writing Files Using the File API

Writing files on the client side typically involves creating files for download.

```html
<button id="downloadButton">Download File</button>
<script>
  document.getElementById('downloadButton').addEventListener('click', function() {
    const data = 'Hello, World!';
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'example.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
</script>
```

## 14. Example Application: File Reader and Writer

### 14.1. Node.js File Operations

Create a simple Node.js script that reads from a file and writes to a new file.

```javascript
const fs = require('fs');

const inputFile = 'input.txt';
const outputFile = 'output.txt';

// Read file
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File content:', data);

  // Write to a new file
  fs.writeFile(outputFile, data, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File written successfully');
  });
});
```

### 14.2. Browser File Operations

Create a simple HTML page that allows users to read a file and download its content.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>File Reader and Writer</title>
</head>
<body>
  <input type="file" id="fileInput" />
  <button id="downloadButton">Download File</button>

  <script>
    let fileContent = '';

    document.getElementById('fileInput').addEventListener('change', function(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function(e) {
        fileContent = e.target.result;
        console.log(fileContent);
      };

      reader.readAsText(file);
    });

    document.getElementById('downloadButton').addEventListener('click', function() {
      const blob = new Blob([fileContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'output.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  </script>
</body>
</html>
```
