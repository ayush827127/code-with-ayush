import { useState } from "react";
import SourceCodeTabs from "./SourceCodeTabs";
import Link from "next/link";

export default function DesignCard({ design }) {
  const [showCode, setShowCode] = useState(false);
  // console.log(design._id);

  const toggleCode = () => setShowCode(!showCode);

  return (
    <div className="border-2 border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link href={`/designs/${design._id}`}>
        <h3 className="font-bold text-xl text-gray-800 mb-4">{design.title}</h3>

        {/* Iframe container with smooth borders */}
        <div className="relative overflow-hidden rounded-lg shadow-md">
          <iframe
            srcDoc={`<html><head><style>${design.cssContent}</style></head><body>${design.htmlContent}<script>${design.jsContent}</script></body></html>`}
            sandbox="allow-scripts allow-modals"
            className="w-full h-72"
          />
        </div>
      </Link>
      {/* Button with hover effect */}
      <button
        onClick={toggleCode}
        className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none transition-colors duration-300"
      >
        {showCode ? "Hide Source Code" : "View Source Code"}
      </button>

      {/* Conditional rendering for the SourceCodeTabs */}
      {showCode && (
        <SourceCodeTabs
          htmlContent={design.htmlContent}
          cssContent={design.cssContent}
          jsContent={design.jsContent}
          onClose={toggleCode}
        />
      )}
    </div>
  );
}
