'use client';

import { useState } from 'react';

export default function RegisterAsBuyer() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    aadhar: '',
    propertyTypes: [] as string[],
    purpose: '',
  });

  const propertyOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Plot', 'Villa'];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => {
        const newTypes = checked
          ? [...prev.propertyTypes, value]
          : prev.propertyTypes.filter((v) => v !== value);
        return { ...prev, propertyTypes: newTypes };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Register as a Buyer
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* Address */}
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          pattern="[0-9]{10}"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* Aadhar */}
        <input
          type="text"
          name="aadhar"
          placeholder="Aadhar Number"
          value={formData.aadhar}
          onChange={handleChange}
          pattern="[0-9]{12}"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* Property Types */}
        <div>
          <label className="font-medium block mb-2">
            Interested Property Types:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {propertyOptions.map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="propertyTypes"
                  value={type}
                  checked={formData.propertyTypes.includes(type)}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Purpose */}
        <div>
          <label className="font-medium block mb-2">Purpose of Buying:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="purpose"
                value="Investment"
                checked={formData.purpose === 'Investment'}
                onChange={handleChange}
                required
              />
              Investment
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="purpose"
                value="Self use"
                checked={formData.purpose === 'Self use'}
                onChange={handleChange}
                required
              />
              Self use
            </label>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
