import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './footer';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const whatsappNumber = '+971527045765'; // Replace with the actual WhatsApp number

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/products/${id}`);
        setProduct(response.data);
        console.log("product:", response.data);
        console.log(product.name);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (product && product.category) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/products?category=${product.category}`);
          setSimilarProducts(response.data.filter(item => item._id !== id));
        } catch (error) {
          console.error('Error fetching similar products:', error);
        }
      }
    };

    fetchSimilarProducts();
  }, [product, id]);

  const handleContactSeller = () => {
    const productLink = window.location.href;
    const message = `Hi, I'm interested in your product: ${product.name}. Here is the link: ${productLink}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!product) return <div>Loading...</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-[150px] p-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <Slider {...settings}>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}  
                   alt={product.name}
                  className="object-contain h-96 md:h-[500px] w-full"
                />
              ))}
              {product.videos.map((video, index) => (
                <video
                  key={index}
                  src={video}  
                  alt={product.name}
                  className="object-contain h-96 sm:h-[600px] w-full"
                  controls
                />
              ))}
            </Slider>
          </div>
          <div className="md:w-1/2 mt-20">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="lg:text-lg text-gray-700 mt-5 ">{product.description}</p>
            <p className="text-xl font-semibold mt-5">{product.Price} AED</p>
            <div className="mt-4">
              <h3 className="text-lg font-medium">Features:</h3>
              <ul className="text-gray-600">
                {Object.entries(product.features).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-semibold">{key}: </span>
                    {value}
                  </li>
                ))}
              </ul>
            </div>
            <button 
              className="bg-blue-500 text-white p-2 mt-4 rounded" 
              onClick={handleContactSeller}
            >
              Contact Seller
            </button>
          </div>
        </div>
        {/* <div className="mt-8">
          <h3 className="text-2xl font-bold">Similar Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {similarProducts.map(similarProduct => (
              <div key={similarProduct._id} className="bg-white shadow-md flex flex-col gap-5 rounded-lg p-4">
                <Slider {...settings}>
                  {similarProduct.images.map((image, index) => (
                    <img
                      key={index}
                      src={`${import.meta.env.VITE_REACT_APP_IMAGE_ENDPOINT}/${image}`}
                      alt={similarProduct.name}
                      className="object-cover h-48 w-full"
                    />
                  ))}
                </Slider>
                <div>
                  <h2 className="text-lg font-semibold">{similarProduct.name}</h2>
                  <p className="text-sm text-gray-500">{similarProduct.description}</p>
                  <p className="text-lg font-bold mt-2">{similarProduct.Price} AED</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
