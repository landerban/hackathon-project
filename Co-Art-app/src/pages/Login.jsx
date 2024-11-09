import React, { useState } from "react";
import axios from "axios";
import '../css/Login.css'; // Import CSS for styling
import { Link } from 'react-router-dom';


export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Create the submit method.
  const submit = async e => {
    e.preventDefault();
    const user = {
      username: username,
      password: password
    };

    try {
      const { data } = await axios.post(
        'http://127.0.0.1:8000/auth/token/',
        user,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      // Initialize the access & refresh token in localstorage.
      localStorage.clear();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
      window.location.href = '/';
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h2>Welcome Back!</h2>
        <p>Sign in to access your account.</p>
      </div>
      
      <div className="right-section">
        <form className="auth-form" onSubmit={submit}>
          <h3 className="auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input 
              className="form-control mt-1"
              placeholder="Enter Username"
              name='username'
              type='text' 
              value={username}
              required
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input 
              name='password'
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
          <div style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
            Don’t have an account? <Link className="nav-link" to="/register" style={{ color: "#007bff", fontWeight: "bold", textDecoration: "none" }}>Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
