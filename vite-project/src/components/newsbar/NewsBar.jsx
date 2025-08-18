import { useState, useEffect } from "react";

const messagePairs = [
  [
    "FREE delivery & 40% Discount for next 3 orders!",
    "Place your 1st order in 🔥",
  ],
  ["New arrivals just dropped 🔥", "Check out now 🛒"],
  [
    "Buy 2 get 1 free! Limited time offer ⏳",
    <>
      Until the end of the sale:{" "}
      <span className="text-lg font-bold mx-1">47</span> days{" "}
      <span className="text-lg font-bold mx-1">06</span> hours{" "}
      <span className="text-lg font-bold mx-1">55</span> minutes{" "}
      <span className="text-lg font-bold mx-1">23</span> seconds
    </>,
  ],
];

export default function NewsBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messagePairs.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-purple-800 text-white py-4 px-4">
      <div className="flex flex-col md:flex-row md:justify-evenly items-center gap-2 text-sm font-medium text-center">
        <b>{messagePairs[index][0]}</b>
        <b>{messagePairs[index][1]}</b>
      </div>
    </div>
  );
}
