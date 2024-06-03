/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../DB';
import { tokenCheck } from '../helperToken';

function Header() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = tokenCheck();
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('movieUser');
        navigate('/');
    }
    return (
        <div className="w-full bg-gray-800 shadow-md sticky top-0 z-30 p-2" >
            <div className="flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                <div>
                    <h5 className="text-white">Movie Library</h5>
                </div>
                <div className="hidden lg:block">
                    <ul className="ml-12 inline-flex space-x-8">
                        <NavLink
                            to="/Home"
                            className={({ isActive }) => `inline-flex items-center text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-300'} hover:text-gray-100`}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/createList"
                            className={({ isActive }) => `inline-flex items-center text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-300'} hover:text-gray-100`}
                        >
                            Create List
                        </NavLink>

                    </ul>
                </div>
                <div className='flex flex-row'>
                    <div className="hidden space-x-2 mt-1 ml-3 lg:block">
                        {isLoggedIn ? (
                            <div className='flex'>
                                <button onClick={handleLogout} type="button" className="text-white border border-color: rgb(241 245 249); bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Log Out</button>
                            </div>
                        ) : (
                            <>
                                <NavLink to="/signup">
                                    <button className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                                        Sign Up
                                    </button>
                                </NavLink>
                                <NavLink to="/login">
                                    <button className="rounded-md border border-white bg-transparent px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                                        Login
                                    </button>
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
