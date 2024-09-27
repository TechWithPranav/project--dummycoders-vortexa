// Sidebar imports
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
    UilHeartRate,
    UilBed,
    // UisAlignCenter,
  } from "@iconscout/react-unicons";

  import { HeartPulse } from 'lucide-react';








  // Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
// import { keyboard } from "@testing-library/user-event/dist/keyboard";











//   // Analytics Cards Data
// export const cardsData = [
//     {
//       title: "Sales",
//       color: {
//         backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
//         boxShadow: "0px 10px 20px 0px #e0c6f5",
//       },
//       barValue: 70,
//       value: "25,970",
//       png: UilUsdSquare,
//       series: [
//         {
//           name: "Sales",
//           data: [31, 40, 28, 51, 42, 109, 100],
//         },
//       ],
//     },
//     {
//       title: "Revenue",
//       color: {
//         backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
//         boxShadow: "0px 10px 20px 0px #FDC0C7",
//       },
//       barValue: 80,
//       value: "14,270",
//       png: UilMoneyWithdrawal,
//       series: [
//         {
//           name: "Revenue",
//           data: [10, 100, 50, 70, 80, 30, 40],
//         },
//       ],
//     },
//     {
//       title: "Expenses",
//       color: {
//         backGround:
//           "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
//         boxShadow: "0px 10px 20px 0px #F9D59B",
//       },
//       barValue: 60,
//       value: "4,270",
//       png: UilClipboardAlt,
//       series: [
//         {
//           name: "Expenses",
//           data: [10, 25, 15, 30, 12, 15, 20],
//         },
//       ],
//     },
//   ];





export const cardsData = [
  {
    title: "Vital Signs",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 90,
    value: "Blood Pressure: 120/80 mmHg",
    png:   HeartPulse, // Assuming you have a heart rate icon
    series: [
      {
        name: "Vital Signs",
        data: [120, 118, 115, 121, 119, 117, 120], // Example data for systolic BP readings
      },
    ],
  },
  {
    title: "Metabolic Health",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 70,
    value: "Cholesterol: 190 mg/dL",
    png: UilHeartRate, // Assuming a medical icon
    series: [
      {
        name: "Cholesterol",
        data: [190, 195, 185, 180, 195, 200, 190], // Example cholesterol level data
      },
    ],
  },
  // {
  //   title: "Activity Tracker",
  //   color: {
  //     backGround: "linear-gradient(180deg, #FFD700 0%, #FFDB58 100%)",
  //     boxShadow: "0px 10px 20px 0px #FFF3C7",
  //   },
  //   barValue: 80,
  //   value: "Steps: 10,500",
  //   png: UilFootsteps, // Assuming a footsteps icon
  //   series: [
  //     {
  //       name: "Physical Activity",
  //       data: [9000, 10000, 8500, 10500, 9500, 11000, 10200], // Example step count data
  //     },
  //   ],
  // },


  {
    title: "Sleep Quality",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 75,
    value: "Sleep: 7.5 Hours",
    png: UilBed, // Assuming a bed or sleep icon
    series: [
      {
        name: "Sleep Patterns",
        data: [7, 6.5, 8, 7.5, 6, 7, 7.5], // Example sleep hours over a week
      },
    ],
  },



  // {
  //   title: "Mental Wellness",
  //   color: {
  //     backGround: "linear-gradient(180deg, #FF6B6B 0%, #FFD93D 100%)",
  //     boxShadow: "0px 10px 20px 0px #FDCAC6",
  //   },
  //   barValue: 65,
  //   value: "Mood: Neutral",
  //   png: UilBrain, // Assuming a mental wellness icon
  //   series: [
  //     {
  //       name: "Mood and Stress",
  //       data: [5, 4, 3, 6, 5, 4, 6], // Happiness score ranging from 1 to 10
  //     },
  //   ],
  // },
];






