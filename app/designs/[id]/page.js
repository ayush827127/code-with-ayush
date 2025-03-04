"use client"
import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaCode } from "react-icons/fa";
import { useDesigns } from "@/app/context/DesignContext";
import "../../css/global.css";

export default function DesignDetails() {
  const { id } = useParams(); // Extract `id` from the route
  const { designs, loading, error } = useDesigns(); // Access the context

  const [design, setDesign] = useState(null); // State to store the selected design
  const [otherDesigns, setOtherDesigns] = useState([]); // List of other designs
  const [loadingDesign, setLoadingDesign] = useState(true); // Track loading state for current design

  const designIframeContent = useMemo(() => {
    if (!design) return null;
    return {
      htmlContent: design.htmlContent,
      cssContent: design.cssContent,
      jsContent: design.jsContent,
    };
  }, [design]);

  // Function to fetch and set design data
  const fetchDesign = useCallback(
    (designId) => {
      const selectedDesign = designs.find((design) => design._id === designId);
      if (selectedDesign) {
        setDesign(selectedDesign);
        setLoadingDesign(false); // Set loading to false once content is set
      }
      setOtherDesigns(designs.filter((d) => d._id !== designId));
    },
    [designs]
  );

  useEffect(() => {
    if (id) {
      setLoadingDesign(true); // Reset loading state when switching design
      fetchDesign(id); // Fetch design by ID
    }
  }, [id, fetchDesign]);

  const capitalizeTitle = (title) => {
    return title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const limitDescription = (description) => {
    return (
      description.split(" ").slice(0, 8).join(" ") +
      (description.split(" ").length > 8 ? "..." : "")
    );
  };

  // Loading state with a responsive skeleton loader
  if (loading || loadingDesign) {
    return (
      <div className="max-w-7xl mx-auto p-6 pt-12">
        <div className="animate-pulse flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <div className="h-10 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto mb-2"></div>
            <div className="h-72 bg-gray-300 rounded-lg"></div>
          </div>
          <div className="w-full md:w-1/3 space-y-6">
            <div className="h-8 bg-gray-300 rounded w-2/3"></div>
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  if (!design) {
    return (
      <div className="text-center mt-10 text-gray-600">Design not found.</div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200">
      <div className="max-w-7xl mx-auto p-6 pt-12 flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="w-full max-w-3xl mx-auto md:w-2/3">
          <div className="rounded-lg shadow-lg bg-white px-6 py-2 md:p-8">
            <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">
              {capitalizeTitle(design.title)}
            </h1>
            <p className="text-gray-700 mb-2 text-center text-lg">
              {design.description}
            </p>
            <div className="relative overflow-hidden w-full md:w-[80%] mx-auto rounded-lg shadow-lg border-2 border-blue-300">
              <iframe
                srcDoc={`<html><head><style>${
                  designIframeContent?.cssContent || ""
                }</style></head><body>${
                  designIframeContent?.htmlContent || ""
                }<script>${
                  designIframeContent?.jsContent || ""
                }</script></body></html>`}
                sandbox="allow-scripts allow-modals"
                className="w-full h-72"
                onLoad={() => setLoadingDesign(false)} // Mark loading complete when iframe is ready
              />
            </div>
            <div className="mt-5 space-y-6">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
                Source Code
              </h2>
              <div className="bg-gradient-to-r from-blue-50 via-purple-100 to-pink-50 p-4 rounded-lg shadow-inner">
                <Tabs>
                  <Tab label="HTML">
                    <pre className="overflow-auto bg-white p-4 rounded-md border border-blue-300 text-sm text-blue-800 font-mono">
                      {design.htmlContent}
                    </pre>
                  </Tab>
                  <Tab label="CSS">
                    <pre className="overflow-auto bg-white p-4 rounded-md border border-blue-300 text-sm text-blue-800 font-mono">
                      {design.cssContent}
                    </pre>
                  </Tab>
                  <Tab label="JavaScript">
                    <pre className="overflow-auto bg-white p-4 rounded-md border border-blue-300 text-sm text-blue-800 font-mono">
                      {design.jsContent}
                    </pre>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full  md:w-1/3">
          <div className="bg-white shadow-lg rounded-lg px-6 py-3">
            <h2 className="text-2xl font-semibold text-blue-600">
              Other Designs You May Like
            </h2>
            <ul
              className="space-y-4 overflow-y-auto"
              style={{
                maxHeight: "calc(3 * 9rem)",
                position: "relative", // Required for fade effect positioning
              }}
            >
              <div className="fade-top"></div>
              <div className="fade-bottom"></div>

              {otherDesigns.map((otherDesign) => (
                <li
                  key={otherDesign._id}
                  className="flex items-center space-x-4 border-b py-4"
                >
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <FaCode size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-700">
                      {capitalizeTitle(otherDesign.title)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {limitDescription(otherDesign.description)}
                    </p>
                    <Link
                      href={`/designs/${otherDesign._id}`}
                      className="text-blue-600 mt-2 block hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tab and TabPanel Components remain the same.


// Tab Component
function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      alert("Code copied to clipboard!");
    });
  };

  return (
    <div>
      <div className="flex border-b border-blue-300 space-x-4">
        {children.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 focus:outline-none transition-colors duration-300 ${
              index === activeTab
                ? "border-b-4 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-start">
        <div
          className="flex-1 w-fit"
          style={{
            width: "-webkit-fill-available",
            minWidth: "-webkit-fill-available",
          }}
        >
          {children[activeTab]}
        </div>

        <button
          onClick={() => handleCopy(children[activeTab].props.children)}
          className="relative right-28 top-6 text-blue-600 border-2 border-blue-600 py-2 px-4 rounded-md ml-4 hover:bg-blue-400 hover:text-white"
        >
          Copy
        </button>
      </div>
    </div>
  );
}

// Tab Panel Component
function Tab({ children }) {
  return (
    <div className="w-full">
      <pre className="overflow-auto bg-white p-4 rounded-md border border-blue-300 text-sm text-blue-800 font-mono w-full">
        {children}
      </pre>
    </div>
  );
}
