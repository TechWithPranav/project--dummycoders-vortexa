// "use client";

// import { useState } from "react";
// import { RadioGroup } from "@headlessui/react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { ArrowRightIcon, LoaderIcon } from "lucide-react";
// import { saveAs } from 'file-saver'; // To save the responses as a JSON file

// const StepOne = ({ nextStep }) => {
//   const [responses, setResponses] = useState({
//     bodyBuild: "",
//     hairColor: "",
//     eyeColor: "",
//     foreheadLength: "",
//     teethColor: "",
//   });

//   const [isPending, setIsPending] = useState(false);

//   const handleChange = (field, value) => {
//     setResponses({ ...responses, [field]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsPending(true);

//     // Simulate saving the responses to a JSON file
//     const jsonData = new Blob([JSON.stringify(responses, null, 2)], {
//       type: "application/json",
//     });
//     // saveAs(jsonData, "step-one-responses.json");

//     setIsPending(false);
//     // nextStep();
//   };

//   const questions = [
//     { id: "bodyBuild", label: "BodyBuild Size", options: ["Weakly Developed", "Moderately developed", "Well Developed"] },
//     { id: "hairColor", label: "Hair Color", options: ["Black", "Dark", "Brown", "Dusky"] },
//     { id: "eyeColor", label: "Eye Color", options: ["Dark/Light Brown", "Black", "Gray"] },
//     { id: "foreheadLength", label: "Forehead Length", options: ["Medium", "Thin", "Narrow", "Long"] },
//     { id: "teethColor", label: "Teeth Color", options: ["Milky White", "Dull Black", "Yellowish"] },
//   ];

//   return (
//     <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full mt-10">
//         <h2 className="text-3xl font-semibold text-center text-green-700 mb-5">Step One</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 h-full w-full relative">
//         {questions.map(({ id, label, options }) => (
//           <div key={id} className="w-full">
//             <label className="text-lg font-semibold">{label}</label>
//             <RadioGroup
//               value={responses[id]}
//               onChange={(value) => handleChange(id, value)}
//               className="grid grid-cols-1 md:grid-cols-3 gap-2"
//             >
//               {options.map((option) => (
//                 <RadioGroup.Option
//                   key={option}
//                   value={option}
//                   id={option}
//                   className={({ active, checked }) =>
//                     cn(
//                       "border-2 border-border rounded-lg w-full py-2 text-center cursor-pointer focus:outline-none ring-0 focus:ring-0 outline-none transition transform duration-200 ease-in-out active:scale-95",
//                       (active || checked) && "border-primary"
//                     )
//                   }
//                 >
//                   <RadioGroup.Label as="span" className="text-sm">
//                     {option}
//                   </RadioGroup.Label>
//                 </RadioGroup.Option>
//               ))}
//             </RadioGroup>
//           </div>
//         ))}

//         <div className="flex items-center justify-end w-full mt-10 gap-6">
//           {/* <p className="text-xs text-muted-foreground">You can update these settings in the dashboard</p> */}
//           <Button type="submit" disabled={isPending} className="w-24 gap-x-2">
//             Next
//             {isPending ? (
//               <LoaderIcon className="animate-spin h-4 w-4" />
//             ) : (
//               <ArrowRightIcon className="h-4 w-4" />
//             )}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default StepOne;


// ************************************************************************************************************************************************************************************


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation"; // For navigation
// import { RadioGroup } from "@headlessui/react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { ArrowRightIcon, LoaderIcon } from "lucide-react";
// import { toast } from "sonner"; // Assuming you are using sonner for toasts
// import { saveAs } from "file-saver"; // To save the responses as a JSON file

// const StepOne = () => {
//   const router = useRouter(); // Hook for navigation
//   const [responses, setResponses] = useState({
//     bodyBuild: "",
//     hairColor: "",
//     eyeColor: "",
//     foreheadLength: "",
//     teethColor: "",
//   });

//   const [isPending, setIsPending] = useState(false);

//   const handleChange = (field, value) => {
//     setResponses({ ...responses, [field]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsPending(true);

//     // Simulate the 1-second delay
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     // Display success toast after 1 second
//     toast.success("Data saved successfully!");

//     // Simulate saving the responses to a JSON file
//     const jsonData = new Blob([JSON.stringify(responses, null, 2)], {
//       type: "application/json",
//     });
//     // saveAs(jsonData, "step-one-responses.json");

//     setIsPending(false);

//     // Navigate to Step Two
//     router.push("/biodata/steptwo");
//   };

//   const questions = [
//     { id: "bodyBuild", label: "BodyBuild Size", options: ["Weakly Developed", "Moderately developed", "Well Developed"] },
//     { id: "hairColor", label: "Hair Color", options: ["Black", "Dark", "Brown", "Dusky"] },
//     { id: "eyeColor", label: "Eye Color", options: ["Dark/Light Brown", "Black", "Gray"] },
//     { id: "foreheadLength", label: "Forehead Length", options: ["Medium", "Thin", "Narrow", "Long"] },
//     { id: "teethColor", label: "Teeth Color", options: ["Milky White", "Dull Black", "Yellowish"] },
//   ];

