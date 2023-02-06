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

function CategoryEditPage() {

  const form_name = "form-category-edit"

  const [categoryItems,setCategoryItems] = useState([])

  const [categoryInfo,setCategoryInfo] = useState({})
  const [categoryImage, setCategoryImage] = useState(null)
  
  const sectionTabs = [
    {tabID: 1, name: "General", tabReference: "#tab-general"},
    {tabID: 2, name: "Data", tabReference: "#tab-data"}
  ]

  const setLangTab = useDispatch();
  const navigate = useNavigate();
  const getLangTab = useSelector((state) => state.getLangTab.lang);
  const [sectionTab,setSectionTab] = useState("#tab-general")
  var params = useParams();
  
  function setActiveSectionTab(section_tab){
      setSectionTab(section_tab)
  }

  const editCategory = () =>  {

      var form = document.getElementById(form_name)
      var formData = new FormData(form);

      axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/category/edit/${params.category_id}`
      ,formData, globalVariable.axiosConfig
      ).then(response => {
        console.log(response.data)
        window.location.assign("/admin/category");
      }).catch((error) => {
        // console.log(error)
        window.location.assign("/admin/login")
      })

  }
  
  const chooseImage = (event) => {
    setCategoryImage(URL.createObjectURL(event.target.files[0]))
  }
  
  useEffect(() => {

    axios.get(`${process.env.REACT_APP_API_ROOT}/api/admin/category/edit/${params.category_id}`, globalVariable.axiosConfig)
      .then(function (response) {
        setCategoryInfo(response.data.category)
        setCategoryItems(response.data.categoryList)
        setCategoryImage((response.data.category.image == "" || response.data.category.image == null) ? "/assets/images/no_image.png" : `${process.env.REACT_APP_IMAGE_CATEGORY}/${response.data.category.image}`)
        loadURLToInputFiled(`${process.env.REACT_APP_IMAGE_CATEGORY}/${response.data.category.image}`)
        
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
      document.getElementById('category_image').files = container.files;
      
    })
  }

  return (
    <div id="app">
      <SidebarComponent />
      <div id="main">
        <NavbarComponent />
        <div className="page-heading d-flex align-items-center justify-content-between">
          <h3>Edit Category</h3>
          <div class="pull-right">
            <button type="submit" onClick={editCategory}  data-toggle="tooltip" title="" class="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-save"></i></button>
            <a href="/admin/category" data-toggle="tooltip" title="" class="btn btn-danger" data-original-title="Cancel"><i class="fa fa-reply"></i></a>
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

          {categoryInfo && categoryInfo.category_description_assoc && (
            <form action={process.env.REACT_APP_API_ROOT +  "/api/admin/category/edit/" + params.category_id} id={form_name} method="POST" encType="multipart/form-data">
              <div id="tab-general" className={sectionTab == "#tab-general" ? "mt-5" : "d-none"}>
                  
                  {/* General Tab English and Khmer */}
                  {globalVariable.system_language.map((languageTab,index) => (
                      <GeneralTabComponent langTabId={languageTab.id - 1} generalInfo={categoryInfo.category_description_assoc[index] } tabName="category"  /> 
                    )
                  )}
              </div>

              <div id="tab-data" className={sectionTab == "#tab-data" ? "mt-4" : "d-none"}>
                <div class="mb-4">
                  <label for="category_parent_id" class="form-label">
                    Parent
                  </label>
                  <CategoryInputDropdownComponent listItems={categoryItems} inputName="category_parent_id" displayID={categoryInfo.parent_id} />
                </div>
                <div class="mb-4">
                  <label for="category_image" class="form-label">
                    Image
                  </label> <br/>
                  <label for="category_image">
                    <img src={categoryImage} width={150} height={150} className="image-input border border-1"/>
                  </label>
                  <input type="file" id="category_image" name="category_image" className="d-none" onChange={chooseImage}/>
                </div>
                <div class="mb-4">
                  <label for="category_top" class="form-label">
                    Top
                  </label>
                  <select id="category_top" name="category_top" class="form-control">
                    <option value="1" selected={categoryInfo.top == 1 ? "selected" : ""}>Yes</option>
                    <option value="0" selected={categoryInfo.top == 0 ? "selected" : ""}>No</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label for="category_sort_order" class="form-label">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="category_sort_order"
                    name="category_sort_order"
                    defaultValue={categoryInfo.sort_order}
                  />
                </div>
                <div class="mb-4">
                  <label for="category_status" class="form-label">
                    Status
                  </label>
                  <select id="category_status" name="category_status" class="form-control">
                    <option value="1" selected={categoryInfo.status == 1 ? "selected" : ""}>Enabled</option>
                    <option value="0" selected={categoryInfo.status == 0 ? "selected" : ""}>Disabled</option>
                  </select>
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

export default CategoryEditPage;
