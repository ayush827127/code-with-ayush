"use client";
import { useState } from "react";
import Link from "next/link";
import coursesData from "@/public/data/courses.json"; // Import JSON data

const CoursePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter courses based on search
  const filteredCourses = coursesData.courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Course Catalog</h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search for a course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-80 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Courses List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition duration-300 transform hover:scale-105"
              >
                {/* Clickable YouTube Thumbnail */}
                <a href={course.videoLink} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`https://img.youtube.com/vi/${course.videoLink.split("v=")[1]}/maxresdefault.jpg`}
                    alt={course.title}
                    className="w-full h-56 object-cover"
                  />
                </a>

                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
                  <p className="text-gray-600 mt-2 flex-grow">{course.description}</p>

                  {/* Button aligned at the bottom */}
                  <div className="mt-auto">
                    <a
                      href={course.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 text-white py-2 px-4 rounded-lg hover:bg-gradient-to-l hover:from-pink-700 hover:to-blue-700 transition"
                    >
                      Start Watching
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No courses found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
