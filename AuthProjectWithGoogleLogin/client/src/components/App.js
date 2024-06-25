import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import GoogleLogin from "./GoogleLogin";

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/google-login" element={<GoogleLogin />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  </Router>
);

export default App;
