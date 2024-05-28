# Lecture 5: Web API Calls with Axios and Native Fetch

Welcome to Lecture 5! In this session, we will learn how to make web API calls in a React.js application using both Axios and the native Fetch API. This tutorial will guide you through setting up your environment, making API calls, and handling responses.

## Table of Contents

1. [Introduction](#1-introduction)
2. [Setting Up the Environment](#2-setting-up-the-environment)
   - [2.1. Installing Node.js and npm](#21-installing-nodejs-and-npm)
   - [2.2. Creating a New React Application](#22-creating-a-new-react-application)
   - [2.3. Setting Up a Sample API](#23-setting-up-a-sample-api)
3. [Making API Calls with Axios](#3-making-api-calls-with-axios)
   - [3.1. Installing Axios](#31-installing-axios)
   - [3.2. Using Axios to Fetch Data](#32-using-axios-to-fetch-data)
   - [3.3. Using Axios to Post Data](#33-using-axios-to-post-data)
4. [Making API Calls with Fetch](#4-making-api-calls-with-fetch)
   - [4.1. Using Fetch to Get Data](#41-using-fetch-to-get-data)
   - [4.2. Using Fetch to Post Data](#42-using-fetch-to-post-data)
5. [Handling Errors and Responses](#5-handling-errors-and-responses)
   - [5.1. Error Handling with Axios](#51-error-handling-with-axios)
   - [5.2. Error Handling with Fetch](#52-error-handling-with-fetch)
6. [Example Application: User List](#6-example-application-user-list)
   - [6.1. Fetching User Data](#61-fetching-user-data)
   - [6.2. Displaying User Data](#62-displaying-user-data)
   - [6.3. Adding New Users](#63-adding-new-users)

## 1. Introduction

In this lecture, we will create a simple React.js application that makes API calls to fetch and post data. We will learn how to use both Axios and the native Fetch API to interact with a back-end service.

## 2. Setting Up the Environment

### 2.1. Installing Node.js and npm

Ensure you have Node.js and npm installed on your machine. You can download and install them from [nodejs.org](https://nodejs.org/).

### 2.2. Creating a New React Application

Use the Create React App command-line tool to set up a new React project. This tool sets up the development environment and provides a good starting point for React applications.

```bash
npx create-react-app api-demo
cd api-demo
npm start
```

### 2.3. Setting Up a Sample API

For demonstration purposes, we will use the JSONPlaceholder API, a free online REST API that you can use for testing and prototyping.

## 3. Making API Calls with Axios

### 3.1. Installing Axios

Install Axios as a dependency in your React project.

```bash
npm install axios
```

### 3.2. Using Axios to Fetch Data

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

### 3.3. Using Axios to Post Data

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

## 4. Making API Calls with Fetch

### 4.1. Using Fetch to Get Data

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

### 4.2. Using Fetch to Post Data

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
      <button type="submit">Add User</button>
    </form>
  );
}

export default NewUserFormFetch;
```

## 5. Handling Errors and Responses

### 5.1. Error Handling with Axios

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

### 5.2. Error Handling with Fetch

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

## 6. Example Application: User List

### 6.1. Fetching User Data

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

### 6.2. Displaying User Data

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

### 6.3. Adding New Users

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

You have now learned how to make web API calls in a React.js application using both Axios and the native Fetch API. We covered setting up the environment, making GET and POST requests, handling errors, and building a simple example application to demonstrate these concepts. This knowledge will help you build dynamic and interactive web applications that can communicate with back-end services to fetch and manage data. Happy coding!