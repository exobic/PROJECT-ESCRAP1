import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router , Route,Routes,useLocation} from "react-router-dom"
import Login from './Components/auth/Login'
import Signup from './Components/auth/user/Signup'
import Home from './Components/Home'
import AdminSignup from './Components/auth/admin/Signup'
import UserSignup from './Components/auth/user/Signup'
import AdminDashboard from './Components/Dashboard/AdminDashboard'
import AddProduct from './Components/Dashboard/AddProduct'
import SellerSignup from './Components/auth/seller/Signup'
import SellerDashboard from './Components/Dashboard/SellerDashboard'
import ProductPage from './Components/Products'
import ProductDetails from './Components/productdetails'
function App() {
  

  return (
    <>
      <Router>
        
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signin' element={<Login/>} />
          <Route path='/Admin/signup' element={<AdminSignup/>} />
          <Route path='/user/signup' element={<UserSignup/>} />
          <Route path='/seller/signup' element={<SellerSignup/>} />
          <Route path='/admin-dashboard' element={<AdminDashboard/>} />
          <Route path='/seller-dashboard' element={<SellerDashboard/>} />
          <Route path='/add-product' element={<AddProduct/>} />
          <Route path='/products' element={<ProductPage location={location} />} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          
        </Routes>
      </Router>
    </>
  )
}

export default App
