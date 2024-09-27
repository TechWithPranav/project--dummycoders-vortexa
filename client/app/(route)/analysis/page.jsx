// "use client";
// import React, { useState } from "react";
// import { FaSearch, FaArrowRight, FaRocket } from "react-icons/fa";

// const SearchComponent = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSubmit = (action) => {
//     console.log(`Submitted with action: ${action}`);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="flex flex-col md:flex-row items-center bg-white rounded-lg overflow-hidden">
//         <div className="flex-grow p-2 w-full md:w-auto">
//           <div className="relative">
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search here"
//               className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="flex flex-wrap justify-center md:justify-end space-x-2 p-2 w-full md:w-auto">
//           <button
//             onClick={() => handleSubmit("search")}
//             className="px-6 py-2 text-white bg-primary rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-bg-primary focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
//           >
//             Search
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchComponent;

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { FaSearch } from "react-icons/fa";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = () => {
    if (searchQuery) {
      // Navigate to /analysis/[id] using the search query
      router.push(`/analysis/${searchQuery}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-lg overflow-hidden">
        <div className="flex-grow p-2 w-full md:w-auto">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Enter patient id here.."
              className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end space-x-2 p-2 w-full md:w-auto">
          <button
            onClick={handleSubmit} // Call handleSubmit without action
            className="px-6 py-2 text-white bg-primary rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-bg-primary focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
