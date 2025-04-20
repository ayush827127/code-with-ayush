"use client";
<<<<<<< HEAD
=======

>>>>>>> a78d1ca6c8fc65898f0e18de046ce803c217517e
import { useState } from "react";

export default function UploadForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    htmlContent: "",
    cssContent: "",
    jsContent: "",
    category: "",
  });

<<<<<<< HEAD
  const [activeTab, setActiveTab] = useState("html");

=======
>>>>>>> a78d1ca6c8fc65898f0e18de046ce803c217517e
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
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
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
          {/* Header with decorative elements */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-4">
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-white" 
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 30 + 5}px`,
                    height: `${Math.random() * 30 + 5}px`,
                    opacity: Math.random() * 0.5
                  }}
                />
              ))}
            </div>
            <h2 className="text-xl font-bold text-white relative z-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Your Design
            </h2>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            {/* Basic Info Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="Give your design a name"
                    className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="block w-full p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Animation">Animation</option>
                    <option value="Interactive">Interactive</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  placeholder="Describe your design..."
                  className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow min-h-24"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Code Editor Tabs */}
            <div className="mt-8">
              <div className="flex border-b border-gray-200">
                <button
                  type="button"
                  className={`py-2 px-4 font-medium text-sm ${
                    activeTab === "html"
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("html")}
                >
                  HTML
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 font-medium text-sm ${
                    activeTab === "css"
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("css")}
                >
                  CSS
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 font-medium text-sm ${
                    activeTab === "js"
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("js")}
                >
                  JavaScript
                </button>
              </div>

              <div className="mt-3">
                {activeTab === "html" && (
                  <div className="relative">
                    <div className="absolute top-2 left-2 text-xs font-mono text-gray-500 bg-gray-100 rounded px-1">HTML</div>
                    <textarea
                      placeholder="<div>Your HTML here...</div>"
                      className="block w-full p-3 pt-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow font-mono text-sm bg-gray-50 min-h-64"
                      value={formData.htmlContent}
                      onChange={(e) =>
                        setFormData({ ...formData, htmlContent: e.target.value })
                      }
                      required
                    />
                  </div>
                )}

                {activeTab === "css" && (
                  <div className="relative">
                    <div className="absolute top-2 left-2 text-xs font-mono text-gray-500 bg-gray-100 rounded px-1">CSS</div>
                    <textarea
                      placeholder="body { color: blue; }"
                      className="block w-full p-3 pt-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow font-mono text-sm bg-gray-50 min-h-64"
                      value={formData.cssContent}
                      onChange={(e) =>
                        setFormData({ ...formData, cssContent: e.target.value })
                      }
                      required
                    />
                  </div>
                )}

                {activeTab === "js" && (
                  <div className="relative">
                    <div className="absolute top-2 left-2 text-xs font-mono text-gray-500 bg-gray-100 rounded px-1">JS</div>
                    <textarea
                      placeholder="function init() { ... }"
                      className="block w-full p-3 pt-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow font-mono text-sm bg-gray-50 min-h-64"
                      value={formData.jsContent}
                      onChange={(e) =>
                        setFormData({ ...formData, jsContent: e.target.value })
                      }
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Design
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
=======
    <form
      onSubmit={handleSubmit}
      className="p-6 sm:p-8 max-w-lg w-full mx-auto bg-white rounded-lg shadow-lg space-y-6 border border-gray-200"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
        Upload Your Design
      </h2>
      <input
        type="text"
        placeholder="Title"
        className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <textarea
        placeholder="HTML Content"
        className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.htmlContent}
        onChange={(e) =>
          setFormData({ ...formData, htmlContent: e.target.value })
        }
        required
      />
      <textarea
        placeholder="CSS Content"
        className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.cssContent}
        onChange={(e) =>
          setFormData({ ...formData, cssContent: e.target.value })
        }
        required
      />
      <textarea
        placeholder="JS Content"
        className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.jsContent}
        onChange={(e) =>
          setFormData({ ...formData, jsContent: e.target.value })
        }
      />
      <select
        className="block w-full p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.category}
        onChange={(e) =>
          setFormData({ ...formData, category: e.target.value })
        }
        required
      >
        <option value="">Select Category</option>
        <option value="other">Other</option>
        <option value="Animation">Animation</option>
        <option value="Interactive">Interactive</option>
      </select>
      <button
        type="submit"
        className="block w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
      >
        Upload
      </button>
    </form>
  );
}
>>>>>>> a78d1ca6c8fc65898f0e18de046ce803c217517e
