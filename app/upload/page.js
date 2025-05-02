"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";

// Dynamically import Monaco to avoid SSR issues
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function UploadForm() {
  const { userId } = useAuth();

  const [formData, setFormData] = useState({
    userId,
    title: "",
    description: "",
    htmlContent: "",
    cssContent: "",
    jsContent: "",
    category: "",
  });

  const [activeTab, setActiveTab] = useState("html");

  const languageMap = {
    html: "html",
    css: "css",
    js: "javascript", // Monaco expects 'javascript' not 'js'
  };

  const handleEditorChange = (value, language) => {
    setFormData({ ...formData, [`${language}Content`]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.htmlContent || !formData.cssContent || !formData.category) {
      alert("HTML, CSS content, and Category are required!");
      return;
    }

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Design uploaded successfully!");
        setFormData({
          title: "",
          description: "",
          htmlContent: "",
          cssContent: "",
          jsContent: "",
          category: "",
        });
      } else {
        const errorData = await response.json();
        alert("Failed to upload design: " + errorData.message);
      }
    } catch (error) {
      alert("Error uploading design: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Share Your Design
          </h1>
          <p className="mt-3 text-slate-600">
            Contribute to our collection of creative web elements
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 overflow-hidden"
        >
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white text-center">
              Upload Your Design
            </h2>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Animation">Animation</option>
                    <option value="Interactive">Interactive</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-24"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>
            {/* editor */}
            <div className="mt-8">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2">
                  <div className="flex border-b border-gray-200">
                    {["html", "css", "js"].map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`py-2 px-4 font-medium text-sm capitalize ${
                          activeTab === tab
                            ? "text-purple-600 border-b-2 border-purple-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4">
                    <Editor
                      height="380px"
                      theme="vs-dark"
                      language={languageMap[activeTab]}
                      value={formData[`${activeTab}Content`]}
                      onChange={(value) => handleEditorChange(value, activeTab)}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        padding: { top: 10 },
                        automaticLayout: true,
                        wordWrap: "on",
                        suggestOnTriggerCharacters: true,
                        quickSuggestions: true,
                      }}
                    />
                  </div>
                </div>
                {/* LIVE PREVIEW */}
                <div className="w-full lg:w-1/2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Live Preview
                    </h3>
                  </div>
                  <div className="w-full h-[400px] border rounded-lg overflow-hidden bg-white shadow-inner">
                    <iframe
                      title="Live Preview"
                      className="w-full h-full"
                      srcDoc={`
                             <html>
                 <head>
                   <style>${formData.cssContent}</style>
               </head>
                    <body>
                     ${formData.htmlContent}
                   <script>${formData.jsContent}<\/script>
                  </body>
                    </html>
                  `}
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  Upload Design
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
