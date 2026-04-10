import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function UserUpdate() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const baseURL = "http://localhost:8000/api/v1";

    async function getData() {
        try{
            const getDataRes = await axios.get(`${baseURL}/user/profile`, {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`,}});
            setName(getDataRes.data[0].name);
            setEmail(getDataRes.data[0].email);
        }catch(err){
        }
    }

    useEffect(() => {
        getData();
    },[])

    async function handleUpdate(e){
        e.preventDefault();
        try {
            const putDataRes = await axios.put(`${baseURL}/user/update`, {
                'name': name,
                'email': email,
                'password': password,
            }, {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}});
            setError(putDataRes.data.message);
        }catch(err){
            setError(err.response.data.message);
        }
    }

    return (
        <nav className="col-9 bg-white shadow-lg p-2 pt-0">
            <div className="d-flex flex-column align-items-center justify-content-center h-100">
                <div>
                    <h1 className={'text-center my-3'}>Update</h1>
                    <input type={"text"} className={"form-control mb-3"} placeholder={"UserName"} value={name} onChange={(e) => setName(e.target.value)} name={"name"} />
                    <input type={"email"} className={"form-control mb-3"} placeholder={"Email"} value={email}  onChange={(e)=> setEmail(e.target.value)} name={"email"} />
                    <input type={"password"} className={"form-control mb-3"} placeholder={"Password"} onChange={(e)=> setPassword(e.target.value)} name={"password"} />
                    {error && <p>{error}</p>}
                    <form>
                        <button type={"submit"} className={'btn btn-primary fw-bold w-100'} onClick={(e)=>{handleUpdate(e)}}>Update</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default UserUpdate;