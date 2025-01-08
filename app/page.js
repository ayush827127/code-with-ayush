"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DesignCard from "./components/DesignCard";

export default function HomePage() {
  const [designs, setDesigns] = useState([]); // Store fetched designs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isNavbarFixed, setIsNavbarFixed] = useState(false); // Navbar fixed state

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

    // Add scroll listener for fixed navbar
    const handleScroll = () => {
      setIsNavbarFixed(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Navbar */}
      <nav
        className={`${
          isNavbarFixed ? "fixed top-0 left-0 w-full z-50" : "relative"
        } bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 text-white py-4 px-8 shadow-md transition duration-300`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <span className="text-xl font-bold">Code with Ayush</span>
          </Link>
          <div className="space-x-4">
            <Link href="#home" className="hover:text-pink-300">
              Home
            </Link>
            <Link href="#designs" className="hover:text-pink-300">
              Designs
            </Link>
            <Link href="/courses" className="hover:text-pink-300">
              Courses
            </Link>
            <Link href="/notes" className="hover:text-pink-300">
              Notes
            </Link>
          </div>
        </div>
      </nav>

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
    </div>
  );
}
