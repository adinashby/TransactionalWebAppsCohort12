# Lecture 6: Integrating React.js Front-End with Express.js Back-End

Welcome to Lecture 5! In this session, we will learn how to integrate a React.js front-end application with an Express.js back-end server. This tutorial will guide you through setting up both environments and connecting them to create a full-stack application.

## Table of Contents

1. [Introduction](#1-introduction)
2. [Setting Up the Environment](#2-setting-up-the-environment)
   - [2.1. Installing Node.js and npm](#21-installing-nodejs-and-npm)
3. [Setting Up the Back-End with Express.js](#3-setting-up-the-back-end-with-expressjs)
   - [3.1. Creating the Express.js Server](#31-creating-the-expressjs-server)
   - [3.2. Setting Up Routes](#32-setting-up-routes)
4. [Setting Up the Front-End with React.js](#4-setting-up-the-front-end-with-reactjs)
   - [4.1. Creating the React Application](#41-creating-the-react-application)
   - [4.2. Fetching Data from the Back-End](#42-fetching-data-from-the-back-end)
5. [Integrating Front-End and Back-End](#5-integrating-front-end-and-back-end)
   - [5.1. Running Both Servers Concurrently](#51-running-both-servers-concurrently)
   - [5.2. Making API Calls from React to Express](#52-making-api-calls-from-react-to-express)
6. [Example Application: Todo List](#6-example-application-todo-list)
   - [6.1. Back-End Implementation](#61-back-end-implementation)
   - [6.2. Front-End Implementation](#62-front-end-implementation)

## 1. Introduction

In this lecture, we will create a simple Todo List application where the front-end is built using React.js and the back-end is built using Express.js. We will learn how to set up each part and connect them to create a seamless full-stack application.

## 2. Setting Up the Environment

### 2.1. Installing Node.js and npm

Ensure you have Node.js and npm installed on your machine. You can download and install them from [nodejs.org](https://nodejs.org/).

## 3. Setting Up the Back-End with Express.js

### 3.1. Creating the Express.js Server

Create a new directory for your project and initialize a new Node.js project.

```bash
mkdir todo-app
cd todo-app
npm init -y
```

Install Express.js:

```bash
npm install express
```

Create a file named `server.js` and set up a basic Express server:

```javascript
const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### 3.2. Setting Up Routes

Create a simple API to manage todos. Add the following code to `server.js`:

```javascript
let todos = [];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const newTodo = { id: Date.now(), text: req.body.text };
  todos.push(newTodo);
  res.json(newTodo);
});

app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(todo => todo.id !== parseInt(req.params.id));
  res.json({ message: 'Todo deleted' });
});
```

## 4. Setting Up the Front-End with React.js

### 4.1. Creating the React Application

Create a new React application using Create React App:

```bash
npx create-react-app client
cd client
npm start
```

### 4.2. Fetching Data from the Back-End

Inside the React application, create a `components` directory and add a `TodoList.js` component:

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('/api/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    const response = await axios.post('/api/todos', { text: newTodo });
    setTodos([...todos, response.data]);
    setNewTodo('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
```

## 5. Integrating Front-End and Back-End

### 5.1. Running Both Servers Concurrently

To run both the React development server and the Express server concurrently, install `concurrently`:

```bash
npm install concurrently
```

Modify the `scripts` section in the root `package.json`:

```json
"scripts": {
  "start": "concurrently \"npm run server\" \"npm run client\"",
  "server": "node server.js",
  "client": "npm start --prefix client"
}
```

### 5.2. Making API Calls from React to Express

Ensure the proxy is set up in the React application’s `package.json` to route API requests to the Express server:

```json
"proxy": "http://localhost:5000"
```

## 6. Example Application: Todo List

### 6.1. Back-End Implementation

Ensure your `server.js` looks like this:

```javascript
const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

let todos = [];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const newTodo = { id: Date.now(), text: req.body.text };
  todos.push(newTodo);
  res.json(newTodo);
});

app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(todo => todo.id !== parseInt(req.params.id));
  res.json({ message: 'Todo deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### 6.2. Front-End Implementation

Ensure your `TodoList.js` component looks like this:

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('/api/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    const response = await axios.post('/api/todos', { text: newTodo });
    setTodos([...todos, response.data]);
    setNewTodo('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
```

Ensure your `App.js` looks like this:

```javascript
import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div>
      <TodoList />
    </div>
  );
}

export default App;
```
