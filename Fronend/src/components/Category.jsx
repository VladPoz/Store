import React, {useEffect, useState} from "react";
import axios from "axios";

function Category(){

    const [categorys, setCategorys] = useState([]);
    const [categoryValue, setCategoryValue] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [results, setResults] = useState('');

    function handleChange(e, id){
        const newCategories = categorys.map(item => {
            if(item.id === id){
                return {...item, name: e.target.value};
            }
            return item;
        });
        setCategorys(newCategories);
    }

    const baseURL = 'http://localhost:8000/api/v1';

    async function getCategories(){
        try{
            const response = await axios.get(`${baseURL}/category`);
            setCategorys(response.data);
        }catch(err){
            console.log(err.response.data.message);
        }
    }

    async function createCategory(e){
        e.preventDefault();
        try {
            const response = await axios.post(`${baseURL}/category/store`, {'name': newCategory}, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
            setResults(response.data);
            getCategories();
        }catch(err){
            setResults(err.response.data.message);
        }
    }

    async function updateCategory(e, id, name){
        e.preventDefault();
        try {
            await axios.put(`${baseURL}/category/update/${id}`, { name }, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
            getCategories();
        } catch(err){
            setResults(err.response.data.message);
        }
    }

    async function deleteCategory(e){
        e.preventDefault();
        try {
            const response = await axios.delete(`${baseURL}/category/destroy/${e.target.value}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
            getCategories();
        }catch(err){
            setResults(err.response.data.message);
        }
    }

    useEffect(()=>{
        getCategories();
    }, [])

    return(
        <nav className="col-9 bg-white shadow-lg p-2 pt-0">
            <div className="h-100">
                <div className="container w-50">
                    <h1 className={'text-center my-3'}>Category</h1>
                    {categorys.map((item) => (
                        item.id !== '' ? (
                            <form className="w-100 d-flex justify-content-between gap-1" key={item.id}>
                                <input type="text" value={item.name} className={'w-100 form-control mb-3'} onChange={(e)=>handleChange(e, item.id)} />
                                <button type={"submit"} className={'btn btn-dark h-100'} value={item.id} onClick={(e)=>updateCategory(e, item.id, item.name)}>U</button>
                                <button type={"submit"} className={'btn btn-danger h-100'} value={item.id} onClick={(e)=>{deleteCategory(e)}}>D</button>
                            </form>
                            ) : null
                    ))}
                    <form>
                        <input type="text" className={'form-control my-3'} onChange={(e) => setNewCategory(e.target.value)} placeholder={'New Category'} maxLength={24} />
                        {results !== '' ? (<p>{results}</p>) : null}
                        <button type={'submit'} className={'btn btn-dark w-100 mb-2'} onClick={(e)=>{createCategory(e)}}>Create</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Category;