// "use client";
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FaUserCircle, FaChartBar } from "react-icons/fa";

// const PatientCard = ({ name, username, score }) => {

//     const fetchUserData = async () => {
//         const response = await fetch('/api/getUsers');
//         const data = await response.json();
//         console.log(data);
//       };

//     fetch
//   return (
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       className="bg-white rounded-lg shadow-lg p-6 mb-4 transition-all duration-300 hover:shadow-lg border hover:border-primary hover:bg-green-50"
//     >
//       <div className="flex items-center mb-4">
//         <FaUserCircle className="text-4xl text-green-500 mr-4" />
//         <div>
//           <h2 className="text-xl font-semibold">{name}</h2>
//           <p className="text-gray-600">{username}</p>
//         </div>
//       </div>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <FaChartBar className="text-2xl text-green-500 mr-2" />
//           <span className="text-lg font-medium">{score}%</span>
//         </div>
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           className="bg-primary text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300"
//         >
//           View Details
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// };

// const PatientsPage = () => {
//   const [patients] = useState([
//     { id: 1, name: "John Doe", username: "john_doe", score: 85 },
//     { id: 2, name: "Jane Smith", username: "jane_smith", score: 92 },
//     { id: 3, name: "Mike Johnson", username: "mike_j", score: 78 },
//     { id: 4, name: "Emily Brown", username: "emily_b", score: 88 },
//     { id: 5, name: "Alex Wilson", username: "alex_w", score: 95 },
//     { id: 6, name: "Sarah Davis", username: "sarah_d", score: 82 },
//   ]);

//   // Sort patients by score in descending order
//   const sortedPatients = [...patients].sort((a, b) => b.score - a.score);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8 text-center">Patients Page</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {sortedPatients.map((patient) => (
//           <PatientCard
//             key={patient.id}
//             name={patient.name}
//             username={patient.username}
//             score={patient.score}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PatientsPage;


"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaChartBar } from "react-icons/fa";

// PatientCard component for displaying each patient
const PatientCard = ({ name, age, gender, pid }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-lg shadow-lg p-6 mb-4 transition-all duration-300 hover:shadow-lg border hover:border-primary hover:bg-green-50"
    >
      <div className="flex items-center mb-4">
        <FaUserCircle className="text-4xl text-green-500 mr-4" />
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-600">Age: {age}</p>
          <p className="text-gray-600">Gender: {gender}</p>
          <p className="text-gray-600">PID: {pid}</p>
        </div>
      </div>
      <div className="flex justify-center">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-primary text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 justify-center items-center"
      >
        View Details
      </motion.button>
      </div>
    </motion.div>
  );
};

// PatientsPage component for fetching and displaying all patients
const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all patients from the API
  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/getUsers");
      const data = await response.json();
      setPatients(data); // Update the state with fetched user data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setLoading(false);
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Patients Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.length > 0 ? (
          patients.map((patient) => (
            <PatientCard
              key={patient.id}
              name={`${patient.firstName} ${patient.lastName}`}
              age={patient.age}
              gender={patient.gender}
              pid={patient.id}
            />
          ))
        ) : (
          <p className="text-center">No patients found</p>
        )}
      </div>
    </div>
  );
};

export default PatientsPage;
