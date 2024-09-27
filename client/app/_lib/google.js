import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_AI_API_KEY);

console.log(process.env.NEXT_PUBLIC_AI_API_KEY);


export default ai;
