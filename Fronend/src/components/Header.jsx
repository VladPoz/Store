import React from "react";
import {Link, useLocation} from "react-router-dom";

function Header(){
    const location = useLocation();
    return (
        <header className="sticky-top navbar navbar-expand-lg bg-dark navbar-dark py-3 z-3">
            <div className="container">
                <Link className="navbar-brand fw-bold" to={'/'}>STORE</Link>
                {location.pathname === '/' ? (
                    <nav className="position-relative">
                        <input className={'form-control pe-5'} maxLength={32}></input>
                        <button className={'position-absolute start-100 top-50 translate-middle h-100 border-0 bg-transparent'}><img src="./icons/search.svg" alt="search" className={'h-75 me-5'}/></button>
                    </nav>
                ) : null}
                <div className={"d-flex gap-3"}>
                    {localStorage.getItem('token') ? (
                        <Link to={'/profile'} className="btn btn-dark btn-outline-light fw-bold px-3">Profile</Link>
                    ) : (
                        <>
                            <Link to={'/login'} className="btn btn-dark btn-outline-light fw-bold px-3">Login</Link>
                            <Link to={'/signup'} className="btn btn-light fw-bold px-3">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;