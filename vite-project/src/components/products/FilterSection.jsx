import React, { useState } from 'react';

const FilterSection = ({ onPriceFilter }) => {
  // Aap apni products ki price range ke mutabiq min aur max set kar sakte hain
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  const maxRange = 200; // Yeh aapki slider ki max value hai

  // Handle min price slider change
  const handleMinPriceChange = (e) => {
    // Ye check karega ke min price max se aage na barhe
    const newMinPrice = Math.min(Number(e.target.value), maxPrice);
    setMinPrice(newMinPrice);
    onPriceFilter(newMinPrice, maxPrice);
  };

  // Handle max price slider change
  const handleMaxPriceChange = (e) => {
    // Ye check karega ke max price min se kam na ho
    const newMaxPrice = Math.max(Number(e.target.value), minPrice);
    setMaxPrice(newMaxPrice);
    onPriceFilter(minPrice, newMaxPrice);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md border">
      <h2 className="text-lg font-semibold mb-3">Price Filter</h2>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
          <span>Price Range:</span>
          <span>${minPrice} - ${maxPrice}</span>
        </div>
        
        {/* Slider UI */}
        <div className="relative h-2 bg-gray-200 rounded-lg">
          {/* Highlighted track for the selected range */}
          <div
            className="absolute h-2 bg-purple-600 rounded-lg"
            style={{ 
              left: `${(minPrice / maxRange) * 100}%`,
              right: `${100 - (maxPrice / maxRange) * 100}%`
            }}
          ></div>
          
          {/* Min Price Slider Input */}
          <input
            type="range"
            min="0"
            max={maxRange}
            value={minPrice}
            onChange={handleMinPriceChange}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer"
            style={{ zIndex: 3 }} // Z-index set kiya hai taake sliders theek se stack hon
          />

          {/* Max Price Slider Input */}
          <input
            type="range"
            min="0"
            max={maxRange}
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer"
            style={{ zIndex: 3 }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;