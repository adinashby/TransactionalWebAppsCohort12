## Lecture 8 - Internationalization (i18n) with React and Express

### Table of Contents

- [Lecture 8 - Internationalization (i18n) with React and Express](#lecture-8---internationalization-i18n-with-react-and-express)
  - [Table of Contents](#table-of-contents)
  - [1. Introduction](#1-introduction)
  - [2. Setting Up the Express Server](#2-setting-up-the-express-server)
    - [2.1. Initializing the Project](#21-initializing-the-project)
    - [2.2. Installing Dependencies](#22-installing-dependencies)
    - [2.3. Project Structure](#23-project-structure)
    - [2.4. Creating Translation Files](#24-creating-translation-files)
    - [2.5. Creating the Express Server](#25-creating-the-express-server)
  - [3. Setting Up the React Client](#3-setting-up-the-react-client)
    - [3.1. Creating the React App](#31-creating-the-react-app)
    - [3.2. Installing Dependencies](#32-installing-dependencies)
    - [3.3. Project Structure](#33-project-structure)
    - [3.4. Setting Up i18n in React](#34-setting-up-i18n-in-react)
    - [3.5. Creating Components](#35-creating-components)
      - [3.5.1. Home Component](#351-home-component)
      - [3.5.2. About Component](#352-about-component)
      - [3.5.3. Language Wrapper Component](#353-language-wrapper-component)
      - [3.5.4. Header Component](#354-header-component)
    - [3.6. Integrating i18n in App Component](#36-integrating-i18n-in-app-component)
    - [3.7. Initializing the App](#37-initializing-the-app)
  - [4. Running the Application](#4-running-the-application)
  - [5. Conclusion](#5-conclusion)

### 1. Introduction

In this lecture, we will cover the implementation of internationalization (i18n) in a full-stack application using React for the frontend and Express for the backend. We will set up a server to handle different language translations and integrate this functionality into a React application.

### 2. Setting Up the Express Server

#### 2.1. Initializing the Project

Ensure you have Node.js installed, then initialize a new Node.js project.

```bash
npm init -y
```

This command will create a `package.json` file with default settings.

#### 2.2. Installing Dependencies

We will need `express` and `cors`.

```bash
npm install express cors
```

- `express`: A minimal and flexible Node.js web application framework.
- `cors`: A package to provide an Express middleware that can enable CORS with various options.

#### 2.3. Project Structure

Your project structure should look like this:

```
/server
├── package.json
├── package-lock.json
├── server.js
└── translations
    ├── en.json
    └── fr.json
```

#### 2.4. Creating Translation Files

In the `translations` folder, create `en.json` and `fr.json` with the following content:

**en.json**

```json
{
  "home": {
    "title": "Welcome to the home page",
    "description": "This is the home page of our app"
  },
  "about": {
    "title": "About",
    "description": "Learn more about our company"
  }
}
```

**fr.json**

```json
{
  "home": {
    "title": "Bienvenue sur la page d'accueil",
    "description": "Ceci est la page d'accueil de notre application"
  },
  "about": {
    "title": "À propos de nous",
    "description": "En savoir plus sur notre entreprise"
  }
}
```

These files contain the translations for our application in English and French.

#### 2.5. Creating the Express Server

In `server.js`, set up the server to serve translation files.

```javascript
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3001;

// Set up CORS to allow requests from our frontend running on localhost:3000
const corsOptions = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Endpoint to get translations based on the requested language
app.get("/translations/:lang", (req, res) => {
  const lang = req.params.lang;
  const filePath = path.join(
    __dirname,
    "translations",
    `${lang.split("-")[0]}.json`
  );

  // Read the appropriate translation file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      // If the file is not found, return a 404 error
      return res.status(404).json({ error: "Translation not found" });
    }

    try {
      // Parse the JSON data and send it as a response
      const jsonData = JSON.parse(data);
      res.set("Cache-Control", "public, max-age=3600"); // Cache the response for 1 hour
      res.json(jsonData);
    } catch (parseError) {
      // If there is an error parsing the JSON, return a 500 error
      return res.status(500).json({ error: "Failed to parse JSON" });
    }
  });
});

// Start the server on port 3001
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
```

### 3. Setting Up the React Client

#### 3.1. Creating the React App

Create a new React app:

```bash
npx create-react-app client
cd client
```

#### 3.2. Installing Dependencies

Install `react-i18next` and `i18next` along with necessary plugins:

```bash
npm install react-i18next i18next i18next-http-backend i18next-browser-languagedetector react-router-dom
```

- `react-i18next`: A powerful internationalization framework for React.
- `i18next`: The core of the i18n functionality.
- `i18next-http-backend`: Backend plugin for i18next using HTTP requests to load translations.
- `i18next-browser-languagedetector`: Language detector plugin for i18next in the browser.
- `react-router-dom`: Declarative routing for React applications.

#### 3.3. Project Structure

Your client project structure should look like this:

```
/client
├── public
├── src
│   ├── components
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── LanguageWrapper.js
│   │   └── Header.js
│   ├── App.js
│   ├── index.js
│   ├── App.css
│   ├── index.css
│   └── i18n.js
├── package.json
└── ...
```

#### 3.4. Setting Up i18n in React

Create an `i18n.js` file in the `src` directory:

```javascript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Initialize i18next with necessary plugins and configuration
i18n
  .use(HttpBackend) // Use HTTP backend to load translations
  .use(LanguageDetector) // Use language detector to detect user language
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init({
    fallbackLng: "en", // Default language if detection fails
    backend: {
      loadPath: "http://localhost:3001/translations/{{lng}}", // URL to load translations
    },
    detection: {
      order: ["path", "navigator", "localStorage"], // Order of language detection methods
      lookupFromPathIndex: 0, // Use the first path segment as language
    },
    react: {
      useSuspense: true, // Enable Suspense mode for loading translations
    },
  });

export default i18n;
```

#### 3.5. Creating Components

##### 3.5.1. Home Component

Create `Home.js` in the `components` folder:

```javascript
import React from "react";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation(); // Hook to get the translation function

  return (
    <div>
      <h1>{t("home.title")}</h1> {/* Translate the home title */}
      <p>{t("home.description")}</p> {/* Translate the home description */}
    </div>
  );
};

export default Home;
```

##### 3.5.2. About Component

Create `About.js` in the `components` folder:

```javascript
import React from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation(); // Hook to get the translation function

  return (
    <div>
      <h1>{t("about.title")}</h1> {/* Translate the about title */}
      <p>{t("about.description")}</p> {/* Translate the about description */}
    </div>
  );
};

export default About;
```

##### 3.5.3. Language Wrapper Component

Create `LanguageWrapper.js` in the `components` folder:

```javascript
import React, { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./Header";

const LanguageWrapper = () => {
  const { lang } = useParams(); // Get the language parameter from the URL
  const { i18n } = useTranslation(); // Hook to access i18n instance

  useEffect(() => {
    // Change the language if it is different from the current one
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <>
      <Header lang={lang} /> {/* Pass the language to the header */}
      <div style={{ marginTop: "50px" }}>
        <Outlet /> {/* Render the nested routes */}
      </div>
    </>
  );
};

export default LanguageWrapper;
```

##### 3.5.4. Header Component

Create `Header.js` in the `components` folder:

```javascript
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ lang }) => {
  const location = useLocation(); // Get the current location

  // Function to switch the language in the URL
  const switchLanguage = (newLang) => {
    const pathSegments = location.pathname.split("/");
    pathSegments[1] = newLang;

    return pathSegments.join("/");
  };

  return (
    <div className="header">
      <div className="nav-links">
        <Link to={`/${lang}`}>Home</Link>
        <Link to={`/${lang}/about`}>About</Link>
      </div>
      <div className="locale-options">
        <Link to={switchLanguage("en")}>EN</Link>
        <Link to={switchLanguage("fr")}>FR</Link>
      </div>
    </div>
  );
};

export default Header;
```

#### 3.6. Integrating i18n in App Component

Modify `App.js` to integrate the i18n setup:

```javascript
import "./App.css";
import { useRoutes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import LanguageWrapper from "./components/LanguageWrapper";
import { Suspense } from "react";
import "./i18n"; // Import the i18n configuration

const AppContent = () => {
  // Define the routes for the application
  let routes = useRoutes([
    { path: "/", element: <Navigate to="/en" replace /> }, // Redirect root to /en
    {
      path: "/:lang",
      element: <LanguageWrapper />, // Wrap routes in LanguageWrapper
      children: [
        { path: "", element: <Home /> }, // Home route
        { path: "about", element: <About /> }, // About route
      ],
    },
    { path: "*", element: <Navigate to="/en" replace /> }, // Redirect unknown routes to /en
  ]);

  return (
    // Use Suspense to show a loading indicator while translations are loading
    <Suspense fallback={<div>Loading Translations...</div>}>{routes}</Suspense>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
```

#### 3.7. Initializing the App

Ensure your `index.js` initializes the React app properly:

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
```

### 4. Running the Application

1. Start the Express server:

   ```bash
   cd server
   node server.js
   ```

2. Start the React application:

   ```bash
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000/en` to see the application in English or `http://localhost:3000/fr` for French.

### 5. Conclusion

In this lecture, we covered how to set up a full-stack application with internationalization support using React for the frontend and Express for the backend. We created an Express server to serve translation files and integrated this functionality into a React application using `react-i18next`. This approach provides a scalable solution for handling multiple languages in a web application.
