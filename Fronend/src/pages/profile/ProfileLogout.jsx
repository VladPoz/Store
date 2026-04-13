import React from "react";
import {Navigate, useNavigate} from "react-router-dom";
import Header from "../../components/Header.jsx";
import ProfileLinks from "../../components/ProfileLinks.jsx";
import {UserLogout} from "../../api/request.jsx";

function ProfileLogout() {

    const navigate = useNavigate();

    async function logout() {
        const data = await UserLogout();
        if (data){
            localStorage.removeItem('token');
            navigate('/');
        }
    }

    async function handleLogout(e) {
        e.preventDefault();
        logout();
    }

    return (
        <div className={'bg-light min-vh-100'}>
            <Header />
            <main className={'container mt-3'}>
                <div className={'d-flex justify-content-center gap-4'}>
                    <ProfileLinks/>
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
                </div>
            </main>
        </div>
    )
}

export default ProfileLogout;