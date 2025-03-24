import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import {  MenuIcon } from 'lucide-react';

const EditProductModal = ({ isOpen, onClose, product }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditedProduct({ ...product });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/products/${editedProduct._id}`, editedProduct, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Product updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
    setLoading(false);
  };

  return (
    <div className={`fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 ${isOpen ? 'visible' : 'invisible'}`}>
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name:</label>
            <input type="text" id="name" name="name" value={editedProduct.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Description:</label>
            <input type="text" id="description" name="description" value={editedProduct.description} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700">Location:</label>
            <input type="text" id="location" name="location" value={editedProduct.location} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">Category:</label>
            <input type="text" id="category" name="category" value={editedProduct.category} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" disabled={loading}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SellerDashboard = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [activeMenu, setActiveMenu] = useState('myProducts');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false); // State to handle nav items visibility

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login to access dashboard");
      navigate('/signin');
      return;
    }

    const userId = jwtDecode(token).userId;
    axios.get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/get-products`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      const userProducts = res.data.filter(product => product.createdBy === userId);
      setMyProducts(userProducts);
    })
    .catch(err => {
      console.error(err);
      alert('Failed to fetch products');
    });
  }, [navigate]);

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/products/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMyProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };
  const showNavItems = () => {
    setIsNavOpen(!isNavOpen); // Toggle the nav items visibility
  };

  
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <header className="bg-gray-800 p-4 fixed w-full top-0 z-10">
        <nav className="flex justify-between items-center">
          <h1 className="text-white text-xl">Dashboard</h1>
          <div>
            <ul className={`lg:flex space-x-4 text-white ${isNavOpen ? 'flex flex-col absolute top-16 gap-5 left-0 h-auto w-full bg-gray-800 p-4 lg:relative lg:flex-row lg:space-x-4' : 'hidden lg:flex'}`}>
          <li className={`cursor-pointer hover:text-gray-300 ${activeMenu === 'myProducts' && 'text-gray-300'}`} onClick={() => setActiveMenu('myProducts')}>My Products</li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link to="/add-product" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Product</Link>
              </li>
            </ul>
            <div className="lg:hidden">
              <button className="text-white" onClick={showNavItems}>
                <MenuIcon size={24} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-900 pt-20">
        {activeMenu === 'myProducts' && (
          <div className="p-8">
            <h1 className="text-white text-2xl mb-4">My Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myProducts.map(product => (
                <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <p className="text-gray-700">Location: {product.location}</p>
                  <p className="text-gray-700">Category: {product.category}</p>
                  <div className="flex justify-end mt-4">
                    <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Edit</button>
                    <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Product Modal */}
      <EditProductModal isOpen={isModalOpen} onClose={closeModal} product={selectedProduct} />
    </div>
  );
};

export default SellerDashboard;
