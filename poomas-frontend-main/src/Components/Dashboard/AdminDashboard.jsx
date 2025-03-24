import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { MenuIcon } from 'lucide-react';

const EditProductModal = ({ isOpen, onClose, product }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [loading, setLoading] = useState(false);
  const userRole = jwtDecode(localStorage.getItem("token")).role;


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
          {userRole === 'admin' && (
            <div className="mb-4">
              <label htmlFor="isApproved" className="block text-gray-700">Approved:</label>
              <select id="isApproved" name="isApproved" value={editedProduct.isApproved} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2">
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          )}
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" disabled={loading}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [activeMenu, setActiveMenu] = useState('users');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userRole = jwtDecode(localStorage.getItem("token")).role;
  const userId = jwtDecode(localStorage.getItem("token")).userId;
  const [isNavOpen, setIsNavOpen] = useState(false); // State to handle nav items visibility
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));

    axios.get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/get-products`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setProducts(res.data);
        const userProducts = res.data.filter(product => product.createdBy === userId);
        setMyProducts(userProducts);
      })
      .catch(err => console.error(err));
  }, []);

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

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };


  const showNavItems = () => {
    setIsNavOpen(!isNavOpen); // Toggle the nav items visibility
  };
  return (
    <div className="bg-gray-900 min-h-screen">
    <header className="bg-gray-800 p-4 fixed w-full top-0 z-10">
        <nav className="flex justify-between items-center">
          <h1 className="text-white text-xl">Dashboard</h1>
          <div>
            <ul className={`lg:flex space-x-4 text-white ${isNavOpen ? 'flex flex-col absolute top-16 gap-5 left-0 h-auto w-full bg-gray-800 p-4 lg:relative lg:flex-row lg:space-x-4' : 'hidden lg:flex'}`}>
              <li className={`cursor-pointer hover:text-gray-300 ${activeMenu === 'users' && 'text-gray-300'}`} onClick={() => setActiveMenu('users')}>Users</li>
              <li className={`cursor-pointer hover:text-gray-300 ${activeMenu === 'products' && 'text-gray-300'}`} onClick={() => setActiveMenu('products')}>All Products</li>
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

      <main className="p-8 pt-20">
        {activeMenu === 'users' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map(user => (
              <div key={user._id} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <p className="text-gray-700">Mobile Number: {user.mobileNumber}</p>
                <p className="text-gray-700">Created At: {user.createdAt}</p>
                <p className="text-gray-700">User ID: {user._id}</p>
              </div>
            ))}
          </div>
        )}

        {activeMenu === 'products' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-700">Product ID: {product._id}</p>
                <p className="text-gray-700">Created At: {product.createdAt}</p>
                <p className="text-gray-700">Created By: {product.createdBy}</p>
                <p className="text-gray-700">Verified: {product.isApproved ? 'Yes' : 'No'}</p>
                <div className="mt-4 flex justify-end">
                  <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Edit</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeMenu === 'myProducts' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myProducts.map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-700">Product ID: {product._id}</p>
                <p className="text-gray-700">Created At: {product.createdAt}</p>
                <p className="text-gray-700">Verified: {product.isApproved ? 'Yes' : 'No'}</p>
                <div className="mt-4 flex justify-end">
                  <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <EditProductModal isOpen={isModalOpen} onClose={closeModal} product={selectedProduct} />
      )}
    </div>
  );
};

export default AdminDashboard;
