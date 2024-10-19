import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom"

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const parms = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchDetails();
    }, [])

    const fetchDetails = async () => {
        let result = await fetch(`http://localhost:3100/product/${parms.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const update = async (e) => {
        e.preventDefault();
        // console.log(name, price, category, company);
        let result = await fetch(`http://localhost:3100/product/${parms.id}`,{
            method:"put",
            body: JSON.stringify({name, price, category, company}),
            headers:{
                "content-type": "application/json"
            }
        })
        result = await result.json();
        console.log(result);
        navigate("/")
    }

    return (
        <>
            <h1 className='reghead'>Add product</h1>
            <form>
                <input
                    type='text'
                    placeholder='Enter Product Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Enter Product Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Enter Product Category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Enter Product Company'
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <button className='btn' type='submit' onClick={update}>
                    update Product
                </button>
            </form>
        </>
    );
};

export default UpdateProduct;
