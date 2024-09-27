"use client"
import React, { useState } from "react";

import { useStateContext } from "../_context";

const Onboarding = () => {
  const { createUser } = useStateContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  // Function to fetch user session information
  const fetchUser = async () => {
    try {
      const response = await fetch('/api/fetchUser');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch user:', error.message);
      return null;
    }
  };

  // Handle onboarding form submission
  const handleOnboarding = async (e) => {
    e.preventDefault();
    const user = await fetchUser(); // Fetch the user information

    if (!user) {
      alert('Failed to fetch user. Please try again.');
      return;
    }

    const userData = {
      firstName,
      lastName,
      phoneNo,
      address,
      avatar,
      dateOfBirth,
      gender,
      medicalHistory,
      bloodGroup,
      age: parseInt(age, 10),
      location,
      folders: [],
      treatmentCounts: 0,
      folder: [],
      createdBy: user.email,
    };

    console.log(userData);
    const newUser = await createUser(userData);
    if (newUser) {
        // Router.push("/profile");
        window.location.href = '/profile';
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#13131a]">
      <div className="w-full max-w-md rounded-xl bg-[#1c1c24] p-8 shadow-lg">
        <h2 className="mb-2 text-center text-5xl font-bold text-white">👋 </h2>
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Welcome! Let's get started
        </h2>
        <form onSubmit={handleOnboarding}>
          <div className="mb-4">
            <label htmlFor="firstName" className="mb-2 block text-sm text-gray-300">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="mb-2 block text-sm text-gray-300">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNo" className="mb-2 block text-sm text-gray-300">
              Phone No.
            </label>
            <input
              id="phoneNo"
              type="text"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="mb-2 block text-sm text-gray-300">
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="avatar" className="mb-2 block text-sm text-gray-300">
              Avatar (Profile Image URL)
            </label>
            <input
              id="avatar"
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="mb-2 block text-sm text-gray-300">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="mb-2 block text-sm text-gray-300">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="medicalHistory" className="mb-2 block text-sm text-gray-300">
              Medical History
            </label>
            <textarea
              id="medicalHistory"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bloodGroup" className="mb-2 block text-sm text-gray-300">
              Blood Group
            </label>
            <input
              id="bloodGroup"
              type="text"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="mb-2 block text-sm text-gray-300">
              Age
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="mb-2 block text-sm text-gray-300">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;