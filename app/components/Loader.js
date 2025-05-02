const Loader = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  };
  
  export default Loader;
  
//   import { useState, useEffect } from 'react';

// const Loader = () => {
//   const [progress, setProgress] = useState(0);
  
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress(prev => (prev >= 100 ? 0 : prev + 5));
//     }, 300);
    
//     return () => clearInterval(interval);
//   }, []);
  
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
//       <div className="relative">
//         {/* Outer spinner */}
//         <div className="w-24 h-24 border-8 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        
//         {/* Inner spinner (opposite direction) */}
//         <div className="absolute top-2 left-2 w-20 h-20 border-8 border-indigo-200 border-b-indigo-500 rounded-full animate-spin"></div>
        
//         {/* Center dot */}
//         <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
//       </div>
      
//       {/* Progress bar */}
//       <div className="w-48 h-2 mt-8 bg-gray-200 rounded-full overflow-hidden">
//         <div 
//           className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
//           style={{ width: `${progress}%` }}
//         ></div>
//       </div>
      
//       {/* Optional loading text */}
//       <p className="mt-4 text-blue-600 font-medium">Loading...</p>
//     </div>
//   );
// };

// export default Loader;