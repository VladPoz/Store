import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import {useParams} from "react-router-dom";
import {getProduct} from "../api/request.jsx";

function Product() {

    const { productId } = useParams();

    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [activeImage, setActiveImage] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getData() {
        const data = await getProduct(productId);

        if (!data.err) {
            setProduct(data);
            setImages(data.images);
            setActiveImage(data.images?.[0]);
        }
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    if (loading) {
        return (
            <>
                <Header />
                <h1 className="text-center mt-5">Loading...</h1>
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="container mt-5">
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            {activeImage && (
                                <img className="w-100 rounded shadow" src={`http://127.0.0.1:8000/storage/${activeImage.pathToImage}`} alt="image"/>
                            )}
                        </div>
                        <div className="row">
                            {images.map((img) => (
                                <img src={`http://127.0.0.1:8000/storage/${img.pathToImage}`} alt="preview" onClick={() => setActiveImage(img)} className={"col-2 rounded"}/>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h1 className="mb-3">{product.name}</h1>
                        <p className="text-muted mb-3">{product.description}</p>
                        <h3 className={'mb-3'}>{product.count} in stock</h3>
                        <h3 className="mb-3">{product.price}$</h3>
                        <button className="btn btn-dark w-100">Add to cart</button>
                    </div>

                </div>
            </main>
        </>
    );
}

export default Product;