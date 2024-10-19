import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myImage from '../assets/logo.png';

const Nav = () => {
    const navigate = useNavigate();
    
    // Check if user data exists and is valid JSON
    let auth = localStorage.getItem("user");
    let user = null;

    if (auth && auth !== "undefined") {
        try {
            user = JSON.parse(auth);
        } catch (error) {
            console.error("Invalid JSON in localStorage:", error);
            localStorage.removeItem("user"); // Remove invalid data
        }
    }

    const logOut = () => {
        localStorage.clear();
        navigate("/signup");
    };

    return (
        <div className="navbar">
            <img src={myImage} alt="logo" className="logo" />
            {user ? (
                <ul className="nav-ul">
                    <li><Link to="/">Product</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li onClick={logOut}>
                        <Link to="/signup">Logout ({user.name})</Link>
                    </li>
                </ul>
            ) : (
                <ul className="nav-ul navright">
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            )}
        </div>
    );
};

export default Nav;
