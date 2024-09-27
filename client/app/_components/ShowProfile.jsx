// "use client";
// import React, { useEffect } from "react";
// import { useStateContext } from "../_context";

// import { useUser } from "@clerk/nextjs";

// const Profile = () => {
//   const { currentUser, fetchUserByEmail } = useStateContext();
//   const { user } = useUser();

//   useEffect(() => {
//     // Fetch user data only if not already available
//     if (user.primaryEmailAddress && !currentUser) {
//       fetchUserByEmail(user.primaryEmailAddress);
//     }
//   }, [user.primaryEmailAddress, fetchUserByEmail, currentUser]);

//   // Loading state
//   if (!currentUser) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <div className="text-lg text-gray-500">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto mt-16 max-w-lg rounded-lg bg-[#1c1c24] p-6 shadow-lg">
//       <div className="flex flex-col items-center">
//         <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#0092F3]">
//           {currentUser.avatar ? (
//             <img src={currentUser?.avatar} alt="User Avatar" className="h-full w-full rounded-full object-cover" />
//           ) : (
//             <span className="text-6xl">😊</span>
//           )}
//         </div>
//         <h1 className="mb-2 text-3xl font-semibold text-white">User Profile</h1>
//         <div className="mt-4 w-full">
//           <p className="mb-1 text-sm text-gray-400">Email:</p>
//           <p className="mb-4 text-lg font-semibold text-white">{currentUser?.createdBy}</p>

//           <p className="mb-1 text-sm text-gray-400">First Name:</p>
//           <p className="mb-4 text-lg font-semibold text-white">{currentUser?.firstName}</p>

//           <p className="mb-1 text-sm text-gray-400">Last Name:</p>
//           <p className="mb-4 text-lg font-semibold text-white">{currentUser?.lastName}</p>

//           <p className="mb-1 text-sm text-gray-400">Phone No.:</p>
//           <p className="mb-4 text-lg font-semibold text-white">{currentUser?.phoneNo}</p>

//           <p className="mb-1 text-sm text-gray-400">Address:</p>
//           <p className="mb-4 text-lg font-semibold text-white">{currentUser?.address}</p>

//           <p className="mb-1 text-sm text-gray-400">Date of Birth:</p>
//           <p className="mb-4 text-lg font-semibold text-white">{new Date(currentUser?.dateOfBirth).toLocaleDateString()}</p>

//           <p className="mb-1 text-sm text-gray-400">Gender:</p>
//           <p className="mb-4 text-lg font-semibold text-white">{currentUser?.gender}</p>

//           <p className="mb-1 text-sm text-gray-400">Medical History:</p>
//           <p className="mb-4 text-lg font-semibold text-white">{currentUser?.medicalHistory || 'N/A'}</p>

//           <p className="mb-1 text-sm text-gray-400">Blood Group:</p>
//           <p className="mb-4 text-lg font-semibold text-white">{currentUser?.bloodGroup || 'N/A'}</p>

//           <p className="mb-1 text-sm text-gray-400">Age:</p>
//           <p className="mb-4 text-lg font-semibold text-white">{currentUser?.age}</p>

//           <p className="mb-1 text-sm text-gray-400">Location:</p>
//           <p className="text-lg font-semibold text-white">{currentUser?.location}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;




"use client";
import React, { useEffect } from "react";
import { useStateContext } from "../_context";
import { useUser } from "@clerk/nextjs";

const Profile = () => {
  const { currentUser, fetchUserByEmail } = useStateContext();
  const { isLoaded, isSignedIn, user } = useUser(); // Use isLoaded and isSignedIn

  useEffect(() => {
    if (isLoaded && isSignedIn && user && user?.primaryEmailAddress.emailAddress && !currentUser) {
      fetchUserByEmail(user?.primaryEmailAddress.emailAddress);
    }
  }, [isLoaded, isSignedIn, user, fetchUserByEmail, currentUser]);
  console.log("user is:",user);
  console.log("User primary email is:",user?.primaryEmailAddress.emailAddress);
  console.log("CurrentUser is:",currentUser);

  // Show loading state if user data isn't loaded or not signed in
  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-16 max-w-lg rounded-lg bg-[#1c1c24] p-6 shadow-lg">
      <div className="flex flex-col items-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#0092F3]">
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt="User Avatar"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <span className="text-6xl">😊</span>
          )}
        </div>
        <h1 className="mb-2 text-3xl font-semibold text-white">User Profile</h1>
        <div className="mt-4 w-full">
          <p className="mb-1 text-sm text-gray-400">Email:</p>
          <p className="mb-4 text-lg font-semibold text-white">{currentUser?.createdBy}</p>

          <p className="mb-1 text-sm text-gray-400">First Name:</p>
          <p className="mb-4 text-lg font-semibold text-white">{currentUser?.firstName}</p>

          <p className="mb-1 text-sm text-gray-400">Last Name:</p>
          <p className="mb-4 text-lg font-semibold text-white">{currentUser?.lastName}</p>

          <p className="mb-1 text-sm text-gray-400">Phone No.:</p>
          <p className="mb-4 text-lg font-semibold text-white">{currentUser?.phoneNo}</p>

          <p className="mb-1 text-sm text-gray-400">Address:</p>
          <p className="mb-4 text-lg font-semibold text-white">{currentUser?.address}</p>

          <p className="mb-1 text-sm text-gray-400">Date of Birth:</p>
          <p className="mb-4 text-lg font-semibold text-white">
            {new Date(currentUser?.dateOfBirth).toLocaleDateString()}
          </p>

          <p className="mb-1 text-sm text-gray-400">Gender:</p>
          <p className="mb-4 text-lg font-semibold text-white">{currentUser?.gender}</p>

          <p className="mb-1 text-sm text-gray-400">Medical History:</p>
          <p className="mb-4 text-lg font-semibold text-white">
            {currentUser?.medicalHistory || "N/A"}
          </p>

          <p className="mb-1 text-sm text-gray-400">Blood Group:</p>
          <p className="mb-4 text-lg font-semibold text-white">
            {currentUser?.bloodGroup || "N/A"}
          </p>

          <p className="mb-1 text-sm text-gray-400">Age:</p>
          <p className="mb-4 text-lg font-semibold text-white">{currentUser?.age}</p>

          <p className="mb-1 text-sm text-gray-400">Location:</p>
          <p className="text-lg font-semibold text-white">{currentUser?.location}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
