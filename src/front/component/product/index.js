import React from "react";

function ProductComponent({product}) {

  return (
    <div className="product" key={product.id}>
      <div className="product-img">
        <img src="/assets/images/products/product01.png" alt="" />
        <div className="product-label">
          <span className="sale">
            -
            {((product.old_price - product.new_price) / product.old_price * 100).toFixed(2)}
            %
          </span>
          <span className="new">NEW</span>
        </div>
      </div>
      <div className="product-body">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">
          <a href="#">{product.name}</a>
        </h3>
        <h4 className="product-price">
          $ {product.new_price.toFixed(2)}{" "}
          <del className="product-old-price">
            $ {product.old_price.toFixed(2)}
          </del>
        </h4>
        <div className="product-rating">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>
        <div className="product-btns">
          <button className="add-to-wishlist">
            <i className="fa fa-heart-o"></i>
            <span className="tooltipp">add to wishlist</span>
          </button>
          <button className="add-to-compare">
            <i className="fa fa-exchange"></i>
            <span className="tooltipp">add to compare</span>
          </button>
          <button className="quick-view">
            <i className="fa fa-eye"></i>
            <span className="tooltipp">quick view</span>
          </button>
        </div>
      </div>
      <div className="add-to-cart">
        <button className="add-to-cart-btn" data-id={product.id}>
          <i className="fa fa-shopping-cart"></i> add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductComponent;
