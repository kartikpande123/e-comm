import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }
    }, [navigate]);

    const loginHandle = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }
        try {
            let result = await fetch("http://localhost:3100/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (result.ok) {
                let user = await result.json();
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/");
            } else {
                let error = await result.json();
                alert(error.result || "Invalid email or password.");
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <h1 className='reghead'>Login</h1>
            <form onSubmit={loginHandle}>
                <input
                    type="text"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login" type="submit">Login</button>
            </form>
        </>
    );
};

export default Login;
