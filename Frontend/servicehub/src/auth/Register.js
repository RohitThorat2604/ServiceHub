import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Register() {
  const { setLoggedInUser } = useAuth();  

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    contact: '',
    role: 'USER' 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Success", data.message, "success");

        // ✅ Save user to context
        setLoggedInUser(data.data);
       sessionStorage.setItem("user", JSON.stringify(data.data));

        // ✅ Redirect based on role
        if (data.data.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/user');
        }

      } else {
        Swal.fire("Error", data.message || "Registration failed", "error");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="login-page-wrapper">
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} className="form-control mb-2" required />
        <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} className="form-control mb-2" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="form-control mb-2" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="form-control mb-2" required />
        <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} className="form-control mb-2" required />

        <button type="submit" className="btn btn-primary">Register</button>

        <p className="mt-3 text-center">
  Already have an account? <Link to="/login">Login here</Link>
</p>
      </form>
    </div>
    </div>
  );
}
