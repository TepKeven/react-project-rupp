import axios from "axios";
import React, { useEffect, useState } from "react";
import { toastNotificationError, toastNotificationSuccess } from "../../functions";
import globalVariable from "../../variable";
import "./index.css"

function TopNavbarComponent() {

  const [dropdown,setDropdown] = useState(false)

  const [cartItems,setCartItems] = useState([
    // {id: 1, title: "Product 1", quantity: 1, price: 980.00,image: "/assets/images/products/product01.png"},
    // {id: 2, title: "Product 2", quantity: 2, price: 980.00,image: "/assets/images/products/product02.png"},
    // {id: 3, title: "Product 3", quantity: 2, price: 90.00,image: "/assets/images/products/product02.png"},
    // {id: 4, title: "Product 4", quantity: 2, price: 100.00,image: "/assets/images/products/product01.png"}
    
  ])
  const [categoryItems, setCategoryItems] = useState([
    // {id: 1, title: "Home", href: "#"},
    // {id: 2, title: "Hot Deals", href: "#"},
    // {id: 3, title: "Categories", href: "#"},
    // {id: 4, title: "Laptops", href: "#"},
    // {id: 5, title: "Smartphones", href: "#"},
    // {id: 6, title: "Cameras", href: "#"},
    // {id: 7, title: "Accessories", href: "#"},
  ])

  function toggleDropdown(){

    setDropdown(!dropdown)
    
  }

  useEffect(() => {

      // localStorage.setItem("cart_items",JSON.stringify([{product_id: 4, quantity: 2}]))
      const formdata = new FormData();
      formdata.append("cart_items", localStorage.getItem("cart_items") || '[]');

      axios.post(`${process.env.REACT_APP_API_ROOT}/api/navbar`, formdata, globalVariable.axiosConfig)
      .then(function (response) {

          console.log(response.data)
          setCartItems(response.data.carts)
          setCategoryItems(response.data.categories)


      }).catch((error) => {
        console.log(error)
        toastNotificationError("Errors. Please try again.")
        // window.location.assign("/admin/login")
      })

  },[])

  const deleteCartItem = (product_id) => {

      const local_cart_items = JSON.parse(localStorage.getItem("cart_items")) || [];

      // Cart in LocalStorage
      const local_cart_items_remain = local_cart_items.filter(cart_item => cart_item.product_id != product_id)

      // Cart in Variable
      const cart_items = cartItems.filter(cartItem => cartItem.product_id != product_id)
      
      setCartItems(cart_items)
      localStorage.setItem("cart_items", JSON.stringify(local_cart_items_remain))  
      toastNotificationSuccess("Cart Item Deleted Successfully") 
  }

  return (
    <>
    <header>
      <div id="top-header">
        <div className="container">
          <ul className="header-links pull-left">
            <li>
              <a href="tel:+85512345678">
                <i className="fa fa-phone"></i> +021-12-34-56
              </a>
            </li>
            <li>
              <a href="mailto:teapkevin@gmail.com">
                <i className="fa fa-envelope-o"></i> a3web@email.com
              </a>
            </li>
            <li>
              <a href="/contact">
                <i className="fa fa-map-marker"></i> Phnom Penh, Cambodia
              </a>
            </li>
          </ul>
          <ul className="header-links pull-right">
            <li>
              <a href="#">
                <i className="fa fa-dollar"></i> USD
              </a>
            </li>
            <li>
              <a href="/profile">
                <i className="fa fa-user-o"></i> My Account
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div id="header">
        <div className="container">
          <div className="row w-100">
            <div className="col-md-3">
              <div className="header-logo">
                <a href="#" className="logo">
                  <img src="/assets/images/logo.png" alt="Image" />
                </a>
              </div>
            </div>
            <div className="col-md-5">
              <div className="header-search">
                <form>
                  <select className="input-select">
                    <option value="0">All Categories</option>
                    <option value="1">Category 01</option>
                    <option value="1">Category 02</option>
                  </select>
                  <input className="input" placeholder="Search here" />
                  <button className="search-btn">Search</button>
                </form>
              </div>
            </div>
            <div className="col-md-3 clearfix">
              <div className="header-ctn">
                {/* <div>
                  <a href="#">
                    <i className="fa fa-heart-o"></i>
                    <span>Your Wishlist</span>
                    <div className="qty">2</div>
                  </a>
                </div> */}
                <div className={"dropdown " + (dropdown ? "open" : "")} onClick={toggleDropdown}>
                  <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                    <i className="fa fa-shopping-cart"></i>
                    <span>Your Cart</span>
                    <div className="qty">{cartItems.length}</div>
                  </a>
                  <div className="cart-dropdown">
                    <div className="cart-list">
                      {cartItems.map((cartItem) => {
                        return (
                          <div className="product-widget" key={cartItem.product_id}>
                            <div className="product-img">
                              <img src={`${process.env.REACT_APP_IMAGE_PRODUCT}/${cartItem.image}`} alt="Image" />
                            </div>
                            <div className="product-body">
                              <h3 className="product-name">
                                <a href="#">{cartItem.product_description_assoc && cartItem.product_description_assoc[0].name}</a>
                              </h3>
                              <h4 className="product-price">
                                <span className="qty">{cartItem.order_amount}x</span>{`\$ ${(parseFloat(cartItem.price) + parseFloat(cartItem.tax_price)).toFixed(2)}`}
                              </h4>
                            </div>
                            {/* <button className="btn btn-danger" onClick={() => deleteCartItem(cartItem.product_id)}>
                              <i className="fa fa-close"></i>
                            </button> */}
                          </div>
                        )
                      })}
                    </div>
                    <div className="cart-summary">
                      <small>{cartItems.length} Item(s) selected</small>
                      <h6>SUBTOTAL: $ {cartItems.reduce((total,cartItem) => (parseFloat(cartItem.price) + parseFloat(cartItem.tax_price)) * parseFloat(cartItem.order_amount) + total , 0).toFixed(2)}</h6>
                    </div>
                    <div className="cart-btns">
                      <a href="/cart">View Cart</a>
                      <a href="/checkout">
                        Checkout <i className="fa fa-arrow-circle-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="menu-toggle">
                  <a href="#">
                    <i className="fa fa-bars"></i>
                    <span>Menu</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <nav id="navigation">
    <div className="container">
      <div id="responsive-nav">
        <ul className="main-nav nav">
          {categoryItems.map((categoryItem) => {
            return (
              <li className={categoryItem.category_id == 1 ? "" : "" } key={categoryItem.category_id}><a href={"/shop"}>{categoryItem.category_description_assoc[0].name}</a></li>
            )
          })}
        </ul>
      </div>
    </div>
  </nav>
  </>
  );
}

export default TopNavbarComponent;
