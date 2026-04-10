import Header from "../components/Header.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function ProductCreate() {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [country, setCountry] = useState("");
    const [slug, setSlug] = useState("");
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    const baseURL = "http://localhost:8000/api/v1";

    async function getCategories(){
        try{
            const response = await axios.get(`${baseURL}/category`);
            setCategories(response.data);
        }catch(err){
            console.log(err.response.data.message);
        }
    }

    async function createProduct(e) {
        e.preventDefault();
        console.log(category)
        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("category_id", category);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("count", country);
            formData.append("slug", slug);

            images.forEach((file) => {
                formData.append("images[]", file);
            });

            const response = await axios.post(`${baseURL}/product/store`, formData, {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
            navigate('/')
        }catch (err) {
            console.log(err.response.data.message);
        }
    }

    useEffect(() => {
        getCategories()
    }, [])
    return (
        <>
            <Header/>
            <main className={'container mt-3'}>
                <div className={'row'}>
                    <div className={'col-4 d-flex align-items-center justify-content-center'}>
                        <input id={'fileInput'} type="file" className={'btn'} multiple onChange={(e)=>{setImages([...e.target.files])}} hidden />
                        <label htmlFor={'fileInput'} className={"btn btn-outline-dark d-flex align-items-center justify-content-center w-100 h-100"}>{images.length ? `${images.length} files selected` : 'Add Image'}</label>
                    </div>
                    <div className={'col-8 d-flex align-items-center justify-content-center border border-1 border-dark'} >
                        <div>
                            <h1 className={'text-center fw-bold'}>Product</h1>
                            <input type="text" className="form-control mb-3" placeholder={'Name'} onChange={(e) => setName(e.target.value)}/>
                            <select className={"form-control mb-3"} onChange={(e) => {setCategory(e.target.value)}}>
                                {categories.map(item=>(
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            <input type="text" className="form-control mb-3" placeholder={'Description'} onChange={(e) => setDescription(e.target.value)}/>
                            <input type="number" className="form-control mb-3" placeholder={'Price'} min={0} onChange={(e) => setPrice(e.target.value)}/>
                            <input type="number" className="form-control mb-3" placeholder={'Count'} min={0} onChange={(e) => setCountry(e.target.value)}/>
                            <input type="text" className="form-control mb-3" placeholder={'Slug'} onChange={(e) => setSlug(e.target.value)}/>
                            <form>
                                <button onClick={(e)=>{createProduct(e)}} type="submite" className="btn btn-dark mb-3 w-100">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ProductCreate;