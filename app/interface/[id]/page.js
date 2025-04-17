// 'use client'; ❌ Don't use 'use client' in this file, since it's server-side
import apiData from "@/public/data/apiData.json";

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
    </main>
  );
}
