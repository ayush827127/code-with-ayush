'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import blogData from "@/public/data/blogData.json"; // Import JSON data

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [animateIn, setAnimateIn] = useState(false);
  const [hoveredBlog, setHoveredBlog] = useState(null);

  // Filter the blog data based on the search query
  const filteredBlogs = blogData.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animation effect when component mounts
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Format date to be more readable if needed
  const formatDate = (dateString) => {
    if (!dateString) return "No date provided";
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className={`transform transition-all duration-700 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl font-extrabold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600">
            Our Blog Posts
          </h1>
          
          <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
            Explore our latest thoughts, insights, and updates on technology, design, and development
          </p>

          {/* Search Input */}
          <div className="mb-12 max-w-2xl mx-auto relative">
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search blog posts..."
              className="w-full pl-14 pr-6 py-4 border-none rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all text-lg bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Blog Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, index) => (
                <Link 
                  key={blog.id} 
                  href={`/blogs/${blog.id}`}
                  className="block group"
                  onMouseEnter={() => setHoveredBlog(blog.id)}
                  onMouseLeave={() => setHoveredBlog(null)}
                >
                  <div 
                    className={`bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ 
                      transitionDelay: `${index * 100}ms`,
                      transitionDuration: '500ms',
                      transform: hoveredBlog === blog.id ? 'translateY(-8px)' : 'translateY(0)'
                    }}
                  >
                    <div className="relative overflow-hidden">
                      {blog.image && (
                        <div className="relative h-56 overflow-hidden">
                          <img 
                            src={blog.image} 
                            alt={blog.title} 
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                        </div>
                      )}
                      
                      {blog.category && (
                        <span className="absolute top-4 right-4 bg-teal-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                          {blog.category}
                        </span>
                      )}
                      
                      {blog.date && (
                        <div className="absolute bottom-4 left-4 text-white flex items-center text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(blog.date)}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-teal-600 transition-colors duration-300">{blog.title}</h2>
                      
                      {blog.summary && (
                        <p className="text-gray-600 mb-4 line-clamp-3">{blog.summary}</p>
                      )}
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          {blog.author && blog.authorImage ? (
                            <>
                              <img src={blog.authorImage} alt={blog.author} className="w-8 h-8 rounded-full mr-2 object-cover" />
                              <span className="text-sm font-medium text-gray-700">{blog.author}</span>
                            </>
                          ) : blog.author ? (
                            <span className="text-sm font-medium text-gray-700">{blog.author}</span>
                          ) : null}
                        </div>
                        
                        <span className="text-teal-600 font-medium text-sm flex items-center">
                          Read More
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <p className="text-gray-500 text-xl">No blog posts found matching your search</p>
                <button onClick={() => setSearchQuery('')} className="mt-4 text-teal-600 font-medium px-4 py-2 rounded-full border border-teal-200 hover:bg-teal-50 transition-colors">
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

export default Blogs;