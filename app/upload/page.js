"use client";

import { useState } from "react";

export default function UploadForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    htmlContent: "",
    cssContent: "",
    jsContent: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.htmlContent || !formData.cssContent) {
      alert("HTML and CSS content are required!");
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
        });
      } else {
        alert("Failed to upload design.");
      }
    } catch (error) {
      alert("Error uploading design: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <input
        type="text"
        placeholder="Title"
        className="block w-full p-2 mb-4 border"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        className="block w-full p-2 mb-4 border"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <textarea
        placeholder="HTML Content"
        className="block w-full p-2 mb-4 border"
        value={formData.htmlContent}
        onChange={(e) =>
          setFormData({ ...formData, htmlContent: e.target.value })
        }
        required
      />
      <textarea
        placeholder="CSS Content"
        className="block w-full p-2 mb-4 border"
        value={formData.cssContent}
        onChange={(e) =>
          setFormData({ ...formData, cssContent: e.target.value })
        }
        required
      />
      <textarea
        placeholder="JS Content"
        className="block w-full p-2 mb-4 border"
        value={formData.jsContent}
        onChange={(e) =>
          setFormData({ ...formData, jsContent: e.target.value })
        }
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
        Upload
      </button>
    </form>
  );
}
