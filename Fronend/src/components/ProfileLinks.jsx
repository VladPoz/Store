import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getUserProfile} from "../api/request.jsx";

function ProfileLinks(){
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function load(){
            const data = await getUserProfile();
            if(data){
                setUserData(data);
                setLoading(false);
            }
        }

        if (localStorage.getItem("token") === null) {
            navigate("/login");
        };

        load();
    }, [])
    if(loading){
        return (
            <nav className="col-3 bg-white shadow-lg d-flex justify-content-center align-items-center">
                <p className={'m-0'}>Loading...</p>
            </nav>
        );
    }
    return (
        <nav className="col-3 bg-white shadow-lg p-2 pt-0">
            <div className={'d-flex align-items-center'}>
                <img className={'ms-2'} src={'/icons/user.svg'} alt='user' />
                <ul className={'my-3'}>
                    <li className={'list-unstyled fw-bold fs-5'}>{userData.name}</li>
                    <li className={'list-unstyled fs-6'}>{userData.email}</li>
                </ul>
            </div>
            <div className={'px-1'}>
                <Link to={'/profile'} className={'w-100 mb-1 btn btn-outline-dark fw-bold'}>Profile</Link>
                {userData.role.role_name === 'admin'? (
                    <Link to={'/adm'} className={'w-100 mb-1 btn btn-outline-dark fw-bold'}>Admin Panel</Link>
                ) : null}
                <Link to={'/profile/basket'} className={'w-100 mb-1 btn btn-outline-dark fw-bold'}>Basket</Link>
                <Link to={'/profile/product'} className={'w-100 mb-1 btn btn-outline-dark fw-bold'}>Product</Link>
                <Link to={'/profile/settings'} className={'w-100 mb-1 btn btn-outline-secondary fw-bold'}>Settings</Link>
                <Link to={'/profile/logout'} className={'w-100 mb-1 btn btn-outline-dark fw-bold'}>Log Out</Link>
                <Link to={'/profile/update'} className={'w-100 mb-1 btn btn-outline-primary fw-bold'}>Update</Link>
                <Link to={'/profile/delete'} className={'w-100 mb-1 btn btn-outline-danger fw-bold'}>Delete</Link>
            </div>
        </nav>
    )
};

export default ProfileLinks;