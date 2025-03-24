import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [Price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [features, setFeatures] = useState({});
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const handleFeatureChange = (featureName, value) => {
    setFeatures({ ...features, [featureName]: value });
  };

  const handleImageChange = (e) => {
    setImages([...images, ...e.target.files]);
  };

  const handleVideoChange = (e) => {
    setVideos([...videos, ...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('Price', Price);
      formData.append('location', location);
      formData.append('category', category);
      Object.entries(features).forEach(([key, value]) => {
        formData.append(`features[${key}]`, value);
      });
      images.forEach(image => {
        formData.append('images', image);
      });
      videos.forEach(video => {
        formData.append('videos', video);
      });

      await axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/add-products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      alert('Product added successfully');
      // Clear form fields
      setName('');
      setDescription('');
      setPrice('');
      setLocation('');
      setCategory('');
      setFeatures({});
      setImages([]);
      setVideos([]);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Add Product</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
          <p className="ml-4 text-lg">Adding product...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Form fields for product details */}
          <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <textarea className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="text" placeholder="Price In AED" onChange={(e) => setPrice(e.target.value)} />
          <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <select className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="vehicles">Vehicles</option>
            <option value="apartments">Apartments</option>
            <option value="shops">Shops</option>
            <option value="products">Products</option>
          </select>
          
          {/* Render feature input fields based on selected category */}
          {category === 'vehicles' && (
            <>
              <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="text" placeholder="Manufacturer Name" onChange={(e) => handleFeatureChange('ManufacturerName', e.target.value)} />
              <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="number" placeholder="Seating Capacity" onChange={(e) => handleFeatureChange('seatingCapacity', e.target.value)} />
              <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="number" placeholder="Kilometers" onChange={(e) => handleFeatureChange('Kilometers', e.target.value)} />
              <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="text" placeholder="Fuel Type" onChange={(e) => handleFeatureChange('fuelType', e.target.value)} />
              <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="text" placeholder="Transmission" onChange={(e) => handleFeatureChange('transmission', e.target.value)} />
              <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="number" placeholder="Year" onChange={(e) => handleFeatureChange('Year', e.target.value)} />
              <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="text" placeholder="Color" onChange={(e) => handleFeatureChange('Color', e.target.value)} />
              <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="text" placeholder="Exterior Color" onChange={(e) => handleFeatureChange('exteriorColor', e.target.value)} />
              <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="text" placeholder="Variant" onChange={(e) => handleFeatureChange('variant', e.target.value)} />
              <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="text" placeholder="Trim" onChange={(e) => handleFeatureChange('trim', e.target.value)} />
              <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="text" placeholder="Body Type" onChange={(e) => handleFeatureChange('bodyType', e.target.value)} />
            </>
          )}
          {category === 'apartments' && (
            <>
              <label htmlFor="">
                <span className="text-gray-700">Number of Rooms</span>
                <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="text" placeholder="Number of Rooms" onChange={(e) => handleFeatureChange('numberOfRooms', e.target.value)} />
              </label>
              <label htmlFor="">
                <span className="text-gray-700">Property Type</span>
                <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="text" placeholder="eg: villas , flats" onChange={(e) => handleFeatureChange('PropertyType', e.target.value)} />
              </label>
            </>
          )}
          {category === 'shops' && (
            <>
              <label htmlFor="">
                <span className="text-gray-700">Shop Type</span>
                <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="text" placeholder="eg : supermarket , electronics" onChange={(e) => handleFeatureChange('ShopType', e.target.value)} />
              </label>
            </>
          )}
          {category === 'products' && (
            <>
              <label htmlFor="">
                <span className="text-gray-700">Product Type</span>
                <input className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" type="text" placeholder="eg : electronics, automobile" onChange={(e) => handleFeatureChange('ProductType', e.target.value)} />
              </label>
            </>
          )}
          {/* Add more category-specific feature input fields here */}

          {/* Input fields for images and videos */}
          <label htmlFor="image-upload" className="block font-medium mb-2">Upload Images</label>
          <input id="image-upload" className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" name="images" type="file" accept="image/*" multiple onChange={handleImageChange} />

          <label htmlFor="video-upload" className="block font-medium mb-2">Upload Videos</label>
          <input id="video-upload" className="w-full border border-gray-300 rounded-md mb-4 px-4 py-2" name="videos" type="file" accept="video/*" multiple onChange={handleVideoChange} />

          {/* Submit button */}
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" type="submit" disabled={loading}>Add Product</button>
        </form>
      )}
    </div>
  );
};

export default AddProduct;
