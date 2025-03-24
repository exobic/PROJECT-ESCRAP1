import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PRODUCT_CATEGORIES } from '../config/index';
import { ArrowDownToLine, CheckCircle, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const perks = [
  {
    name: 'Fast Listings',
    Icon: ArrowDownToLine,
    description: 'List your properties or vehicles quickly and easily on Poomas.',
  },
  {
    name: 'Verified Sellers',
    Icon: CheckCircle,
    description: 'Our platform ensures trust with verified sellers, providing quality assurance for buyers.',
  },
  {
    name: 'Premium Selection',
    Icon: Leaf,
    description: 'Discover premium listings and join us in our commitment to offering high-quality properties, shops, and vehicles.',
  },
];

const Banner = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/products/search?query=${query}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query.trim() !== '') {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchResultClick = (product) => {
   history(`/products?query=${product.name}`);
  };
  const handleCategoryClick = (category) => {
    history(`/products?category=${category}`);
  };


  return (
    <>
      <div className="py-20 mx-auto text-center mt-10  flex flex-col items-center max-w-3xl px-5">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Your Marketplace For{' '}
          <span className="text-blue-600">Buying and Selling</span> Online.
        </h1>
        <p className="mt-6 text-lg max-w-prose text-muted-foreground">
          Welcome to Poomas. Discover a wide range of products from verified sellers.
        </p>
        <div className="flex flex-col gap-4 mt-6">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={handleChange}
            className="rounded-md border border-gray-300 px-4 py-2"
          />
          {searchResults.length > 0 && (
            <ul className='flex flex-col gap-3 text-start'>
              {searchResults.map((product) => (
                <li className='font-semibold ' key={product._id} onClick={() => handleSearchResultClick(product)}>
                  {product.name}
                </li>
              ))}
            </ul>
          )}
          <p><a href="/products" className=' font-medium text-blue-600'>See all Products &rarr;</a></p>
        </div>
      </div>
      <section className="w-full h-auto  flex flex-col gap-5  justify-center ml-auto">
        <div>
          <h1 className="text-3xl font-bold text-center">Categories</h1>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-24">
        {PRODUCT_CATEGORIES.map((category, index) => (
          <div key={index} className=" shadow-md px-10 py-4 flex flex-col gap-5 cursor-pointer items-center justify-center" onClick={() => handleCategoryClick(category.label)}>
            <img src={category.img} alt={category.label} className=' w-auto h-20 lg:w-auto ' />
            <p className="text-md font-semibold mt-4">{category.label}</p>
          </div>
        ))}
      </div>

      </section>
      <section className="border-t border-gray-200 bg-gray-50 px-5">
        <div className="py-20">
          <div className="grid grid-cols-1  sm:grid-cols-2 sm:gap-x-6  lg:grid-cols-3 lg:gap-x-1 lg:gap-y-0">
            {perks.map((perk) => (
              <div key={perk.name} className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                <div className="md:flex-shrink-0 flex  justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
