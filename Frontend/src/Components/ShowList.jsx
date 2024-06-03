import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { tokenCheck } from '../helperToken';

function ShowList() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    useEffect(() => {
        const urlQueryData = window.location.search;
        let query = urlQueryData.split('=');
        query = query[1];
        fetchData(query);
    }, []);

    const fetchData = async (URLid) => {
        try {
            const response = await axios.get(`http://localhost:8888/ShowList?id=${URLid}`);
            if (response.data.isPublic != true) {
                let temp = tokenCheck();
                if (!temp) {
                    navigate('/');
                }
            }
            setData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    return (
        <div className="flex justify-center items-start">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                <h1 className='flex flex-row justify-center'>Title: {data.title}</h1>
                <ul className="my-4 space-y-3">
                    {data.movies && data.movies.map((movie, index) => (
                        <li key={index} className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                            {movie}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ShowList;
