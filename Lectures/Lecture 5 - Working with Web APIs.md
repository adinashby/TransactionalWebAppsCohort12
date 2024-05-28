# Lecture 5: Web API Calls with Axios and Native Fetch

Welcome to Lecture 5! In this session, we will learn how to make web API calls in a React.js application using both Axios and the native Fetch API. This tutorial will guide you through setting up your environment, making API calls, and handling responses. We will start with simple API calls using Node.js and Axios to show the results in the console.

## Table of Contents

1. [Introduction](#1-introduction)
2. [Simple API Call with Node.js and Axios](#2-simple-api-call-with-nodejs-and-axios)
   - [2.1. Setting Up the Environment](#21-setting-up-the-environment)
   - [2.2. Making a GET Request with Axios](#22-making-a-get-request-with-axios)
   - [2.3. Making a POST Request with Axios](#23-making-a-post-request-with-axios)
3. [Setting Up the Environment for React.js](#3-setting-up-the-environment-for-reactjs)
   - [3.1. Installing Node.js and npm](#31-installing-nodejs-and-npm)
   - [3.2. Creating a New React Application](#32-creating-a-new-react-application)
   - [3.3. Setting Up a Sample API](#33-setting-up-a-sample-api)
4. [Making API Calls with Axios in React](#4-making-api-calls-with-axios-in-react)
   - [4.1. Installing Axios](#41-installing-axios)
   - [4.2. Using Axios to Fetch Data](#42-using-axios-to-fetch-data)
   - [4.3. Using Axios to Post Data](#43-using-axios-to-post-data)
5. [Making API Calls with Fetch in React](#5-making-api-calls-with-fetch-in-react)
   - [5.1. Using Fetch to Get Data](#51-using-fetch-to-get-data)
   - [5.2. Using Fetch to Post Data](#52-using-fetch-to-post-data)
6. [Handling Errors and Responses](#6-handling-errors-and-responses)
   - [6.1. Error Handling with Axios](#61-error-handling-with-axios)
   - [6.2. Error Handling with Fetch](#62-error-handling-with-fetch)
7. [Example Application: User List](#7-example-application-user-list)
   - [7.1. Fetching User Data](#71-fetching-user-data)
   - [7.2. Displaying User Data](#72-displaying-user-data)
   - [7.3. Adding New Users](#73-adding-new-users)

## 1. Introduction

In this lecture, we will create a simple React.js application that makes API calls to fetch and post data. We will learn how to use both Axios and the native Fetch API to interact with a back-end service. Additionally, we will start with making simple API calls using Node.js and Axios to show the results in the console.

## 2. Simple API Call with Node.js and Axios

### 2.1. Setting Up the Environment

Ensure you have Node.js and npm installed on your machine. You can download and install them from [nodejs.org](https://nodejs.org/).

Create a new directory for your project and initialize a new Node.js project.

```bash
mkdir api-call-demo
cd api-call-demo
npm init -y
```

Install Axios:

```bash
npm install axios
```

### 2.2. Making a GET Request with Axios

Create a file named `get-request.js` and add the following code to make a GET request to the JSONPlaceholder API.

```javascript
const axios = require('axios');

axios.get('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('There was an error making the GET request:', error);
  });
```

Run the script:

```bash
node get-request.js
```

### 2.3. Making a POST Request with Axios

Create a file named `post-request.js` and add the following code to make a POST request to the JSONPlaceholder API.

```javascript
const axios = require('axios');

const newPost = {
  title: 'foo',
  body: 'bar',
  userId: 1,
};

axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('There was an error making the POST request:', error);
  });
```

Run the script:

```bash
node post-request.js
```

## 3. Setting Up the Environment for React.js

### 3.1. Installing Node.js and npm

Ensure you have Node.js and npm installed on your machine. You can download and install them from [nodejs.org](https://nodejs.org/).

### 3.2. Creating a New React Application

Use the Create React App command-line tool to set up a new React project. This tool sets up the development environment and provides a good starting point for React applications.

```bash
npx create-react-app api-demo
cd api-demo
npm start
```

### 3.3. Setting Up a Sample API

For demonstration purposes, we will use the JSONPlaceholder API, a free online REST API that you can use for testing and prototyping.

## 4. Making API Calls with Axios in React

### 4.1. Installing Axios

Install Axios as a dependency in your React project.

```bash
npm install axios
```

### 4.2. Using Axios to Fetch Data

Create a `UserList.js` component to fetch and display a list of users.

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```

### 4.3. Using Axios to Post Data

Create a `NewUserForm.js` component to add a new user.

```javascript
import React, { useState } from 'react';
import axios from 'axios';

function NewUserForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/users', { name })
      .then(response => {
        console.log('User added:', response.data);
        setName('');
      })
      .catch(error => {
        console.error('There was an error adding the user!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">Add User</button>
    </form>
  );
}

export default NewUserForm;
```

## 5. Making API Calls with Fetch in React

### 5.1. Using Fetch to Get Data

Create a `UserListFetch.js` component to fetch and display a list of users using the Fetch API.

```javascript
import React, { useState, useEffect } from 'react';

function UserListFetch() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  return (
    <div>
      <h1>User List (Fetch)</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserListFetch;
```

### 5.2. Using Fetch to Post Data

Create a `NewUserFormFetch.js` component to add a new user using the Fetch API.

```javascript
import React, { useState } from 'react';

function NewUserFormFetch() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('User added:', data);
        setName('');
      })
      .catch(error => {
        console.error('There was an error adding the user!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="

submit">Add User</button>
    </form>
  );
}

export default NewUserFormFetch;
```

## 6. Handling Errors and Responses

### 6.1. Error Handling with Axios

Axios automatically detects errors and provides detailed error messages. You can handle errors using `.catch()` in the promise chain.

```javascript
axios.get('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    setUsers(response.data);
  })
  .catch(error => {
    console.error('There was an error fetching the users!', error);
  });
```

### 6.2. Error Handling with Fetch

Fetch requires manual error handling. You need to check the response status and throw an error if the request was not successful.

```javascript
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    setUsers(data);
  })
  .catch(error => {
    console.error('There was an error fetching the users!', error);
  });
```

## 7. Example Application: User List

### 7.1. Fetching User Data

Create a new component `App.js` that uses the `UserList` and `NewUserForm` components.

```javascript
import React from 'react';
import UserList from './UserList';
import NewUserForm from './NewUserForm';

function App() {
  return (
    <div>
      <UserList />
      <NewUserForm />
    </div>
  );
}

export default App;
```

### 7.2. Displaying User Data

The `UserList` component fetches and displays the list of users from the API.

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```

### 7.3. Adding New Users

The `NewUserForm` component allows adding new users to the list.

```javascript
import React, { useState } from 'react';
import axios from 'axios';

function NewUserForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/users', { name })
      .then(response => {
        console.log('User added:', response.data);
        setName('');
      })
      .catch(error => {
        console.error('There was an error adding the user!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">Add User</button>
    </form>
  );
}

export default NewUserForm;
```

## Conclusion

You have now learned how to make web API calls in a React.js application using both Axios and the native Fetch API. We covered setting up the environment, making GET and POST requests, handling errors, and building a simple example application to demonstrate these concepts. Additionally, we started with making simple API calls using Node.js and Axios to show the results in the console. This knowledge will help you build dynamic and interactive web applications that can communicate with back-end services to fetch and manage data. Happy coding!