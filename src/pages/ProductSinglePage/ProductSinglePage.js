import React, { useEffect, useState } from 'react';
import './ProductSinglePage.scss';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAsyncProductSingle,
  getProductSingle,
  getSingleProductStatus,
} from '../../store/productSlice';
import { STATUS } from '../../utils/status';
import Loader from '../../components/Loader/Loader';
import { formatPrice } from '../../utils/helpers';
import {
  addToCart,
  getCartMessageStatus,
  setCartMessageOff,
  setCartMessageOn,
} from '../../store/cartSlice';
import CartMessage from '../../components/CartMessage/CartMessage';

const ProductSinglePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);
  const productSingleStatus = useSelector(getSingleProductStatus);
  const [quantity, setQuantity] = useState(1);
  const cartMessageStatus = useSelector(getCartMessageStatus);

  // getting single product
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAsyncProductSingle(id));
      } catch (error) {
        console.error('Error fetching product:', error);
      }

      if (cartMessageStatus) {
        setTimeout(() => {
          dispatch(setCartMessageOff());
        }, 2000);
      }
    };

    fetchData();
  }, [dispatch, id, cartMessageStatus]);

  // Add an error state to handle any issues
  if (productSingleStatus === STATUS.FAILED) {
    return <p>Error fetching product. Please try again later.</p>;
  }

  // Add a check for product existence before rendering
  if (!product) {
    return <p>Product not found.</p>;
  }

  let discountedPrice = product.price - (product.price * (product.discountPercentage / 100));



  if (productSingleStatus === STATUS.LOADING) {
    return <Loader />;
  }

  const increaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if (tempQty > product.stock) tempQty = product.stock;
      return tempQty;
    });
  };

  const decreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if (tempQty < 1) tempQty = 1;
      return tempQty;
    });
  };

  const addToCartHandler = () => {
    let totalPrice = quantity * discountedPrice;

    dispatch(addToCart({ ...product, quantity, totalPrice, discountedPrice }));
    dispatch(setCartMessageOn(true));
  };

  return (
    <main className='py-5 bg-whitesmoke'>
      <div className='product-single'>
        <div className='container'>
          <div className='product-single-content bg-white grid'>
            <div className='product-single-l'>
              <div className='product-img'>
                <div className='product-img-zoom'>
                  <img
                    src={product.image || 'placeholder_image_url'}
                    alt=''
                    className='img-cover'
                   
                  />
                </div>

                <div className='product-img-thumbs flex align-center my-2'>
                  {product.images?.map((image, index) => (
                    <div className='thumb-item' key={index}>
                   
                      <img src={image} alt='' className='img-cover' />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className='product-single-r'>
              <div className='product-details font-manrope'>
                <div className='title fs-20 fw-5'>{product.title}</div>
                <div>
                  <p className='para fw-3 fs-15'>{product.description}</p>
                </div>
                <div className='info flex align-center flex-wrap fs-14'>
                  <div className='rating'>
                    <span className='text-orange fw-5'>Rating:</span>
                    {product.rating && (
                      <span className='mx-1'>{product.rating.rate ? product.rating.rate.toString() : 'N/A'}</span>
                    )}
                  </div>
                  <div className='vert-line'></div>
                  <div className='brand'>
                    <span className='text-orange fw-5'>Brand:</span>
                    {product.brand ? <span className='mx-1'>{product.brand}</span> : <span className='mx-1'>N/A</span>}
                  </div>
                  <div className='vert-line'></div>
                  <div className='brand'>
                    <span className='text-orange fw-5'>Category:</span>
                    <span className='mx-1 text-capitalize'>
                      {product.category ? product.category.replace('-', ' ') : ''}
                    </span>
                  </div>
                </div>

                <div className='price'>
                  <div className='flex align-center'>
                    <div className='new-price fw-5 font-poppins fs-24 text-orange'>
                      {formatPrice(product.price)}
                    </div>
                    <span className='fs-14 mx-2 text-dark'>Inclusive of all taxes</span>
                  </div>


                </div>

                <div className='qty flex align-center my-4'>
                  <div className='qty-text'>Quantity:</div>
                  <div className='qty-change flex align-center mx-3'>
                    <button
                      type='button'
                      className='qty-decrease flex align-center justify-center'
                      onClick={decreaseQty}
                    >
                      <i className='fas fa-minus'></i>
                    </button>
                    <div className='qty-value flex align-center justify-center'>{quantity}</div>
                    <button
                      type='button'
                      className='qty-increase flex align-center justify-center'
                      onClick={increaseQty}
                    >
                      <i className='fas fa-plus'></i>
                    </button>
                  </div>
                  {product.stock === 0 && (
                    <div className='qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw-5'>
                      out of stock
                    </div>
                  )}
                </div>

                <div className='btns'>
                  <button type='button' className='add-to-cart-btn btn' onClick={addToCartHandler}>
                    <i className='fas fa-shopping-cart'></i>
                    <span className='btn-text mx-2'>add to cart</span>
                  </button>
                  <button type='button' className='buy-now btn mx-3'>
                    <span className='btn-text'>buy now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {cartMessageStatus && <CartMessage />}
    </main>
  );
};

export default ProductSinglePage;
