"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Dynamically import Monaco to avoid SSR issues
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function UploadForm() {
  const { userId } = useAuth();
  const router = useRouter();

  const defaultHTML = `<!-- Start building your creation below -->
<div class="container">
  <h1>Hello, world!</h1>
</div>`;
  const defaultCSS = `/* Style your creation here */
.container {
  text-align: center;
  padding: 50px;
  font-family: sans-serif;
}`;
  const defaultJS = `// Add interactivity here
console.log("Hello from JavaScript!");`;

  const [formData, setFormData] = useState({
    userId,
    title: "",
    description: "",
    htmlContent: defaultHTML,
    cssContent: defaultCSS,
    jsContent: defaultJS,
    category: "",
  });

  const [activeTab, setActiveTab] = useState("html");

  const languageMap = {
    html: "html",
    css: "css",
    js: "javascript",
  };

  useEffect(() => {
    if (!userId) {
      router.push("/login?redirect=/upload");
    }
  }, [userId, router]);

  const handleEditorChange = (value, language) => {
    setFormData({ ...formData, [`${language}Content`]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { htmlContent, cssContent, category } = formData;
    if (!htmlContent || !cssContent || !category) {
      alert("Please complete HTML, CSS, and select a category.");
      return;
    }

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("🎉 Your design has been successfully shared!");
        setFormData({
          title: "",
          description: "",
          htmlContent: defaultHTML,
          cssContent: defaultCSS,
          jsContent: defaultJS,
          category: "",
        });
      } else {
        const errorData = await response.json();
        alert("Upload failed: " + errorData.message);
      }
    } catch (error) {
      alert("Error uploading: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-[76rem] mx-auto">
        <h1 className="text-4xl mb-8 font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          Code Your Creation – Design, Develop, Deploy.
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 overflow-hidden"
        >
          {/* Header with Title and Category */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 p-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
            <div className="flex-1">
              <label className="text-sm mb-1 block">Name Your Creation</label>
              <input
                type="text"
                placeholder="e.g., Fancy Button Animation"
                className="w-full rounded-lg px-4 py-2 text-black focus:outline-none"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="flex-1">
              <label className="text-sm mb-1 block">Choose a Category</label>
              <select
                className="w-full rounded-lg px-4 py-2 text-black focus:outline-none"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option value="">Select</option>
                <option value="Animation">Animation</option>
                <option value="Interactive">Interactive</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Editor and Preview */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* CODE EDITOR */}
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
                    height="400px"
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
                    }}
                  />
                </div>
              </div>

              {/* LIVE PREVIEW */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Live Preview
                </h3>
                <div className="w-full h-[400px] border rounded-lg overflow-hidden bg-white shadow-inner">
                  <iframe
                    title="Live Preview"
                    className="w-full h-full"
                    srcDoc={`<html>
<head>
<style>${formData.cssContent}</style>
</head>
<body>
${formData.htmlContent}
<script>${formData.jsContent}<\/script>
</body>
</html>`}
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Describe Your Design
              </label>
              <textarea
                placeholder="Tell us what makes your design special..."
                className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-24"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Submit */}
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
                Share Your Masterpiece
              </button>
            </div>
          </div>
        </form>

        <div className="max-w-[76rem] mx-auto text-center pb-14 px-4 mt-6">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Bring Your UI Ideas to Life ✨
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Got a unique button animation, a slick hover effect, or an
            eye-catching component? Our intuitive code playground lets you
            craft, preview, and share your creative web elements — all in one
            place.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Each submission helps expand a vibrant community-driven gallery of
            reusable UI patterns and micro-interactions. Whether you're here to
            inspire or get inspired, your contribution makes the frontend world
            a little more magical.
          </p>
          <p className="text-md text-gray-500 mt-6 italic">
            💡 Pro Tip: Clean, creative code gets noticed — and featured!
          </p>
        </div>
      </div>
    </div>
  );
}
