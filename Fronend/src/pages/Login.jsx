import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, Navigate, useNavigate} from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate("/");
        }
    },[])

    const baseURL = "http://127.0.0.1:8000/api/v1";

    async function Submit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseURL}/auth/login`, {
                'email': email,
                'password': password,
            });
            console.log(response.data.token);
            localStorage.setItem("token", response.data.token);
            navigate("/");
        }catch(err) {
            console.log(err.response.data.message);
            setError(err.response.data.message);
        }
    }

    return (
        <div className={"d-flex justify-content-center align-items-center vh-100"}>
            <form className={"p-5 rounded-3 border border-3 border-dark shadow-lg"} onSubmit={Submit}>
                <div className={"text-center mb-4 position-relative"}>
                    <Link className={'btn btn-close position-absolute start-0 top-50 translate-middle-y'} to={"/"}/>
                    <h1 className={'fw-bold'}>Log In</h1>
                </div>
                <input type={"email"} className={"form-control mb-3"} placeholder={"Email"} onChange={(e)=>setEmail(e.target.value)} name={"email"} />
                <input type={"password"} className={"form-control mb-3"} placeholder={"Password"} onChange={(e)=> setPassword(e.target.value)} name={"password"} />
                {error && <p>{error}</p>}
                <button type={"submit"} className={"btn btn-dark w-100 fw-bold"}>Log In</button>
            </form>
        </div>
    );
}

export default Login;