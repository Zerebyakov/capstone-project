import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function SearchComp() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search/${query}`); 
        }
    };

    return (
        <div>
            <form className="flex items-center max-w-sm mx-auto" onSubmit={handleSearch}>
                <div className="relative w-full">
                    <input
                        type="text"
                        id="simple-search"
                        className="bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-white-500 focus:border-white-500 block w-full ps-10 p-2.5"
                        placeholder="Search News..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="p-2.5 ms-2 text-sm font-medium text-black bg-white border border-black rounded-lg hover:bg-white-200 focus:ring-4 focus:outline-none focus:ring-gray-300"
                >
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </form>
        </div>
    );
}

export default SearchComp;
