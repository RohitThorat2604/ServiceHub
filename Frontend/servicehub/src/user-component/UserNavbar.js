import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import DefaultProfile from '../assets/DefaultProfile.jpg';
import '../index.css';


export default function UserNavbar() {
  const { loggedInUser, setLoggedInUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
   sessionStorage.removeItem("user"); 
    setLoggedInUser(null);       
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-color shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/user">ServiceHub</NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#userNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="userNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">

            <li className="nav-item ">
              <Link className="nav-link fw-bold" to="/user">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/user/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/user/providers/All">Providers</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/user/aboutUs">About Us</Link>
            </li>
           

          
            {!loggedInUser ? (
              <div className="d-flex align-items-center gap-2 ms-lg-3">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => navigate('/login')}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Login
                </button>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => navigate('/register')}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Register
                </button>
              </div>
            ) : (
             <li className="nav-item dropdown ms-lg-3">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="userMenu"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={loggedInUser.profilePicture || DefaultProfile}
                    alt="Profile"
                    className="rounded-circle me-2"
                    style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                  />
                  <span className="text-white">{loggedInUser.firstname} {loggedInUser.lastname}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                  <li><span className="dropdown-item-text">{loggedInUser.email}</span></li>
                  <li><Link className="dropdown-item" to="/user/requests">My Bookings</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
