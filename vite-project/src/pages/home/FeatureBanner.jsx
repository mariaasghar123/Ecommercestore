import { Link } from "react-router-dom";
const offers = [
  {
    label: "Only This Week",
    heading: "Quality eggs at an affordable price",
    desc: "Eat one every day",
    img: "/media/images/banner-01.jpg.png", // ✅ Public folder access
  },
  {
    label: "Only This Week",
    heading: "Snacks that nourishes our mind and body",
    desc: "Shine the morning...",
    img: "/media/images/banner-02.jpg.png",
  },
  {
    label: "Only This Week",
    heading: "Unbeatable quality, unbeatable prices.",
    desc: "Only this week. Don’t miss...",
    img: "/media/images/banner-03.jpg.png",
  },
];

export default function FeatureBanner() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-11/12 md:w-3/4 mx-auto mt-5">
      {offers.map((offer, idx) => (
        <div
          key={idx}
          className="relative h-64 rounded-xl shadow overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${offer.img})` }}
        >
          <div className="absolute mt-5 p-3 text-white w-full">
            <div className="text-orange-600 text-xs font-semibold mb-1">
              {offer.label}
            </div>
            <div className="text-black font-bold  w-3/4 text-lg sm:text-xl leading-tight mb-1">
              {offer.heading}
            </div>
            <div className="text-sm text-gray-700 mt-5 mb-3">{offer.desc}</div>
            <Link to="/shop">
              <button className="bg-white text-black mt-5 font-semibold py-1.5 px-4 rounded-full hover:bg-gray-200 transition">
                Shop Now →
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
