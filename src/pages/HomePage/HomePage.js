import React, { useEffect } from 'react';
import './HomePage.scss';
import HeaderSlider from '../../components/Slider/HeaderSlider';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../store/categorySlice';
import ProductList from '../../components/ProductList/ProductList';
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from '../../store/productSlice';
import Loader from '../../components/Loader/Loader';
import { STATUS } from '../../utils/status';

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories) || []; // Ensure categories is an array

  useEffect(() => {
    dispatch(fetchAsyncProducts(50));
  }, []);

  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);

  // randomizing the products in the list
  const tempProducts = products ? [...products].sort(() => Math.random() - 0.5) : [];

  // Create filtered product arrays based on categories
  const catProducts = categories.map(category =>
    products ? products.filter(product => product.category === category) : []
  );

  return (
    <main>
      <div className='slider-wrapper'>
        <HeaderSlider />
      </div>
      <div className='main-content bg-whitesmoke'>
        <div className='container'>
          <div className='categories py-5'>
            <div className='categories-item'>
              <div className='title-md'>
                <h3>See our products</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={tempProducts} />}
            </div>

            {categories.map((category, index) => (
              <div className='categories-item' key={index}>
                <div className='title-md'>
                  <h3>{category}</h3>
                </div>
                {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProducts[index]} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
