# Lecture 7: Implementing Authentication in a React.js and Express.js Project

## Introduction

Welcome to Lecture 7! In this lecture, we'll explore how to implement authentication in a full-stack project using React.js for the front-end and Express.js for the back-end. Authentication is a crucial aspect of web applications, ensuring that users can securely access and interact with your application. We will cover both email/password authentication and Google OAuth authentication. By the end of this lecture, you'll have a solid understanding of how to set up and integrate these authentication methods into your projects.

## Table of Contents

1. [Introduction](#1-introduction)
2. [Project Setup](#2-project-setup)
3. [Backend: Express.js](#3-backend-expressjs)
    - [3.1 Setting up Express.js](#31-setting-up-expressjs)
    - [3.2 Email/Password Authentication](#32-emailpassword-authentication)
      - [3.2.1 User Model](#321-user-model)
      - [3.2.2 Auth Routes](#322-auth-routes)
    - [3.3 Google OAuth Authentication](#33-google-oauth-authentication)
      - [3.3.1 Passport Configuration](#331-passport-configuration)
      - [3.3.2 Auth Routes](#332-auth-routes)
4. [Frontend: React.js](#4-frontend-reactjs)
    - [4.1 Setting up React.js](#41-setting-up-reactjs)
    - [4.2 Email/Password Authentication](#42-emailpassword-authentication)
      - [4.2.1 Register and Login Components](#421-register-and-login-components)
    - [4.3 Google OAuth Authentication](#43-google-oauth-authentication)
      - [4.3.1 Google Login Component](#431-google-login-component)
    - [4.4 Integrating Components](#44-integrating-components)
    - [4.5 Package.json for React](#45-packagejson-for-react)
5. [Environment Variables](#5-environment-variables)
6. [Creating Access Tokens](#6-creating-access-tokens)
7. [Creating Secret Keys](#7-creating-secret-keys)
8. [Conclusion](#8-conclusion)

## 1. Introduction

In this lecture, we'll cover how to implement authentication using email/password and Google OAuth in a project that has React.js on the front-end and Express.js on the back-end.

## 2. Project Setup

Before we start, make sure you have Node.js and npm installed. Create a new directory for your project and initialize it with the following commands:

```sh
mkdir auth-project
cd auth-project
npm init -y
```

Install the necessary dependencies:

```sh
npm install express mongoose bcryptjs jsonwebtoken passport passport-google-oauth20
npm install cors body-parser dotenv
npx create-react-app client
cd client
npm install axios react-router-dom
```

## 3. Backend: Express.js

### 3.1 Setting up Express.js

Create a file named `server.js` in the root of your project and set up a basic Express server:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### 3.2 Email/Password Authentication

Email/password authentication involves creating a user model, setting up routes for registration and login, and hashing passwords for security.

#### 3.2.1 User Model

Create a `models` directory and a `User.js` file inside it:

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);
```

#### 3.2.2 Auth Routes

Create a routes directory and an auth.js file inside it. This file will handle user registration and login:

```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ email, password });
        await user.save();

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
```

In `server.js`, include the auth routes:

```javascript
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
```

### 3.3 Google OAuth Authentication

Google OAuth authentication allows users to log in using their Google account. This involves setting up Passport.js with the Google strategy and creating routes for handling the OAuth process.

#### 3.3.1 Passport Configuration

Install the passport dependencies:

```sh
npm install passport passport-google-oauth20
```

Create a `config` directory and a `passport.js` file inside it:

```javascript
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
}, async (token, tokenSecret, profile, done) => {
    const { email } = profile._json;
    let user = await User.findOne({ email });
    if (!user) {
        user = new User({ email, password: 'google-oauth' });
        await user.save();
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
```

#### 3.3.2 Auth Routes

Update `auth.js` to include Google OAuth routes:

```javascript
const passport = require('passport');

// Add Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const payload = { user: { id: req.user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.redirect(`http://localhost:3000?token=${token}`);
        });
    }
);

module.exports = router;
```

In `server.js`, initialize passport:

```javascript
const passport = require('passport');
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());
```

## 4. Frontend: React.js

### 4.1 Setting up React.js

In your `client` directory, set up a basic React application. You should have the following directory structure:

```
client
├── public
├── src
│   ├── components
│   ├── pages
│   ├── App.js
│   ├── index.js
```

### 4.2 Email/Password Authentication

#### 4.2.1 Register and Login Components

Create `Register.js` and `Login.js` in the `components` directory:

```javascript
// Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/register', formData);
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="email" name="email" value={email} onChange={onChange} required />
            <input type="password" name="password" value={password} onChange={onChange} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
```

```javascript
// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', formData);
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="email" name="email" value={email} onChange={onChange} required />
            <input type="password" name="password" value={password} onChange={onChange} required />
           

 <button type="submit">Login</button>
        </form>
    );
};

export default Login;
```

### 4.3 Google OAuth Authentication

#### 4.3.1 Google Login Component

Create a `GoogleLogin.js` in the `components` directory:

```javascript
// GoogleLogin.js
import React from 'react';

const GoogleLogin = () => {
    const googleAuth = () => {
        window.open('http://localhost:5000/api/auth/google', '_self');
    };

    return (
        <button onClick={googleAuth}>Login with Google</button>
    );
};

export default GoogleLogin;
```

### 4.4 Integrating Components

Update `App.js`:

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import GoogleLogin from './components/GoogleLogin';

const App = () => (
    <Router>
        <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/google-login" component={GoogleLogin} />
        </Switch>
    </Router>
);

export default App;
```

## 5. Environment Variables

To securely store sensitive information such as database connection strings and API keys, we use environment variables. Create a `.env` file in the root of your project and add the following variables:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/myDatabase?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Ensure that the `.env` file is listed in your `.gitignore` file to prevent it from being committed to version control.

## 6. Creating Access Tokens

Access tokens are used to authenticate API requests. In this lecture, we use JSON Web Tokens (JWT) for this purpose. Here's how to create and verify JWT tokens:

### Creating JWT Tokens

In the registration and login routes, we create a JWT token as follows:

```javascript
const payload = { user: { id: user.id } };
jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
    if (err) throw err;
    res.json({ token });
});
```

### Verifying JWT Tokens

To protect routes, create a middleware to verify the JWT token:

```javascript
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports = auth;
```

Use this middleware to protect routes:

```javascript
const auth = require('./middleware/auth');

router.get('/protected', auth, (req, res) => {
    res.send('This is a protected route');
});
```
## 7. Creating Secret Keys

Use the following code in your terminal to create a new secret key:

```
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

## 8. Conclusion

In this lecture, we've covered how to set up a basic authentication system using email/password and Google OAuth in a project with React.js for the front-end and Express.js for the back-end. This setup provides a foundation for adding more authentication methods and further securing your application.