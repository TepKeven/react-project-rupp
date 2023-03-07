import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductComponent from "../../component/product";
import globalVariable from "../../../admin/variable";
import { toastNotificationError, toastNotificationSuccess } from "../../functions";
import { useParams } from "react-router-dom";

function FrontCategoryPage() {

    const [perPage, setPerPage] = useState(20)
    const url = new URL(window.location)
    const params = new URLSearchParams(url.search);
    const urlParams = useParams();
    const [startIndex,setStartIndex] = useState((params.get("start") == undefined || params.get("start") < 1) ? 1 : params.get("start"))
    const [endIndex, setEndIndex] = useState((params.get("end") == undefined || params.get("end") < params.get("start")) ? 20 : params.get("end"))
    const [pagination, setPagination] = useState(Math.floor((startIndex / perPage) + 1))
    
    const [productLength, setProductLength] = useState(0)
    const [ProductItems, setProductItems]= useState([
    
    ])
    const [categoryInfo, setCategoryInfo] = useState(null)

    useEffect(() => {
      
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/category/${urlParams.category_id}?start=${startIndex}&end=${endIndex}`, globalVariable.axiosConfigJson)
        .then(function (response) {
          console.log(response.data)
          setProductItems(response.data.products)
          setProductLength(response.data.length)
          setCategoryInfo(response.data.category)
        })
        .catch((error) => {
          // console.log(error)
          toastNotificationError("Error!! Please try again")
        })
          
    },[perPage])

    const updatePaginationSize = event => {
        setEndIndex(event.target.value)
        setPerPage(event.target.value)
    }

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
                                <li><a href="#">{categoryInfo == null ? "" : categoryInfo.category_description_assoc[0].name}</a></li>
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
                        <div id="store" className="col-12">
                            {/* store top filter */}
                            <div className="store-filter clearfix">
                                <div className="store-sort">
                                    <label>
                                        Sort By: &nbsp;
                                        <select className="input-select">
                                            <option value={0}>Popular</option>
                                            <option value={1}>Position</option>
                                        </select>
                                    </label>
                                    <label>
                                        Show: &nbsp;
                                        <select className="input-select" onChange={updatePaginationSize}>
                                            <option value={productLength}>All Products</option>
                                            <option value={4}>4</option>
                                            <option value={12}>12</option>
                                            <option value={14}>24</option>
                                            <option value={36}>36</option>
                                            <option value={48}>48</option>
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
                                    <div className="col-md-3 col-xs-6">
                                        <ProductComponent product={ProductItem} key={ProductItem.product_id}/>
                                    </div>
                                ))}
                            </div>
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
export default FrontCategoryPage;