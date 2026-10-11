import React from 'react';
import { useCart } from '../../context/cart-context';

function HorizontalProductCard({ product }) {
  const { cartDispatch } = useCart()

  const onRemoveClick = (product) => {
    cartDispatch({
      type: "REMOVE_FROM_CART",
      payload: { id: product.product.id }
    })
  }

  return (
    <div>
      <div className="card-horizontal d-flex shadow">
        <div className="card-hori-image-container relative">
          <img className="card-image" src={product?.product?.images[0]} alt="shoes" />
          <small className="c-badge bg-primary absolute left-0">Trending</small>
        </div>
        <div className="card-details d-flex direction-column">
          <div className="card-des">{product?.product?.title}</div>
          <div className="card-description">
            <p className="card-price">
              {product?.product?.price}
            </p>
          </div>
          <div className="quantity-container d-flex gap">
            <p className="q-title">Quantity: </p>
            <div className="count-container d-flex align-center gap">
              <button className="count">-</button>
              <span className="count-value">1</span>
              <button className="count">+</button>
            </div>
          </div>
          <div className="cta-btn d-flex gap">
            <div className="cta-btn">
              <button onClick={() => onRemoveClick(product)} className="button hori-btn btn-primary btn-icon d-flex align-center justify-center gap cursor btn-margin">
                Remove From Cart
              </button>
            </div>
            <div className="cta-btn">
              <button className="button hori-btn btn-outline-primary btn-icon d-flex align-center justify-center gap cursor btn-margin">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorizontalProductCard;
