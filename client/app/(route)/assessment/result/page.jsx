


"use client";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Confetti from "react-dom-confetti";
import { useRouter } from "next/navigation";
import { FaHeartbeat, FaSyringe } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import confetti from "canvas-confetti";

const HealthCheckCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTest, setActiveTest] = useState("");
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (Object.keys(answers).length === 3) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [answers]);

  const openModal = (test) => {
    setActiveTest(test);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveTest("");
    setAnswers({});
  };

  const handleAnswer = (question, answer) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  const questions = {
    heart: [
      "Do you have a family history of heart disease?",
      "Do you smoke?",
      "Do you exercise regularly?"
    ],
    diabetes: [
      "Do you have a family history of diabetes?",
      "Are you overweight?",
      "Do you experience excessive thirst or hunger?"
    ]
  };








  return (
    <div className="w-full max-w-4xl p-8 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-red-100 p-6 rounded-lg transition-transform hover:scale-105">
          <div className="flex items-center mb-4">
            <FaHeartbeat className="text-red-500 text-3xl mr-2" />
            <h2 className="text-2xl font-bold text-red-700">High-risk of heart disease</h2>
          </div>
          <p className="mb-4 text-red-600">Early detection can save lives. Take our quick assessment now.</p>
          <button
            onClick={() => openModal("heart")}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
            aria-label="Take heart disease risk test"
          >
            Take Test
          </button>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg transition-transform hover:scale-105">
          <div className="flex items-center mb-4">
            <FaSyringe className="text-blue-500 text-3xl mr-2" />
            <h2 className="text-2xl font-bold text-blue-700">Diabetes</h2>
          </div>
          <p className="mb-4 text-blue-600">Understand your risk factors. Take our quick diabetes assessment.</p>
          <button
            onClick={() => openModal("diabetes")}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
            aria-label="Take diabetes risk test"
          >
            Take Test
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">
                {activeTest === "heart" ? "Heart Disease Risk Test" : "Diabetes Risk Test"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            {questions[activeTest].map((question, index) => (
              <div key={index} className="mb-4">
                <p className="mb-2">{question}</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleAnswer(question, "Yes")}
                    className={`px-4 py-2 rounded ${answers[question] === "Yes" ? "bg-green-500 text-white" : "bg-gray-200"}`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleAnswer(question, "No")}
                    className={`px-4 py-2 rounded ${answers[question] === "No" ? "bg-red-500 text-white" : "bg-gray-200"}`}
                  >
                    No
                  </button>
                </div>
              </div>
            ))}
            {Object.keys(answers).length === 3 && (
              <p className="mt-4 text-green-600 font-semibold">
                Thank you for completing the test! We'll analyze your results and provide recommendations soon.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function BaseAnalysisPage() {
  const [showConfetti, setShowConfetti] = useState(false);

  const router = useRouter();

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
      </div>

      {/* Insert HealthCheckCard component here */}
      <HealthCheckCard />
    </div>
  );
};
