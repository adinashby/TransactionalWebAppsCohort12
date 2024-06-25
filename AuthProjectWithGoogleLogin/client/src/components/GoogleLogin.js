// GoogleLogin.js
import React from "react";

const GoogleLogin = () => {
  const googleAuth = () => {
    window.open("http://localhost:3000/api/auth/google", "_self");
  };

  return <button onClick={googleAuth}>Login with Google</button>;
};

export default GoogleLogin;
