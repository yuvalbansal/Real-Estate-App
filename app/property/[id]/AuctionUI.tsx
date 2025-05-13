'use client';

import { useState } from 'react';

export default function AuctionUI({ house }: { house: any }) {
  const [showAuctionUI, setShowAuctionUI] = useState(false);
  const [interestNote, setInterestNote] = useState('');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [partiesInterested] = useState(7);

  const emdAmount = (house.price * 0.025).toFixed(2);

  const handleInterestSubmit = () => {
    alert(`Interest note added: ${interestNote}`);
    setInterestNote('');
  };

  const handleQuoteSubmit = () => {
    alert(`Your price: ₹${quotedPrice}`);
  };

  return (
    <>
      {!showAuctionUI && (
        <div className="flex gap-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer">
            Buy Now
          </button>
          {house.auction === 'yes' ? (
            <button
              onClick={() => setShowAuctionUI(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Auction
            </button>
          ) : (
            <button
              disabled
              className="bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed"
            >
              Auction
            </button>
          )}
          <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
            Express Interest
          </button>
        </div>
      )}

      {house.auction === 'no' && (
        <p className="bg-yellow-100 text-yellow-800 text-sm p-2 rounded border border-yellow-300 mt-2">
          This property will be up for auction in 5 days.
        </p>
      )}

      {showAuctionUI && (
        <div className="space-y-8 mt-4">
          {/* EMD */}
          <div className="bg-white border rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Deposit EMD</h2>
            <p>EMD Amount: ₹{parseFloat(emdAmount).toLocaleString('en-IN')}</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mt-2 cursor-pointer">
              Deposit Now
            </button>
          </div>

          {/* Quote Price */}
          <div className="bg-white border rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Quote Your Price</h2>
            <p>
              Parties interested: <strong>{partiesInterested}</strong>
            </p>
            <input
              type="number"
              value={quotedPrice}
              onChange={(e) => setQuotedPrice(e.target.value)}
              placeholder="Enter your price (in ₹)"
              className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2 mt-2"
            />
            <button
              onClick={handleQuoteSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2 cursor-pointer"
            >
              Submit Price
            </button>
          </div>

          {/* Interest */}
          <div className="bg-white border rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">I am Interested</h2>
            <textarea
              value={interestNote}
              onChange={(e) => setInterestNote(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              rows={3}
              placeholder="Why are you interested?"
            />
            <button
              onClick={handleInterestSubmit}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      )}
    </>
  );
}
