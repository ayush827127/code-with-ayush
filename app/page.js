"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import DesignCard from "./components/DesignCard";
import CustomFooter from "./components/CustomFooter"

export default function HomePage() {
  const [designs, setDesigns] = useState([]); // Store fetched designs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    async function fetchDesigns() {
      try {
        setLoading(true);
        const response = await fetch("/api/designs?limit=8"); // Fetch only 8 designs
        if (!response.ok) {
          throw new Error("Failed to fetch designs.");
        }
        const data = await response.json();
        setDesigns(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDesigns();
  }, []);

  const courses = [
    {
      id: 1,
      title: "C Programming",
      description: "A comprehensive course on C programming language.",
      image: "https://via.placeholder.com/300",
      link: "/courses/c-programming",
    },
    {
      id: 2,
      title: "C++ Programming",
      description: "Learn object-oriented programming with C++.",
      image: "https://via.placeholder.com/300",
      link: "/courses/c-plus-plus",
    },
    {
      id: 3,
      title: "JavaScript Basics",
      description: "Master JavaScript and build web applications.",
      image: "https://via.placeholder.com/300",
      link: "/courses/javascript-basics",
    },
    {
      id: 4,
      title: "Data Structures",
      description: "Learn fundamental data structures used in programming.",
      image: "https://via.placeholder.com/300",
      link: "/courses/data-structures",
    },
    {
      id: 5,
      title: "Algorithms",
      description: "A deep dive into algorithms and problem-solving.",
      image: "https://via.placeholder.com/300",
      link: "/courses/algorithms",
    },
    {
      id: 6,
      title: "React.js",
      description: "Learn how to build modern web apps with React.js.",
      image: "https://via.placeholder.com/300",
      link: "/courses/react-js",
    }
  ];

  const notes = [
    {
      id: 1,
      title: "C Programming Notes",
      description: "Notes covering the fundamentals of C programming.",
      image: "https://via.placeholder.com/300",
      fileLink: "/notes/c-programming-notes.pdf",
    },
    {
      id: 2,
      title: "JavaScript Notes",
      description: "Detailed notes on JavaScript for beginners.",
      image: "https://via.placeholder.com/300",
      fileLink: "/notes/javascript-notes.pdf",
    },
    {
      id: 3,
      title: "Data Structures Notes",
      description: "Important concepts and algorithms for data structures.",
      image: "https://via.placeholder.com/300",
      fileLink: "/notes/data-structures-notes.pdf",
    },
    {
      id: 4,
      title: "Algorithms Notes",
      description: "Notes explaining algorithms with examples.",
      image: "https://via.placeholder.com/300",
      fileLink: "/notes/algorithms-notes.pdf",
    },
  ];

  const SkeletonLoader = () => (
    <div className="border-2 border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="w-3/4 h-6 bg-blue-300 rounded mb-4 animate-pulse"></div>
      <div className="relative overflow-hidden rounded-lg shadow-md mb-4">
        <div className="w-full h-72 bg-purple-300 animate-pulse rounded-lg"></div>
      </div>
      <div className="w-1/2 h-12 bg-pink-300 rounded-full mb-4 animate-pulse"></div>
    </div>
  );

  return (
    <div>

      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-20 text-center"
      >
        <div className="container mx-auto">
          <h1 className="text-5xl font-extrabold mb-4">Code with Ayush</h1>
          <p className="text-lg mb-8">
            Explore interactive designs, detailed courses, and comprehensive
            notes to level up your skills.
          </p>
          <Link href="#designs">
            <span className="bg-white text-purple-600 py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition">
              Get Started
            </span>
          </Link>
        </div>
      </section>

      {/* Designs Section */}
      <section
        id="designs"
        className="py-20 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
            Featured Designs
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center font-bold">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {designs.map((design) => (
                <DesignCard key={design._id} design={design} />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link href="/designs">
              <span className="text-white bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-gradient-to-l transition">
                Explore All Designs
              </span>
            </Link>
          </div>
        </div>
      </section>

     {/* Courses Section */}
     <section
        id="courses"
        className="py-20 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="border-2 border-gray-200 p-6 rounded-lg shadow-lg">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-bold text-xl text-gray-800 mb-4">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <Link href={course.link}>
                  <button className="w-full bg-blue-500 text-white font-semibold py-3 rounded-full hover:bg-blue-600">
                    Start Watching
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notes Section */}
      <section
        id="notes"
        className="py-20 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
            Programming Notes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div key={note.id} className="border-2 border-gray-200 p-6 rounded-lg shadow-lg">
                <img
                  src={note.image}
                  alt={note.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-bold text-xl text-gray-800 mb-4">{note.title}</h3>
                <p className="text-gray-600 mb-4">{note.description}</p>
                <a
                  href={note.fileLink}
                  download
                  className="w-full text-white bg-blue-500 font-semibold py-3 rounded-full hover:bg-blue-600 text-center block"
                >
                  Download Notes
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CustomFooter/>
    </div>
  );
}
