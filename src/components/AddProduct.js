import React, { useState } from 'react';
import { json } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");

    const handleProduct = async (e) => {
        e.preventDefault();
        // console.log(!name);
        if (!name || !price || !category || !company) {
            alert("Please enter valid info")
            return;
        }


        const userId = JSON.parse(localStorage.getItem("user"))._id;

        let result = await fetch("http://localhost:3100/product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                "content-type": "application/json"
            }
        });
        let res = await result.json();
        console.log(res);
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
    };

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
                <button className='btn' type='submit' onClick={handleProduct}>
                    Add Product
                </button>
            </form>
        </>
    );
};

export default AddProduct;
