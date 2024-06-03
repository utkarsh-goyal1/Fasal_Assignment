import React from 'react';
import axios from 'axios';
import { baseURL, OMDB_API_KEY } from '../DB.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenCheck } from '../helperToken.js';


function Home() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [id, setId] = useState('');
    const [lists, setLists] = useState([]);
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setSearchTerm('');
        fetchData();
    };
    useEffect(() => {
        let response = tokenCheck();
        setId(response.id);
        if (!response) {
            navigate('/');
        }
        else {
            navigate('/Home');
        }
    }, [])

    useEffect(() => {
        if (id) {
            fetchUserData();
        }
    }, [id]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${baseURL}/getCreatedLists/${id}`);
            console.log(response.data);
            setLists(response.data.createdLists);

        } catch (e) {
            console.error('Error fetching user data:', e);
        }
    }
    const showList = ({ pid, ptitle }) => {
        navigate(`/ShowList/${ptitle}?id=${pid}`);
    };

    const fetchData = async () => {
        try {

            let response = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${searchTerm}&plot=full`);
            if (response.status === 200) {
                let data = response.data;
                console.log(data);
                navigate("/MovieCover/MovieCoverPage", { state: { data } });
            }
        } catch (err) {
            console.error('Error in fetching data', err);
        }
    };
    return (
        <div className="flex items-start justify-center min-h-screen bg-gray-100 pt-10">
            <div className="relative z-10">
                <form onSubmit={handleClick} className='border border-gray-500 rounded-md bg-white px-1 py-1 flex gap-2 mb-4'>
                    <input
                        className="flex h-10 w-[500px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="Search For Movies"
                    />
                    <button className='ml-2 w-8' type='submit'>
                        <svg className='w-5 fill-gray-500 mr-1 hover:fill-black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </svg>
                    </button>
                </form>
                <div className="grid gap-4">
                    {lists.map((item, index) => (
                        <div key={index} className="flex flex-row justify-between border border-gray-300 rounded-md p-4">
                            <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                                {item.title}
                            </h5>
                            <button onClick={() => showList({ pid: item._id, ptitle: item.title, pmoviesList: item.movies, pisPublic: item.isPublic })}
                                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Open
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
