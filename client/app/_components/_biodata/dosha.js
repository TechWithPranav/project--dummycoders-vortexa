// dosha.js
const doshaOptions = [
    { name: "Vata", emoji: "☁️" },
    { name: "Pitta", emoji: "🔥" },
    { name: "Kapha", emoji: "💧" }
];

const randomDosha = doshaOptions[Math.floor(Math.random() * doshaOptions.length)];

const  dosha = `${randomDosha.name} ${randomDosha.emoji}`;

export default dosha;
