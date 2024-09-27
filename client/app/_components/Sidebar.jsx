// "use client";
// import React from 'react';
// import Link from 'next/link'; 
// import { useRouter } from 'next/navigation'; // Import useRouter
// import { navlinks } from '../_constants/navlinks';

// export function Sidebar() {
//   const { pathname } = useRouter(); // Get the current route

//   // Helper function to determine if the link is active
//   const isActive = (path) => pathname === path;

//   return (
//     <div className="hidden md:block bg-white">
//       <div className="flex h-full max-h-screen flex-col mt-2">
//         <div className="flex h-14 items-center px-8 lg:h-[60px] lg:px-6">
//           <Link href="/" className="flex items-center gap-2 font-semibold">
//             {/* ✨ */}
//             🩺
//             {/* <span className='font-bold-200'>Bappa Morya✨</span> */}
//             <span className='font-semibold text-3xl'>HEALR.AI 🤖</span>
//           </Link>
//           {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
//             <Bell className="h-4 w-4" />
//             <span className="sr-only">Toggle notifications</span>
//           </Button> */}
//         </div>
//         <div className="flex-1 mt-4">
//           <nav className="flex flex-col gap-1 px-2 text-sm font-medium lg:px-4">
//             {navlinks.map(({ href, label, icon: Icon }) => (
//               <Link 
//                 key={href}
//                 href={href} 
//                 className={`hover:text-primary
//                     cursor-pointer hover:scale-105
//                     transition-all ease-in-out flex gap-3 mb-2 text-[14px] ${
//                   isActive(href) 
//                     ? 'bg-green-100 p-3 rounded-lg' 
//                     : 'bg-gray-100 p-3 rounded-lg'
//                 }`}
//               >
//                 <Icon className="h-4 w-4" />
//                 {label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getNavLinks } from "../_constants/navlinks";
import { Menu, X } from "lucide-react"; // Import icons for mobile menu toggle
import Image from "next/image"; // Import Image for Next.js

export function Sidebar() {
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  const navlinks = getNavLinks(); // Get the navlinks based on the username

  const isActive = (path) => pathname === path;

  return (
    <div>
      {/* Mobile menu toggle button */}
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none md:hidden">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white p-4 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <nav className="flex flex-col gap-1 mt-5 text-sm font-medium">
          {navlinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)} // Close menu on link click
              className={`hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out flex gap-3 mb-2 text-[14px] ${
                isActive(href)
                  ? "bg-green-100 p-3 rounded-lg"
                  : "bg-gray-100 p-3 rounded-lg"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block bg-white">
        <div className="flex h-full max-h-screen flex-col mt-2">
          <div className="flex h-14 items-center px-8 lg:h-[60px] lg:px-6">
            {/* Logo and Name in Flex Container */}
            <Link href="/" className="flex items-center gap-2">
              {/* Logo */}
              <Image src="/logo.svg" alt="logo" width={40} height={40} />
              {/* HEALR.AI Text */}
              <span className="font-semibold text-3xl text-gray-700">HEALR.AI</span>
            </Link>
          </div>

          <div className="flex-1 mt-4">
            <nav className="flex flex-col gap-1 px-2 text-sm font-medium lg:px-4">
              {navlinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out flex gap-3 mb-2 text-[14px] ${
                    isActive(href)
                      ? "bg-green-100 p-3 rounded-lg"
                      : "bg-gray-100 p-3 rounded-lg"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
