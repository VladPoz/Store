import React from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";

function UserDelete() {

    const baseURL = "http://localhost:8000/api/v1";

    async function UserDelete() {
        try{
            const response = await axios.delete(`${baseURL}/user/destroy`,{headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}})
            localStorage.removeItem("token");
            return <Navigate to={'/'} />
        }catch(err){
            console.log(err.response.data.message)
        }
    }

    async function handleLogout(e) {
        e.preventDefault();
        UserDelete();
    }

    return (
        <nav className="col-9 bg-white shadow-lg p-2 pt-0">
            <div className="d-flex flex-column align-items-center justify-content-center h-100">
                <div>
                    <h1 className={'text-center my-3'}>Delete</h1>
                    <p className={'text-center'}>Are you sure you want to delete?</p>
                    <form>
                        <button type={"submit"} className={'btn btn-danger fw-bold w-100'} onClick={(e)=>{handleLogout(e)}}>Delete</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default UserDelete;