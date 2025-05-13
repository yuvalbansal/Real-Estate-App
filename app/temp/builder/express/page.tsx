'use client';

import { useState } from 'react';

export default function ExpressInterestPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    sellerType: '',
    propertyLocation: '',
    propertyType: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Express Interest Data:', formData);
    alert('Your interest has been recorded. We’ll get in touch soon!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center text-blue-700">
        Express Interest to Sell Property
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          pattern="[0-9]{10}"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Seller Type */}
        <select
          name="sellerType"
          value={formData.sellerType}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Type of Seller</option>
          <option value="Individual Owner">Individual Owner</option>
          <option value="Builder / Colonizer">Builder / Colonizer</option>
        </select>

        {/* Property Location */}
        <input
          type="text"
          name="propertyLocation"
          placeholder="Property Location (City / Colony)"
          value={formData.propertyLocation}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Property Type */}
        <input
          type="text"
          name="propertyType"
          placeholder="Type of Property (e.g., 3 BHK, Plot, Villa)"
          value={formData.propertyType}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Message */}
        <textarea
          name="message"
          placeholder="Additional Message (Optional)"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Submit Interest
        </button>
      </form>
    </div>
  );
}
