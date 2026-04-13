import React from "react";
import Header from "../../components/Header.jsx";
import ProfileLinks from "../../components/ProfileLinks.jsx";


function ProfileSettings() {
    return (
        <div className={'bg-light min-vh-100'}>
            <Header />
            <main className={'container mt-3'}>
                <div className={'d-flex justify-content-center gap-4'}>
                    <ProfileLinks/>
                    <nav className="col-9 bg-white shadow-lg p-2 pt-0">
                        <div className={'d-flex flex-column justify-content-center container h-100'}>
                            <h1 className={'text-center'}>Settings</h1>
                        </div>
                    </nav>
                </div>
            </main>
        </div>
    )
}

export default ProfileSettings;