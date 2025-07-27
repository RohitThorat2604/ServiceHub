import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import '../Login.css'; 

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { setLoggedInUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
  const res = await fetch('http://localhost:8080/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  });

  const data = await res.json();

  if (res.ok && data.data && data.data.role === "USER") {
    
    alert(" Login successful");
    setLoggedInUser(data.data);
    sessionStorage.setItem("user", JSON.stringify(data.data));
    navigate("/user");
  } else {
    alert(" Only users are allowed to login from here.");
  }
} catch (error) {
  console.error("Login request failed:", error);
  alert("An error occurred during login. Please try again.");
}
};
  return (
  
   <div className="login-page-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
          <input
            name="email"
            type="email"
            onChange={handleChange}
            className="form-control"
            placeholder="Email"
            value={form.email}
            autoComplete="off"
            required
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="form-control"
            placeholder="Password"
            value={form.password}
            autoComplete="off"
            required
          />
          <button className="btn btn-primary w-100">Login</button>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}