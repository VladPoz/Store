import React, {useEffect, useState} from "react";

import Header from "../../components/Header.jsx";
import ProfileLinks from "../../components/ProfileLinks.jsx";
import {getUserProfile} from "../../api/request.jsx";


function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProfile() {
            const data = await getUserProfile();
            if (data) {
                setUserData(data);
                setLoading(false);
            }
        }
        loadProfile();
    }, [])

    if (loading) {
        return (
            <div className={'bg-light min-vh-100'}>
                <Header />
                <main className={'container mt-3'}>
                    <div className={'d-flex justify-content-center gap-4'}>
                        <ProfileLinks />
                        <nav className="col-9 bg-white shadow-lg p-2 pt-0">
                            <div className={'d-flex flex-column justify-content-center container h-100'}>
                                <h1 className={'text-center'}>Profile</h1>
                                <p className={'text-center'}>Loading...</p>
                            </div>
                        </nav>
                    </div>
                </main>
            </div>
        );
    }
    return (
        <div className={'bg-light min-vh-100'}>
            <Header />
            <main className={'container mt-3'}>
                <div className={'d-flex justify-content-center gap-4'}>
                    <ProfileLinks />
                    <nav className="col-9 bg-white shadow-lg p-2 pt-0">
                        <div className={'d-flex flex-column justify-content-center container h-100'}>
                        <h1 className={'text-center'}>Profile</h1>
                            <ul>
                                <li className={'list-unstyled fw-bold fs-5'}>Name: {userData.name}</li>
                                <li className={'list-unstyled'}>Email: {userData.email}</li>
                                <li className={'list-unstyled'}>Role: {userData.role.role_name}</li>
                                <li className={'list-unstyled'}>Date: {userData.created_at}</li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </main>
        </div>
    );
}

export default Profile;