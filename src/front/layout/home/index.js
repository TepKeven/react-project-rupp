import React, { useState } from "react";
import ProductComponent from "../../component/product";
import SlideshowComponent from "../../component/slideshow";
import "./index.css"


function Homepage(){
    
	const [newProducts, setNewProducts] = useState([
		{id: 1, category: "Category01", name: "Product01", old_price: 990.00, new_price: 980.00 },
		{id: 2, category: "Category02", name: "Product02", old_price: 990.00, new_price: 980.00 },
		{id: 3, category: "Category03", name: "Product03", old_price: 990.00, new_price: 400.00 },
		{id: 4, category: "Category04", name: "Product04", old_price: 990.00, new_price: 980.00 },
		{id: 5, category: "Category05", name: "Product05", old_price: 990.00, new_price: 980.00 },
		
	])

    return (
    <>
		<SlideshowComponent/>
        {/* Shop List */}
        <div className="section">
			<div className="container">
				<div className="row">
					<div className="col-md-4 col-xs-6">
						<div className="shop">
							<div className="shop-img">
								<img src="./assets/images/shop/shop01.png" alt="" />
							</div>
							<div className="shop-body">
								<h3>Laptop<br />Collection</h3>
								<a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right"></i></a>
							</div>
						</div>
					</div>
					<div className="col-md-4 col-xs-6">
						<div className="shop">
							<div className="shop-img">
								<img src="./assets/images/shop/shop03.png" alt="" />
							</div>
							<div className="shop-body">
								<h3>Accessories<br />Collection</h3>
								<a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right"></i></a>
							</div>
						</div>
					</div>
					<div className="col-md-4 col-xs-6">
						<div className="shop">
							<div className="shop-img">
								<img src="./assets/images/shop/shop02.png" alt="" />
							</div>
							<div className="shop-body">
								<h3>Cameras<br />Collection</h3>
								<a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right"></i></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

        {/* Product List */}
        
        <div className="section">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="section-title">
							<h3 className="title">New Products</h3>
							<div className="section-nav">
								<ul className="section-tab-nav tab-nav">
									<li className="active"><a data-toggle="tab" href="#tab1">Laptops</a></li>
									<li><a data-toggle="tab" href="#tab1">Smartphones</a></li>
									<li><a data-toggle="tab" href="#tab1">Cameras</a></li>
									<li><a data-toggle="tab" href="#tab1">Accessories</a></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-md-12">
						<div className="row">
							<div className="products-tabs">
								<div id="tab1" className="tab-pane active">
									<div className="products-slick" data-nav="#slick-nav-1">
										{newProducts.map((newProduct) => {
											return (
												<ProductComponent product={newProduct} key={newProduct.id}/>
											)
										})}
									</div>
									<div id="slick-nav-1" className="products-slick-nav px-5"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    </>
    )
}

export default Homepage;