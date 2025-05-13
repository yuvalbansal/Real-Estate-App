'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface House {
  location: string;
  price: number;
  size: string;
}

export default function PropertyPage() {
  const [houses, setHouses] = useState<House[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log('Logged in as:', user);
      // You can now use `user` for personalized behavior
    }
  }, []);

  useEffect(() => {
    fetch('/src/houses.json')
      .then((res) => res.json())
      .then((data) => setHouses(data))
      .catch((err) => console.error('Error loading houses:', err));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Browse Properties</h2>

      <div className="bg-gray-100 p-4 shadow-sm mb-6">
        <form className="flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="text"
            placeholder="City/Location"
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-auto"
          />
          <input
            type="text"
            placeholder="Type of Property"
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-auto"
          />
          <input
            type="text"
            placeholder="Budget"
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-auto"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-6">
        {houses.map((house, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-md rounded-lg flex flex-col md:flex-row overflow-hidden"
          >
            {/* 🖼️ Image section */}
            <div className="w-full md:w-1/3">
              {/* <Image
                src="/src/house.jpg"
                alt="Property"
                className="w-full h-full object-cover"
              /> */}
              <Image
                src="/src/house.jpg"
                alt="Property"
                width={256} // md:w-64 = 256px
                height={192} // h-48 = 192px
                className="w-full md:w-64 h-48 object-cover rounded"
                style={{
                  width: '100%',
                  maxWidth: '256px',
                  height: '192px',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* 🏡 Details section */}
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
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 self-start">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
