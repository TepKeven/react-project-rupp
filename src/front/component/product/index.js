import React from "react";
import { toastNotificationSuccess } from "../../functions"


function ProductComponent({product}) {

  const addProductToCart = (product_id) => {

    var cart_items = JSON.parse(localStorage.getItem("cart_items")) || [];
    var product_item = cart_items.find(cart_item => cart_item.product_id == product_id);
    var product_index

    if(product_item){
      product_index = cart_items.findIndex(cart_item => cart_item.product_id == product_id)
      cart_items[product_index].quantity += 1;
    }
    else{
      cart_items.push({product_id: product_id, quantity: 1})
    }

    localStorage.setItem("cart_items", JSON.stringify(cart_items))
    toastNotificationSuccess("Add to Cart Successfully")
    // console.log(cart_items)

  }

  if(product)
    return (
      <>
        <div className="product">
          <div className="product-img">
            <img src={`${process.env.REACT_APP_IMAGE_PRODUCT}/${product.image}`} alt="" />
            <div className="product-label">
              <span className="sale">
                +
                {parseFloat(product.tax_price).toFixed(2)}
                $ Tax
              </span>
              <span className="new">NEW</span>
            </div>
          </div>
          <div className="product-body">
            {/* <p className="product-category">{product.viewed}</p> */}
            <h3 className="product-name">
              <a href="#">{product.product_description_assoc[0].name}</a>
            </h3>
            <h4 className="product-price">
              $ {(parseFloat(product.price) + parseFloat(product.tax_price)).toFixed(2)}{" "}
              <del className="product-old-price">
                $ {parseFloat(product.price).toFixed(2)}
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
              <button className="quick-view" onClick={() => window.location.assign(product.product_id == 0 ? "#" : `product/${product.product_id}`)}>
                <i className="fa fa-eye"></i>
                <span className="tooltipp">quick view</span>
              </button>
            </div>
          </div>
          {product.product_id != 0 && (
            <div className="add-to-cart">
              <button className="add-to-cart-btn" onClick={() => addProductToCart(product.product_id)}>
                <i className="fa fa-shopping-cart"></i> add to cart
              </button>
            </div>
          )}
        </div>
      </>
  );
}

export default ProductComponent;
