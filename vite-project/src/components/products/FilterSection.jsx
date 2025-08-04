import React, { useState } from 'react';

const FilterSection = ({ onPriceFilter }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilter = () => {
    if (!minPrice || !maxPrice) return;
    onPriceFilter(Number(minPrice), Number(maxPrice));
  };

  return (
    <div className="p-4 bg-white rounded shadow-md border">
      <h2 className="text-lg font-semibold mb-3">Price Filter</h2>
      <div className="flex flex-col gap-2">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={handleFilter}
          className="mt-2 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
