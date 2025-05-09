'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Property = {
  id: number;
  title: string;
  location: string;
  size: string;
  price: number;
  type: string;
  image: string;
  status: 'Available' | 'Sold' | 'Under Review';
};

const mockProperties: Property[] = [
  {
    id: 1,
    title: '2 BHK Apartment in Andheri',
    location: 'Mumbai',
    size: '950 sq.ft',
    price: 9500000,
    type: '2 BHK',
    image: '/images/house1.jpg',
    status: 'Available',
  },
  {
    id: 2,
    title: '3 BHK Villa in Whitefield',
    location: 'Bengaluru',
    size: '1500 sq.ft',
    price: 16500000,
    type: '3 BHK',
    image: '/images/house2.jpg',
    status: 'Sold',
  },
  {
    id: 3,
    title: 'Commercial Plot in Sector 62',
    location: 'Gurgaon',
    size: '2400 sq.ft',
    price: 30000000,
    type: 'Commercial',
    image: '/images/house3.jpg',
    status: 'Under Review',
  },
];

export default function MyPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    // Replace this with fetch to real API later
    setProperties(mockProperties);
  }, []);

  const formatPrice = (price: number) =>
    price < 10000000
      ? `₹ ${(price / 100000).toFixed(2)} Lakhs`
      : `₹ ${(price / 10000000).toFixed(2)} Crores`;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        My Listed Properties
      </h1>

      {properties.length === 0 ? (
        <p className="text-center text-gray-500">No properties listed yet.</p>
      ) : (
        <div className="space-y-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex flex-col md:flex-row items-start gap-4 bg-white rounded shadow-md p-4"
            >
              <Image
                src={property.image}
                alt={property.title}
                className="w-full md:w-64 h-48 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{property.title}</h2>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-gray-600">
                  {property.size} • {property.type}
                </p>
                <p className="font-bold mt-2">{formatPrice(property.price)}</p>
                <p
                  className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    property.status === 'Available'
                      ? 'bg-green-100 text-green-700'
                      : property.status === 'Sold'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {property.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
