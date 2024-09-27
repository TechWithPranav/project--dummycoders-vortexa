// "use client";
// import { ClerkProvider } from "@clerk/nextjs";
// import Header from "./_components/Header"; // Ensure these paths are correct
// import Footer from "./_components/Footer";
// import { Sidebar } from "./_components/Sidebar";
// import { StateContextProvider } from "./_context";
// import { Toaster } from "sonner";
// import "./globals.css";
// import { BrowserRouter } from "react-router-dom";
// import Chatbox from "./_components/Chatbox";

// const metadata = {
//   title: "Healthcare",
//   description: "Bappa Morya",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <ClerkProvider>
//           <StateContextProvider>
//             <BrowserRouter>
//             <div className="flex">
//               <Sidebar />
//               <div className="flex-1">
//                 <Header />
//                 {children }
//                 <Toaster />
//                 <Chatbox />
//                 {/* <Footer /> */}
//               </div>
//             </div>
//             </BrowserRouter>
//           </StateContextProvider>
//         </ClerkProvider>
//       </body>
//     </html>
//   );
// }


"use client";

import { ClerkProvider } from "@clerk/nextjs";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Sidebar } from "./_components/Sidebar";
import { StateContextProvider } from "./_context";
import { Toaster } from "sonner";
import "./globals.css";
import { BrowserRouter } from "react-router-dom";
import Chatbox from "./_components/Chatbox";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import React Query
import { useState } from 'react'; // Import useState for queryClient

// export const metadata = {
//   title: "Healthcare",
//   description: "Bappa Morya",
// };

export default function RootLayout({ children }) {
  // Initialize QueryClient
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <StateContextProvider>
            {/* Wrap the app in QueryClientProvider */}
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <div className="flex">
                  <Sidebar />
                  <div className="flex-1">
                    <Header />
                    {children}
                    <Toaster />
                    {/* <Chatbox /> */}
                    {/* <Footer /> */}
                  </div>
                </div>
              </BrowserRouter>
            </QueryClientProvider>
          </StateContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
