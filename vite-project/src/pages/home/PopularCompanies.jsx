import React from "react";
import { Link } from "react-router-dom";

const companies = [
  {
    name: "Machic",
    featured: true,
    rating: 4.5,
    reviews: 41,
    description: "Good quality products can only be found in good stores.",
    logo: "/media/images/user.png", // Change to your actual logo path
  },
  {
    name: "Blonwe",
    featured: true,
    rating: 3.5,
    reviews: 37,
    description: "Every kind of grocery product is available in our store.",
    logo: "/media/images/user.png", // Change to your actual logo path
  },
  {
    name: "Bacola",
    featured: true,
    rating: 4.0,
    reviews: 35,
    description: "Our work surely supports the local economy.",
    logo: "/media/images/user.png", // Change to your actual logo path
  },
  {
    name: "Medibazar",
    featured: true,
    rating: 3.0,
    reviews: 30,
    description:
      "Save your time - save your money - shop from your grocery store.",
    logo: "/media/images/user.png", // Change to your actual logo path
  },
];

const PopularCompanies = () => {
  return (
    <section className="py-12 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-5 items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Popular Companies
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Some of the new products arriving this week
              </p>
            </div>
          </div>
          {/* View All Link */}
          <Link
            to="/all-companies" // Change this route as needed
            className="text-purple-700 font-semibold flex items-center hover:underline"
          >
            View All
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {companies.map((company, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6">
                {/* Company Info */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded flex items-center justify-center overflow-hidden">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <svg
                        className="w-6 h-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {company.name}
                    </h3>
                    {company.featured && (
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs rounded-full px-2 py-1 mt-1">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                {/* Rating and Reviews */}
                <div className="flex items-center text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        Math.round(company.rating) > i
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.38 2.458a1 1 0 00-.364 1.118l1.287 3.96a1 1 0 01-1.545 1.118l-3.38-2.458a1 1 0 00-1.176 0l-3.38 2.458a1 1 0 01-1.545-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.091 9.385c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.96z" />
                    </svg>
                  ))}
                  <span className="text-gray-600 text-sm ml-1">
                    ({company.reviews})
                  </span>
                </div>
              </div>
              {/* Company Description */}
              <div className="p-6 border-t border-gray-200">
                <p className="text-black-700 text-xs">{company.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCompanies;
