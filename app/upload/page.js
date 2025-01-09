"use client";

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
