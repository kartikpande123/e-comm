import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth){
            navigate("/")
        }
    })

    const collectData = async (e) => {
        e.preventDefault();
        console.log(name, email, password);

        const result = await fetch("http://localhost:3100/reg", {
            method: "post",
            body: JSON.stringify({ name, email, password }),
            headers: {
                "content-type": "application/json"
            }
        });
        let res = await result.json();
        localStorage.setItem("user", JSON.stringify(res));
        console.log(res);

        if (result) {
            navigate('/');  // Navigate to homepage on success
        } else {
            alert('Signup failed. Please try again.');
        }
    }


    return (
        <>
            <h1 className='reghead'>Register</h1>
            <form>
                <input type='text' placeholder='Enter your name' className='input' value={name} onChange={(e) => setName(e.target.value)} />
                <input type='email' placeholder='Enter your email' className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Enter your password' className='input' value={password} onChange={(e) => setpassword(e.target.value)} />
                <button className='btn' onClick={collectData} type='submit'>Signup</button>
            </form>
        </>
    )
}


export default Signup;