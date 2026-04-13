import React from "react";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header.jsx";
import ProfileLinks from "../../components/ProfileLinks.jsx";
import {UserDelete} from "../../api/request.jsx";

function ProfileDelete() {
    const navigate = useNavigate();

    async function handleDelete(e) {
        e.preventDefault();
        const response = await UserDelete();
        localStorage.removeItem("token");
        navigate('/')
    }

    return (
        <div className={'bg-light min-vh-100'}>
            <Header />
            <main className={'container mt-3'}>
                <div className={'d-flex justify-content-center gap-4'}>
                    <ProfileLinks/>
                    <nav className="col-9 bg-white shadow-lg p-2 pt-0">
                        <div className="d-flex flex-column align-items-center justify-content-center h-100">
                            <form>
                                <h1 className={'text-center my-3'}>Delete</h1>
                                <p className={'text-center'}>Are you sure you want to delete?</p>
                                <button type={"submit"} className={'btn btn-danger fw-bold w-100'} onClick={(e)=>{handleDelete(e)}}>Delete</button>
                            </form>
                        </div>
                    </nav>
                </div>
            </main>
        </div>
    )
}

export default ProfileDelete;