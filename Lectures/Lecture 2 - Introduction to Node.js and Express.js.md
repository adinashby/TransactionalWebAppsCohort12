## Table of Contents

1. [1. Introduction to Node.js](#1-introduction-to-nodejs)
    - [1.1. Setting Up Node.js](#11-setting-up-nodejs)
    - [1.2. Modules and NPM](#12-modules-and-npm)
2. [2. Building a Simple Server with Express.js](#2-building-a-simple-server-with-expressjs)
    - [2.1. Setting Up Express.js](#21-setting-up-expressjs)
    - [2.2. Creating Routes](#22-creating-routes)
    - [2.3. Middleware](#23-middleware)
3. [Node.js HTTP Server Example](#1-node.js-http-server-example)
    - 3.1. [File Descriptions](#31-file-descriptions)
        - 3.1.1. [server.js](#311-serverjs)
        - 3.1.2. [index.html](#312-indexhtml)
        - 3.1.3. [about.html](#313-abouthtml)
        - 3.1.4. [404.html](#314-404html)
    - 3.2. [How to Run](#32-how-to-run)

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

# 3. Node.js HTTP Server Example

This example demonstrates a simple Node.js HTTP server that serves HTML files based on the request URL. The server is created using the built-in `http` module and serves three main pages: `index.html`, `about.html`, and a custom `404.html` for non-existent routes.

## 3.1. File Descriptions

### 3.1.1. server.js

The main server file creates an HTTP server that listens on port 3000. Depending on the URL requested, it serves different HTML files.

Key Features:
- Uses the `http` and `fs` modules to create a server and read files from the filesystem.
- Sets the appropriate content type for HTML responses.
- Handles routing for the home page (`/`), about page (`/about`), and redirects from `/about-me` and `/about-us` to `/about`.
- Returns a custom 404 page for any other URLs.

```javascript
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  let path = "./views/";

  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    case "/about-us":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening for requests on port 3000");
});
```

### 3.1.2. index.html

The home page served when the root URL (`/`) is requested.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lecture 3</title>
  </head>
  <body>
    <h1>Home</h1>
    <h2>You're on the right track</h2>
    <nav>
      <a href="/">Homepage</a>
      <a href="/about">About</a>
    </nav>
  </body>
</html>
```

### 3.1.3. about.html

The about page served when the `/about` URL is requested.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lecture 3</title>
  </head>
  <body>
    <h1>About</h1>
    <h2>You're on the right track</h2>
    <nav>
      <a href="/">Homepage</a>
      <a href="/about">About</a>
    </nav>
  </body>
</html>
```

### 3.1.4. 404.html

The custom 404 error page served when a non-existent URL is requested.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lecture 3</title>
  </head>
  <body>
    <h1>404 - OOPS!</h1>
    <h2>That page does not exist</h2>
  </body>
</html>
```

## 3.2 How to Run

1. Ensure you have Node.js installed on your machine.
2. Place the `server.js` file in the root directory.
3. Create a `views` directory and place the `index.html`, `about.html`, and `404.html` files inside it.
4. Open a terminal and navigate to the directory containing `server.js`.
5. Run the server with the command: `node server.js`.
6. Open a browser and navigate to `http://localhost:3000` to see the home page. Navigate to `/about` and other routes to see the respective pages.