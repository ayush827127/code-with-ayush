"use client"
import { useEffect, useState } from "react";
import DesignCard from "./components/DesignCard";

export default function Home() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDesigns() {
      try {
        const response = await fetch("/api/designs");
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

  const SkeletonLoader = () => (
    <div className="border-2 border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Skeleton for Title */}
      <div className="w-3/4 h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>
  
      {/* Skeleton for Iframe */}
      <div className="relative overflow-hidden rounded-lg shadow-md mb-4">
        <div className="w-full h-72 bg-gray-300 animate-pulse rounded-lg"></div>
      </div>
  
      {/* Skeleton for Button */}
      <div className="w-1/2 h-12 bg-gray-300 rounded-full mb-4 animate-pulse"></div>
    </div>
  );
  

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Uploaded Designs</h1>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      )}
      
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {designs.map((design) => (
          <DesignCard key={design._id} design={design} />
        ))}
      </div>
    </div>
  );
}
