'use client';

import { useState, useEffect } from 'react';

type Investment = {
  id: number;
  propertyName: string;
  location: string;
  price: number;
  registryDate: string; // ISO format date
  lastDealInColony: number;
};

export default function MyInvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);

  useEffect(() => {
    // Simulating API fetch
    const sampleData: Investment[] = [
      {
        id: 1,
        propertyName: 'Greenwood Residency',
        location: 'Sector 45, Gurgaon',
        price: 18500000,
        registryDate: '2025-01-10',
        lastDealInColony: 17500000,
      },
      {
        id: 2,
        propertyName: 'Lakeview Towers',
        location: 'HSR Layout, Bengaluru',
        price: 9200000,
        registryDate: '2024-11-01',
        lastDealInColony: 9500000,
      },
    ];
    setInvestments(sampleData);
  }, []);

  const formatPrice = (price: number) =>
    price < 1e7
      ? `₹ ${(price / 1e5).toFixed(2)} Lakh`
      : `₹ ${(price / 1e7).toFixed(2)} Cr`;

  const isEligibleForResell = (registryDate: string) => {
    const regDate = new Date(registryDate);
    const now = new Date();
    const diffMonths =
      (now.getFullYear() - regDate.getFullYear()) * 12 +
      (now.getMonth() - regDate.getMonth());
    return diffMonths >= 3;
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        My Investments
      </h1>

      {investments.length === 0 ? (
        <p className="text-center text-gray-600">
          You have no past purchases yet.
        </p>
      ) : (
        <div className="space-y-6">
          {investments.map((inv) => (
            <div
              key={inv.id}
              className="border p-4 rounded shadow-sm bg-gray-50"
            >
              <h2 className="text-xl font-bold">{inv.propertyName}</h2>
              <p className="text-gray-700">{inv.location}</p>
              <p className="mt-2">
                <span className="font-medium">Purchase Price:</span>{' '}
                {formatPrice(inv.price)}
              </p>
              <p>
                <span className="font-medium">Last deal in colony:</span>{' '}
                {formatPrice(inv.lastDealInColony)}
              </p>
              <p>
                <span className="font-medium">Registry Date:</span>{' '}
                {new Date(inv.registryDate).toLocaleDateString()}
              </p>

              <button
                disabled={!isEligibleForResell(inv.registryDate)}
                className={`mt-4 px-4 py-2 rounded text-white ${
                  isEligibleForResell(inv.registryDate)
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {isEligibleForResell(inv.registryDate)
                  ? 'Resell / Auction Property'
                  : 'Available for Resell after 3 months'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
