# Lecture 4: Getting Started with React.js and React Hooks

Welcome to Lecture 4! In this session, we will dive into the basics of React.js, a popular JavaScript library for building user interfaces, and React Hooks, which allow you to use state and other React features in function components. This tutorial will guide you through the setup process, core concepts, and the creation of a simple React application.

## Table of Contents

1. [Introduction to React.js](#1-introduction-to-reactjs)
2. [Setting Up the Environment](#2-setting-up-the-environment)
   - [2.1. Installing Node.js and npm](#21-installing-nodejs-and-npm)
   - [2.2. Creating a New React Application](#22-creating-a-new-react-application)
3. [Understanding the React Component](#3-understanding-the-react-component)
   - [3.1. Function Components](#31-function-components)
   - [3.2. Class Components](#32-class-components)
4. [JSX - JavaScript XML](#4-jsx---javascript-xml)
   - [4.1. Embedding Expressions in JSX](#41-embedding-expressions-in-jsx)
   - [4.2. JSX Attributes](#42-jsx-attributes)
5. [Props and State](#5-props-and-state)
   - [5.1. Props](#51-props)
   - [5.2. State](#52-state)
   - [5.3. State vs Props](#53-state-vs-props)
   - [5.4. Passing Data](#54-passing-data)
6. [React Hooks](#6-react-hooks)
   - [6.1. useState](#61-usestate)
   - [6.2. useEffect](#62-useeffect)
7. [Event Handling](#7-event-handling)
8. [Creating a Simple React Application](#8-creating-a-simple-react-application)
   - [8.1. Project Setup](#81-project-setup)
   - [8.2. Creating Components](#82-creating-components)
   - [8.3. Managing State and Props](#83-managing-state-and-props)
   - [8.4. Handling Events](#84-handling-events)
   - [8.5. Conditional Rendering](#85-conditional-rendering)
   - [8.6. Lists and Keys](#86-lists-and-keys)

## 1. Introduction to React.js

React.js is an open-source JavaScript library for building user interfaces, maintained by Facebook and a community of individual developers and companies. It allows developers to create large web applications that can update and render efficiently in response to data changes.

## 2. Setting Up the Environment

### 2.1. Installing Node.js and npm

Ensure you have Node.js and npm (Node Package Manager) installed on your machine. You can download and install them from [nodejs.org](https://nodejs.org/).

### 2.2. Creating a New React Application

Use the Create React App command-line tool to set up a new React project. This tool sets up the development environment and provides a good starting point for React applications.

```bash
npx create-react-app my-react-app
cd my-react-app
npm start
```

This will create a new directory called `my-react-app`, install all necessary dependencies, and start the development server. Open a browser and navigate to `http://localhost:3000` to see the new React application running.

## 3. Understanding the React Component

React applications are built using components. A component is a self-contained module that renders some output. There are two types of components in React: Function Components and Class Components.

### 3.1. Function Components

Function components are the simplest way to write components in React. They are JavaScript functions that return JSX.

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### 3.2. Class Components

Class components are more feature-rich than function components. They are JavaScript classes that extend `React.Component` and must have a `render()` method that returns JSX.

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## 4. JSX - JavaScript XML

JSX is a syntax extension for JavaScript that looks similar to XML or HTML. It is used to describe what the UI should look like.

### 4.1. Embedding Expressions in JSX

You can embed any JavaScript expression in JSX by wrapping it in curly braces.

```javascript
const name = 'World';
const element = <h1>Hello, {name}</h1>;
```

### 4.2. JSX Attributes

JSX attributes are similar to HTML attributes, but they follow the camelCase convention instead of kebab-case.

```javascript
const element = <div tabIndex="0"></div>;
```

## 5. Props and State

### 5.1. Props

Props (short for properties) are read-only attributes passed to components. They are used to pass data from parent components to child components.

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### 5.2. State

State is a built-in object that holds property values that belong to the component. When the state object changes, the component re-renders.

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return <h2>It is {this.state.date.toLocaleTimeString()}.</h2>;
  }
}
```

### 5.3. State vs Props

- **Props** are immutable, meaning they cannot be changed once set. They are used to pass data from a parent component to a child component.
- **State** is mutable and local to the component. It can change over time, usually in response to user actions or network responses.

### 5.4. Passing Data

To pass data between components, you use props. Here’s an example of a parent component passing a prop to a child component:

```javascript
function App() {
  return <Greeting name="John" />;
}

function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

## 6. React Hooks

React Hooks are functions that let you use state and other React features in function components. The most commonly used hooks are `useState` and `useEffect`.

### 6.1. useState

The `useState` hook lets you add state to function components. You declare a state variable and a function to update it.

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### 6.2. useEffect

The `useEffect` hook lets you perform side effects in function components. It serves the same purpose as lifecycle methods in class components like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

```javascript
import React, { useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <h1>Timer: {count}</h1>;
}
```

## 7. Event Handling

Event handling in React is similar to handling events in DOM elements, but with some syntactic differences. Event handlers in React are written in camelCase, and you pass a function as the event handler.

```javascript
function handleClick() {
  console.log('Button clicked');
}

const element = <button onClick={handleClick}>Click me</button>;
```

## 8. Creating a Simple React Application

### 8.1. Project Setup

Ensure your project is set up and running as described in the [Setting Up the Environment](#2-setting-up-the-environment) section.

### 8.2. Creating Components

Create a new directory called `components` inside the `src` directory. Inside this directory, create a file named `Greeting.js`.

```javascript
import React from 'react';

function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}

export default Greeting;
```

### 8.3. Managing State and Props

Create another component called `App.js` and use the `Greeting` component within it.

```javascript
import React, { useState } from 'react';
import Greeting from './components/Greeting';

function App() {
  const [name, setName] = useState('World');

  return (
    <div>
      <Greeting name={name} />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}

export default App;
```

### 8.4. Handling Events

The `App` component now includes an input field that updates the state when the user types, demonstrating event handling and state management.

```javascript
function App() {
  const [name, setName] =

 useState('World');

  return (
    <div>
      <Greeting name={name} />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
```

### 8.5. Conditional Rendering

React allows you to render different content based on certain conditions using conditional rendering.

```javascript
function Greeting(props) {
  if (props.isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign up.</h1>;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Greeting isLoggedIn={isLoggedIn} />
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </div>
  );
}
```

### 8.6. Lists and Keys

Rendering lists of elements is a common pattern in React applications. Each element in the list needs a unique `key` attribute.

```javascript
function TodoList(props) {
  const todos = props.todos;
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
}

function App() {
  const [todos, setTodos] = useState(['Learn React', 'Build a project', 'Deploy to production']);

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList todos={todos} />
      <input
        type="text"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            setTodos([...todos, e.target.value]);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
}
```

## Conclusion

You have now learned the basics of React.js and React Hooks, including setting up the environment, understanding components, JSX, props, state, event handling, conditional rendering, and lists and keys. You also created a simple React application that demonstrates these concepts. This foundation will help you build more complex and dynamic web applications using React and React Hooks. Happy coding!