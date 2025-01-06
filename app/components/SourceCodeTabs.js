import { useState } from 'react';

export default function SourceCodeTabs({ htmlContent, cssContent, jsContent, onClose }) {
  const [activeTab, setActiveTab] = useState('html'); // Default active tab is 'html'
  const [copied, setCopied] = useState(false); // State to manage copied status

  const tabs = [
    { id: 'html', label: 'HTML', icon: '🌐' },
    { id: 'css', label: 'CSS', icon: '🎨' },
    { id: 'js', label: 'JS', icon: '⚙️' },
  ];

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // Reset "Copied" text after 1 second
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white shadow-xl rounded-lg w-11/12 md:w-3/4 lg:w-1/2 overflow-hidden" style={{ height: 'calc(100vh - 100px)' }}>
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-500 text-white px-6 py-4">
          <h4 className="text-lg font-semibold">Source Code Viewer</h4>
          <button onClick={onClose} className="text-white text-2xl p-2 focus:outline-none">
            ✖
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-500 bg-white' : 'text-gray-600 hover:text-blue-500'}`}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 bg-gray-50" style={{ height: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          {activeTab === 'html' && (
            <div className="relative">
              <pre className="bg-gray-200 rounded p-4 text-sm overflow-auto h-full">
                <code>{htmlContent}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(htmlContent)}
                className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
              >
                {copied ? (
                  <span>✔️ Copied</span> // Icon for copied state
                ) : (
                  <span>📋 Copy</span> // Icon for copy state
                )}
              </button>
            </div>
          )}
          {activeTab === 'css' && (
            <div className="relative">
              <pre className="bg-gray-200 rounded p-4 text-sm overflow-auto h-full">
                <code>{cssContent}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(cssContent)}
                className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
              >
                {copied ? (
                  <span>✔️ Copied</span> // Icon for copied state
                ) : (
                  <span>📋 Copy</span> // Icon for copy state
                )}
              </button>
            </div>
          )}
          {activeTab === 'js' && (
            <div className="relative">
              <pre className="bg-gray-200 rounded p-4 text-sm overflow-auto h-full">
                <code>{jsContent}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(jsContent)}
                className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
              >
                {copied ? (
                  <span>✔️ Copied</span> // Icon for copied state
                ) : (
                  <span>📋 Copy</span> // Icon for copy state
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
