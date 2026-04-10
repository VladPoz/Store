import React, {useEffect, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";

function Signup(){


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate("/");
        }
    },[])

    const baseURL = "http://localhost:8000/api/v1";



    async function register(){
        try {
            const response = await axios.post(`${baseURL}/auth/register`, {
                'name': name,
                'email': email,
                'password': password,
                'role_id': 1,
            });
            localStorage.setItem("token", response.data.token);
            navigate('/');
        }catch(err){
            console.log(err.response.data.message);
            setError(err.response.data.message);
        }
    }

    async function Submit(e){
        e.preventDefault();
        register();
    }

    return (
        <>
            <div className={"d-flex justify-content-center align-items-center vh-100"}>
                <form className={"p-5 rounded-3 border border-3 border-dark shadow"} onSubmit={Submit}>
                    <div className={"text-center mb-4 position-relative"}>
                        <Link className={'btn btn-close position-absolute start-0 top-50 translate-middle-y'} to={"/"}/>
                        <h1 className={'fw-bold'}>Sign Up</h1>
                    </div>
                    <input type={"text"} className={"form-control mb-3"} placeholder={"UserName"} onChange={(e) => setName(e.target.value)} name={"name"} />
                    <input type={"email"} className={"form-control mb-3"} placeholder={"Email"}  onChange={(e)=> setEmail(e.target.value)} name={"email"} />
                    <input type={"password"} className={"form-control mb-3"} placeholder={"Password"}  onChange={(e)=> setPassword(e.target.value)} name={"password"} />
                    {error != '' ? (<p>{error}</p>) : null}
                    <button type={"submit"} className={"btn btn-dark w-100 fw-bold"}>Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default Signup;