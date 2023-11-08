import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './ProductList.scss';


const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  return (
    <div className='product-lists grid bg-whitesmoke my-3'>
      {products.map((product) => {
        // Check if the product object is empty or undefined
        if (!product || Object.keys(product).length === 0) {
          console.error("Invalid product data:", product);
          return null; // or handle the case differently based on your requirements
        }

        // Set the discounted price to regular price if there's no discount property
        const discountedPrice = typeof product.discount === 'number'
          ? product.price - (product.price * (product.discount / 100))
          : product.price;

        // Check if discountedPrice is a valid number
        if (isNaN(discountedPrice) || discountedPrice < 0) {
          console.error("Invalid discountedPrice calculation:", product);
          return null; // or handle the case differently based on your requirements
        }

        // Map the product details to the Product component
        return <Product key={product.id} product={{ ...product, discountedPrice }} />;
      })}
    </div>
  );
};

export default ProductList;