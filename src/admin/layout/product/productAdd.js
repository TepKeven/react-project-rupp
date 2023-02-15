import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toggleEnglishTabAction, toggleKhmerTabAction } from "../../../store/admin/action/langTabAction";
import FooterComponent from "../../component/footer";
import GeneralTabComponent from "../../component/generalTab";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import globalVariable from "../../variable";
import "./index.css";
import axios from "axios"
import CategoryMultiInputDropdownComponent from "../../component/categoryMultiInputDropdown";
import ManufacturerInputDropdownComponent from "../../component/manufacturerInputDropdown";

function ProductAddPage() {

  const form_name = "form-product-new"
  
  const [categoryItems,setCategoryItems] = useState([])
  const [manufacturerItems,setManufacturerItems] = useState([])
  const [stockStatuses, setStockStatuses] = useState([])
  const [taxClasses, setTaxClasses] = useState([])
  const [productImage, setProductImage] = useState("/assets/images/no_image.png")
  
  const sectionTabs = [
    {tabID: 1, name: "General", tabReference: "#tab-general"},
    {tabID: 2, name: "Data", tabReference: "#tab-data"},
    {tabID: 3, name: "Links", tabReference: "#tab-links"}
  ]

  const setLangTab = useDispatch();
  const navigate = useNavigate();
  const getLangTab = useSelector((state) => state.getLangTab.lang);
  const [sectionTab,setSectionTab] = useState("#tab-general")
  
  function setActiveSectionTab(section_tab){
      setSectionTab(section_tab)
  }

  const addProduct = () =>  {

    var form = document.getElementById(form_name)
    var formData = new FormData(form);

    axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/product/new`, formData, globalVariable.axiosConfig).then(response => {
      console.log(response.data)
      // window.location.assign("/admin/product");
    }).catch((error) => {
      // console.log(error)
      window.location.assign("/admin/login")
    })

  }

  useEffect(() => {
      
      axios.get(`${process.env.REACT_APP_API_ROOT}/api/admin/product/new`, globalVariable.axiosConfig)
      .then(function (response) {
        setCategoryItems(response.data.categories)
        setManufacturerItems(response.data.manufacturers)
        setStockStatuses(response.data.stock_statuses)
        setTaxClasses(response.data.tax_classes)
        window.location.assign("/admin/product");
      }).catch((error) => {
        // console.log(error)
        window.location.assign("/admin/login")
      })
      
      
  },[])

  const chooseImage = (event) => {
    setProductImage(URL.createObjectURL(event.target.files[0]))
  }
  
  return (
    <div id="app">
      <SidebarComponent />
      <div id="main">
        <NavbarComponent />
        <div className="page-heading d-flex align-items-center justify-content-between">
          <h3>Add Product</h3>
          <div class="pull-right">
            <button onClick={addProduct} data-toggle="tooltip" title="" class="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-save"></i></button>
            <a href="/admin/product" data-toggle="tooltip" title="" class="btn btn-danger" data-original-title="Cancel"><i class="fa fa-reply"></i></a>
          </div>
        </div>
        <div className="page-content">
          <ul className="d-flex tabs-row px-0">
            {sectionTabs.map((tab) => (
              <li><a href="#" className={"section-tab " + (sectionTab == tab.tabReference ? "active-tab" : "")} onClick={() => setActiveSectionTab(tab.tabReference)}>{tab.name}</a></li>
            ))}
          </ul>
      
          <ul className={"d-flex tabs-row px-0 " + (sectionTab == "#tab-general" ? "" : "d-none") } >
            <li><a href="#" className={"language-tab " + (getLangTab == "en" ? "active-tab" : "")} onClick={() => setLangTab(toggleEnglishTabAction())}>English</a></li>
            <li><a href="#" className={"language-tab " + (getLangTab == "km" ? "active-tab" : "")} onClick={() => setLangTab(toggleKhmerTabAction())}>Khmer</a></li>
          </ul>
        <form action={`${process.env.REACT_APP_API_ROOT}/api/admin/product/new/`} id={form_name} method="POST" encType="multipart/form-data">
            <div id="tab-general" className={sectionTab == "#tab-general" ? "mt-5" : "d-none"}>
                
                {/* General Tab English and Khmer */}
                {globalVariable.system_language.map((languageTab,index) => (
                    <GeneralTabComponent langTabId={languageTab.id - 1} tabName="product"  /> 
                )
                )}
            </div>

            <div id="tab-data" className={sectionTab == "#tab-data" ? "mt-4" : "d-none"}>
                <div class="mb-4">
                    <label for="product_model" class="form-label">
                        Model
                    </label>
                    <input
                    type="text"
                    class="form-control"
                    id="product_model"
                    name="product_model"
                    />
                </div>
                <div class="mb-4">
                    <label for="product_price" class="form-label">
                        Price ($)
                    </label>
                    <input
                    type="number"
                    class="form-control"
                    id="product_price"
                    name="product_price"
                    />
                </div>
                <div class="mb-4">
                    <label for="product_tax_class_id" class="form-label">
                        Tax Class
                    </label>
                    <select id="product_tax_class_id" name="product_tax_class_id" class="form-control">
                        <option value="0" selected="selected">-- Please Select --</option>
                        {taxClasses.map((taxClass) => (
                          <option value={taxClass.tax_class_id}>{taxClass.name}</option>
                          
                        ))}
                    </select>
                </div>
                <div class="mb-4">
                    <label for="product_quantity" class="form-label">
                        Quantity
                    </label>
                    <input
                        type="number"
                        class="form-control"
                        id="product_quantity"
                        name="product_quantity"
                    />
                </div>
                <div class="mb-4">
                    <label for="product_subtract" class="form-label">
                        Subtract Stock
                    </label>
                    <select id="product_subtract" name="product_subtract" class="form-control">
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="product_stock_status_id" class="form-label">
                        Stock Status 
                    </label>
                    <select id="product_stock_status_id" name="product_stock_status_id" class="form-control">
                        <option value="0" selected="selected">-- Please Select --</option>
                        {stockStatuses.map((stockStatus) => (
                          <option value={stockStatus.stock_status_id}>{stockStatus.name}</option>
                          
                        ))}
                    </select>
                </div>
                <div class="mb-4">
                    <label for="product_image" class="form-label">
                    Image
                    </label> <br/>
                    <label for="product_image">
                    <img src={productImage} width={150} height={150} className="image-input border border-1"/>
                    </label>
                    <input type="file" id="product_image" name="product_image" className="d-none" onChange={chooseImage}/>
                </div>
                <div class="mb-4">
                    <label for="product_sort_order" class="form-label">
                    Sort Order
                    </label>
                    <input
                    type="number"
                    class="form-control"
                    id="product_sort_order"
                    name="product_sort_order"
                    />
                </div>
                <div class="mb-4">
                    <label for="product_status" class="form-label">
                    Status
                    </label>
                    <select id="product_status" name="product_status" class="form-control">
                    <option value="1" selected="selected">Enabled</option>
                    <option value="0">Disabled</option>
                    </select>
                </div>
            </div>

            <div id="tab-links" className={sectionTab == "#tab-links" ? "mt-4" : "d-none"}>
                <div class="mb-4">
                    <label for="product_manufacturer_id" class="form-label">
                        Manufacturer
                    </label>
                    <ManufacturerInputDropdownComponent listItems={manufacturerItems} inputName="product_manufacturer_id" />
                </div>
                <div class="mb-4">
                    <label for="product_category_id" class="form-label">
                        Category
                    </label>
                    <CategoryMultiInputDropdownComponent listItems={categoryItems} inputName="product_category_id" />
                </div>
            </div>
        </form>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
}

export default ProductAddPage;
