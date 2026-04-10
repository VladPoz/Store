import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function UserProduct() {

    const [products, setProducts] = useState([]);

    const baseURL = "http://localhost:8000/api/v1";

    async function getProducts() {
        try{
            const response = await axios.get(`${baseURL}/product/profile`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
            setProducts(response.data);
        }catch(err){
            console.log(err.response.data.message)
        }
    }

    useEffect(() => {
        getProducts()
    }, []);

    return(
        <nav className="col-9 bg-white shadow-lg p-2 pt-0">
            <div className="d-flex flex-column align-items-center justify-content-center h-100">
                <div className="row g-2 p-1 w-100">
                    <h1 className={'col-12 text-center my-3'}>Product</h1>
                    {products.map((item)=>(
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={item.id}>
                            <div className="card text-dark h-100 shadow-lg border-0">
                                <div className="card-body">
                                    <img src={`http://localhost:8000/storage/${item.images[0].pathToImage}`} alt="IMG" className={"card-img-top product-img rounded-1"} />
                                    <h3 className="card-title fw-bold mt-2">{item.name}</h3>
                                    <p className="card-text mb-2">Description: {item.description}</p>
                                    <div className={'d-flex align-items-center justify-content-center gap-1'}>
                                        <Link to={`/product/${item.id}`} className="btn btn-dark w-100 h-100 fw-bold">{item.price}$</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                        <Link to={'/product/create'} className="btn btn-outline-dark d-flex align-items-center justify-content-center fs-1 h-100 shadow-lg w-100" style={{minHeight: '300px'}}>+</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default UserProduct;