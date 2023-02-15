import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toggleEnglishTabAction, toggleKhmerTabAction } from "../../../store/admin/action/langTabAction";
import FooterComponent from "../../component/footer";
import GeneralTabComponent from "../../component/generalTab";
import CategoryInputDropdownComponent from "../../component/categoryInputDropdown";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import globalVariable from "../../variable";
import "./index.css";
import axios from "axios"
import ManufacturerInputDropdownComponent from "../../component/manufacturerInputDropdown";
import CategoryMultiInputDropdownComponent from "../../component/categoryMultiInputDropdown";

function ProductEditPage() {

  const form_name = "form-product-edit"

  const [categoryItems,setCategoryItems] = useState([])
  const [manufacturerItems,setManufacturerItems] = useState([])
  const [taxClasses,setTaxClasses] = useState([])
  const [stockStatuses, setStockStatuses] = useState([])

  const [productInfo,setProductInfo] = useState({})
  const [productImage, setProductImage] = useState(null)
  const [productToCategory, setProductToCategory] = useState([])
  
  const sectionTabs = [
    {tabID: 1, name: "General", tabReference: "#tab-general"},
    {tabID: 2, name: "Data", tabReference: "#tab-data"},
    {tabID: 3, name: "Links", tabReference: "#tab-links"}
  ]

  const setLangTab = useDispatch();
  const navigate = useNavigate();
  const getLangTab = useSelector((state) => state.getLangTab.lang);
  const [sectionTab,setSectionTab] = useState("#tab-general")
  var params = useParams();
  
  function setActiveSectionTab(section_tab){
      setSectionTab(section_tab)
  }

  const editProduct = () =>  {

      var form = document.getElementById(form_name)
      var formData = new FormData(form);

      axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/product/edit/${params.product_id}`
      ,formData
      ,globalVariable.axiosConfig

      ).then(response => {
        console.log(response.data)
        window.location.assign("/admin/product");
      }).catch((error) => {
        // console.log(error)
        window.location.assign("/admin/login")
      })

  }
  
  const chooseImage = (event) => {
    setProductImage(URL.createObjectURL(event.target.files[0]))
  }
  
  useEffect(() => {

    axios.get(`${process.env.REACT_APP_API_ROOT}/api/admin/product/edit/${params.product_id}`, globalVariable.axiosConfig)
      .then(function (response) {
        setProductInfo(response.data.product)
        setProductToCategory(response.data.product_to_category_id)
        setCategoryItems(response.data.categories)
        setManufacturerItems(response.data.manufacturers)
        setTaxClasses(response.data.taxClasses)
        setStockStatuses(response.data.stockStatuses)
        setProductImage((response.data.product.image == "" || response.data.product.image == null) ? "/assets/images/no_image.png" : `${process.env.REACT_APP_IMAGE_PRODUCT}/${response.data.product.image}`)
        
        loadURLToInputFiled(`${process.env.REACT_APP_IMAGE_PRODUCT}/${response.data.product.image}`)
        
      }).catch((error) => {
        // console.log(error)
        window.location.assign("/admin/login")
      })
  },[])

 
  // Get Image From URL then Render the URL to display it as a Value for input type file
    function getImgURL(url, callback){

      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        callback(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    }


  function loadURLToInputFiled(url){
    getImgURL(url, (imgBlob)=>{
      // Load img blob to input
      // WIP: UTF8 character error
      let fileName = `hello.png`
      let file = new File([imgBlob], fileName,{type:"image/png", lastModified:new Date().getTime()}, 'utf-8');
      let container = new DataTransfer(); 
      container.items.add(file);
      document.getElementById('product_image').files = container.files;
      
    })
  }

  return (
    <div id="app">
      <SidebarComponent />
      <div id="main">
        <NavbarComponent />
        <div className="page-heading d-flex align-items-center justify-content-between">
          <h3>Edit Product</h3>
          <div class="pull-right">
            <button onClick={editProduct} data-toggle="tooltip" title="" class="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-save"></i></button>
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
        {productInfo && productInfo.product_description_assoc && (
          <form action={`${process.env.REACT_APP_API_ROOT}/api/admin/product/new/`} id={form_name} method="POST" encType="multipart/form-data">
              <div id="tab-general" className={sectionTab == "#tab-general" ? "mt-5" : "d-none"}>
                  
                  {/* General Tab English and Khmer */}
                  {globalVariable.system_language.map((languageTab,index) => (
                      <GeneralTabComponent langTabId={languageTab.id - 1} tabName="product" generalInfo={productInfo.product_description_assoc[index]} /> 
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
                      defaultValue={productInfo.model}
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
                      defaultValue={productInfo.price}
                      />
                  </div>
                  <div class="mb-4">
                      <label for="product_tax_class_id" class="form-label">
                          Tax Class
                      </label>
                      <select id="product_tax_class_id" name="product_tax_class_id" class="form-control">
                          <option value="0" selected="selected">-- Please Select --</option>
                          {taxClasses.map((taxClass) => (
                            <option value={taxClass.tax_class_id} selected={taxClass.tax_class_id == productInfo.tax_class_id ? "selected" : ""}>{taxClass.name}</option>
                            
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
                          defaultValue={productInfo.quantity}
                      />
                  </div>
                  <div class="mb-4">
                      <label for="product_subtract" class="form-label">
                          Subtract Stock
                      </label>
                      <select id="product_subtract" name="product_subtract" class="form-control">
                          <option value="1" selected={productInfo.subtract == 1 ? "selected" : ""}>Yes</option>
                          <option value="0" selected={productInfo.subtract == 0 ? "selected" : ""}>No</option>
                      </select>
                  </div>
                  <div class="mb-4">
                      <label for="product_stock_status_id" class="form-label">
                          Stock Status 
                      </label>
                      <select id="product_stock_status_id" name="product_stock_status_id" class="form-control">
                          <option value="0" selected="selected">-- Please Select --</option>
                          {stockStatuses.map((stockStatus) => (
                            <option value={stockStatus.stock_status_id} selected={stockStatus.stock_status_id == productInfo.stock_status_id ? "selected" : ""}>{stockStatus.name}</option>
                            
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
                      defaultValue={productInfo.sort_order}
                      />
                  </div>
                  <div class="mb-4">
                      <label for="product_status" class="form-label">
                      Status
                      </label>
                      <select id="product_status" name="product_status" class="form-control">
                      <option value="1"  selected={productInfo.status == 1 ? "selected" : ""}>Enabled</option>
                      <option value="0"  selected={productInfo.status == 0 ? "selected" : ""}>Disabled</option>
                      </select>
                  </div>
              </div>

              <div id="tab-links" className={sectionTab == "#tab-links" ? "mt-4" : "d-none"}>
                  <div class="mb-4">
                      <label for="product_manufacturer_id" class="form-label">
                          Manufacturer
                      </label>
                      <ManufacturerInputDropdownComponent listItems={manufacturerItems} inputName="product_manufacturer_id" displayID={productInfo.manufacturer_id}/>
                  </div>
                  <div class="mb-4">
                      <label for="product_category_id" class="form-label">
                          Category
                      </label>
                      <CategoryMultiInputDropdownComponent listItems={categoryItems} inputName="product_category_id" selectedIds={productToCategory} />
                  </div>
              </div>
          </form>
        )}
        </div>
        <FooterComponent />
      </div>
    </div>
  );
}

export default ProductEditPage;
