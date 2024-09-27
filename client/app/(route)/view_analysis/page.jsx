// import React, { useState } from "react";
// import { FaSearch, FaArrowRight, FaRocket } from "react-icons/fa";

// const SearchComponent = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSubmit = (action) => {
//     console.log(`Submitted with action: ${action}`);
//     // Redirect logic would go here
//     // For example: history.push('/search-results');
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden">
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
//             className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
//           >
//             <FaSearch className="inline-block mr-2" />
//             Search
//           </button>
//           <button
//             onClick={() => handleSubmit("go")}
//             className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
//           >
//             <FaArrowRight className="inline-block mr-2" />
//             Go
//           </button>
//           <button
//             onClick={() => handleSubmit("submit")}
//             className="px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
//           >
//             <FaRocket className="inline-block mr-2" />
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;