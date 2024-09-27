/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import { GoogleGenerativeAI } from "@google/generative-ai";


  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

   export const chatSession = model.startChat({
      generationConfig,
      "history": [
        {
          "role": "user",
          "parts": [
            {
              "text": "Generate a diet plan for 3 days for a couple with a balanced diet. Provide meal options for Breakfast, Lunch, and Dinner with details including Meal Name, What to Eat, and best times for each meal. Format the plan in JSON, specifying each day's plan with meal details."
            }
          ]
        },
        {
          "role": "model",
          "parts": [
            {
              "text": "```json\n{\n  \"dayPlans\": [\n    {\n      \"day\": 1,\n      \"meals\": [\n        {\n          \"time\": \"Breakfast\",\n          \"mealName\": \"Oatmeal with Fruits\",\n          \"whatToEat\": \"Whole grain oatmeal topped with fresh berries and a sprinkle of almonds.\",\n          \"bestTime\": \"8:00 AM\"\n        },\n        {\n          \"time\": \"Lunch\",\n          \"mealName\": \"Grilled Chicken Salad\",\n          \"whatToEat\": \"Grilled chicken breast with a mix of greens, cherry tomatoes, cucumbers, and a light vinaigrette.\",\n          \"bestTime\": \"12:30 PM\"\n        },\n        {\n          \"time\": \"Dinner\",\n          \"mealName\": \"Baked Salmon with Vegetables\",\n          \"whatToEat\": \"Oven-baked salmon fillet served with steamed broccoli and quinoa.\",\n          \"bestTime\": \"7:00 PM\"\n        }\n      ]\n    },\n    {\n      \"day\": 2,\n      \"meals\": [\n        {\n          \"time\": \"Breakfast\",\n          \"mealName\": \"Greek Yogurt with Honey and Nuts\",\n          \"whatToEat\": \"Greek yogurt drizzled with honey and topped with a mix of walnuts and almonds.\",\n          \"bestTime\": \"8:00 AM\"\n        },\n        {\n          \"time\": \"Lunch\",\n          \"mealName\": \"Turkey and Avocado Wrap\",\n          \"whatToEat\": \"Whole grain wrap filled with turkey slices, avocado, lettuce, and tomato.\",\n          \"bestTime\": \"12:30 PM\"\n        },\n        {\n          \"time\": \"Dinner\",\n          \"mealName\": \"Stir-Fried Tofu with Vegetables\",\n          \"whatToEat\": \"Stir-fried tofu with bell peppers, snap peas, carrots, and a light soy sauce.\",\n          \"bestTime\": \"7:00 PM\"\n        }\n      ]\n    },\n    {\n      \"day\": 3,\n      \"meals\": [\n        {\n          \"time\": \"Breakfast\",\n          \"mealName\": \"Smoothie Bowl\",\n          \"whatToEat\": \"Smoothie made with bananas, spinach, and almond milk, topped with granola and sliced fruit.\",\n          \"bestTime\": \"8:00 AM\"\n        },\n        {\n          \"time\": \"Lunch\",\n          \"mealName\": \"Quinoa and Black Bean Salad\",\n          \"whatToEat\": \"Quinoa mixed with black beans, corn, avocado, and a cilantro lime dressing.\",\n          \"bestTime\": \"12:30 PM\"\n        },\n        {\n          \"time\": \"Dinner\",\n          \"mealName\": \"Chicken Stir-Fry\",\n          \"whatToEat\": \"Chicken stir-fried with a mix of vegetables such as broccoli, bell peppers, and carrots, served over brown rice.\",\n          \"bestTime\": \"7:00 PM\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Explanation:**\n\nThis JSON data provides a 3-day diet plan for a couple focusing on a balanced diet. Here's a breakdown of the elements:\n\n* **dayPlans:** This section lists the diet plans for each day, detailing meal options for Breakfast, Lunch, and Dinner.\n    * **day:** Indicates the day of the plan.\n    * **meals:** Lists the meals for each time of the day.\n        * **time:** Time of day for the meal.\n        * **mealName:** Name of the meal.\n        * **whatToEat:** Description of what to eat for that meal.\n        * **bestTime:** Suggested time to have the meal.\n\n**Additional Notes:**\n\n* The plan includes a variety of balanced meals with a focus on nutritious ingredients.\n* Meal timings are suggested but can be adjusted based on personal preferences.\n* This format makes it easy to follow and plan meals throughout the 3 days.\n"
            }
          ]
        }
      ],
    });
  
 
  
  