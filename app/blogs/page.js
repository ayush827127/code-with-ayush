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
      const date = new Date(dateString);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className={`transform transition-all duration-700 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-7 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-400 drop-shadow-md">
         Our Blog Posts
       </h1>
          <p className="text-center text-gray-600 mb-6 sm:mb-8 md:mb-12 text-base sm:text-lg max-w-3xl mx-auto px-2">
            Explore our latest thoughts, insights, and updates on technology, design, and development
          </p>

          {/* Search Input */}
          <div className="mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto relative">
            <div className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search blog posts..."
              className="w-full pl-10 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 border-none rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all text-base sm:text-lg bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Blog Grid - Fixed Card Alignment */}
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, index) => (
                <Link 
                  key={blog.id} 
                  href={`/blogs/${blog.id}`}
                  className="block group h-full"
                  onMouseEnter={() => setHoveredBlog(blog.id)}
                  onMouseLeave={() => setHoveredBlog(null)}
                >
                  <div 
                    className={`bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col ${
                      animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ 
                      transitionDelay: `${index * 100}ms`,
                      transitionDuration: '500ms',
                      transform: hoveredBlog === blog.id ? 'translateY(-8px)' : 'translateY(0)'
                    }}
                  >
                    <div className="relative overflow-hidden">
                      {blog.image ? (
                        <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                          <img 
                            src={blog.image} 
                            alt={blog.title} 
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                        </div>
                      ) : (
                        // Placeholder for missing images to maintain consistent height
                        <div className="relative h-40 sm:h-48 md:h-56 bg-gradient-to-r from-teal-100 to-blue-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      
                      {blog.category && (
                        <span className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-teal-500 text-white text-xs font-medium px-2 sm:px-3 py-1 rounded-full shadow-lg">
                          {blog.category}
                        </span>
                      )}
                      
                      {blog.date && (
                        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 text-white flex items-center text-xs sm:text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(blog.date)}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h2>
                      
                      {blog.summary ? (
                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-grow">
                          {blog.summary}
                        </p>
                      ) : (
                        // Empty spacer to maintain consistent height
                        <div className="flex-grow min-h-6"></div>
                      )}
                      
                      <div className="flex items-center justify-between  border-t border-gray-100">
                        <div className="flex items-center">
                          {blog.author && blog.authorImage ? (
                            <>
                              <img src={blog.authorImage} alt={blog.author} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2 object-cover" />
                              <span className="text-xs sm:text-sm font-medium text-gray-700 truncate max-w-[100px] sm:max-w-[140px]">
                                {blog.author}
                              </span>
                            </>
                          ) : blog.author ? (
                            <>
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full mr-2 flex items-center justify-center text-gray-500">
                                {blog.author.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-xs sm:text-sm font-medium text-gray-700 truncate max-w-[120px] sm:max-w-[160px]">
                                {blog.author}
                              </span>
                            </>
                          ) : (
                            <span className="text-xs sm:text-sm font-medium text-gray-500">
                              Anonymous
                            </span>
                          )}
                        </div>
                        
                        <span className="text-teal-600 font-medium text-xs sm:text-sm flex items-center whitespace-nowrap">
                          Read More
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mb-3 sm:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <p className="text-gray-500 text-lg sm:text-xl">No blog posts found matching your search</p>
                <button onClick={() => setSearchQuery('')} className="mt-3 sm:mt-4 text-teal-600 font-medium px-4 py-2 rounded-full border border-teal-200 hover:bg-teal-50 transition-colors">
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