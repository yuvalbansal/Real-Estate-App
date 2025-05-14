'use client';

import { useState } from 'react';

export default function RegisterAsBuyer() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    aadhar: '',
    propertyTypes: [] as string[],
    purpose: '',
    interestMessage: '',
  });

  const [mode, setMode] = useState<'default' | 'register' | 'interest'>(
    'default'
  );
  const [message, setMessage] = useState('');

  const propertyOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Plot', 'Villa'];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      const { checked } = e.target;
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
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords don't match");
      return;
    } else {
      setMessage('Seller registered successfully!');
    }
    if (mode === 'register') {
      console.log('Register as Buyer:', formData);
    } else if (mode === 'interest') {
      console.log('Express Interest:', formData);
    }
    alert('Form submitted successfully!');
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-2xl mx-auto">
      {mode === 'default' && (
        <>
          <h1 className="text-2xl font-semibold mb-6 text-center">
            I am a Seller
          </h1>
          <div className="flex justify-center gap-6">
            <button
              onClick={() => setMode('register')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
            >
              Register
            </button>
            <button
              onClick={() => setMode('interest')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
            >
              Express Interest
            </button>
          </div>
        </>
      )}
      {mode === 'register' && (
        <>
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Register as a Seller
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Set Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {message && <div className="text-red-500 text-sm">{message}</div>}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full cursor-pointer"
            >
              Submit
            </button>
          </form>
        </>
      )}
      {mode === 'interest' && (
        <>
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Express Interest as a Seller
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
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
            <div>
              <label className="font-medium block mb-2">
                Available Property Types:
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
            <div>
              <label className="font-medium block mb-2">
                Purpose of Selling:
              </label>
              <div className="flex gap-4">
                {['Invidividual Owner', 'Builder'].map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="purpose"
                      value={option}
                      checked={formData.purpose === option}
                      onChange={handleChange}
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full cursor-pointer"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
}
