import { FaReceipt, FaPercent, FaFeatherAlt, FaTruck } from "react-icons/fa";

const features = [
  {
    
    image: <img src="/media/images/SVG.png" alt="svg"  className="w-20"/>,
    title: "Payment only online",
    text: "Tasigförsamhet betendedesign. Mobile checkout. Ylig kärrtorpa.",
  },
  {
    image: <img src="/media/images/SVG4.png" alt="svg" className="w-20"/>,
    title: "New stocks and sales",
    text: "Tasigförsamhet betendedesign. Mobile checkout. Ylig kärrtorpa.",
  },
  {
    image: <img src="/media/images/SVG-1.png" alt="svg" className="w-20"/>,
    title: "Quality assurance",
    text: "Tasigförsamhet betendedesign. Mobile checkout. Ylig kärrtorpa.",
  },
  {
    image: <img src="/media/images/SVG-2.png" alt="svg" className="w-20"/>,
    title: "Delivery from 1 hour",
    text: "Tasigförsamhet betendedesign. Mobile checkout. Ylig kärrtorpa.",
  },
];

export default function FeatureList() {
  return (
     <div className="flex flex-wrap border-b-2 w-11/12 md:w-3/4 mx-auto justify-between items-start gap-8 py-8 bg-white">
      {features.map((feature, idx) => (
        <div
          className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 w-full md:w-[45%] lg:w-[22%]"
          key={idx}
        >
          <div className="mt-0 md:mt-5">{feature.image}</div>
          <div>
            <div className="font-bold text-lg">{feature.title}</div>
            <div className="text-gray-500 text-sm">{feature.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
