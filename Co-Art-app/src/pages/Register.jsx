import React, { useState } from "react";

const MyForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "", 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = "http://localhost:8000/auth/register/"; 


    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        const data = await response.json();
        console.log("response:", data);
      } else {
        console.error("server error");
      }
    } catch (error) {
      console.error("request failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">submit</button>
    </form>
  );
};

export default MyForm;