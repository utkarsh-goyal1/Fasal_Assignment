import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenCheck } from '../helperToken';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL, OMDB_API_KEY } from '../DB.js';


function CreateList() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [movie, setMovie] = useState('');
    const [movies, setMovies] = useState([]);
    const [id, setId] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    useEffect(() => {
        let response = tokenCheck();
        setId(response.id);
        if (!response) {
            navigate('/');
        }
        else {
            navigate('/CreateList');
        }
    }, [])

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleMovieChange = (e) => {
        setMovie(e.target.value);
    };
    const addMovie = () => {
        if (movie.trim()) {
            setMovies([...movies, movie.trim()]);
            setMovie('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('List Title:', title);
        // console.log('Movies:', movies);
        try {
            const response = await axios.post(`${baseURL}/createList`, {
                id,
                title,
                movies,
                isPublic
            });
            toast.success('List created successfully!');
        } catch (error) {
            toast.error('Error creating list: ' + error.message);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Create a Movie List</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        List Title:
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Add Movie:
                    </label>
                    <input
                        type="text"
                        value={movie}
                        onChange={handleMovieChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button
                        type="button"
                        onClick={addMovie}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                    >
                        Add Movie
                    </button>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-2">Movies:</h2>
                    <ul className="list-disc list-inside">
                        {movies.map((movie, index) => (
                            <li key={index}>{movie}</li>
                        ))}
                    </ul>
                </div>
                <label htmlFor="hs-radio-checked-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                    <input
                        type="radio"
                        checked={isPublic}
                        onClick={() => setIsPublic(!isPublic)}
                        name="isPublic"
                        className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        id="isPublic"
                    />
                    <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">is Public ?</span>
                </label>
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                    Submit List
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default CreateList;
