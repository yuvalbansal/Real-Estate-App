'use client';

import { useState } from 'react';

export default function BidForPropertyPage() {
  const [interestNote, setInterestNote] = useState('');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [partiesInterested] = useState(7); // Static for now

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Add search logic
  };

  const handleInterestSubmit = () => {
    alert(`Interest note added: ${interestNote}`);
    setInterestNote('');
  };

  const handleQuoteSubmit = () => {
    alert(`Your price: ₹${quotedPrice}`);
  };

  return (
    <div className="space-y-8">
      {/* Search/Filter Box */}
      <div className="bg-gray-100 p-4 shadow-sm">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
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

      {/* I'm Interested */}
      <div className="bg-white border rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-2">I'm Interested</h2>
        <textarea
          value={interestNote}
          onChange={(e) => setInterestNote(e.target.value)}
          placeholder="Write why you're interested or any special notes..."
          className="w-full border border-gray-300 rounded p-2"
          rows={3}
        />
        <button
          onClick={handleInterestSubmit}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add to Wishlist
        </button>
      </div>

      {/* Process Chart */}
      <div className="bg-white border rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          {[
            'Search Property',
            'Add to Wishlist',
            'Deposit EMD',
            'Quote Price',
            'Await Approval',
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold">
                {index + 1}
              </div>
              <p className="mt-2">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Deposit EMD */}
      <div className="bg-white border rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Deposit EMD</h2>
        <p className="text-gray-700 mb-2">
          Earnest Money Deposit (EMD) is required to confirm your interest in
          the property.
        </p>
        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Deposit Now
        </button>
      </div>

      {/* Quote or Modify Price */}
      <div className="bg-white border rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Quote Your Price</h2>
        <p className="text-gray-700 mb-4">
          Number of parties interested in this property:{' '}
          <strong>{partiesInterested}</strong>
        </p>
        <input
          type="number"
          value={quotedPrice}
          onChange={(e) => setQuotedPrice(e.target.value)}
          placeholder="Enter your price (in ₹)"
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2"
        />
        <button
          onClick={handleQuoteSubmit}
          className="ml-0 md:ml-4 mt-2 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Price
        </button>
      </div>
    </div>
  );
}
