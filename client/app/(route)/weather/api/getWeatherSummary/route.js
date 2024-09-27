
import { NextResponse } from "next/server";
import { getWeatherSummary } from "@/gemini";

import { dosha_copy } from "@/app/_components/_biodata/step5";


export async function POST(request) {

  const { weatherData } = await request.json();

  const geminiPrompt = `
    You're a weather reporter with knowledge of ayurveda i have employed on mywebsite for people of India. Start by introducing yourself as their friendly weather expert from the locality. 
    Provide a concise summary of today's weather for a specific city, offering helpful advice like wearing SPF if the UV is high. 
    Use the provided UV index data to guide your advice, making the information easy to follow. 
    Add a touch of humor or an interesting weather-related phrase to keep things fun and engaging. 
    Assume the weather data came from your news team at the office, and convey the information with energy, charm, and clarity 
    Weather data: ${JSON.stringify(weatherData)}[Lets say here you had various weather data like humidity , wind speed , temperature ]. My prakruti dosha is ${dosha_copy} what tips would you give me according to the weather. Give me a concise responce like a tips sheet having 4-5 tips keep it short

    dont add the markdowns in the response
  `;
  try {
    const result = await getWeatherSummary(geminiPrompt);
    console.log("DATA IS: ", result);

    return NextResponse.json(result); 
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return NextResponse.json({ error: "Failed to fetch weather summary." });
  }
}










// ********************************************************************************************************************************
























// ****************************************************************

// import { NextResponse } from "next/server";
// import { getWeatherSummary } from "@/gemini";



// export async function POST(request) {

//   const { weatherData } = await request.json();

//   const geminiPrompt = `
//     You're a lively and energetic weather reporter addressing the people of India. Start by introducing yourself as their friendly weather expert from the locality. 
//     Provide a concise summary of today's weather for a specific city, offering helpful advice like wearing SPF if the UV is high. 
//     Use the provided UV index data to guide your advice, making the information easy to follow. 
//     Add a touch of humor or an interesting weather-related phrase to keep things fun and engaging. 
//     Assume the weather data came from your news team at the office, and convey the information with energy, charm, and clarity 
//     Weather data: ${JSON.stringify(weatherData)}
//   `;


//   // const geminiPrompt = `
//   //     You are an energetic and lively doctor who also specializes in understanding the effects of weather on health. 
//   //     You are tasked with analyzing a user's medical data, including their age, gender, blood group, height, weight, symptoms, and medications. 
//   //     In addition, you will assess the weather data for their locality and find any possible correlations between the weather and the user's health conditions.
      
//   //     The user ${firstName ? firstName : ""} is ${age ? `${age} years old` : "of unknown age"}, ${gender ? gender : "of unknown gender"}. 
//   //     Their blood group is ${bloodGroup ? bloodGroup : "unknown"}, height is ${height ? `${height} cm` : "unknown"}, and weight is ${weight ? `${weight} kg` : "unknown"}. 
//   //     They have the following medical issues: ${medicalIssues ? medicalIssues : "none reported"}.

//   //     Symptoms:
//   //     ${formattedSymptoms}

//   //     Medications:
//   //     ${formattedMedications}

//   //     The current weather in their location includes:
//   //     ${JSON.stringify(weatherData)}

//   //     As an expert doctor, provide a personalized and engaging summary of how the weather could be impacting the user's health. Discuss potential risks or benefits the weather conditions could bring based on their medical issues and current symptoms. Use a warm, approachable, and energetic tone as if you're talking directly to the patient.

//   //     Then, provide the following:
//   //     1. A short summary of the weather and its general effects on health, written in paragraph form.
//   //     2. Detailed and specific health recommendations in bullet-point format that address how the user can mitigate any negative impacts of the weather on their health or take advantage of favorable weather conditions.

//   //     Please ensure the recommendations are easy to follow and cover aspects like medications, lifestyle changes, and protective measures (e.g., staying hydrated, avoiding certain outdoor activities, etc.). Your goal is to make the user feel cared for and confident in managing their health in relation to the current weather conditions.
//   // `;

//   try {
//     const result = await getWeatherSummary(geminiPrompt);
//     console.log("DATA IS: ", result);

//   //   console.log("USER IS: ", dbUser);
//   // console.log("SYMPTOMS ARE: ", symptoms);
//   // console.log("MEDICATIONS ARE: ", medications);
//   // console.log("AGE IS: ", age);
//   // console.log("BLOOD GROUP IS: ", bloodGroup);
//   // console.log("HEIGHT IS: ", height);
//   // console.log("WEIGHT IS: ", weight);
//   // console.log("GENDER IS: ", gender);
//   // console.log("MEDICAL ISSUES ARE: ", medicalIssues);

//     return NextResponse.json(result); 
//   } catch (error) {
//     console.error("Error with Gemini API:", error);
//     return NextResponse.json({ error: "Failed to fetch weather summary." });
//   }
// }