import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function getWeatherSummary(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const textResult = await result.response.text();
    return { textResult };  // Ensure this matches your return expectations
  } catch (error) {
    throw new Error(`Gemini API request failed: ${error.message}`);
  }
}
