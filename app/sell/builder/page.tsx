'use client';

import { useState } from 'react';

export default function BuilderColonizerPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    gstNumber: '',
    projectName: '',
    location: '',
    numberOfUnits: '',
    unitType: '',
    expectedPriceRange: '',
    additionalDetails: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Builder/Colonizer Submission:', formData);
    alert('Project submitted successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        Sell Property – Builder / Colonizer
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded border-gray-300"
        />

        <input
          type="text"
          name="contactPerson"
          placeholder="Contact Person Name"
          value={formData.contactPerson}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded border-gray-300"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          pattern="[0-9]{10}"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded border-gray-300"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded border-gray-300"
        />

        <input
          type="text"
          name="gstNumber"
          placeholder="GST Number"
          value={formData.gstNumber}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded border-gray-300"
        />

        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          value={formData.projectName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded border-gray-300"
        />

        <input
          type="text"
          name="location"
          placeholder="Project Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded border-gray-300"
        />

        <input
          type="number"
          name="numberOfUnits"
          placeholder="Number of Units"
          value={formData.numberOfUnits}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded border-gray-300"
        />

        <input
          type="text"
          name="unitType"
          placeholder="Unit Type (e.g., 2 BHK, 3 BHK)"
          value={formData.unitType}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded border-gray-300"
        />

        <input
          type="text"
          name="expectedPriceRange"
          placeholder="Expected Price Range (e.g., ₹60L–₹1.5Cr)"
          value={formData.expectedPriceRange}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded border-gray-300"
        />

        <textarea
          name="additionalDetails"
          placeholder="Additional Project Details (Optional)"
          value={formData.additionalDetails}
          onChange={handleChange}
          className="w-full p-2 border rounded border-gray-300"
          rows={4}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Project
        </button>
      </form>
    </div>
  );
}
