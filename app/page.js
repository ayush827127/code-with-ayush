"use client";
import Link from "next/link";
import DesignCard from "./components/DesignCard";
import coursesData from "@/public/data/courses.json";
import notesData from "@/public/data/notes.json";
import apiData from "@/public/data/apiData.json";
import { useDesigns } from "@/app/context/DesignContext";
import Testimonials from "./components/Landing/Testimonial";
import Hero from "./components/Landing/Hero";
import ApiCard from "./components/ApiCard";
 
//  import keywordData from "";
 //description,robotex.txt 

export default function HomePage() {
  const { designs, loading, error } = useDesigns();

  const courses = coursesData.courses.slice(0, 6);
  const notes = notesData.notes.slice(0, 6);
  const apis = apiData.slice(0, 6);

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
      <section>
        <Hero />
      </section>

      {/* Designs Section */}
      <section
        id="designs"
        className="py-20 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 bg-clip-text text-transparent drop-shadow-sm">
          Innovative Interface Elements
          </h2>
          <p className="text-center text-indigo-800 font-medium mb-8 text-lg italic">"Experience a design that's not just beautiful—but built for users."</p>
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

      {/* APIs Section */}
      <section
        id="apis"
        className="py-20 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
          Supercharge Your Website with APIs
          </h2>
          <p className="text-center text-purple-800 font-medium mb-8 text-lg italic">"Bring dynamic features to life with fast, secure, and flexible APIs designed for modern web development."</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {apis.map((api) => (
              <ApiCard key={api.id} api={api} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/apis">
              <span className="text-white bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-gradient-to-l transition">
                View All APIs
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
          <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
          Begin Your Learning Adventure
          </h2>
          <p className="text-center text-pink-800 font-medium mb-8 text-lg">Level up your coding skills with these expert picks.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="border-2 border-gray-200 p-6 rounded-lg shadow-lg flex flex-col h-full"
              >
                <a
                  href={course.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-lg mb-4 hover:opacity-80 transition"
                  />
                </a>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-bold text-xl text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    {course.description}
                  </p>
                  <a
                    href={course.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-full hover:from-purple-500 hover:to-blue-500 transition-all duration-300 mt-auto">
                      Start Watching
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/courses">
              <span className="text-white bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-gradient-to-l transition">
                Explore More Courses
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Notes Section */}
      <section
        id="notes"
        className="py-20 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-pink-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent drop-shadow-sm">
            Programming Notes
          </h2>
          <p className="text-center text-blue-800 font-medium mb-8 text-lg">Learn the logic behind the code.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className="border-2 border-gray-200 p-6 rounded-lg shadow-lg flex flex-col"
              >
                <img
                  src={note.image}
                  alt={note.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-bold text-xl text-gray-800 mb-4">
                  {note.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {note.description}
                </p>
                <a
                  href={note.fileLink}
                  download
                  className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 font-semibold py-3 rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-300 text-center block mt-auto"
                >
                  Download Notes
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/notes">
              <span className="text-white bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-gradient-to-l transition">
                Explore More Notes
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimoial */}
      <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
        <Testimonials />
      </section>
    </div>
  );
}