"use client";
import { useState } from "react";
import Link from "next/link";

const CoursePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const courses = [
    {
      title: "Learn C Programming",
      description: "This course will guide you through the basics of C programming. You'll learn data types, control structures, functions, arrays, pointers, and more. Perfect for beginners.",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Programming_Language.png", // Example image
      link: "/course/c-programming",
      isFree: true,
    },
    {
      title: "Master C++ Programming",
      description: "C++ is an advanced version of C, with additional features such as object-oriented programming. Learn classes, inheritance, polymorphism, and advanced data structures in this course.",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/18/C%2B%2B_logo.png", // Example image
      link: "/course/cpp-programming",
      isFree: false,
    },
    {
      title: "JavaScript for Beginners",
      description: "This course will introduce you to JavaScript, one of the most popular languages for web development. You'll learn about variables, loops, functions, and working with the DOM.",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png", // Example image
      link: "/course/js-programming",
      isFree: true,
    },
    {
      title: "Python Programming for Beginners",
      description: "Learn the fundamentals of Python, one of the most versatile programming languages. This course will cover variables, loops, functions, and basic data structures.",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", // Example image
      link: "/course/python-programming",
      isFree: true,
    },
    {
      title: "Web Development with HTML & CSS",
      description: "This course will teach you how to build modern, responsive websites using HTML and CSS. You'll learn everything from the basics to advanced layout techniques.",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/HTML5_logo_and_wordmark.svg", // Example image
      link: "/course/html-css",
      isFree: true,
    },
    {
      title: "Data Structures and Algorithms",
      description: "Get introduced to key concepts in data structures and algorithms. This course covers arrays, linked lists, stacks, queues, trees, and sorting algorithms.",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Data_Structures_Logo.png", // Example image
      link: "/course/data-structures",
      isFree: false,
    },
    {
      title: "Java for Android Development",
      description: "Learn Java programming in the context of Android development. This course will help you build your first Android application using Java and the Android Studio IDE.",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/61/Java_logo_icon.png", // Example image
      link: "/course/java-android",
      isFree: false,
    },
    {
      title: "React.js for Beginners",
      description: "Master the fundamentals of React.js and build interactive UIs with JavaScript. This course covers components, state, props, and lifecycle methods.",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", // Example image
      link: "/course/reactjs",
      isFree: true,
    },
    {
      title: "Advanced SQL and Database Management",
      description: "This advanced course on SQL teaches complex queries, joins, normalization, indexing, and database optimization techniques. Ideal for aspiring database administrators.",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/61/SQL_logo.svg", // Example image
      link: "/course/advanced-sql",
      isFree: false,
    },
    {
      title: "Machine Learning with Python",
      description: "This course covers the basics of machine learning, including algorithms, supervised and unsupervised learning, and hands-on Python coding for real-world applications.",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Machine_Learning_Logo.png", // Example image
      link: "/course/machine-learning",
      isFree: false,
    },
  ];

  const filteredCourses = courses.filter((course) =>
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
            filteredCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:scale-105"
              >
                <img
                  src={course.image}
                  alt={`${course.title} image`}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
                  <p className="text-gray-600 mt-2">{course.description}</p>
                  <div className="mt-4 flex items-center space-x-4">
                    {course.isFree && (
                      <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                        Free Course
                      </span>
                    )}
                    <Link
                      href={course.link}
                      className="inline-block bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 text-white py-2 px-4 rounded-lg hover:bg-gradient-to-l hover:from-pink-700 hover:to-blue-700 transition"
                    >
                      Start Watching
                    </Link>
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
