import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email.trim() === '') {
      alert("Please enter an email");
      return;
    }
    localStorage.setItem("email", email);
    navigate("/dashboard");
  };

  return (
<div className="login-wrapper">
  <div className="login-box">
    <h2>Welcome!<br/>Please Sign in</h2>
    <input
      className="login-box-input"
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <div className="login-box-buttons">
      <button className="login-box-btn" onClick={handleLogin}>Login</button>
      <button className="login-box-btn" onClick={() => navigate("/register")}>New User?</button>
    </div>
  </div>
</div>

  );
}

export default Login;
