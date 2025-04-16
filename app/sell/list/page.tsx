'use client';

import { useState } from 'react';

export default function ListYourPropertyPage() {
  const [formData, setFormData] = useState({
    ownerName: '',
    phone: '',
    email: '',
    propertyType: '',
    location: '',
    size: '',
    price: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Property Listing:', formData);
    alert('Your property has been listed successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        List Your Property
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={formData.ownerName}
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

        <select
          name="propertyType"
          value={formData.propertyType}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded border-gray-300"
        >
          <option value="">Select Property Type</option>
          <option value="1 BHK">1 BHK</option>
          <option value="2 BHK">2 BHK</option>
          <option value="3 BHK">3 BHK</option>
          <option value="4 BHK">4 BHK</option>
          <option value="Plot">Plot</option>
          <option value="Commercial">Commercial</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="City / Area / Landmark"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded border-gray-300"
        />

        <input
          type="text"
          name="size"
          placeholder="Size (in sq.ft)"
          value={formData.size}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded border-gray-300"
        />

        <input
          type="text"
          name="price"
          placeholder="Expected Price (in ₹)"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded border-gray-300"
        />

        <textarea
          name="description"
          placeholder="Additional Description (optional)"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded border-gray-300"
          rows={4}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Property
        </button>
      </form>
    </div>
  );
}
