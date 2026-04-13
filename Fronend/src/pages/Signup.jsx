import React, {useEffect, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import {UserRegister} from "../api/request.jsx";

function Signup(){


    const [UserName, setUserName] = useState("");
    const [UserEmail, setUserEmail] = useState("");
    const [UserPassword, setUserPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate("/");
        }
    },[])

    async function Register(e){
        e.preventDefault();
        const data = await UserRegister(UserName, UserEmail, UserPassword);
        if(!data.err){
            setError(null)
            localStorage.setItem("token", data.token);
            navigate('/')
        };
        setError(Object.values(data.err)[0]);
    }

    return (
        <>
            <div className={"d-flex justify-content-center align-items-center vh-100"}>
                <form className={"p-5 rounded-3 border border-3 border-dark shadow"}>
                    <div className={"text-center mb-4 position-relative"}>
                        <Link className={'btn btn-close position-absolute start-0 top-50 translate-middle-y'} to={"/"}/>
                        <h1 className={'fw-bold'}>Sign Up</h1>
                    </div>
                    <input type={"text"} className={"form-control mb-3"} placeholder={"UserName"} onChange={(e) => setUserName(e.target.value)} name={"name"} maxLength={32} />
                    <input type={"email"} className={"form-control mb-3"} placeholder={"Email"}  onChange={(e)=> setUserEmail(e.target.value)} name={"email"} />
                    <input type={"password"} className={"form-control mb-3"} placeholder={"Password"}  onChange={(e)=> setUserPassword(e.target.value)} name={"password"} />
                    {error && (<p>{error}</p>)}
                    <button type={"submit"} onClick={(e)=>{Register(e)}} className={"btn btn-dark w-100 fw-bold"}>Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default Signup;