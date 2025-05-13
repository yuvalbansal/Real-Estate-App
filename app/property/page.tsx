'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ReactSlider from 'react-slider';
import { useRouter } from 'next/navigation';

interface House {
  id: number;
  location: string;
  size: string;
  price: number;
  auction: string;
  furnished: string;
  land_area_sqft: number;
  floor: number;
  total_floors: number;
  transaction_type: string;
  status: string;
  owner: {
    name: string;
    phone: string;
  };
  amenities: string[];
}

const cityList = ['Mumbai', 'Gurgaon', 'Delhi', 'Bangalore', 'Chennai'];

export default function PropertyPage() {
  const [houses, setHouses] = useState<House[]>([]);
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
  const [searchCity, setSearchCity] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([50, 500]);
  const router = useRouter();

  const toggleTypeDropdown = () => {
    setShowTypeDropdown((prev) => !prev);
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleBudgetDropdown = () => {
    setShowBudgetDropdown((prev) => !prev);
  };

  const handleBudgetChange = (index: number, value: number) => {
    const newRange: [number, number] = [...budgetRange];
    newRange[index] = value;
    if (newRange[0] <= newRange[1]) {
      setBudgetRange(newRange);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log('Logged in as:', user);
    }
  }, []);

  useEffect(() => {
    fetch('/src/houses.json')
      .then((res) => res.json())
      .then((data) => {
        setHouses(data);
        setFilteredHouses(data); // initially show all
      })
      .catch((err) => console.error('Error loading houses:', err));
  }, []);

  const handleCityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchCity(value);

    if (value.length > 0) {
      const filtered = cityList.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city: string) => {
    setSearchCity(city);
    setSuggestions([]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTypeDropdown(false);
    setShowBudgetDropdown(false);
    const filtered = houses.filter((house) => {
      const matchesCity = house.location
        .toLowerCase()
        .includes(searchCity.toLowerCase());

      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(house.size);

      const priceInLakhs = house.price / 100000;
      const matchesBudget =
        priceInLakhs >= budgetRange[0] && priceInLakhs <= budgetRange[1];

      return matchesCity && matchesType && matchesBudget;
    });

    setFilteredHouses(filtered);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Browse Properties</h2>

      <div className="bg-gray-100 p-4 shadow-sm mb-6 relative">
        <form
          className="flex flex-col md:flex-row gap-4 justify-center"
          onSubmit={handleSearchSubmit}
        >
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              value={searchCity}
              onChange={handleCityInput}
              placeholder="City/Location"
              className="border border-gray-300 rounded px-4 py-2 w-full md:w-60"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 mt-1 w-full md:w-60 rounded shadow-md">
                {suggestions.map((city, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSuggestionClick(city)}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative w-full md:w-auto">
            <button
              type="button"
              onClick={toggleTypeDropdown}
              className="border border-gray-300 rounded px-4 py-2 w-full md:w-48 text-left bg-white"
            >
              {selectedTypes.length > 0
                ? `Selected: ${selectedTypes.join(', ')}`
                : 'Select Property Type'}
            </button>
            {showTypeDropdown && (
              <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded shadow-md p-2 w-full md:w-48">
                {['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Plot', 'Villa'].map(
                  (type) => (
                    <label key={type} className="block">
                      <input
                        type="checkbox"
                        value={type}
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        className="mr-2"
                      />
                      {type}
                    </label>
                  )
                )}
              </div>
            )}
          </div>

          <div className="relative w-full md:w-auto">
            <button
              type="button"
              onClick={toggleBudgetDropdown}
              className="border border-gray-300 rounded px-4 py-2 w-full md:w-48 text-left bg-white"
            >
              ₹{budgetRange[0]}L - ₹{budgetRange[1]}L
            </button>

            {showBudgetDropdown && (
              <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded shadow-md p-4 w-[300px]">
                <p className="text-sm font-medium mb-2">
                  Budget: ₹{budgetRange[0]}L – ₹{budgetRange[1]}L
                </p>

                <ReactSlider
                  className="relative h-2 bg-gray-300 rounded-md"
                  thumbClassName="h-4 w-4 bg-white border-2 border-blue-600 rounded-full cursor-grab top-[-6px]"
                  trackClassName="top-0 bottom-0 bg-blue-600"
                  value={budgetRange}
                  min={50}
                  max={500}
                  step={25}
                  onChange={(value: [number, number]) => setBudgetRange(value)}
                  pearling
                  minDistance={25}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-6">
        {filteredHouses.length === 0 ? (
          <p className="text-gray-600 text-center">No properties found.</p>
        ) : (
          filteredHouses.map((house, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-md rounded-lg flex flex-col md:flex-row overflow-hidden"
            >
              <div className="w-full md:w-1/3">
                <Image
                  src="/src/house.jpg"
                  alt="Property"
                  width={256}
                  height={192}
                  className="w-full md:w-64 h-48 object-cover rounded"
                  style={{
                    width: '100%',
                    maxWidth: '256px',
                    height: '192px',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div className="p-4 flex flex-col justify-between w-full md:w-2/3">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {house.size} in {house.location}
                  </h3>
                  <p className="text-gray-700">Location: {house.location}</p>
                  <p className="text-gray-700">Size: {house.size}</p>
                  <p className="text-gray-900 font-bold mt-2">
                    {house.price < 10000000
                      ? `₹${(house.price / 100000).toFixed(2)} Lakhs`
                      : `₹${(house.price / 10000000).toFixed(2)} Crores`}
                  </p>
                </div>
                <button
                  onClick={() => router.push(`/property/${house.id}`)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 self-start cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
