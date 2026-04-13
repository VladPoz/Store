import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header.jsx";
import ProfileLinks from "../../components/ProfileLinks.jsx";
import {getUserProfile, UserUpdate} from "../../api/request.jsx";

function ProfileUpdate() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState("");

    async function getUserData() {
        const userData = await getUserProfile();
        if (userData){
            setUserName(userData.name);
            setUserEmail(userData.email);
            setLoading(false);
        };
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const data = await UserUpdate(userName, userEmail, userPassword);
        setResult('User Updated');
        if (data.err){
            setResult(data.err);
        }
    }

    useEffect(() => {
        getUserData();
    }, [])

    if(loading){
        return (
            <div className={'bg-light min-vh-100'}>
                <Header />
                <main className={'container mt-3'}>
                    <div className={'d-flex justify-content-center gap-4'}>
                        <ProfileLinks/>
                        <nav className="col-9 bg-white shadow-lg p-2 pt-0">
                            <div className="d-flex flex-column align-items-center justify-content-center h-100">
                                <div>
                                    <h1 className={'text-center my-3'}>Update</h1>
                                    <p className={'text-center'}>Loading...</p>
                                </div>
                            </div>
                        </nav>
                    </div>
                </main>
            </div>
        )
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
                                <h1 className={'text-center my-3'}>Update</h1>
                                <input type={"text"} className={"form-control mb-3"} placeholder={"UserName"} value={userName} onChange={(e) => setUserName(e.target.value)} name={"name"} />
                                <input type={"email"} className={"form-control mb-3"} placeholder={"Email"} value={userEmail}  onChange={(e)=> setUserEmail(e.target.value)} name={"email"} />
                                <input type={"password"} className={"form-control mb-3"} placeholder={"Password"} onChange={(e)=> setUserPassword(e.target.value)} name={"password"} />
                                {result && <p>{result}</p>}
                                <form>
                                    <button type={"submit"} className={'btn btn-primary fw-bold w-100'} onClick={(e)=>{handleSubmit(e)}}>Update</button>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </main>
        </div>
    )
}

export default ProfileUpdate;