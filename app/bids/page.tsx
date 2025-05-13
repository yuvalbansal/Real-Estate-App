'use client';

import { useEffect, useState } from 'react';

type Bid = {
  id: number;
  propertyName: string;
  location: string;
  bidAmount: number;
  status: 'Pending' | 'Accepted' | 'Rejected';
  date: string;
};

export default function SeeYourBidsPage() {
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    // Simulating API call
    const sampleBids: Bid[] = [
      {
        id: 1,
        propertyName: 'Ocean Breeze Apartments',
        location: 'Mumbai',
        bidAmount: 9500000,
        status: 'Pending',
        date: '2025-04-08',
      },
      {
        id: 2,
        propertyName: 'Greenwood Villas',
        location: 'Bengaluru',
        bidAmount: 21000000,
        status: 'Accepted',
        date: '2025-04-01',
      },
      {
        id: 3,
        propertyName: 'Metro Heights',
        location: 'Delhi',
        bidAmount: 18000000,
        status: 'Rejected',
        date: '2025-03-25',
      },
    ];
    setBids(sampleBids);
  }, []);

  const formatPrice = (price: number) => {
    return price < 1e7
      ? `₹ ${(price / 1e5).toFixed(2)} Lakh`
      : `₹ ${(price / 1e7).toFixed(2)} Cr`;
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-center">Your Bids</h1>
      {bids.length === 0 ? (
        <p className="text-center text-gray-600">
          You have not placed any bids yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="p-3 border">Property</th>
                <th className="p-3 border">Location</th>
                <th className="p-3 border">Bid Amount</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid) => (
                <tr key={bid.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{bid.propertyName}</td>
                  <td className="p-3 border">{bid.location}</td>
                  <td className="p-3 border">{formatPrice(bid.bidAmount)}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        bid.status === 'Pending'
                          ? 'bg-yellow-200 text-yellow-800'
                          : bid.status === 'Accepted'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {bid.status}
                    </span>
                  </td>
                  <td className="p-3 border">{bid.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
