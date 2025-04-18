'use client';
import apiData from "@/public/data/apiData.json";
import React, { useState, useEffect } from "react";
import ApiCard from "../components/ApiCard";

const Apis = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const filteredApis = apiData.flat().filter((api) =>
    api.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className={`transform transition-all duration-700 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl font-extrabold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
            Our APIs
          </h1>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Discover and connect with our powerful application programming interfaces
          </p>

          {/* Search Input */}
          <div className="mb-12 max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search API..."
              className="w-full px-6 py-4 border-none rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all text-lg bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-4 top-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* API Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredApis.length > 0 ? (
              filteredApis.map((api, index) => (
                <ApiCard key={api.id} api={api} index={index} animateIn={animateIn} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 text-xl">No APIs found matching your search</p>
                <button onClick={() => setSearchQuery('')} className="mt-4 text-indigo-600 font-medium">
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Apis;
