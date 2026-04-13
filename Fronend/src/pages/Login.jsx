import React, {useEffect, useState} from "react";

import {Link, Navigate, useNavigate, useNavigation} from "react-router-dom";
import {UserLogin} from "../api/request.jsx";

function Login() {

    const [UserEmail, setUserEmail] = useState("");
    const [UserPassword, setUserPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate("/");
        }
    },[])

    async function login(e){
        e.preventDefault();
        const data = await UserLogin(UserEmail, UserPassword);
        if(!data.err){
            setError(null)
            localStorage.setItem("token", data.token);
            navigate('/')
        }
        setError(Object.values(data.err)[0]);
    };

    return (
        <div className={"d-flex justify-content-center align-items-center vh-100"}>
            <form className={"p-5 rounded-3 border border-3 border-dark shadow-lg"}>
                <div className={"text-center mb-4 position-relative"}>
                    <Link className={'btn btn-close position-absolute start-0 top-50 translate-middle-y'} to={"/"}/>
                    <h1 className={'fw-bold'}>Log In</h1>
                </div>
                <input type={"email"} className={"form-control mb-3"} placeholder={"Email"} onChange={(e)=>setUserEmail(e.target.value)} name={"email"} />
                <input type={"password"} className={"form-control mb-3"} placeholder={"Password"} onChange={(e)=> setUserPassword(e.target.value)} name={"password"} />
                {error && <p>{error}</p>}
                <button type={"submit"} onClick={(e)=>{login(e)}} className={"btn btn-dark w-100 fw-bold"}>Log In</button>
            </form>
        </div>
    );
}

export default Login;