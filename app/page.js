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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Uploaded Designs</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {designs.map((design) => (
          <DesignCard key={design._id} design={design} />
        ))}
      </div>
    </div>
  );
}
