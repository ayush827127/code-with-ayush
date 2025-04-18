'use client';
import apiData from "@/public/data/apiData.json";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Apis = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [animateIn, setAnimateIn] = useState(false);
  const [copiedUrlId, setCopiedUrlId] = useState(null);

  const filteredApis = apiData.flat().filter((api) =>
    api.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const getMethodColor = (method) => {
    if (!method) return 'bg-gray-100 text-gray-800';

    switch (method.toUpperCase()) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'PATCH': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedUrlId(id);
    setTimeout(() => setCopiedUrlId(null), 2000); // Reset after 2 seconds
  };

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
                <Link href={`/interface/${api.id}`} key={api.id} className="block">
                  <div
                    className={`bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer transform hover:-translate-y-1 ${animateIn ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                      transitionDuration: '500ms'
                    }}
                  >
                    <div className="border-t-4 border-indigo-500"></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">{api.title}</h2>
                        {api.method && (
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getMethodColor(api.method)}`}>
                            {api.method}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {api.date || "No date provided"}
                      </p>

                      {/* URL Section with Copy Button in the Header */}
                      <div className="bg-gray-50 p-3 rounded-lg mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-indigo-600 font-semibold text-sm">URL:</span>
                          {api.url && (
                            <button
                              onClick={(e) => {
                                e.preventDefault(); // Prevent link click
                                handleCopy(api.url, api.id);
                              }}
                              className="text-gray-400 hover:text-indigo-600 transition flex items-center"
                              title="Copy URL"
                            >
                              {copiedUrlId === api.id ? (
                                <span className="text-green-500 text-xs font-medium">Copied!</span>
                              ) : (
                                <>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 16h8M8 12h8m-9 8h10a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 12V9a2 2 0 012-2h6a2 2 0 012 2v12"
                                    />
                                  </svg>
                                  <span className="text-xs">Copy</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                        <p className="text-gray-700 font-mono text-sm break-all">
                          {api.url || "No URL provided"}
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <span className="text-indigo-600 font-medium text-sm flex items-center">
                          View Details
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
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