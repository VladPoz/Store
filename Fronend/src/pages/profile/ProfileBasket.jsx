import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Header from "../../components/Header.jsx";
import ProfileLinks from "../../components/ProfileLinks.jsx";
import {getUserBasket, UserBasketDelete} from "../../api/request.jsx";

function ProfileBasket() {
    const [basket, setBasket] = useState([]);

    async function getBasketData() {
        const data = await getUserBasket();
        setBasket(data);
    }

    async function delBasket(e) {
        e.preventDefault();
        const response = await UserBasketDelete(e.currentTarget.value);
        getBasketData()
    }

    useEffect(() => {
        getBasketData();
    },[])

    return (
        <div className={'bg-light min-vh-100'}>
            <Header />
            <main className={'container mt-3'}>
                <div className={'d-flex justify-content-center gap-4'}>
                    <ProfileLinks/>
                    <nav className="col-9 bg-white shadow-lg p-2 pt-0">
                        <div className="d-flex flex-column align-items-center justify-content-center h-100">
                            <div className="row g-2 p-1 w-100">
                                <h1 className={'col-12 text-center my-3'}>Basket</h1>
                                {basket && (
                                    basket.map((item) => (
                                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={item.id}>
                                            <div className="card text-dark h-100 shadow-lg border-0">
                                                <div className="card-body">
                                                    <img src={`http://localhost:8000/storage/${item.images[0].pathToImage}`} alt="IMG" className={"card-img-top product-img rounded-1"} />
                                                    <h3 className="card-title fw-bold mt-2">{item.name}</h3>
                                                    <p className="card-text mb-2">Description: {item.description}</p>
                                                    <div className={'d-flex align-items-center justify-content-center gap-1'}>
                                                        <Link to={`/product/${item.id}`} className="btn btn-dark w-100 h-100 fw-bold">{item.price}$</Link>
                                                        <form>
                                                            <button type={"submit"} onClick={(e)=>{delBasket(e)}} value={item.id} className={'btn btn-dark border-0 h-100'}><img src="/icons/basket.svg" alt="basket"/></button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                    <Link to={'/'} className="btn btn-outline-dark d-flex align-items-center justify-content-center fs-1 h-100 shadow-lg w-100" style={{minHeight: '300px'}}>+</Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </main>
        </div>
    )
}

export default ProfileBasket;