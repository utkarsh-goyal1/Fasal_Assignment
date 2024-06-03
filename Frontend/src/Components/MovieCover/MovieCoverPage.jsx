import { useParams } from "react-router-dom"
import Banner from "./Banner"
import { useEffect, useState } from "react";
import axios from 'axios'
import baseURL from "../../DB";
import { useLocation } from "react-router-dom";

function MovieCoverPage() {
    const location = useLocation();
    const { data } = location.state || {};

    // Split the Actors string into an array
    const actors = data.Actors ? data.Actors.split(',') : [];

    return (
        <div>
            <Banner
                name={data.Title}
                language={data.Language}
                releaseDate={data.Released}
                genre={data.Genre}
                ratings={data.imdbRating}
                votes={data.imdbVotes}
            />
            <div className='my-10 mx-24 pb-8 border-b'>
                <h1 className='my-3 text-2xl font-bold text-gray-900'>About the movie</h1>
                <p className='text-md font-light text-gray-700'>{data.Plot}</p>
            </div>
            <div className='my-10 mx-24 pb-8 border-b'>
                <h1 className='my-3 text-2xl font-bold text-gray-900'>Cast</h1>
                <div className='flex gap-10'>
                    {actors.map((actor, index) => (
                        <div className='w-32 mt-3' key={index}>
                            <div className='mt-3 flex flex-col text-center w-full'>
                                <h1 className='text-gray-900'>{actor.trim()}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieCoverPage;
