"use client";
import { useEffect, useState } from "react";
import DesignCard from "../components/DesignCard";

export default function Home() {
  const [designs, setDesigns] = useState([]); // Stores all fetched designs
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Tracks error state
  const [page, setPage] = useState(1); // Tracks current page
  const [hasMore, setHasMore] = useState(true); // Indicates if more designs can be loaded
  const [search, setSearch] = useState(""); // Tracks the search term

  useEffect(() => {
    fetchDesigns();
  }, [page]); // Fetch designs whenever the page changes

  async function fetchDesigns() {
    try {
      setLoading(true);
      const response = await fetch(`/api/designs?page=${page}&limit=8`);
      if (!response.ok) {
        throw new Error("Failed to fetch designs.");
      }
      const data = await response.json();

      setDesigns((prev) => [...prev, ...data]); // Append new designs to existing list
      if (data.length < 8) {
        setHasMore(false); // No more designs to load
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const loadMore = () => {
    setPage((prev) => prev + 1); // Increment page to load more designs
  };

  const filteredDesigns = designs.filter((design) =>
    design.title.toLowerCase().includes(search.toLowerCase()) // Filter by title
  );

  const SkeletonLoader = () => (
    <div className="border-2 border-gray-300 p-6 rounded-lg shadow-xl bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-100 animate-pulse">
      {/* Skeleton for Title */}
      <div className="w-3/4 h-6 bg-indigo-300 rounded mb-4"></div>

      {/* Skeleton for Iframe */}
      <div className="relative overflow-hidden rounded-lg shadow-xl mb-4">
        <div className="w-full h-72 bg-purple-300 animate-pulse rounded-lg"></div>
      </div>

      {/* Skeleton for Button */}
      <div className="w-1/2 h-12 bg-pink-300 rounded-full mb-4"></div>
    </div>
  );

  return (
    <div className="p-8 bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 min-h-screen">
      <h1 className="text-5xl font-bold text-center text-blue-800 mb-10 tracking-wider transform transition-all hover:scale-105">
        Explore Stunning Designs
      </h1>

      {/* Search Bar with Icon */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-2/3 md:w-1/3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for Your Favorite Design"
            className="w-full p-4 pl-10 border-2 border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 bg-white shadow-xl hover:ring-4"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </div>

      {/* Loading Skeletons */}
      {loading && page === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      )}

      {error && <p className="text-red-500 text-center font-bold">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {filteredDesigns.map((design) => (
          <DesignCard key={design._id} design={design} />
        ))}
      </div>

      {/* Pagination */}
      {hasMore && !loading && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold shadow-xl hover:bg-gradient-to-l transition duration-300 transform hover:scale-105">
            Load More Designs
          </button>
        </div>
      )}

      {/* Loading Message */}
      {loading && page > 1 && (
        <p className="text-center text-gray-500 mt-4 animate-pulse">Loading more designs...</p>
      )}
    </div>
  );
}
