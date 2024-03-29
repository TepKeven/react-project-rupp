import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductComponent from "../../component/product";
import { toastNotificationError, toastNotificationSuccess } from "../../functions";

function ForntProductPage() {

    const params = useParams();
    const [productInfo, setProductInfo] = useState({})
    const [productCategory, setProductCategory] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
		
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/product/${params.product_id || 0}`)
        .then(function (response) {
            
            console.log(response.data)
			setProductInfo(response.data.product)     
            setProductCategory(response.data.category)     
            setRelatedProducts(response.data.related_products)

        }).catch((error) => {
            console.log(error)
            // toastNotificationError(error.response.statusText)
        })

	},[])

    const addProductToCart = () => {

        var cart_items = JSON.parse(localStorage.getItem("cart_items")) || [];
        var product_item = cart_items.find(cart_item => cart_item.product_id == params.product_id);
        var product_index;
        var quantity = parseInt(document.getElementById("product-quantity").value) == NaN ? 0 : document.getElementById("product-quantity").value
    
        if(product_item){
          product_index = cart_items.findIndex(cart_item => cart_item.product_id == params.product_id)
          cart_items[product_index].quantity = parseInt(cart_items[product_index].quantity) + parseInt(quantity);
        }
        else{
          cart_items.push({product_id: params.product_id, quantity: quantity})
        }
    
        localStorage.setItem("cart_items", JSON.stringify(cart_items))
        toastNotificationSuccess("Add to Cart Successfully")
        // console.log(cart_items)
    
    }

    if(productInfo != null){
        return (
            <div>
                {/* BREADCRUMB */}
                <div id="breadcrumb" className="section">
                    {/* container */}
                    <div className="container">
                        {/* row */}
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="breadcrumb-tree">
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">Categories</a></li>
                                    {productCategory && (
                                        <li><a href="#">{productCategory.category_description_assoc && productCategory.category_description_assoc[0].name}</a></li>
                                    )}
                                    <li className="active">{productInfo.product_description_assoc && productInfo.product_description_assoc[0].name}</li>
                                </ul>
                            </div>
                        </div>
                        {/* /row */}
                    </div>
                    {/* /container */}
                </div>
                {/* /BREADCRUMB */}
                {/* SECTION */}
                <div className="section">
                    {/* container */}
                    <div className="container">
                        {/* row */}
                        <div className="row">
                            {/* Product main img */}
                            <div className="col-md-5 col-md-push-2">
                                <div id="product-main-img">
                
                                    {Array.from(Array(4), (item,index) => (
                                        <div className="product-preview">
                                            <img src={`${process.env.REACT_APP_IMAGE_PRODUCT}/${productInfo.image}`} alt={`product-${productInfo.product_id}`} />
                                        </div>
                                    ))}
    
                                    {/* <div className="product-preview">
                                        <img src="./img/product03.png" alt />
                                    </div>
                                    <div className="product-preview">
                                        <img src="./img/product06.png" alt />
                                    </div>
                                    <div className="product-preview">
                                        <img src="./img/product08.png" alt />
                                    </div> */}
                                </div>
                            </div>
                            {/* /Product main img */}
                            {/* Product thumb imgs */}
                            <div className="col-md-2  col-md-pull-5">
                                {/* <div id="product-imgs">
    
                                    {Array.from(Array(4), (item,index) => (
                                        <div className="product-preview">
                                            <img src={`${process.env.REACT_APP_IMAGE_PRODUCT}/${productInfo.image}`} alt={`product-${index + 1}`} />
                                        </div>
                                    ))}
                                    <div className="product-preview">
                                        <img src="./img/product03.png" alt />
                                    </div>
                                    <div className="product-preview">
                                        <img src="./img/product03.png" alt />
                                    </div>
                                    <div className="product-preview">
                                        <img src="./img/product03.png" alt />
                                    </div> 
                                </div> */}
                            </div>
                            {/* /Product thumb imgs */}
                            {/* Product details */}
                            <div className="col-md-5">
                                <div className="product-details">
                                    <h2 className="product-name">{productInfo.product_description_assoc && productInfo.product_description_assoc[0].name}</h2>
                                    <div>
                                        <div className="product-rating">
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                        </div>
                                        {/* <a className="review-link" href="#">10 Review(s) | Add your review</a> */}
                                    </div>
                                    <div>
                                        <h3 className="product-price product-price-tax">
                                            ${parseFloat(productInfo.price) + parseFloat(productInfo.tax_price)} 
                                            {/* <del className="product-price">${parseFloat(productInfo.price)}</del> */}
                                        </h3>
                                        <span className="product-available">{productInfo.stock_status}</span>
                                    </div>
                                    <p className="text-justify" dangerouslySetInnerHTML={{__html: productInfo.product_description_assoc && productInfo.product_description_assoc[0].description.replace(/&lt;/g, "<").replace(/&gt;/g, ">").substring(0,350) }}>
                                    </p>
                                    {/* <div className="product-options">
                                        <label>
                                            Size
                                            <select className="input-select">
                                                <option value={0}>X</option>
                                            </select>
                                        </label>
                                        <label>
                                            Color
                                            <select className="input-select">
                                                <option value={0}>Red</option>
                                            </select>
                                        </label>
                                    </div> */}
                                    <div className="add-to-cart">
                                        <div className="qty-label">
                                            Quantity
                                            <div className="input-number mx-3">
                                                <input type="number" id="product-quantity"/>
                                                <span className="qty-up">+</span>
                                                <span className="qty-down">-</span>
                                            </div>
                                        </div>
                                        <button className="add-to-cart-btn" onClick={addProductToCart}><i className="fa fa-shopping-cart"/> add to cart</button>
                                    </div>
                                    <ul className="product-btns">
                                        <li><a href="#"><i className="fa fa-heart-o" /> add to wishlist</a></li>
                                        <li><a href="#"><i className="fa fa-exchange" /> add to compare</a></li>
                                    </ul>
                                    <ul className="product-links">
                                        <li>Category:</li>
                                        <li><a href="#">{productCategory.category_description_assoc && productCategory.category_description_assoc[0].name}</a></li>
                                        {/* <li><a href="#">Accessories</a></li> */}
                                    </ul>
                                    <ul className="product-links">
                                        <li>Share:</li>
                                        <li><a href="#"><i className="fa fa-facebook" /></a></li>
                                        <li><a href="#"><i className="fa fa-twitter" /></a></li>
                                        <li><a href="#"><i className="fa fa-google-plus" /></a></li>
                                        <li><a href="#"><i className="fa fa-envelope" /></a></li>
                                    </ul>
                                </div>
                            </div>
                            {/* /Product details */}
                            {/* Product tab */}
                            <div className="col-md-12">
                                <div id="product-tab">
                                    {/* product tab nav */}
                                    <ul className="tab-nav">
                                        <li className="active"><a data-toggle="tab" href="#tab1">Description</a></li>
                                        {/* <li><a data-toggle="tab" href="#tab2">Details</a></li>
                                        <li><a data-toggle="tab" href="#tab3">Reviews (3)</a></li> */}
                                    </ul>
                                    {/* /product tab nav */}
                                    {/* product tab content */}
                                    <div className="tab-content">
                                        {/* tab1  */}
                                        <div id="tab1" className="tab-pane active">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <p className="text-justify" dangerouslySetInnerHTML={{__html: productInfo.product_description_assoc && productInfo.product_description_assoc[0].description.replace(/&lt;/g, "<").replace(/&gt;/g, ">") }}>               
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /tab1  */}
                                        {/* tab2  */}
                                        {/* <div id="tab2" className="tab-pane fade in">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* /tab2  */}
                                        {/* tab3  */}
                                        {/* <div id="tab3" className="tab-pane fade in">
                                            <div className="row">
                                                
                                                <div className="col-md-3">
                                                    <div id="rating">
                                                        <div className="rating-avg">
                                                            <span>4.5</span>
                                                            <div className="rating-stars">
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star-o" />
                                                            </div>
                                                        </div>
                                                        <ul className="rating">
                                                            <li>
                                                                <div className="rating-stars">
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                </div>
                                                                <div className="rating-progress">
                                                                    <div style={{ width: '80%' }} />
                                                                </div>
                                                                <span className="sum">3</span>
                                                            </li>
                                                            <li>
                                                                <div className="rating-stars">
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star-o" />
                                                                </div>
                                                                <div className="rating-progress">
                                                                    <div style={{ width: '60%' }} />
                                                                </div>
                                                                <span className="sum">2</span>
                                                            </li>
                                                            <li>
                                                                <div className="rating-stars">
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star-o" />
                                                                    <i className="fa fa-star-o" />
                                                                </div>
                                                                <div className="rating-progress">
                                                                    <div />
                                                                </div>
                                                                <span className="sum">0</span>
                                                            </li>
                                                            <li>
                                                                <div className="rating-stars">
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star-o" />
                                                                    <i className="fa fa-star-o" />
                                                                    <i className="fa fa-star-o" />
                                                                </div>
                                                                <div className="rating-progress">
                                                                    <div />
                                                                </div>
                                                                <span className="sum">0</span>
                                                            </li>
                                                            <li>
                                                                <div className="rating-stars">
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star-o" />
                                                                    <i className="fa fa-star-o" />
                                                                    <i className="fa fa-star-o" />
                                                                    <i className="fa fa-star-o" />
                                                                </div>
                                                                <div className="rating-progress">
                                                                    <div />
                                                                </div>
                                                                <span className="sum">0</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-6">
                                                    <div id="reviews">
                                                        <ul className="reviews">
                                                            <li>
                                                                <div className="review-heading">
                                                                    <h5 className="name">John</h5>
                                                                    <p className="date">27 DEC 2018, 8:0 PM</p>
                                                                    <div className="review-rating">
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star-o empty" />
                                                                    </div>
                                                                </div>
                                                                <div className="review-body">
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="review-heading">
                                                                    <h5 className="name">John</h5>
                                                                    <p className="date">27 DEC 2018, 8:0 PM</p>
                                                                    <div className="review-rating">
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star-o empty" />
                                                                    </div>
                                                                </div>
                                                                <div className="review-body">
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="review-heading">
                                                                    <h5 className="name">John</h5>
                                                                    <p className="date">27 DEC 2018, 8:0 PM</p>
                                                                    <div className="review-rating">
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star-o empty" />
                                                                    </div>
                                                                </div>
                                                                <div className="review-body">
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <ul className="reviews-pagination">
                                                            <li className="active">1</li>
                                                            <li><a href="#">2</a></li>
                                                            <li><a href="#">3</a></li>
                                                            <li><a href="#">4</a></li>
                                                            <li><a href="#"><i className="fa fa-angle-right" /></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                {/* /Reviews */}
                                                {/* Review Form */}
                                                {/* <div className="col-md-3">
                                                    <div id="review-form">
                                                        <form className="review-form">
                                                            <input className="input" type="text" placeholder="Your Name" />
                                                            <input className="input" type="email" placeholder="Your Email" />
                                                            <textarea className="input" placeholder="Your Review" defaultValue={""} />
                                                            <div className="input-rating">
                                                                <span>Your Rating: </span>
                                                                <div className="stars">
                                                                    <input id="star5" name="rating" defaultValue={5} type="radio" /><label htmlFor="star5" />
                                                                    <input id="star4" name="rating" defaultValue={4} type="radio" /><label htmlFor="star4" />
                                                                    <input id="star3" name="rating" defaultValue={3} type="radio" /><label htmlFor="star3" />
                                                                    <input id="star2" name="rating" defaultValue={2} type="radio" /><label htmlFor="star2" />
                                                                    <input id="star1" name="rating" defaultValue={1} type="radio" /><label htmlFor="star1" />
                                                                </div>
                                                            </div>
                                                            <button className="primary-btn">Submit</button>
                                                        </form>
                                                    </div>
                                                </div>
                                                
                                            </div> 
                                        </div> */}
                                        {/* /tab3  */}
                                    </div>
                                    {/* /product tab content  */}
                                </div>
                            </div>
                            {/* /product tab */}
                        </div>
                        {/* /row */}
                    </div>
                    {/* /container */}
                </div>
                {/* /SECTION */}
                {/* Section */}
                <div className="section">
                    {/* container */}
                    <div className="container">
                        {/* row */}
                        <div className="row m-0 p-5">
                            <div className="col-md-12">
                                <div className="section-title text-center">
                                    <h3 className="title">Related Products</h3>
                                </div>
                            </div>
                            {/* product */}
                            {relatedProducts.map((ProductItem) => (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                    <ProductComponent product={ProductItem} key={ProductItem.product_id}/>
                                </div>
                            ))}
                            {/* /product */}
                        </div>
                        {/* /row */}
                    </div>
                    {/* /container */}
                </div>
                {/* /Section */}
            </div>
    
        )
    }
    else{
        return (
            <>
            </>
        )
    }
}
export default ForntProductPage;