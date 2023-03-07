import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductComponent from "../../component/product";
import SlideshowComponent from "../../component/slideshow";
import { toastNotificationError } from "../../functions";
import "./index.css"


function Homepage(){
    
	const [homeProducts, setHomeProducts] = useState([

		{product_id: 0, viewed: 0, price: "NOT FOR SALE", tax_price: 0, image: "1674622844590.png",  product_description_assoc: [{name: "Demo Product 1"}] },
		{product_id: 0, viewed: 0, price: "NOT FOR SALE", tax_price: 0, image: "1674625091843.png", product_description_assoc: [{name: "Demo Product 2"}] },
		{product_id: 0, viewed: 0, price: "NOT FOR SALE", tax_price: 0, image: "1674622844590.png", product_description_assoc: [{name: "Demo Product 3"}] },
		{product_id: 0, viewed: 0, price: "NOT FOR SALE", tax_price: 0, image: "1674625091843.png", product_description_assoc: [{name: "Demo Product 4"}] },
		{product_id: 0, viewed: 0, price: "NOT FOR SALE", tax_price: 0, image: "1674622844590.png", product_description_assoc: [{name: "Demo Product 5"}] },
	])

	const [recentProducts, setRecentProducts] = useState([])

	useEffect(() => {
		
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/home`)
        .then(function (response) {
            
            console.log(response.data)
			setRecentProducts(response.data.recent_products)            

        }).catch((error) => {
            // console.log(error)
            toastNotificationError(error.response.statusText == undefined ? "Errors. Please try again." : error.response.statusText)
        })

	},[])

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
									<img src="/assets/images/shop/shop01.png" alt="" />
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
									<img src="/assets/images/shop/shop03.png" alt="" />
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
									<img src="/assets/images/shop/shop02.png" alt="" />
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
								<h3 className="title">Featured Products</h3>
								{/* <div className="section-nav">
									<ul className="section-tab-nav tab-nav">
										<li className="active"><a data-toggle="tab" href="#tab1">Laptops</a></li>
										<li><a data-toggle="tab" href="#tab1">Smartphones</a></li>
										<li><a data-toggle="tab" href="#tab1">Cameras</a></li>
										<li><a data-toggle="tab" href="#tab1">Accessories</a></li>
									</ul>
								</div> */}
							</div>
						</div>
						<div className="col-md-12">
							<div className="row">
								<div className="products-tabs">
									<div id="tab1" className="tab-pane active">
										<div className="products-slick" data-nav="#slick-nav-1">
											{homeProducts.map((product) => {
												return (
													<ProductComponent product={product} key={product.viewed}/>
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

			<div className="section">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="section-title">
								<h3 className="title">Recent Products</h3>
							</div>
						</div>
						<div className="col-md-12">
							<div className="row">
								<div className="bestseller-products row m-0">
									{recentProducts.map((product) => {
										return (
											<div className="col-lg-3 col-12">
												<ProductComponent product={product} key={product.product_id}/>
											</div>
										)
									})}
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