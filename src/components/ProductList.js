import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        productDetrails();
    }, [])


    const productDetrails = async () => {
        let result = await fetch("http://localhost:3100/products");
        result = await result.json();
        if (result) { }
        setProducts(result);
    }
    // console.log(products);
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:3100/product/${id}`, {
            method: "delete"
        })
        result = await result.json();
        if (result) {
            alert("prodcuct Deleted Succeesfully")
            setProducts(products.filter((item) => item._id !== id));
        }
    }

    const searchProduct = async (e) => {
        const key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:3100/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            productDetrails();
        }
    };
    



    return (
        <>
            <div className='product-list'>
                <h1 className='reghead'>Product List</h1>
                <input type='text' placeholder='Search Producr' className='searchProduct' onChange={searchProduct} />
                {products.length > 0 ? <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th className='operations'>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td>{item.company}</td>
                                <td className='operations'><button onClick={() => deleteProduct(item._id)}>Delete</button>
                                    <Link to={`/update/${item._id}`}>Update</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table> : <h1 className='reghead'> No Products found</h1>}
            </div>
        </>

    )
}

export default ProductList;