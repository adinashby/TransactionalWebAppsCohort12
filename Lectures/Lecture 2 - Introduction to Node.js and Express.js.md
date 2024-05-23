## Table of Contents

1. [1. Introduction to Node.js](#1-introduction-to-nodejs)
    - [1.1. Setting Up Node.js](#11-setting-up-nodejs)
    - [1.2. Modules and NPM](#12-modules-and-npm)
2. [2. Building a Simple Server with Express.js](#2-building-a-simple-server-with-expressjs)
    - [2.1. Setting Up Express.js](#21-setting-up-expressjs)
    - [2.2. Creating Routes](#22-creating-routes)
    - [2.3. Middleware](#23-middleware)

## 1. Introduction to Node.js

### 1.1. Setting Up Node.js

To start using Node.js, ensure it is installed and create a new project.

```bash
npm init -y
```

### 1.2. Modules and NPM

Modules are reusable pieces of code. NPM is the Node Package Manager used to manage modules.

```javascript
const fs = require('fs'); // Importing the File System module
```

## 2. Building a Simple Server with Express.js

### 2.1. Setting Up Express.js

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

### 2.2. Creating Routes

Routes define the endpoints of your web application.

```javascript
app.get('/about', (req, res) => {
    res.send('About Page');
});
```

### 2.3. Middleware

Middleware functions are functions that have access to the request object, the response object, and the next middleware function in the application’s request-response cycle.

```javascript
app.use((req, res, next) => {
    console.log('Middleware function');
    next();
});
```

This concludes our introductory lecture on JavaScript for front-end and back-end development. Throughout this course, we will delve deeper into each of these topics to build robust and scalable web applications. Happy coding!
