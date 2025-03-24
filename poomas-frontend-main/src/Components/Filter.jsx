import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FilterBar = ({
  categories,
  selectedFeatures,
  onCategoryChange,
  onFeatureChange,
  onSearchInputChange,
  searchQuery,
  products,
}) => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(""); // Default to "All"
    }
  }, [location.search]);

  const getCategoryProperties = () => {
    if (!selectedCategory) return [];
    // Filter products based on selected category
    const categoryProducts = products.filter(product => product.category === selectedCategory);
    // Extract unique properties from category products
    const properties = categoryProducts.reduce((acc, product) => {
      Object.keys(product.features).forEach(feature => {
        if (!acc.includes(feature)) {
          acc.push(feature);
        }
      });
      return acc;
    }, []);
    return properties;
  };

  const categoryProperties = getCategoryProperties();

  return (
    <div className="flex mt-56 flex-wrap justify-between items-center mb-8">
      <div>
        <label htmlFor="category" className="mr-2 font-medium">
          Category:
        </label>
        <select
          id="category"
          className="border border-gray-300 rounded px-2 py-1"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            onCategoryChange(e);
          }}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="search" className="mr-2 font-medium">
          Search:
        </label>
        <input
          type="text"
          id="search"
          className="border border-gray-300 rounded px-2 py-1"
          value={searchQuery}
          onChange={onSearchInputChange}
        />
      </div>
      {/* Additional filtering options */}
      <div>
        {categoryProperties.map((property) => (
          <div key={property}>
            <label htmlFor={property} className="mr-2 font-medium">
              {property}:
            </label>
            <select
              id={property}
              className="border border-gray-300 rounded px-2 py-1"
              value={selectedFeatures[property] || ''}
              onChange={(e) => onFeatureChange(property, e.target.value)}
            >
              <option value="">All {property}</option>
              {/* Assuming property values are strings */}
              {categoryProducts.reduce((acc, product) => {
                if (!acc.includes(product.features[property])) {
                  acc.push(product.features[property]);
                }
                return acc;
              }, []).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
