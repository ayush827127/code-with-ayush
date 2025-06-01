"use client";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DesignCard from "./components/DesignCard";
import coursesData from "@/public/data/courses.json";
import notesData from "@/public/data/notes.json";
import apiData from "@/public/data/apiData.json";
import { useDesigns } from "@/app/context/DesignContext";
import Testimonials from "./components/Landing/Testimonial";
import Hero from "./components/Landing/Hero";
import ApiCard from "./components/ApiCard";

export default function HomePage() {
  const { designs, loading, error } = useDesigns();
  const courses = coursesData.courses.slice(0, 6);
  const notes = notesData.notes.slice(0, 6);
  const apis = apiData.slice(0, 6);
  const [isNewsletterFocused, setIsNewsletterFocused] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // For scroll animations
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const SkeletonLoader = () => (
    <div className="border-2 border-gray-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-blue-50 to-purple-50 overflow-hidden relative">
      <div className="w-3/4 h-6 bg-blue-200 rounded mb-4 animate-pulse"></div>
      <div className="relative overflow-hidden rounded-xl shadow-md mb-4">
        <div className="w-full h-72 bg-gradient-to-r from-purple-200 via-blue-200 to-pink-200 animate-pulse rounded-xl"></div>
      </div>
      <div className="w-1/2 h-12 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mb-4 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-200 to-transparent rounded-full -mr-12 -mt-12 opacity-40"></div>
    </div>
  );

  return (
    <div className="bg-gray-50">
      <Head>
        <title>Code with Ayush - Learn Coding, Explore APIs & UI Designs</title>
        <meta
          name="description"
          content="A platform for developers and students to explore UI designs, APIs, coding tutorials, and notes for learning and building projects."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-500/20 to-pink-500/30 pointer-events-none"></div>
        <Hero />
        {/* Decorative Elements */}
        <div className="absolute top-40 left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-10 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Category Tabs - New Addition */}
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === "all"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Categories
          </button>
          <button
            onClick={() => setActiveTab("designs")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === "designs"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            UI Designs
          </button>
          <button
            onClick={() => setActiveTab("apis")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === "apis"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            APIs
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === "notes"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Notes
          </button>
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === "courses"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Courses
          </button>
        </div>
      </div>

      {/* Designs Section - Enhanced */}
      {(activeTab === "all" || activeTab === "designs") && (
        <motion.section
          id="designs"
          className="py-20 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUpVariants}
        >
          {/* Background graphics */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-transparent rounded-full"></div>
            <div className="absolute top-40 -left-20 w-60 h-60 bg-gradient-to-br from-purple-300/20 to-transparent rounded-full"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center mb-12">
              <div className="inline-block p-1 px-3 bg-blue-100 rounded-full text-blue-800 text-xs font-semibold mb-3">
                UI COMPONENTS
              </div>
              <h2 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 bg-clip-text text-transparent drop-shadow-sm">
                Innovative Interface Elements
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full my-4"></div>
              <p className="text-center text-indigo-800 font-medium mb-8 text-lg italic max-w-2xl">
                "Experience a design that's not just beautiful—but built for
                users."
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="text-red-700 font-medium">{error}</p>
                <p className="text-red-600 text-sm mt-1">
                  Please try refreshing the page or contact support if the issue
                  persists.
                </p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {designs.map((design) => (
                  <motion.div key={design._id} variants={fadeInUpVariants}>
                    <DesignCard design={design} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            <div className="text-center mt-12">
              <Link href="/designs">
                <span className="inline-block group relative overflow-hidden text-white bg-gradient-to-r from-blue-600 to-purple-600 py-4 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <span className="relative z-10">Explore All Designs</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </Link>
            </div>
          </div>
        </motion.section>
      )}

      {/* APIs Section - Enhanced */}
      {(activeTab === "all" || activeTab === "apis") && (
        <motion.section
          id="apis"
          className="py-20 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUpVariants}
        >
          {/* Background graphics */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-300/20 to-transparent rounded-full"></div>
            <div className="absolute top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-300/20 to-transparent rounded-full"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center mb-12">
              <div className="inline-block p-1 px-3 bg-indigo-100 rounded-full text-indigo-800 text-xs font-semibold mb-3">
                API COLLECTION
              </div>
              <h2 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
                Supercharge Your Website with APIs
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full my-4"></div>
              <p className="text-center text-purple-800 font-medium mb-8 text-lg italic max-w-2xl">
                "Bring dynamic features to life with fast, secure, and flexible
                APIs designed for modern web development."
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {apis.map((api) => (
                <motion.div key={api.id} variants={fadeInUpVariants}>
                  <ApiCard api={api} />
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center mt-12">
              <Link href="/apis">
                <span className="inline-block group relative overflow-hidden text-white bg-gradient-to-r from-indigo-600 to-purple-600 py-4 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <span className="relative z-10">View All APIs</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </Link>
            </div>
          </div>
        </motion.section>
      )}

      {/* Notes Section - Enhanced */}
      {(activeTab === "all" || activeTab === "notes") && (
        <motion.section
          id="notes"
          className="py-20 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUpVariants}
        >
          {/* Background graphics */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-transparent rounded-full"></div>
            <div className="absolute top-40 -left-20 w-60 h-60 bg-gradient-to-br from-indigo-300/20 to-transparent rounded-full"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center mb-12">
              <div className="inline-block p-1 px-3 bg-blue-100 rounded-full text-blue-800 text-xs font-semibold mb-3">
                QUICK REFERENCES
              </div>
              <h2 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 bg-clip-text text-transparent drop-shadow-sm">
                Developer's Cheat Sheets
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full my-4"></div>
              <p className="text-center text-blue-800 font-medium mb-8 text-lg max-w-2xl">
                Quick, structured, and logical notes to make your coding journey
                smooth.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  variants={fadeInUpVariants}
                  className="bg-white border-2 border-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img
                      src={note.image}
                      alt={note.title}
                      className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 mb-4">
                    {note.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    {note.description}
                  </p>
                  <a
                    href={note.fileLink}
                    download
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-full hover:shadow-lg transition-all duration-300 text-center block mt-auto"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Download Notes
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2 transform group-hover:translate-y-1 transition-transform"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </a>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center mt-12">
              <Link href="/notes">
                <span className="inline-block group relative overflow-hidden text-white bg-gradient-to-r from-blue-600 to-indigo-600 py-4 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <span className="relative z-10">Explore More Notes</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </Link>
            </div>
          </div>
        </motion.section>
      )}

      {/* Courses Section - Enhanced */}
      {(activeTab === "all" || activeTab === "courses") && (
        <motion.section
          id="courses"
          className="py-20 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUpVariants}
        >
          {/* Background graphics */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"></div>
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-300/20 to-transparent rounded-full"></div>
            <div className="absolute bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-purple-300/20 to-transparent rounded-full"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center mb-12">
              <div className="inline-block p-1 px-3 bg-pink-100 rounded-full text-pink-800 text-xs font-semibold mb-3">
                LEARNING RESOURCES
              </div>
              <h2 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                Begin Your Learning Adventure
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full my-4"></div>
              <p className="text-center text-pink-800 font-medium mb-8 text-lg max-w-2xl">
                Level up your coding skills with these expert picks.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={fadeInUpVariants}
                  className="bg-white border-2 border-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <a
                      href={course.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-pink-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </div>
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
                      <button className="w-full group relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 rounded-full hover:shadow-lg transition-all duration-300 mt-auto">
                        <span className="relative z-10 flex items-center justify-center">
                          Start Watching
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                      </button>
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center mt-12">
              <Link href="/courses">
                <span className="inline-block group relative overflow-hidden text-white bg-gradient-to-r from-pink-600 to-purple-600 py-4 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <span className="relative z-10">Explore More Courses</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </Link>
            </div>
          </div>
        </motion.section>
      )}

      {/* Features Overview Section - Enhanced */}
      <motion.section
        className="py-24 relative bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-indigo-700 mb-6">
              Everything You Need in One Place
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're just starting out or looking to level up your
              skills, we've got all the resources you need to succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-purple-100 p-8 rounded-2xl shadow-md hover:shadow-lg transition relative overflow-hidden group"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="mb-4 bg-blue-100 text-blue-600 p-3 inline-block rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                Hands-On Learning
              </h3>
              <p className="text-gray-700">
                Explore practical coding tutorials and build real-world projects
                step by step.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl shadow-md hover:shadow-lg transition relative overflow-hidden group"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="mb-4 bg-purple-100 text-purple-600 p-3 inline-block rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-purple-700 mb-3">
                Built for Beginners
              </h3>
              <p className="text-gray-700">
                Start from scratch with beginner-friendly resources and
                intuitive designs.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-pink-50 to-blue-100 p-8 rounded-2xl shadow-md hover:shadow-lg transition relative overflow-hidden group"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-transparent rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="mb-4 bg-pink-100 text-pink-600 p-3 inline-block rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pink-700 mb-3">
                Developer Tools
              </h3>
              <p className="text-gray-700">
                Access APIs, UI kits, code snippets, and quick notes to speed up
                your development process.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section - Enhanced with Stats */}
      <motion.section
        className="py-24 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/80 to-pink-100/80"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-300/20 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-300/20 rounded-full"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto text-center max-w-2xl mb-16">
            <h2 className="text-5xl font-bold text-indigo-700 mb-6">
              Why Choose Code with Ayush?
            </h2>
            <p className="text-lg text-gray-700 mb-10">
              Built by developers, for developers. Here's what makes us stand
              out:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-blue-100"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-12 -mt-12 opacity-50"></div>
              <div className="mb-4 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-xl text-blue-600 mb-3">
                Curated Content
              </h3>
              <p className="text-gray-600">
                Every course, note, and API is handpicked to ensure relevance
                and quality.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-purple-100"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-full -mr-12 -mt-12 opacity-50"></div>
              <div className="mb-4 text-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-xl text-purple-600 mb-3">
                Beginner-Friendly
              </h3>
              <p className="text-gray-600">
                Our materials are designed to be clear, practical, and
                beginner-focused.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-pink-100"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-100 rounded-full -mr-12 -mt-12 opacity-50"></div>
              <div className="mb-4 text-pink-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-xl text-pink-600 mb-3">
                Developer Tools
              </h3>
              <p className="text-gray-600">
                Use real APIs and ready-made UI designs to build and practice
                like a pro.
              </p>
            </motion.div>
          </div>

          {/* Stats Counter - New Addition */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white/80 rounded-2xl p-6 text-center shadow-md">
              <span className="block text-4xl font-bold text-blue-600 mb-2">
                30+
              </span>
              <span className="text-gray-600 font-medium">UI Components</span>
            </div>
            <div className="bg-white/80 rounded-2xl p-6 text-center shadow-md">
              <span className="block text-4xl font-bold text-purple-600 mb-2">
                50+
              </span>
              <span className="text-gray-600 font-medium">Free APIs</span>
            </div>
            <div className="bg-white/80 rounded-2xl p-6 text-center shadow-md">
              <span className="block text-4xl font-bold text-pink-600 mb-2">
                15+
              </span>
              <span className="text-gray-600 font-medium">Code Tutorials</span>
            </div>
            <div className="bg-white/80 rounded-2xl p-6 text-center shadow-md">
              <span className="block text-4xl font-bold text-indigo-600 mb-2">
                900+
              </span>
              <span className="text-gray-600 font-medium">Happy Students</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Popular Categories - Enhanced */}
      <motion.section
        className="py-24 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-pink-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-indigo-800 mb-6">
              Popular Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find exactly what you need to take your development skills to the
              next level.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <Link href="/designs">
              <motion.span
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                UI Designs
              </motion.span>
            </Link>
            <Link href="/courses">
              <motion.span
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                Courses
              </motion.span>
            </Link>
            <Link href="/apis">
              <motion.span
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                APIs
              </motion.span>
            </Link>
            <Link href="/notes">
              <motion.span
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                  <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
                Notes
              </motion.span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full"></div>
        </div>

        <div className="relative z-10">
          <Testimonials />
        </div>
      </section>

      {/* FAQ Section - Enhanced with Accordions */}
      <motion.section
        className="py-24 bg-white relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block p-1 px-3 bg-indigo-100 rounded-full text-indigo-800 text-xs font-semibold mb-3">
              GOT QUESTIONS?
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our platform, resources,
              and learning approach.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <h3 className="font-semibold text-xl text-indigo-700 mb-3">
                Is this platform free to use?
              </h3>
              <p className="text-gray-700">
                Yes, most of the content including APIs, notes, and design
                resources are completely free to explore and use. We're
                committed to making coding education accessible to everyone.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <h3 className="font-semibold text-xl text-indigo-700 mb-3">
                Who can benefit from this website?
              </h3>
              <p className="text-gray-700">
                Beginners, students, and aspiring developers looking for
                curated, beginner-friendly resources to level up their coding
                skills. Our platform is designed to help you build real-world
                projects that enhance your portfolio.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <h3 className="font-semibold text-xl text-indigo-700 mb-3">
                How often is content updated?
              </h3>
              <p className="text-gray-700">
                New designs, APIs, and learning materials are added every month.
                We're constantly working to bring you the latest tools,
                techniques, and resources that align with industry standards.
                Make sure to subscribe to stay updated!
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <h3 className="font-semibold text-xl text-indigo-700 mb-3">
                Can I use these resources in my projects?
              </h3>
              <p className="text-gray-700">
                Absolutely! All resources are available for both personal and
                commercial projects. We just ask that you don't resell our
                templates or resources as your own products.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
      {/* Enhanced Newsletter Signup with Floating Labels */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full -ml-40 -mb-40"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center text-white mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Stay Updated with New Content
              </h2>
              <p className="mb-6 text-lg opacity-90">
                Join our newsletter for weekly tips, project ideas, and resource
                updates.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
              <form className="flex flex-col gap-6">
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder=" "
                    className={`px-4 py-4 rounded-xl bg-white/80 backdrop-blur-sm w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${
                      isNewsletterFocused
                        ? "border-indigo-500"
                        : "border-transparent"
                    }`}
                    onFocus={() => setIsNewsletterFocused(true)}
                    onBlur={(e) =>
                      setIsNewsletterFocused(e.target.value !== "")
                    }
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      isNewsletterFocused
                        ? "text-xs text-indigo-600 -top-2 bg-white px-1 rounded"
                        : "text-gray-500 top-4"
                    }`}
                  >
                    Enter your email
                  </label>
                </div>

                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <span>Subscribe Now</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </form>

              <div className="mt-4 flex items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Weekly Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Free Resources</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
