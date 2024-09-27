import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import fetchImage from '../_utils/FetchImage';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { chatSession } from '../_utils/AIModal';
// Diet goal options
const SelectDietGoals = [
  { title: 'Weight Loss', icon: '⚖️', desc: 'Plans to help you lose weight' },
  { title: 'Muscle Gain', icon: '💪', desc: 'Plans to help you build muscle' },
  { title: 'Balanced Diet', icon: '🍏', desc: 'Plans for a balanced diet' },
  { title: 'Energy Boost', icon: '⚡', desc: 'Plans to increase your energy levels' },
];

function CreateDietPlan() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log('FORM DATA:', { ...formData, [name]: value });
  };

  const OnGenerateDietPlan = async () => {
    if (!formData?.duration || !formData?.dietGoal) {
      toast("Please fill all details!");
      return;
    }

    toast("Generating your diet plan...");
    setLoading(true);

    const FINAL_PROMPT = `Generate a diet plan for {duration} days focusing on {dietGoal}. Each day's plan should include meals for Breakfast, Lunch, and Dinner with details on what to eat. The plan should be structured as follows:
    - Day Number
    - Time (Breakfast, Lunch, Dinner)
    - Meal Name
    - What to Eat`;

    const prompt = FINAL_PROMPT
      .replace("{duration}", formData?.duration)
      .replace("{dietGoal}", formData?.dietGoal);

    try {
      const result = await chatSession.sendMessage(prompt);
      const responseText = await result?.response?.text();
      
      console.log('Raw Response:', responseText);

      // Try to parse the response
      let parsedPlan;
      try {
        parsedPlan = JSON.parse(responseText);

        console.log('Parsed Plan:', parsedPlan);

      } catch (parseError) {
        throw new Error("Failed to parse response JSON");
      }

      console.log('Parsed Plan:', parsedPlan);

      let structuredPlan;
      structuredPlan = parsedPlan.dayPlans || parsedPlan.dietPlan || [];

      // Fetch images for each meal
      const updatedPlan = await Promise.all(structuredPlan.map(async (day) => {
        const updatedMeals = await Promise.all(day.meals.map(async (meal) => {
          const imageUrl = await fetchImage(meal.mealName); // Fetch an image based on the meal name
          return { ...meal, imageUrl }; // Add the image URL to the meal object
        }));
        return { ...day, meals: updatedMeals };
      }));

      setDietPlan(updatedPlan); // Store the diet plan array
    } catch (error) {
      console.error("Error generating diet plan:", error.message);
      toast("Error generating diet plan. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72">
      <div>
        <h2 className="font-bold text-3xl">Tell us your diet preferences 🍽️</h2>
        <p className="mt-3 text-gray-600 text-xl">Provide your preferences, and our AI will generate a personalized diet plan for you.</p>
      </div>

      <div className="mt-20 flex flex-col gap-10">
        <div className="mb-5">
          <label className="text-xl mb-3 font-medium">How many days do you want the diet plan for?</label>
          <Input placeholder="Enter the number of days" type="number" min="1" onChange={(v) => handleInputChange("duration", v.target.value)} />
        </div>

        <div>
          <label className="text-xl my-3 font-medium">Choose Your Diet Goal</label>
          <div className="grid grid-cols-2 gap-5 mt-5 mb-5">
            {SelectDietGoals.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("dietGoal", item.title)}
                className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg ${formData?.dietGoal === item.title && "shadow-lg border-green-700"}`}
              >
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button onClick={OnGenerateDietPlan} disabled={loading}>
          {loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : "Generate Diet Plan"}
        </Button>
      </div>
{Array.isArray(dietPlan) && dietPlan.length > 0 && (
  <div className="mt-10">
    <h2 className="font-bold text-2xl mb-5 text-center">Your Personalized Diet Plan 🍽️</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {dietPlan.map((day, index) => (
        <div key={index} className="mb-8 border rounded-lg shadow-lg p-5 bg-white">
          <h3 className="font-bold text-xl mb-3 text-center">Day {day.day} 📅</h3>
          <div className="grid grid-cols-1 gap-5">
            {day.meals.map((meal, mealIndex) => (
              <div
                key={mealIndex}
                className="p-5 border rounded-lg shadow-md flex flex-col items-center bg-gray-100 h-full justify-between"
              >
                <h4 className="font-bold text-lg mb-2">
                  {meal.time === 'Breakfast' ? '🍳' : meal.time === 'Lunch' ? '🥗' : '🍲'} {meal.time}:{' '}
                  <span className="text-green-600">{meal.mealName}</span>
                </h4>
                <p className="text-center mb-2 font-semibold">{meal.whatToEat}</p>
                {meal.imageUrl && (
                  <img
                    src={meal.imageUrl}
                    alt={`Image for ${meal.mealName}`}
                    className="mt-3 w-full h-48 object-cover rounded-lg border border-gray-300"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        {/* </div>
      )} */}
    </div>
  );
}

export default CreateDietPlan;
