import React, { useState } from "react";
import '../css/MyForm.css'; // Import CSS for styling

const MyForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // Add confirmPassword field to state
  });
  const [error, setError] = useState(''); // State for error messages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const apiUrl = "http://localhost:8000/auth/register/";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("response:", data);
        setError(''); // Clear error if form is successfully submitted
        window.location.href = '/login';

      } else {
        console.error("server error");
        setError("Username already taken!");


      }
    } catch (error) {
      console.error("request failed:", error);      
      window.location.href = '/login';
    }
  };

  return (
    <div className="form-container">
      <div className="left-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h3 className="auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              className="form-control mt-1"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control mt-1"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>} {/* Display error message if passwords do not match */}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
      <div className="right-section">
        <h2>Welcome!</h2>
        <p>Create an account to access all features.</p>
      </div>
    </div>
  );
};

export default MyForm;
