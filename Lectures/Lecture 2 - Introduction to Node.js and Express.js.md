## Table of Contents

1. [Introduction to Node.js](#1-introduction-to-nodejs)
    - [1.1. Setting Up Node.js](#11-setting-up-nodejs)
    - [1.2. Modules and NPM](#12-modules-and-npm)
2. [Node.js HTTP Server Example](#2-nodejs-http-server-example)
    - 2.1. [File Descriptions](#21-file-descriptions)
        - 2.1.1. [server.js](#211-serverjs)
        - 2.1.2. [index.html](#212-indexhtml)
        - 2.1.3. [about.html](#213-abouthtml)
        - 2.1.4. [404.html](#214-404html)
    - 2.2. [How to Run](#22-how-to-run)
3. [Building a Simple Server with Express.js](#3-building-a-simple-server-with-expressjs)
    - [3.1. Setting Up Express.js](#31-setting-up-expressjs)
    - [3.2. Creating Routes](#32-creating-routes)
    - [3.3. Middleware](#33-middleware)

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

## 2. Node.js HTTP Server Example

This example demonstrates a simple Node.js HTTP server that serves HTML files based on the request URL. The server is created using the built-in `http` module and serves three main pages: `index.html`, `about.html`, and a custom `404.html` for non-existent routes.

## 2.1. File Descriptions

### 2.1.1. server.js

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

  // console.log("request made");
  //console.log(req.url, req.method);
  // send a request to /about

  // set header content type
  // res.setHeader("Content-Type", "text/plain");
  // res.write("hello, vanier students");
  // res.end();

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

  // res.write('<head><link rel="stylesheet" href="#"</head>');
  // res.write("<p>hello, vanier students<p>");
  // res.write("<p>hello again, vanier students<p>");
  // res.end();

  // send an html file
  //   fs.readFile("./views/index.html", (err, data) => {
  //     if (err) {
  //       console.log(err);
  //       res.end();
  //     } else {
  //       // res.write(data);
  //       // res.write(data);
  //       // res.end();
  //       // res.end(data);
  //     }
  //   });
  // });

  // send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      // res.write(data);
      // res.write(data);
      // res.end();
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening for requests on port 3000");
});
```

### 2.1.2. index.html

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

### 2.1.3. about.html

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

### 2.1.4. 404.html

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

## 2.2 How to Run

1. Ensure you have Node.js installed on your machine.
2. Place the `server.js` file in the root directory.
3. Create a `views` directory and place the `index.html`, `about.html`, and `404.html` files inside it.
4. Open a terminal and navigate to the directory containing `server.js`.
5. Run the server with the command: `node server.js`.
6. Open a browser and navigate to `http://localhost:3000` to see the home page. Navigate to `/about` and other routes to see the respective pages.

## 3. Building a Simple Server with Express.js

### 3.1. Setting Up Express.js

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

### 3.2. Creating Routes

Routes define the endpoints of your web application.

```javascript
app.get('/about', (req, res) => {
    res.send('About Page');
});
```
