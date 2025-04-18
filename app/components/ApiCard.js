// components/ApiCard.jsx
import Link from "next/link";

const getMethodColor = (method) => {
  if (!method) return 'bg-gray-100 text-gray-800';
  switch (method.toUpperCase()) {
    case 'GET': return 'bg-green-100 text-green-800';
    case 'POST': return 'bg-blue-100 text-blue-800';
    case 'PUT': return 'bg-yellow-100 text-yellow-800';
    case 'DELETE': return 'bg-red-100 text-red-800';
    case 'PATCH': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const ApiCard = ({ api }) => (
  <Link href={`/interface/${api.id}`} className="block">
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer transform hover:-translate-y-1">
      <div className="border-t-4 border-indigo-500"></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-800">{api.title}</h2>
          {api.method && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getMethodColor(api.method)}`}>
              {api.method}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-2">{api.date || "No date provided"}</p>
        <p className="text-sm font-mono text-gray-700 break-all mb-4">
          {api.url || "No URL provided"}
        </p>
        <div className="flex justify-end">
          <span className="text-indigo-600 font-medium text-sm flex items-center">
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </Link>
);

export default ApiCard;
