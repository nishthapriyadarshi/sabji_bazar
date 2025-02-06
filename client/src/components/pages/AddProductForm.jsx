import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'tailwindcss/tailwind.css';

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('kg');  // Define unit state
  const [image, setImage] = useState(null);  // Added state for image

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);  // Set the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData to send to the server
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('unit', unit);  // Include unit in the form data
    formData.append('image', image);  // Append image to form data

    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await axios.post(
        'http://localhost:8080/api/products/add',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success('Product added successfully!');
      setName('');
      setPrice('');
      setUnit('kg');  // Reset unit to default
      setImage(null);  // Reset image input
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Product Name
        </label>
        <input 
          type="text" 
          id="name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          required 
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Price
        </label>
        <input 
          type="number" 
          id="price" 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          required 
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Unit</label>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="kg">kg</option>
          <option value="gram">gram</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Product Image
        </label>
        <input 
          type="file" 
          id="image" 
          onChange={handleImageChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          required 
        />
      </div>

      <div className="flex items-center justify-between">
        <button 
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
