import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductComponent from "../../component/product";
import globalVariable from "../../../admin/variable";
import { toastNotificationSuccess } from "../../functions";

function StorePage() {

    const [perPage, setPerPage] = useState(20)
    const url = new URL(window.location)
    const params = new URLSearchParams(url.search);
    const [startIndex,setStartIndex] = useState((params.get("start") == undefined || params.get("start") < 1) ? 1 : params.get("start"))
    const [endIndex, setEndIndex] = useState((params.get("end") == undefined || params.get("end") < params.get("start")) ? 20 : params.get("end"))
    const [pagination, setPagination] = useState(Math.floor((startIndex / perPage) + 1))


    const [categories, setCategories] = useState([])
    const [topSellings, setTopSellings] = useState([])
    const [manufacturers, setManufacturers] = useState([])
    const [productLength, setProductLength] = useState(0)
    const [ProductItems, setProductItems]= useState([
        // { id : 1 ,name: "MacBook" , old_price : 900.00 , new_price : 800.00 , img:"/assets/images/products/product01.png"},
        // { id : 2 ,name: "Headphone" , old_price: 400.00 , new_price : 300.00 , img: "/assets/images/products/product02.png"},
        // { id : 3 ,name: "MacBook" , old_price : 800.00 , new_price : 600.00 , img:"/assets/images/products/product01.png"}
    ])

    useEffect(() => {

        if(params.get("success")){
            toastNotificationSuccess(params.get("success"))
        }
      
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/store?start=${startIndex}&end=${endIndex}`, globalVariable.axiosConfig)
        .then(function (response) {
          console.log(response.data)
          setProductItems(response.data.products)
          setProductLength(response.data.length)
          setCategories(response.data.categories)
          setManufacturers(response.data.manufacturers)
          setTopSellings(response.data.top_sellings)
        })
        .catch((error) => {
          // console.log(error)
          window.location.reload()
        })
          
      },[])

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
                                <li><a href="#">All Categories</a></li>
                                <li><a href="#">Accessories</a></li>
                                {/* <li className="active">Headphones (227,490 Results)</li> */}
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
                        {/* ASIDE */}
                        <div id="aside" className="col-md-3">
                            {/* aside Widget */}
                            <div className="aside">
                                <h3 className="aside-title">Categories</h3>
                                <div className="checkbox-filter">
                                    {categories.map(category => (
                                        <div className="input-checkbox" onClick={() => window.location.assign(`category/${category.category_id}`)}>
                                            <input type="checkbox" id={`category-${category.category_id}`} />
                                            <label htmlFor={`category-${category.category_id}`}>
                                                <span />
                                                <img src={`${process.env.REACT_APP_IMAGE_CATEGORY}/${category.image}`} width={35}/>
                                                {category.category_description_assoc[0].name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* /aside Widget */}
                            {/* aside Widget */}
                            {/* <div className="aside">
                                <h3 className="aside-title">Price</h3>
                                <div className="price-filter">
                                    <div id="price-slider" />
                                    <div className="input-number price-min">
                                        <input id="price-min" type="number" />
                                        <span className="qty-up">+</span>
                                        <span className="qty-down">-</span>
                                    </div>
                                    <span>-</span>
                                    <div className="input-number price-max">
                                        <input id="price-max" type="number" />
                                        <span className="qty-up">+</span>
                                        <span className="qty-down">-</span>
                                    </div>
                                </div>
                            </div> */}
                            {/* /aside Widget */}
                            {/* aside Widget */}
                            <div className="aside">
                                <h3 className="aside-title">Brand</h3>
                                <div className="checkbox-filter">
                                    {manufacturers.map(manufacturer => (
                                        <div className="input-checkbox">
                                            <input type="checkbox" id={`manufacturer-${manufacturer.manufacturer_id}`} />
                                            <label htmlFor={`manufacturer-${manufacturer.manufacturer_id}`}>
                                                <span />
                                                {manufacturer.name}
                                                <small> ({manufacturer.sort_order})</small>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* /aside Widget */}
                            {/* aside Widget */}
                            <div className="aside">
                                <h3 className="aside-title">Top selling</h3>
                                {topSellings.map(topSelling => (
                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src={`${process.env.REACT_APP_IMAGE_PRODUCT}/${topSelling.image}`} alt />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Quantity: {topSelling.quantity}</p>
                                            <h3 className="product-name"><a href={`product/${topSelling.product_id}`}>{topSelling.product_description_assoc[0].name}</a></h3>
                                            <h4 className="product-price">${topSelling.price}</h4>
                                        </div>
                                    </div>
                                ))}
    
                            </div>
                            {/* /aside Widget */}
                        </div>
                        {/* /ASIDE */}
                        {/* STORE */}
                        <div id="store" className="col-md-9">
                            {/* store top filter */}
                            <div className="store-filter clearfix">
                                <div className="store-sort">
                                    <label>
                                        Sort By:
                                        <select className="input-select">
                                            <option value={0}>Popular</option>
                                            <option value={1}>Position</option>
                                        </select>
                                    </label>
                                    <label>
                                        Show:
                                        <select className="input-select">
                                            <option value={0}>20</option>
                                            <option value={1}>50</option>
                                        </select>
                                    </label>
                                </div>
                                <ul className="store-grid">
                                    <li className="active"><i className="fa fa-th" /></li>
                                    <li><a href="#"><i className="fa fa-th-list" /></a></li>
                                </ul>
                            </div>
                            {/* /store top filter */}
                            {/* store products */}
                            <div className="row">
                                {/* product */}
                                {ProductItems.map((ProductItem) => (
                                    <div className="col-md-4 col-xs-6">
                                        <ProductComponent product={ProductItem} key={ProductItem.product_id}/>
                                    </div>
                                ))}
                            </div>
                            {/* /product */}
                            {/* /store products */}
                            {/* store bottom filter */}
                            <div className="store-filter clearfix">
                                <span className="store-qty">Showing 20-100 products</span>
                                <ul className="store-pagination">

                                    <li><a href={`shop?start=${(pagination - 1 == -1 ? 0 : pagination - 1) * perPage + 1}&end=${(pagination - 1 == -1 ? 1 : pagination) * (perPage)}`}><i className="fa fa-angle-left" /></a></li>
                                    
                                    {Array.apply(null, {length: Math.ceil(productLength / perPage)}).map((item,index) => {

                                        if(pagination - 1 == index) {
                                            return (
                                                <li className="active">{index + 1}</li>
                                            )
                                        }
                                        else{
                                            return (
                                                <li><a href={`shop?start=${perPage * index + 1}&end=${perPage * (index + 1)}`}>{index + 1}</a></li>
                                            )
                                        }

                                    })}
                                    <li><a href={`shop?start=${pagination * perPage + 1}&end=${(pagination + 1) * (perPage)}`}><i className="fa fa-angle-right" /></a></li>
                                </ul>
                            </div>
                            {/* /store bottom filter */}
                        </div>
                        {/* /STORE */}
                    </div>
                    {/* /row */}
                </div>
                {/* /container */}
            </div>
            {/* /SECTION */}
        </div>   
    )
}
export default StorePage;