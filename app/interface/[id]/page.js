// 'use client'; ❌ Don't use 'use client' in this file, since it's server-side
import apiData from "@/public/data/apiData.json";
import { FaCode } from "react-icons/fa";
import Link from "next/link";

// ✅ Dynamic Metadata Generation
export async function generateMetadata({ params }) {
  const api = apiData.find((a) => a.id === params.id);

  return {
    title: api?.title || 'API Details',
    description: api?.url || 'API info',
    openGraph: {
      title: api?.title,
      description: api?.url,
    },
  };
}

// ✅ API Detail Page Component
export default function ApiDetails({ params }) {
  const api = apiData.flat().find((a) => a.id === params.id);

  if (!api) {
    return (
      <div className="text-center text-red-500 text-xl py-10">
        API not found
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{api.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{api.date}</p>

      <div className="mb-6">
        <strong className="block text-lg">URL:</strong>
        <a href={api.url} target="_blank" className="text-blue-500 underline break-words">
          {api.url}
        </a>
      </div>

      <div className="mb-6">
        <strong className="block text-lg">Method:</strong>
        <span className="text-gray-700">{api.method}</span>
      </div>

      {api.headers && (
        <div className="mb-6">
          <strong className="block text-lg">Headers:</strong>
          <pre className="bg-gray-100 p-4 rounded-xl text-sm overflow-x-auto">
            {JSON.stringify(api.headers, null, 2)}
          </pre>
        </div>
      )}

      {api.body && (
        <div className="mb-6">
          <strong className="block text-lg">Body:</strong>
          <pre className="bg-gray-100 p-4 rounded-xl text-sm overflow-x-auto">
            {JSON.stringify(api.body, null, 2)}
          </pre>
        </div>
      )}

      {api.response && (
        <div className="mb-6">
          <strong className="block text-lg">Response Example:</strong>
          <pre className="bg-gray-100 p-4 rounded-xl text-sm overflow-x-auto">
            {JSON.stringify(api.response.example, null, 2)}
          </pre>
        </div>
      )}
      <div>
      </div>

        {/* other API */}
        <div>
        <div className="w-full  md:w-1/3">
          <div className="bg-white shadow-lg rounded-lg px-6 py-3">
            <h2 className="text-2xl font-semibold text-blue-600">
              Other API's You May Like
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

              {apiData.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center space-x-4 border-b py-4"
                >
                  {/* (item) */}
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <FaCode size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-700">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.description}
                    </p>
                    <Link
                      href={`/interface/${item.id}`}
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
    </main>
    
  );
}
