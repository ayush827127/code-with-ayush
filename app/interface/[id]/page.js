import apiData from "@/public/data/apiData.json";
import { FaCode, FaLink, FaExchangeAlt, FaClipboard, FaServer, FaCalendarAlt } from "react-icons/fa";
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
  
  // Filter out the current API to avoid showing it in the "Other APIs" section
  const otherApis = apiData.filter((a) => a.id !== params.id);

  if (!api) {
    return (
      <div className="text-center text-red-500 text-xl py-10">
        API not found
      </div>
    );
  }

  // Determine badge color based on method
  const getMethodColor = (method) => {
    switch(method?.toUpperCase()) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Main API Details Section - Enhanced UI */}
        <div className="lg:w-2/3">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-blue-600 p-3 mr-4">
                <FaExchangeAlt className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{api.title}</h1>
                <div className="flex items-center mt-2">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <p className="text-sm text-gray-500">{api.date}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6 flex items-center">
              <span className={`px-3 py-1 rounded-full font-medium text-sm ${getMethodColor(api.method)}`}>
                {api.method}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center mb-4">
              <FaLink className="text-blue-600 mr-3 text-xl" />
              <h2 className="text-xl font-semibold text-gray-800">Endpoint URL</h2>
            </div>
            <a 
              href={api.url} 
              target="_blank" 
              className="block bg-gray-50 p-4 rounded-lg border border-gray-200 text-blue-600 hover:bg-blue-50 transition-colors break-all"
            >
              {api.url}
            </a>
          </div>

          {api.headers && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <FaClipboard className="text-blue-600 mr-3 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">Headers</h2>
              </div>
              <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm overflow-x-auto">
                {JSON.stringify(api.headers, null, 2)}
              </pre>
            </div>
          )}

          {api.body && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <FaClipboard className="text-blue-600 mr-3 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">Request Body</h2>
              </div>
              <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm overflow-x-auto">
                {JSON.stringify(api.body, null, 2)}
              </pre>
            </div>
          )}

          {api.response && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <FaServer className="text-blue-600 mr-3 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">Response Example</h2>
              </div>
              <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm overflow-x-auto">
                {JSON.stringify(api.response.example, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Other APIs Sidebar */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white shadow-lg rounded-xl px-6 py-4 sticky top-4">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center">
              <FaCode className="mr-2" />
              Other API's You May Like
            </h2>
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent z-10"></div>
              
              <ul className="space-y-4 overflow-y-auto max-h-96 py-2">
                {otherApis.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center space-x-4 border-b border-gray-100 py-4 last:border-b-0 hover:bg-blue-50 rounded-lg px-3 transition-colors"
                  >
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCode size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-blue-700 truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.description}
                      </p>
                      <Link
                        href={`/interface/${item.id}`}
                        className="text-blue-600 mt-2 block hover:underline font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}