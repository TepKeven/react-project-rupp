import React, { useState } from "react";
import "./index.css"

function TopNavbarComponent() {

  const [dropdown,setDropdown] = useState(false)

  const [cartItems,setCartItems] = useState([
    {id: 1, title: "Product 1", quantity: 1, price: 980.00,image: "./assets/images/products/product01.png"},
    {id: 2, title: "Product 2", quantity: 2, price: 980.00,image: "./assets/images/products/product02.png"},
    {id: 3, title: "Product 3", quantity: 2, price: 90.00,image: "./assets/images/products/product02.png"},
    {id: 4, title: "Product 4", quantity: 2, price: 100.00,image: "./assets/images/products/product01.png"}
    
  ])
  const [categoryItems, setCategoryItems] = useState([
    {id: 1, title: "Home", href: "#"},
    {id: 2, title: "Hot Deals", href: "#"},
    {id: 3, title: "Categories", href: "#"},
    {id: 4, title: "Laptops", href: "#"},
    {id: 5, title: "Smartphones", href: "#"},
    {id: 6, title: "Cameras", href: "#"},
    {id: 7, title: "Accessories", href: "#"},
  ])

  function toggleDropdown(){

    setDropdown(!dropdown)
    
  }

  return (
    <>
    <header>
      <div id="top-header">
        <div className="container">
          <ul className="header-links pull-left">
            <li>
              <a href="#">
                <i className="fa fa-phone"></i> +021-95-51-84
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-envelope-o"></i> email@email.com
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-map-marker"></i> 1734 Stonecoal Road
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
              <a href="#">
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
                  <img src="./assets/images/logo.png" alt="" />
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
                <div>
                  <a href="#">
                    <i className="fa fa-heart-o"></i>
                    <span>Your Wishlist</span>
                    <div className="qty">2</div>
                  </a>
                </div>
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
                          <div className="product-widget" key={cartItem.id}>
                            <div className="product-img">
                              <img src={cartItem.image} alt="" />
                            </div>
                            <div className="product-body">
                              <h3 className="product-name">
                                <a href="#">{cartItem.title}</a>
                              </h3>
                              <h4 className="product-price">
                                <span className="qty">{cartItem.quantity}x</span>{`\$ ${cartItem.price.toFixed(2)}`}
                              </h4>
                            </div>
                            <button className="delete">
                              <i className="fa fa-close"></i>
                            </button>
                          </div>
                        )
                      })}
                    </div>
                    <div className="cart-summary">
                      <small>{cartItems.length} Item(s) selected</small>
                      <h6>SUBTOTAL: $ {cartItems.reduce((prev,next) => prev + next.price * next.quantity, 0).toFixed(2)}</h6>
                    </div>
                    <div className="cart-btns">
                      <a href="#">View Cart</a>
                      <a href="#">
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
              <li className={categoryItem.id == 1 ? "active" : "" } key={categoryItem.id}><a href={categoryItem.href}>{categoryItem.title}</a></li>
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
