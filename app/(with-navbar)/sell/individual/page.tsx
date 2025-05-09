'use client';

import { useState } from 'react';

export default function IndividualOwnerPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    aadhar: '',
    propertyLocation: '',
    propertyType: '',
    size: '',
    expectedPrice: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Property Data:', formData);
    alert('Your property listing has been submitted!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center text-blue-700">
        Sell Property – Individual Owner
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
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

        {/* Aadhar */}
        <input
          type="text"
          name="aadhar"
          placeholder="Aadhar Number"
          value={formData.aadhar}
          onChange={handleChange}
          pattern="[0-9]{12}"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

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
          placeholder="Property Type (e.g., Apartment, Plot, Villa)"
          value={formData.propertyType}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Size */}
        <input
          type="text"
          name="size"
          placeholder="Size (e.g., 3 BHK, 1000 sqft)"
          value={formData.size}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Expected Price */}
        <input
          type="text"
          name="expectedPrice"
          placeholder="Expected Price (in ₹)"
          value={formData.expectedPrice}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Message */}
        <textarea
          name="message"
          placeholder="Additional Details (Optional)"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Property
        </button>
      </form>
    </div>
  );
}
