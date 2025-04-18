"use client";
import { useState } from "react";
import coursesData from "@/public/data/courses.json"; // Import JSON data

const CoursePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter courses based on search
  const filteredCourses = coursesData.courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-10">
          Discover Your Next Course
        </h1>

        {/* Enhanced Search Bar */}
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

        {/* Courses List with Enhanced Styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden flex flex-col hover:shadow-2xl transition duration-300 border border-indigo-100"
              >
                {/* Clickable YouTube Thumbnail with overlay */}
                <a 
                  href={course.videoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition duration-300 z-10"></div>
                  <img
                    src={`https://img.youtube.com/vi/${course.videoLink.split("v=")[1]}/maxresdefault.jpg`}
                    alt={course.title}
                    className="w-full h-56 object-cover transform group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute bottom-4 right-4 bg-red-600 text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 z-20">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </a>

                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mb-4"></div>
                  <p className="text-gray-600 mt-2 flex-grow">{course.description}</p>

                  {/* Button aligned at the bottom */}
                  <div className="mt-6">
                    <a
                      href={course.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-full font-medium hover:from-purple-600 hover:to-indigo-600 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                      Start Learning
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="inline-block p-6 rounded-full bg-indigo-100 mb-4">
                <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xl text-gray-600">No courses found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;