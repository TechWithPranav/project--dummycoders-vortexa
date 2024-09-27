// "use client";

// import { ArrowRightIcon } from "lucide-react";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { buttonVariants } from "@/components/ui/button";
// import Image from "next/image";
// import Confetti from "react-dom-confetti";
// import {toast} from "sonner";
// import { useRouter } from "next/navigation";

// const StepFive = () => {
//     const [showConfetti, setShowConfetti] = useState(false); // Removed the type annotation

//     const router = useRouter(); // Hook for navigation

//     useEffect(() => setShowConfetti(true), []);

//     return (
//         <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full py-2 relative">
//             <div
//                 aria-hidden="true"
//                 className="pointer-events-none select-none absolute inset-0 overflow-hidden flex h-full justify-center z-30"
//             >
//                 <Confetti
//                     active={showConfetti}
//                     config={{ elementCount: 250, spread: 250 }}
//                 />
//             </div>
//             <div className="max-w-4xl mx-auto text-center">
//                 <Image
//                     src="/images/onboarding.svg"
//                     alt="Onboarding Complete"
//                     width={200}
//                     height={200}
//                     className="w-52 h-auto object-cover mx-auto"
//                 />
//                 <h2 className="text-xl font-semibold font-heading text-foreground mt-4">
//                     You&apos;re all done!
//                 </h2>
//                 <p className="text-muted-foreground max-w-lg mt-2">
//                     Congratulations, we&apos;ve successfully identified your prakriti dosha. Get ready to start your journey towards better health.
//                 </p>
//                 <Link href="/dashboard" className={buttonVariants({ className: "mt-4" })}>
//                     Get personalized plan
//                     <ArrowRightIcon className="w-4 h-4 ml-1.5" />
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default StepFive;


// "use client";

// import { ArrowRightIcon } from "lucide-react";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { buttonVariants } from "@/components/ui/button";
// import Image from "next/image";
// import Confetti from "react-dom-confetti";
// import { useRouter } from "next/navigation";

// const StepFive = () => {
//     const [showConfetti, setShowConfetti] = useState(false); // Removed the type annotation
//     const [dosha, setDosha] = useState("");

//     const router = useRouter(); // Hook for navigation

//     useEffect(() => {
//         setShowConfetti(true);
//         const doshaOptions = [
//             { name: "Vata", emoji: "☁️" },
//             { name: "Pitta", emoji: "🔥" },
//             { name: "Kapha", emoji: "💧" }
//         ];
//         const randomDosha = doshaOptions[Math.floor(Math.random() * doshaOptions.length)];
//         setDosha(`${randomDosha.name} ${randomDosha.emoji}`);
//     }, []);

//     return (
//         <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full py-2 relative">
//             <div
//                 aria-hidden="true"
//                 className="pointer-events-none select-none absolute inset-0 overflow-hidden flex h-full justify-center z-30"
//             >
//                 <Confetti
//                     active={showConfetti}
//                     config={{ elementCount: 250, spread: 250 }}
//                 />
//             </div>
//             <div className="max-w-4xl mx-auto text-center">
//                 <Image
//                     src="/images/onboarding.svg"
//                     alt="Onboarding Complete"
//                     width={200}
//                     height={200}
//                     className="w-52 h-auto object-cover mx-auto"
//                 />
//                 <h2 className="text-xl font-semibold font-heading text-foreground mt-4">
//                     You&apos;re all done!
//                 </h2>
//                 <p className="text-muted-foreground max-w-lg mt-2">
//                     Congratulations, we&apos;ve successfully identified your prakriti dosha. Get ready to start your journey towards better health.
//                 </p>
//                 <Link href="/dashboard" className={buttonVariants({ className: "mt-4" })}>
//                     Get personalized plan
//                     <ArrowRightIcon className="w-4 h-4 ml-1.5" />
//                 </Link>
                
//                 {/* Random Dosha statement */}
//                 <div className="bg-green-100 text-center rounded-md py-2 px-4 mt-4">
//                     Your identified dosha is: <span className="font-semibold">{dosha}</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StepFive;


"use client";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Confetti from "react-dom-confetti";
import { useRouter } from "next/navigation";
import dosha from "./dosha";

const StepFive = () => {
    const [showConfetti, setShowConfetti] = useState(false); // Removed the type annotation

    const router = useRouter(); // Hook for navigation


    useEffect(() => {
        setShowConfetti(true);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full py-2 relative">
            <div
                aria-hidden="true"
                className="pointer-events-none select-none absolute inset-0 overflow-hidden flex h-full justify-center z-30"
            >
                <Confetti
                    active={showConfetti}
                    config={{ elementCount: 250, spread: 250 }}
                />
            </div>
            <div className="max-w-4xl mx-auto text-center">
                <Image
                    src="/images/onboarding.svg"
                    alt="Onboarding Complete"
                    width={200}
                    height={200}
                    className="w-52 h-auto object-cover mx-auto"
                />
                <h2 className="text-xl font-semibold font-heading text-foreground mt-4">
                    You&apos;re all done!
                </h2>
                <p className="text-muted-foreground max-w-lg mt-2">
                    Congratulations, we&apos;ve successfully identified your prakriti dosha. Get ready to start your journey towards better health.
                </p>
                <Link href="/dashboard" className={buttonVariants({ className: "mt-4" })}>
                    Get personalized plan
                    <ArrowRightIcon className="w-4 h-4 ml-1.5" />
                </Link>
                
                {/* Random Dosha statement */}
                <div className="bg-green-100 text-center rounded-md py-2 px-4 mt-4">
                    Your identified Dosha is: <span className="font-semibold">{dosha}</span>
                </div>
            </div>
        </div>
    );
};

export const dosha_copy = dosha;

export default StepFive;
