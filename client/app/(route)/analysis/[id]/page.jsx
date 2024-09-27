// "use client";
// import React from "react";
// import MagicCard from "@/components/ui/magic-card";
// import { db } from "@/app/_lib";
// import { currentUser } from "@clerk/nextjs/server";
// import { BrainIcon, HeartPulseIcon, NotepadTextIcon } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useParams } from "next/navigation"; // Use next/navigation

// const DashboardPage = async () => {
//     const user = await currentUser();

//     const params = useParams(); // Get the parameters
//     const { pid } = params; // Extract the 'id' parameter from params object

//     const dbUser = await db.user.findUnique({
//         where: {
//             id: pid, // Use the 'id' parameter to find the user
//         },
//         include: {
//             symptoms: true,
//             medications: true,
//             mentalwellness: true,
//         }
//     });

//     const symptoms = await db.symptom.findMany({
//         where: {
//             // userId: user?.id,
//             userId: pid, // Use the 'id' parameter to find the symptoms
//         },
//     });

//     const medications = await db.medication.findMany({
//         where: {
//             // userId: user?.id,
//             userId: pid, // Use the 'id' parameter to find the medications
//         },
//     });

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 w-full gap-6 lg:p-8">
//             <div className="flex flex-col md:col-span-1 xl:col-span-4 gap-6 w-full">
//                 <div className="flex flex-col items-center justify-center w-full border border-border/60 rounded-xl py-6 md:py-8">
//                     <div className="w-20 h-20 mx-auto">
//                         <Image
//                             src={dbUser?.image}
//                             alt={dbUser?.firstName}
//                             width={1024}
//                             height={1024}
//                             className="rounded-full w-full h-full"
//                         />
//                     </div>
//                     <h4 className="text-lg font-medium mt-4">
//                         {dbUser?.firstName} {dbUser?.lastName}
//                     </h4>
//                     <p className="text-sm text-muted-foreground mt-1">
//                         Age: <span className="font-medium">{dbUser?.age}</span>
//                     </p>
//                 </div>
//                 <div className="flex flex-col items-start w-full border border-border/60 rounded-xl py-6 md:py-8 px-4 md:px-6">
//                     <h4 className="text-lg font-semibold">Information</h4>
//                     <ul className="space-y-4 text-sm mt-6">
//                         <li className="grid grid-cols-2 text-start text-foreground font-medium">
//                             <span>Gender:</span>
//                             <span className="text-muted-foreground font-normal capitalize">
//                                 {dbUser?.gender}
//                             </span>
//                         </li>
//                         <li className="grid grid-cols-2 text-start text-foreground font-medium">
//                             <span>Blood Group:</span>
//                             <span className="text-muted-foreground font-normal">{dbUser?.bloodGroup}</span>
//                         </li>
//                         <li className="grid grid-cols-2 text-start text-foreground font-medium">
//                             <span>Symptoms:</span>
//                             <span className="text-muted-foreground font-normal capitalize">
//                                 {dbUser?.symptoms?.map((symptom) => symptom.name).join(", ").replace(/_/g, " ").toLowerCase()}
//                             </span>
//                         </li>
//                         <li className="grid grid-cols-2 text-start text-foreground font-medium">
//                             <span>Medications:</span>
//                             <span className="text-muted-foreground font-normal capitalize">
//                                 {dbUser?.medications?.map((medication) => medication.name).join(", ").replace("none", "None")}
//                             </span>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//             <div className="flex flex-col md:col-span-1 xl:col-span-8 gap-8 w-full">
//                 <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
//                     <MagicCard color="rgba(239,68,68,.08)" className="border-2 border-red-100 max-w-full w-full">
//                         <Link href="/dashboard/health-status" className="flex items-center justify-between w-full bg-background group p-4">
//                             <div className="space-y-0.5">
//                                 <h5 className="font-medium font-heading text-red-500">Your health status</h5>
//                                 <p className="text-xs text-neutral-600">Evaluate your health status</p>
//                             </div>
//                             <HeartPulseIcon strokeWidth={1.8} className="w-8 h-8 text-red-500 group-hover:scale-105 transition transform" />
//                         </Link>
//                     </MagicCard>


//                     <MagicCard color="rgba(0, 255, 0, 0.08)" className="border-2 border-green-100 max-w-full w-full">
//                         <Link href="/dashboard/summary" className="flex items-center justify-between w-full bg-background group p-4">
//                             <div className="space-y-0.5">
//                                 <h5 className="font-medium font-heading text-green-500">Summary</h5>
//                                 <p className="text-xs text-neutral-600">Get health tips and advice</p>
//                             </div>
//                             <NotepadTextIcon className="w-8 h-8 text-green-500 group-hover:scale-105 transition transform" />
//                         </Link>
//                     </MagicCard>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;
import React from "react";
import DashboardClient from "@/app/_components/DashboardClient";
import { db } from "@/app/_lib"; // Import database connection
import { currentUser } from "@clerk/nextjs/server"; // Server-only import

// Server Component
const DashboardPage = async ({ params }) => {
    const { id: pid } = params;

    // Fetch current user and database user
    const user = await currentUser();

    const dbUser = await db.user.findUnique({
        where: {
            id: pid, // Use the 'id' parameter from URL params
        },
        include: {
            symptoms: true,
            medications: true,
            mentalwellness: true,
        },
    });

    // If the user is not found
    if (!dbUser) {
        return <p>User not found.</p>;
    }

    // Pass fetched data to Client Component
    return <DashboardClient dbUser={dbUser} />;
};

export default DashboardPage;
