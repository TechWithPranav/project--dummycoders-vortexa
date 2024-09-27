"use client";
// import React, { useState } from "react";
// import {
//   IconChevronRight,
//   IconFileUpload,
//   IconProgress,
// } from "@tabler/icons-react";
// import { useRouter } from "next/navigation";
// import { useStateContext } from "@/app/_context";
// import ReactMarkdown from "react-markdown";
// import FileUploadModal from "./components/file-upload-modal";
// import RecordDetailsHeader from "./components/record-details-header";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// function SingleRecordDetails() {
//   const router = useRouter();
//   const { id, analysisResult: initialAnalysisResult, recordName } = router.query || {};

//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [processing, setIsProcessing] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState(initialAnalysisResult || "");
//   const [filename, setFilename] = useState("");
//   const [filetype, setFileType] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { updateRecord } = useStateContext();

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     if (!file) {
//       console.error("No file selected for upload");
//       return;
//     }

//     console.log("Selected file:", file);
//     setFileType(file.type);
//     setFilename(file.name);
//     setFile(file);
//   };

//   const readFileAsBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result.split(",")[1]);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleFileUpload = async () => {
//     setUploading(true);
//     setUploadSuccess(false);

//     console.log("File before upload:", file);

//     if (!file) {
//       console.error("No file selected for upload");
//       setUploading(false);
//       return;
//     }

//     const genAI = new GoogleGenerativeAI(geminiApiKey);

//     try {
//       const base64Data = await readFileAsBase64(file);

//       const imageParts = [
//         {
//           inlineData: {
//             data: base64Data,
//             mimeType: filetype,
//           },
//         },
//       ];

//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

//       const prompt = `You are an expert cancer and any disease diagnosis analyst. Use your knowledge base to answer questions about giving personalized recommended treatments.
//         give a detailed treatment plan for me, make it more readable, clear and easy to understand make it paragraphs to make it more readable and understandable.`;

//       const result = await model.generateContent([prompt, ...imageParts]);
//       const response = await result.response;
//       const text = await response.text();
//       setAnalysisResult(text);
//       await updateRecord({
//         documentID: id,
//         analysisResult: text,
//         kanbanRecords: "",
//       });
//       setUploadSuccess(true);
//       setIsModalOpen(false); // Close the modal after a successful upload
//       setFilename("");
//       setFile(null);
//       setFileType("");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setUploadSuccess(false);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const processTreatmentPlan = async () => {
//     setIsProcessing(true);
  
//     const genAI = new GoogleGenerativeAI(geminiApiKey);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
//     const prompt = `Your role and goal is to be an expert using this treatment plan ${analysisResult} to create Columns:
//                   - Todo: Tasks that need to be started
//                   - Doing: Tasks that are in progress
//                   - Done: Tasks that are completed
  
//                   Each task should include a brief description. The tasks should be categorized appropriately based on the stage of the treatment process.
  
//                   Please provide the results in the following format for easy front-end display no quoting or whatsoever just pure the structure below:
  
//                   {
//                     "columns": [
//                       { "id": "todo", "title": "Todo" },
//                       { "id": "doing", "title": "Work in progress" },
//                       { "id": "done", "title": "Done" }
//                     ],
//                     "tasks": [
//                       { "id": "1", "columnId": "todo", "content": "Example task 1" },
//                       { "id": "2", "columnId": "todo", "content": "Example task 2" },
//                       { "id": "3", "columnId": "doing", "content": "Example task 3" },
//                       { "id": "4", "columnId": "doing", "content": "Example task 4" },
//                       { "id": "5", "columnId": "done", "content": "Example task 5" }
//                     ]
//                   }`;
  
//     try {
//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       let text = await response.text();
  
//       // Clean up the text to remove unwanted characters or formatting
//       text = text.replace(/^```json/, '').replace(/```$/, '').trim();
  
//       // Parse the cleaned text
//       const parsedResponse = JSON.parse(text);
  
//       console.log(text);
//       console.log(parsedResponse);
  
//       await updateRecord({
//         documentID: id,
//         kanbanRecords: text,
//       });
  
//       router.push("/schedules", { query: parsedResponse });
//     } catch (error) {
//       console.error("Error processing treatment plan:", error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };
  

//   return (
//     <div className="flex flex-wrap gap-[26px]">
//       <button
//         type="button"
//         onClick={handleOpenModal}
//         className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a] dark:text-white dark:hover:bg-neutral-800"
//       >
//         <IconFileUpload />
//         Upload Reports
//       </button>
//       <FileUploadModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onFileChange={handleFileChange}
//         onFileUpload={handleFileUpload}
//         uploading={uploading}
//         uploadSuccess={uploadSuccess}
//         filename={filename}
//       />

//       <RecordDetailsHeader recordName={recordName} />
//       <div className="w-full">
//         <div className="flex flex-col">
//           <div className="-m-1.5 overflow-x-auto">
//             <div className="inline-block min-w-full p-1.5 align-middle">
//               <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-[#13131a]">
//                 <div className="border-b border-gray-200 px-6 py-4 dark:border-neutral-700">
//                   <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
//                     Personalized AI-Driven Treatment Plan
//                   </h2>
//                   <p className="text-sm text-gray-600 dark:text-neutral-400">
//                     A tailored medical strategy leveraging advanced AI insights.
//                   </p>
//                 </div>
//                 <div className="flex w-full flex-col px-6 py-4 text-white">
//                   <div>
//                     <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
//                       Analysis Result
//                     </h2>
//                     <div className="space-y-2">
//                       <ReactMarkdown>{analysisResult}</ReactMarkdown>
//                     </div>
//                   </div>
//                   <div className="mt-5 grid gap-2 sm:flex">
//                     <button
//                       type="button"
//                       onClick={processTreatmentPlan}
//                       className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
//                     >
//                       View Treatment plan
//                       <IconChevronRight size={20} />
//                       {processing && (
//                         <IconProgress
//                           size={10}
//                           className="mr-3 h-5 w-5 animate-spin"
//                         />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//                 <div className="grid gap-3 border-t border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-neutral-400">
//                       <span className="font-semibold text-gray-800 dark:text-neutral-200"></span>{" "}
//                     </p>
//                   </div>
//                   <div>
//                     <div className="inline-flex gap-x-2"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SingleRecordDetails;


// import React, { useState } from "react";
// import {
//   IconChevronRight,
//   IconFileUpload,
//   IconProgress,
// } from "@tabler/icons-react";
// import { useRouter } from "next/navigation";
// import { useStateContext } from "@/app/_context";
// import ReactMarkdown from "react-markdown";
// import FileUploadModal from "./components/file-upload-modal";
// import RecordDetailsHeader from "./components/record-details-header";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// function SingleRecordDetails() {
//   const router = useRouter();
//   const { id = '', analysisResult: initialAnalysisResult = '', recordName = '' } = router.query || {};

//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [processing, setIsProcessing] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState(initialAnalysisResult || "");
//   const [filename, setFilename] = useState("");
//   const [filetype, setFileType] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { updateRecord } = useStateContext();

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFileType(file.type);
//       setFilename(file.name);
//       setFile(file);
//     } else {
//       console.error("No file selected for upload");
//     }
//   };

//   const readFileAsBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result.split(",")[1]);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleFileUpload = async () => {
//     setUploading(true);
//     setUploadSuccess(false);

//     if (!file) {
//       console.error("No file selected for upload");
//       setUploading(false);
//       return;
//     }

//     const genAI = new GoogleGenerativeAI(geminiApiKey);
//     try {
//       const base64Data = await readFileAsBase64(file);
//       const imageParts = [{ inlineData: { data: base64Data, mimeType: filetype } }];
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      
//       const prompt = `You are an expert cancer and any disease diagnosis analyst. Use your knowledge base to answer questions about giving personalized recommended treatments. give a detailed treatment plan for me, make it more readable, clear and easy to understand make it paragraphs to make it more readable and understandable.`;

//       const result = await model.generateContent([prompt, ...imageParts]);
//       const response = await result.response;
//       const text = await response.text();
//       setAnalysisResult(text);

//       await updateRecord({ documentID: id, analysisResult: text, kanbanRecords: "" });
//       setUploadSuccess(true);
//       handleCloseModal();
//       setFilename("");
//       setFile(null);
//       setFileType("");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const processTreatmentPlan = async () => {
//     setIsProcessing(true);

//     const genAI = new GoogleGenerativeAI(geminiApiKey);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

//     const prompt = `Your role and goal is to be an expert using this treatment plan ${analysisResult} to create Columns:
//       - Todo: Tasks that need to be started
//       - Doing: Tasks that are in progress
//       - Done: Tasks that are completed

//       Each task should include a brief description. The tasks should be categorized appropriately based on the stage of the treatment process.

//       Please provide the results in the following format for easy front-end display no quoting or whatsoever just pure the structure below:

//       {
//         "columns": [
//           { "id": "todo", "title": "Todo" },
//           { "id": "doing", "title": "Work in progress" },
//           { "id": "done", "title": "Done" }
//         ],
//         "tasks": [
//           { "id": "1", "columnId": "todo", "content": "Example task 1" },
//           { "id": "2", "columnId": "todo", "content": "Example task 2" },
//           { "id": "3", "columnId": "doing", "content": "Example task 3" },
//           { "id": "4", "columnId": "doing", "content": "Example task 4" },
//           { "id": "5", "columnId": "done", "content": "Example task 5" }
//         ]
//       }`;

//     try {
//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       let text = await response.text();
//       text = text.replace(/^```json/, '').replace(/```$/, '').trim();
//       const parsedResponse = JSON.parse(text);

//       await updateRecord({ documentID: id, kanbanRecords: text });
//       router.push("/schedules", { query: parsedResponse });
//     } catch (error) {
//       console.error("Error processing treatment plan:", error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="flex flex-wrap gap-[26px]">
//       <button type="button" onClick={handleOpenModal} className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a] dark:text-white dark:hover:bg-neutral-800">
//         <IconFileUpload />
//         Upload Reports
//       </button>
//       <FileUploadModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onFileChange={handleFileChange}
//         onFileUpload={handleFileUpload}
//         uploading={uploading}
//         uploadSuccess={uploadSuccess}
//         filename={filename}
//       />
//       <RecordDetailsHeader recordName={recordName} />
//       <div className="w-full">
//         <div className="flex flex-col">
//           <div className="-m-1.5 overflow-x-auto">
//             <div className="inline-block min-w-full p-1.5 align-middle">
//               <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-[#13131a]">
//                 <div className="border-b border-gray-200 px-6 py-4 dark:border-neutral-700">
//                   <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Personalized AI-Driven Treatment Plan</h2>
//                   <p className="text-sm text-gray-600 dark:text-neutral-400">A tailored medical strategy leveraging advanced AI insights.</p>
//                 </div>
//                 <div className="flex w-full flex-col px-6 py-4 text-white">
//                   <div>
//                     <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Analysis Result</h2>
//                     <div className="space-y-2">
//                       <ReactMarkdown>{analysisResult}</ReactMarkdown>
//                     </div>
//                   </div>
//                   <div className="mt-5 grid gap-2 sm:flex">
//                     <button type="button" onClick={processTreatmentPlan} className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800">
//                       View Treatment plan
//                       <IconChevronRight size={20} />
//                       {processing && <IconProgress size={10} className="mr-3 h-5 w-5 animate-spin" />}
//                     </button>
//                   </div>
//                 </div>
//                 <div className="grid gap-3 border-t border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-neutral-400"></p>
//                   </div>
//                   <div>
//                     <div className="inline-flex gap-x-2"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SingleRecordDetails;







// **************************************************************************************************************************************************************************************

import React, { useState } from "react";
import {
  IconChevronRight,
  IconFileUpload,
  IconProgress,
} from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "@/app/_context";
import ReactMarkdown from "react-markdown";
import FileUploadModal from "./components/file-upload-modal";
import RecordDetailsHeader from "./components/record-details-header";
import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

function SingleRecordDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [processing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(
    (state && state.analysisResult) || "",
  );
  const [filename, setFilename] = useState("");
  const [filetype, setFileType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { updateRecord } = useStateContext();

  console.log("State:", state);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    setFileType(file.type);
    setFilename(file.name);
    setFile(file);
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async () => {
    setUploading(true);
    setUploadSuccess(false);

    const genAI = new GoogleGenerativeAI(geminiApiKey);

    try {
      const base64Data = await readFileAsBase64(file);

      const imageParts = [
        {
          inlineData: {
            data: base64Data,
            mimeType: filetype,
          },
        },
      ];

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // const prompt = `You are an expert doctor and any disease diagnosis analyst. Use your knowledge base to answer questions about giving personalized recommended treatments.
      //   give a detailed treatment plan for me, make it more readable, clear and easy to understand make it paragraphs to make it more readable
      //   `;

      const prompt = `You are an expert doctor and disease diagnosis analyst. You will analyze the content of the user's uploaded medical report to provide a personalized summary and treatment plan. The treatment plan should be easy to understand, presented clearly in paragraphs followed by specific prescriptions and recommendations in a bullet-point format.

      If the uploaded document is indeed a medical report, here’s what you need to do:
      1. Summarize the key findings of the report in clear, easy-to-read paragraphs.
      2. Provide a detailed treatment plan based on the user's diagnosis.
      3. Offer specific recommendations or prescriptions, including medications, dosage, lifestyle changes, or further tests. Present these recommendations in a point-by-point list for better readability.

      If the uploaded document is unrelated to a medical report (e.g., a text document, an image, or an unrelated file), respond with the following:
      - "It appears the document you have uploaded is not a medical report. Please ensure that the document contains valid medical information so that I can assist you accurately."

      Provide your response in this format:
      - Paragraph summary of findings.
      - Bullet points for recommendations and prescriptions.
      Ensure that your response is clear, well-structured, and informative.`;

      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text();
      setAnalysisResult(text);

      console.log("Analysis result:", text);

      const updatedRecord = await updateRecord({
        documentID: state.id,
        analysisResult: text,
        kanbanRecords: "",
      });
      setUploadSuccess(true);
      setIsModalOpen(false); // Close the modal after a successful upload
      setFilename("");
      setFile(null);
      setFileType("");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  const processTreatmentPlan = async () => {
    try {
      setIsProcessing(true);
  
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
      // const prompt = `Your role is to be an AI assistant. I need you to return the following treatment plan structure as valid JSON only with no extra commentary:
      // {
      //   "columns": [
      //     { "id": "todo", "title": "Todo" },
      //     { "id": "doing", "title": "Work in progress" },
      //     { "id": "done", "title": "Done" }
      //   ],
      //   "tasks": [
      //     { "id": "1", "columnId": "todo", "content": "Example task 1" },
      //     { "id": "2", "columnId": "todo", "content": "Example task 2" },
      //     { "id": "3", "columnId": "doing", "content": "Example task 3" },
      //     { "id": "4", "columnId": "doing", "content": "Example task 4" },
      //     { "id": "5", "columnId": "done", "content": "Example task 5" }
      //   ]
      // }
      // Only return the JSON structure. Do not include any other text or comments.`;

      const prompt = `Your role is to be an AI medical assistant. Based on the user's medical report, I need you to generate a JSON structure with a treatment plan that includes specific tasks. These tasks should be categorized by their status: "Todo", "Work in progress", and "Done". Ensure that the tasks are tailored for a healthcare treatment plan, such as taking medications, attending follow-up appointments, or completing specific physical therapy exercises.

      Here is the structure I need. Return the valid JSON only without any extra commentary:
      {
        "columns": [
          { "id": "todo", "title": "Todo" },
          { "id": "doing", "title": "Work in progress" },
          { "id": "done", "title": "Done" }
        ],
        "tasks": [
          { "id": "1", "columnId": "todo", "content": "Take prescribed medication: 500mg of amoxicillin twice daily" },
          { "id": "2", "columnId": "todo", "content": "Attend follow-up appointment with general physician on [date]" },
          { "id": "3", "columnId": "doing", "content": "Complete daily physiotherapy exercises for 30 minutes" },
          { "id": "4", "columnId": "doing", "content": "Monitor and record blood sugar levels after each meal" },
          { "id": "5", "columnId": "done", "content": "Finish initial diagnostic tests: blood work and X-rays" }
        ]
      }
      Only return the JSON structure. Do not include any other text or comments.`;

  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
  
      console.log("Raw AI response:", text);
  
      try {
        const parsedResponse = JSON.parse(text);
        console.log("Parsed JSON:", parsedResponse);
  
        // Assuming the response is now valid JSON, save and navigate
        const updatedRecord = await updateRecord({
          documentID: state.id,
          kanbanRecords: JSON.stringify(parsedResponse),
        });
        console.log(updatedRecord);
  
        navigate("/schedules", { state: parsedResponse });
      } catch (jsonError) {
        console.error("JSON parsing failed:", jsonError, "Response:", text);
      }
  
    } catch (error) {
      console.error("Error processing treatment plan:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  

  return (
    <div className="flex flex-wrap gap-[26px]">
      <button
        type="button"
        onClick={handleOpenModal}
        className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a] dark:text-white dark:hover:bg-neutral-800"
      >
        <IconFileUpload />
        Upload Reports
      </button>
      <FileUploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFileChange={handleFileChange}
        onFileUpload={handleFileUpload}
        uploading={uploading}
        uploadSuccess={uploadSuccess}
        filename={filename}
      />
      <RecordDetailsHeader recordName={state && state.recordName} />
      <div className="w-full">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="inline-block min-w-full p-1.5 align-middle">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-[#13131a]">
                <div className="border-b border-gray-200 px-6 py-4 dark:border-neutral-700">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                    Personalized AI-Driven Treatment Plan
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    A tailored medical strategy leveraging advanced AI insights.
                  </p>
                </div>
                <div className="flex w-full flex-col px-6 py-4 text-white">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Analysis Result
                    </h2>
                    <div className="space-y-2 text-gray-700">
                      <ReactMarkdown>{analysisResult}</ReactMarkdown>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-2 sm:flex">
                    <button
                      type="button"
                      onClick={processTreatmentPlan}
                      className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                    >
                      View Treatment plan
                      <IconChevronRight size={20} />
                      {processing && (
                        <IconProgress
                          size={10}
                          className="mr-3 h-5 w-5 animate-spin"
                        />
                      )}
                    </button>
                  </div>
                </div>
                <div className="grid gap-3 border-t border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      <span className="font-semibold text-gray-800 dark:text-neutral-200"></span>{" "}
                    </p>
                  </div>
                  <div>
                    <div className="inline-flex gap-x-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleRecordDetails;
