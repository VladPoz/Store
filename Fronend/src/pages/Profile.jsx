import React, {useEffect, useState} from "react";
import Header from "../components/Header.jsx";
import axios from "axios";
import UserBasket from "../components/UserBasket.jsx";
import UserProduct from "../components/UserProduct.jsx";
import UserSettings from "../components/UserSettings.jsx";
import Logout from "../components/Logout.jsx";
import UserUpdate from "../components/UserUpdate.jsx";
import UserDelete from "../components/UserDelete.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import Category from "../components/Category.jsx";


function Profile() {

    const [user, setUser] = useState({});
    const [userRole, setUserRole] = useState('');
    const [profileForm, setProfileForm] = useState('');
    const navigate = useNavigate();
    const form = {
        'basket': <UserBasket />,
        'product': <UserProduct />,
        'category': <Category />,
        'settings': <UserSettings />,
        'logout': <Logout />,
        'update': <UserUpdate />,
        'delete': <UserDelete />
    }
    const baseURL = "http://localhost:8000/api/v1";
    const token = localStorage.getItem("token");

    async function profile() {
        try{
            const response = await axios.get(`${baseURL}/user/profile`, {headers:{Authorization: `Bearer ${token}`,}});
            setUser(response.data[0]);
            setUserRole(response.data[1]);
        }catch(err){
            console.log(err.response.data.message);
        }
    }

    useEffect(() => {
        if(!token){
            navigate("/");
        };
        profile();
    }, []);

    return (
        <div className={'bg-light min-vh-100'}>
            <Header />
            <main className={'container mt-3'}>
                <div className={'d-flex justify-content-center gap-4'}>
                    <nav className="col-3 bg-white shadow-lg p-2 pt-0">
                        <div className={'d-flex align-items-center'}>
                            <img className={'ms-2'} src={'./icons/user.svg'} alt='user' />
                            <ul className={'my-3'}>
                                <li className={'list-unstyled fw-bold fs-5'}>{user.name}</li>
                                <li className={'list-unstyled fs-6'}>{user.email}</li>
                            </ul>
                        </div>
                        <div className={'px-1'}>
                            <button onClick={()=>{setProfileForm('')}} className={'w-100 mb-1 btn btn-outline-dark fw-bold'}>Profile</button>
                            <button onClick={()=>{setProfileForm('basket')}} className={'w-100 mb-1 btn btn-outline-dark fw-bold'}>Basket</button>
                            <button onClick={()=>{setProfileForm('product')}} className={'w-100 mb-1 btn btn-outline-dark fw-bold'}>Product</button>
                            {userRole == 'admin'? (
                                <button onClick={()=>{setProfileForm('category')}} className={'w-100 mb-1 btn btn-outline-dark fw-bold'}>Category</button>
                            ) : null}
                            <button onClick={()=>{setProfileForm('settings')}} className={'w-100 mb-1 btn btn-outline-secondary fw-bold'}>Settings</button>
                            <button onClick={()=>{setProfileForm('logout')}} className={'w-100 mb-1 btn btn-outline-dark fw-bold'}>Log Out</button>
                            <button onClick={()=>{setProfileForm('update')}} className={'w-100 mb-1 btn btn-outline-primary fw-bold'}>Update</button>
                            <button onClick={()=>{setProfileForm('delete')}} className={'w-100 mb-1 btn btn-outline-danger fw-bold'}>Delete</button>
                        </div>
                    </nav>
                    {form[profileForm] || (
                        <nav className="col-9 bg-white shadow-lg p-2 pt-0">
                            <div className={'d-flex flex-column justify-content-center container h-100'}>
                            <h1 className={'text-center'}>Profile</h1>
                                <ul>
                                    <li className={'list-unstyled fw-bold fs-5'}>Name: {user.name}</li>
                                    <li className={'list-unstyled'}>Email: {user.email}</li>
                                    <li className={'list-unstyled'}>Role: {userRole}</li>
                                    <li className={'list-unstyled'}>Date: {user.created_at}</li>
                                </ul>
                            </div>
                        </nav>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Profile;