//   return (
//     <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full mt-10">
//       <h2 className="text-3xl font-semibold text-center text-green-700 mb-5">Step One</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 h-full w-full relative">
//         {questions.map(({ id, label, options }) => (
//           <div key={id} className="w-full">
//             <label className="text-lg font-semibold">{label}</label>
//             <RadioGroup
//               value={responses[id]}
//               onChange={(value) => handleChange(id, value)}
//               className="grid grid-cols-1 md:grid-cols-3 gap-2"
//             >
//               {options.map((option) => (
//                 <RadioGroup.Option
//                   key={option}
//                   value={option}
//                   id={option}
//                   className={({ active, checked }) =>
//                     cn(
//                       "border-2 border-border rounded-lg w-full py-2 text-center cursor-pointer focus:outline-none ring-0 focus:ring-0 outline-none transition transform duration-200 ease-in-out active:scale-95",
//                       (active || checked) && "border-primary"
//                     )
//                   }
//                 >
//                   <RadioGroup.Label as="span" className="text-sm">
//                     {option}
//                   </RadioGroup.Label>
//                 </RadioGroup.Option>
//               ))}
//             </RadioGroup>
//           </div>
//         ))}

//         <div className="flex items-center justify-end w-full mt-10 gap-6">
//         <Button type="submit" disabled={isPending} className="w-24 gap-x-2">
//             {isPending ? (
//             <>
//                 <LoaderIcon className="animate-spin h-4 w-4" />
//                 Saving...
//             </>
//             ) : (
//             <>
//                 Next
//                 <ArrowRightIcon className="h-4 w-4" />
//             </>
//             )}
//         </Button>
//         </div>
//         </form>
// </div>
// );
// };

// export default StepOne;


// ************************************************************************************************************************************************************************************


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import { RadioGroup } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";
import { toast } from "sonner"; // Assuming you are using sonner for toasts

const StepOne = () => {
  const router = useRouter(); // Hook for navigation
  const [responses, setResponses] = useState({
    bodyBuild: "",
    hairColor: "",
    eyeColor: "",
    foreheadLength: "",
    teethColor: "",
  });

  const [isPending, setIsPending] = useState(false);

  const handleChange = (field, value) => {
    setResponses({ ...responses, [field]: value });
  };

  // Validate if all questions are answered
  const validateForm = () => {
    return Object.values(responses).every((value) => value !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the form is valid (i.e., all questions are answered)
    if (!validateForm()) {
      toast.error("Please answer all questions before proceeding.");
      return;
    }

    setIsPending(true);

    // Simulate the 1-second delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Display success toast after 1 second
    toast.success("Data saved successfully!");

    // Simulate saving the responses to a JSON file (commented out)
    // const jsonData = new Blob([JSON.stringify(responses, null, 2)], {
    //   type: "application/json",
    // });
    // saveAs(jsonData, "step-one-responses.json");

    setIsPending(false);

    // Navigate to Step Two
    router.push("/biodata/steptwo");
  };

  const questions = [
    { id: "bodyBuild", label: "BodyBuild Size", options: ["Weakly Developed", "Moderately developed", "Well Developed"] },
    { id: "hairColor", label: "Hair Color", options: ["Black", "Dark", "Brown", "Dusky"] },
    { id: "eyeColor", label: "Eye Color", options: ["Dark/Light Brown", "Black", "Gray"] },
    { id: "foreheadLength", label: "Forehead Length", options: ["Medium", "Thin", "Narrow", "Long"] },
    { id: "teethColor", label: "Teeth Color", options: ["Milky White", "Dull Black", "Yellowish"] },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full mt-10">
      <h2 className="text-3xl font-semibold text-center text-green-700 mb-5">Step One</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 h-full w-full relative">
        {questions.map(({ id, label, options }) => (
          <div key={id} className="w-full">
            <label className="text-lg font-semibold">{label}</label>
            <RadioGroup
              value={responses[id]}
              onChange={(value) => handleChange(id, value)}
              className="grid grid-cols-1 md:grid-cols-3 gap-2"
            >
              {options.map((option) => (
                <RadioGroup.Option
                  key={option}
                  value={option}
                  id={option}
                  className={({ active, checked }) =>
                    cn(
                      "border-2 border-border rounded-lg w-full py-2 text-center cursor-pointer focus:outline-none ring-0 focus:ring-0 outline-none transition transform duration-200 ease-in-out active:scale-95",
                      (active || checked) && "border-primary"
                    )
                  }
                >
                  <RadioGroup.Label as="span" className="text-sm">
                    {option}
                  </RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </RadioGroup>
          </div>
        ))}

        <div className="flex items-center justify-end w-full mt-10 gap-6">
          <Button type="submit" disabled={isPending} className="w-24 gap-x-2">
            {isPending ? (
              <>
                <LoaderIcon className="animate-spin h-4 w-4" />
                Saving...
              </>
            ) : (
              <>
                Next
                <ArrowRightIcon className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
