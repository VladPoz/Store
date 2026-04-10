import React from "react";
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";

function Logout() {

    const baseURL = "http://localhost:8000/api/v1";
    const navigate = useNavigate();

    async function logout() {
        try{
            const response = await axios.post(`${baseURL}/auth/logout`,{},{headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}})
            localStorage.removeItem("token");
            navigate('/');
        }catch(err){
            console.log(err.response.data.message)
        }
    }

    async function handleLogout(e) {
        e.preventDefault();
        logout()
    }

    return (
        <nav className="col-9 bg-white shadow-lg p-2 pt-0">
            <div className="d-flex flex-column align-items-center justify-content-center h-100">
                <div>
                    <h1 className={'text-center my-3'}>Log Out</h1>
                    <p className={'text-center'}>Are you sure you want to log out?</p>
                    <form>
                        <button type={"submit"} className={'btn btn-dark fw-bold w-100'} onClick={(e)=>{handleLogout(e)}}>Log Out</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Logout;