import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function UserBasket() {
    const [data, setData] = useState([]);
    const [dataId, setDataId] = useState([]);
    const baseURL = "http://localhost:8000/api/v1";

    async function getData() {
        try{
            const response = await axios.get(`${baseURL}/basket`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
            setData(response.data[0]);
            setDataId(response.data[1]);
        }catch(err){
            console.log(err.response.data.message);
            setData([]);
            setDataId([]);
        }
    }

    async function delBasket(e) {
        e.preventDefault();
        try{
            const response = await axios.delete(`${baseURL}/basket/${e.currentTarget.value}/destroy`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
            await getData();
        }catch(err){
            console.log(err.response.data.message);
        }
    }

    useEffect(() => {
        getData();
    },[])

    return (
        <nav className="col-9 bg-white shadow-lg p-2 pt-0">
            <div className="d-flex flex-column align-items-center justify-content-center h-100">
                <div className="row g-2 p-1 w-100">
                    <h1 className={'col-12 text-center my-3'}>Basket</h1>
                    {data.map((item, index) => (
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={item.id}>
                            <div className="card text-dark h-100 shadow-lg border-0">
                                <div className="card-body">
                                    <img src={`http://localhost:8000/storage/${item.images[0].pathToImage}`} alt="IMG" className={"card-img-top product-img rounded-1"} />
                                    <h3 className="card-title fw-bold mt-2">{item.name}</h3>
                                    <p className="card-text mb-2">Description: {item.description}</p>
                                    <div className={'d-flex align-items-center justify-content-center gap-1'}>
                                        <Link to={`/product/${item.id}`} className="btn btn-dark w-100 h-100 fw-bold">{item.price}$</Link>
                                        <form>
                                            <button type={"submit"} onClick={(e)=>{delBasket(e)}} value={dataId[index]} className={'btn btn-dark border-0 h-100'}><img src="./icons/basket.svg" alt="basket"/></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                        <Link to={'/'} className="btn btn-outline-dark d-flex align-items-center justify-content-center fs-1 h-100 shadow-lg w-100" style={{minHeight: '300px'}}>+</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default UserBasket;