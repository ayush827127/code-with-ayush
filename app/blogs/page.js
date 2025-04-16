'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import blogData from "@/public/data/blogData.json"; // Import JSON data


const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = blogData.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog Posts</h1>

      <div className="mb-10">
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Link key={blog.id} href={`/blogs/${blog.id}`}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition-all cursor-pointer">
                <img src={blog.image} alt={blog.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                  <p className="text-sm text-gray-500 mb-4">{blog.date}</p>
                  <p className="text-gray-700">{blog.summary}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No blogs found.</p>
        )}
      </div>
    </main>
  );
};

export default Blogs;
