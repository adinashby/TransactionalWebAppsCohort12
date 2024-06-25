# Lecture 3: Getting Started with EJS

EJS (Embedded JavaScript) is a simple templating language that lets you generate HTML markup with plain JavaScript. This tutorial will guide you through the basics of EJS and how to integrate it with an Express.js application.

## Table of Contents

- [Lecture 3: Getting Started with EJS](#lecture-3-getting-started-with-ejs)
  - [Table of Contents](#table-of-contents)
  - [1. Introduction to EJS](#1-introduction-to-ejs)
  - [2. Setting Up the Environment](#2-setting-up-the-environment)
    - [2.1. Installing Node.js and npm](#21-installing-nodejs-and-npm)
    - [2.2. Creating a New Node.js Project](#22-creating-a-new-nodejs-project)
    - [2.3. Installing Express and EJS](#23-installing-express-and-ejs)
  - [3. Creating Your First EJS Template](#3-creating-your-first-ejs-template)
    - [3.1. Setting Up the Express Application](#31-setting-up-the-express-application)
    - [3.2. Creating the EJS Template](#32-creating-the-ejs-template)
    - [3.3. Rendering the EJS Template](#33-rendering-the-ejs-template)
  - [4. EJS Syntax and Features](#4-ejs-syntax-and-features)
    - [4.1. Embedding JavaScript](#41-embedding-javascript)
    - [4.2. Outputting Data](#42-outputting-data)
    - [4.3. Including Partials](#43-including-partials)
  - [5. Building a Simple Website with EJS](#5-building-a-simple-website-with-ejs)
    - [5.1. Creating the Layout](#51-creating-the-layout)
    - [5.2. Adding Pages](#52-adding-pages)
    - [5.3. Handling 404 Errors](#53-handling-404-errors)
  - [6. Express.js Application Example](#6-expressjs-application-example)
    - [6.1. File Descriptions](#61-file-descriptions)
      - [6.1.1. .gitignore](#611-gitignore)
      - [6.1.2. app.js](#612-appjs)
      - [6.1.3. package.json](#613-packagejson)
      - [6.1.4. package-lock.json](#614-package-lockjson)
      - [6.1.5. index.ejs](#615-indexejs)
      - [6.1.6. about.ejs](#616-aboutejs)
      - [6.1.7. 404.ejs](#617-404ejs)
    - [6.2. How to Run](#62-how-to-run)

## 1. Introduction to EJS

EJS is a templating language that enables you to create HTML templates with embedded JavaScript. It helps in dynamically generating HTML pages and is often used with Express.js to render views.

## 2. Setting Up the Environment

### 2.1. Installing Node.js and npm

First, ensure you have Node.js and npm (Node Package Manager) installed on your machine. You can download and install them from [nodejs.org](https://nodejs.org/).

### 2.2. Creating a New Node.js Project

Create a new directory for your project and initialize a new Node.js project.

```bash
mkdir my-ejs-app
cd my-ejs-app
npm init -y
```

### 2.3. Installing Express and EJS

Install Express and EJS as dependencies.

```bash
npm install express ejs
```

## 3. Creating Your First EJS Template

### 3.1. Setting Up the Express Application

Create a file named `app.js` and set up a basic Express application.

```javascript
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### 3.2. Creating the EJS Template

Create a directory named `views` and inside it, create a file named `index.ejs`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
</head>
<body>
  <h1>Welcome to <%= title %></h1>
</body>
</html>
```

### 3.3. Rendering the EJS Template

Run the Express application.

```bash
node app.js
```

Open a browser and navigate to `http://localhost:3000`. You should see the rendered EJS template with the title "Home".

## 4. EJS Syntax and Features

### 4.1. Embedding JavaScript

You can embed JavaScript code within EJS templates using `<% %>`.

```html
<% if (user) { %>
  <h2>Hello, <%= user.name %>!</h2>
<% } else { %>
  <h2>Hello, Guest!</h2>
<% } %>
```

### 4.2. Outputting Data

To output data, use `<%= %>`.

```html
<p>The current year is <%= new Date().getFullYear() %>.</p>
```

### 4.3. Including Partials

You can include partials (reusable pieces of templates) using `<%- include('path/to/partial') %>`.

Create a partial header (`views/partials/header.ejs`):

```html
<header>
  <h1>My Website</h1>
</header>
```

Include the partial in the main template:

```html
<%- include('partials/header') %>
<p>Content goes here...</p>
```

## 5. Building a Simple Website with EJS

### 5.1. Creating the Layout

Create a layout template (`views/layout.ejs`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
</head>
<body>
  <%- include('partials/header') %>
  <%- body %>
</body>
</html>
```

### 5.2. Adding Pages

Create a home page (`views/pages/home.ejs`):

```html
<% layout('layout') %>
<h2>Home Page</h2>
<p>Welcome to the home page.</p>
```

Create an about page (`views/pages/about.ejs`):

```html
<% layout('layout') %>
<h2>About Page</h2>
<p>Learn more about us.</p>
```

Update the `app.js` to render these pages:

```javascript
app.get('/', (req, res) => {
  res.render('pages/home', { title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('pages/about', { title: 'About' });
});
```

### 5.3. Handling 404 Errors

Create a custom 404 page (`views/404.ejs`):

```html
<% layout('layout') %>
<h2>404 - Page Not Found</h2>
<p>Sorry, the page you are looking for does not exist.</p>
```

Update `app.js` to handle 404 errors:

```javascript
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
```
## 6. Express.js Application Example

This example demonstrates a simple Express.js application that serves EJS templates based on the request URL. The application serves three main pages: `index.ejs`, `about.ejs`, and a custom `404.ejs` for non-existent routes.

### 6.1. File Descriptions

#### 6.1.1. .gitignore

The `.gitignore` file specifies which files and directories should be ignored by Git. This is useful for excluding sensitive information and unnecessary files from the repository.

#### 6.1.2. app.js

The main application file sets up an Express server and configures it to render EJS templates. It defines routes for the home page (`/`), about page (`/about`), and a custom 404 page for non-existent routes.

Key Features:
- Uses the `express` module to create a server.
- Sets the view engine to EJS.
- Renders different EJS templates based on the request URL.
- Handles 404 errors with a custom template.

```javascript
const express = require("express");

// express app
const app = express();

app.set("view engine", "ejs");

// the default path is /views
// if you like to change it, use the following line:
// app.set("views", "myviews");

app.get("/", (req, res) => {
  const blogs = [
    { title: "Blog 1", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "Blog 2", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "Blog 3", snippet: "Lorem ipsum dolor sit amet consectetur" },
  ];

  res.render("index", { title: "Homepage", blogs });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
```

#### 6.1.3. package.json

The `package.json` file contains metadata about the project, including its dependencies, scripts, and author information.

Key Features:
- Lists project dependencies: `ejs`, `express`.
- Includes a `start` script to run the application.
- Specifies the author and license.

```json
{
  "name": "mywebsitetest",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  },
  "author": "adinashby",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "dependencies": {
    "ejs": "^3.1.9",
    "express": "^4.18.2"
  }
}
```

#### 6.1.4. package-lock.json

The `package-lock.json` file ensures consistent dependency installations. It locks the versions of the project’s dependencies.

#### 6.1.5. index.ejs

The home page template rendered when the root URL (`/`) is requested. It displays a list of blog titles and snippets.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Homepage</title>
  </head>
  <body>
    <h1>Homepage</h1>
    <ul>
      <% blogs.forEach(blog => { %>
        <li>
          <h2><%= blog.title %></h2>
          <p><%= blog.snippet %></p>
        </li>
      <% }) %>
    </ul>
  </body>
</html>
```

#### 6.1.6. about.ejs

The about page template rendered when the `/about` URL is requested.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About</title>
  </head>
  <body>
    <h1>About</h1>
    <p>This is the about page.</p>
  </body>
</html>
```

#### 6.1.7. 404.ejs

The custom 404 error page template rendered when a non-existent URL is requested.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>404</title>
  </head>
  <body>
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
  </body>
</html>
```

### 6.2. How to Run

1. Ensure you have Node.js installed on your machine.  
2. Place the `app.js`, `package.json`, `package-lock.json`, and `.gitignore` files in the root directory.  
3. Create a `views` directory and place the `index.ejs`, `about.ejs`, and `404.ejs` files inside it.  
4. Open a terminal and navigate to the directory containing `app.js`.  
5. Install the dependencies with the command: `npm install`.  
6. Run the server with the command: `npm start` or `node app.js`.  
7. Open a browser and navigate to `http://localhost:3000` to see the home page.  
8. Navigate to `/about` and other routes to see the respective pages.  