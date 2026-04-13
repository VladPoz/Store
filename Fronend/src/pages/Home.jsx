import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Header from "../components/Header.jsx";
import axios from "axios";
import {getProducts} from "../api/request.jsx";

function Home(){
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getData(){
        const data = await getProducts();
        setError(data.err)
        if(!data.err){
            setError(null);
            setProducts(data);
        }
        setLoading(false);
    }

    async function setBasket(e){
        e.preventDefault();
        try{
            const response = await axios.post(`http://127.0.0.1:8000/api/v1/product/${e.currentTarget.value}/basket`, {},{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}});
        }catch(err){
            console.log(err.response.data.message);
        }
    }

    useEffect(() => {
        getData()
    },[])

    if(loading){
        return (
            <>
                <Header/>
                <h1 className={'mt-5 text-center'}>Loading...</h1>
            </>
        )
    }

    return (
        <div className={"bg-light min-vh-100"}>
            <Header/>
            <main className="container mt-3">
                <div className="row g-3 mt-1">
                    {error ? (<h1 className={'text-center'}>{error}</h1>) : (
                        products.map((item) => (
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={item.id}>
                                <div className="card text-dark h-100 shadow-lg border-0">
                                    <div className="card-body">
                                        <img src={`http://localhost:8000/storage/${item.images[0].pathToImage}`} alt="IMG" className={"card-img-top product-img rounded-1"} />
                                        <h3 className="card-title fw-bold mt-2">{item.name}</h3>
                                        <p className="card-text mb-2">Description: {item.description}</p>
                                        <p className="card-text mb-2">Count: {item.count}</p>
                                        <div className={'d-flex align-items-center justify-content-center gap-1'}>
                                            <Link to={`/product/${item.id}`} className="btn btn-dark w-100 h-100 fw-bold">{item.price}$</Link>
                                            <form>
                                                <button type={"submit"} onClick={(e)=>{setBasket(e)}} value={item.id} className={'btn btn-dark border-0 h-100'}><img src="./icons/basket.svg" alt="basket"/></button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    )
}

export default Home;