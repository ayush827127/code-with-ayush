"use client"; // Ensure this is included for Next.js client components

import { createContext, useContext, useEffect, useState } from "react";

// Context Initialization
const DesignContext = createContext(null);

// Provider component to wrap the app
export const DesignProvider = ({ children }) => {
  const [designs, setDesigns] = useState([]); // Stores all fetched designs
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Tracks error state
  const [page, setPage] = useState(1); // Tracks current page
  const [hasMore, setHasMore] = useState(true); // Indicates if more designs can be loaded
  const [search, setSearch] = useState(""); // Tracks the search term

  useEffect(() => {
    fetchDesigns();
  }, [page]); // Fetch designs whenever the page changes

  // Function to fetch designs from API
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

  // Return context values
  return (
    <DesignContext.Provider
      value={{
        designs,
        loading,
        error,
        hasMore,
        page,
        setPage,
        search,
        setSearch,
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

// Custom hook to use designs context
export const useDesigns = () => {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error("useDesigns must be used within a DesignProvider");
  }
  return context;
};
