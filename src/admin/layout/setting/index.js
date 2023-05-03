import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import "./index.css";
import axios from "axios"
import globalVariable from "../../variable";

function SettingPage() {

  const form_name = "form-setting-edit"
  
  const sectionTabs = [
    {tabID: 1, name: "General", tabReference: "#tab-general"},
    {tabID: 2, name: "Store", tabReference: "#tab-store"},
    {tabID: 3, name: "Option", tabReference: "#tab-option"},
  ]

  const [sectionTab,setSectionTab] = useState("#tab-general")
  const [storeImage, setStoreImage] = useState("/assets/images/no_image.png")
  const [storeLogo, setStoreLogo] = useState("/assets/images/no_image.png")
  const [storeIcon, setStoreIcon] = useState("/assets/images/no_image.png")
  const [settingInfo, setSettingInfo] = useState(null)
  const [orderStatuses, setOrderStatuses] = useState([])

  function setActiveSectionTab(section_tab){
      setSectionTab(section_tab)
  }

  const editSetting = () =>  {

    var form = document.getElementById(form_name)
    var formData = new FormData(form);

    axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/setting/edit`, formData, globalVariable.axiosConfig).then(response => {
      console.log(response.data)
    //   window.location.assign("/admin/setting")
      
    }).catch((error) => {
        console.log(error)
        // window.location.assign("/admin/login")
    })

  }

  const chooseImage = (event) => {
    setStoreImage(URL.createObjectURL(event.target.files[0]))
  }

  const chooseLogo = (event) => {
    setStoreLogo(URL.createObjectURL(event.target.files[0]))
  }

  const chooseIcon = (event) => {
    setStoreIcon(URL.createObjectURL(event.target.files[0]))
  }



  useEffect(() => {
      
      axios.get(`${process.env.REACT_APP_API_ROOT}/api/admin/setting`, globalVariable.axiosConfig)
      .then(function (response) {

        setStoreImage(response.data.image)
        setSettingInfo(response.data.setting)
        setOrderStatuses(response.data.order_statuses)
        setStoreImage(`${process.env.REACT_APP_STORE_IMAGE}/image/${response.data.setting.image}`)
        setStoreLogo(`${process.env.REACT_APP_STORE_IMAGE}/logo/${response.data.setting.store_logo}`)
        setStoreIcon(`${process.env.REACT_APP_STORE_IMAGE}/icon/${response.data.setting.store_icon}`)

      }).catch((error) => {
        // console.log(error)
        window.location.assign("/admin/login")
      })
      
      
  },[])
  
  return (
    <div id="app">
      <SidebarComponent />
      <div id="main">
        <NavbarComponent />
        <div className="page-heading d-flex align-items-center justify-content-between">
          <h3>Add Settings</h3>
          <div class="pull-right">
            <button onClick={editSetting} data-toggle="tooltip" title="" class="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-save"></i></button>
            <a href="/admin/order" data-toggle="tooltip" title="" class="btn btn-danger" data-original-title="Cancel"><i class="fa fa-reply"></i></a>
          </div>
        </div>
        <div className="page-content">
          <ul className="d-flex tabs-row px-0">
            {sectionTabs.map((tab) => (
              <li><a href="#" className={"section-tab " + (sectionTab == tab.tabReference ? "active-tab" : "")} onClick={() => setActiveSectionTab(tab.tabReference)}>{tab.name}</a></li>
            ))}
          </ul>
      
        {settingInfo && (
            <form action={`${process.env.REACT_APP_API_ROOT}/api/admin/product/new/`} id={form_name} method="POST" encType="multipart/form-data">
    
                <div id="tab-general" className={sectionTab == "#tab-general" ? "mt-5" : "d-none"}>
                    <div class="mb-4">
                        <label for="setting_meta_title" class="form-label">
                            Meta Title
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="setting_meta_title"
                            name="setting_meta_title"
                            defaultValue={settingInfo.meta_title}
                        />
                    </div>   
                    <div class="mb-4">
                        <label for="setting_meta_description" class="form-label">
                            Meta Tag Description
                        </label>
                        <textarea class="form-control w-lg-75 w-100" name="setting_meta_description" id="setting_meta_description" rows="8">
                            {settingInfo.meta_description}
                        </textarea>
                    </div>   
                    <div class="mb-4">
                        <label for="setting_meta_keyword" class="form-label">
                            Meta Tag Keywords
                        </label>
                        <textarea class="form-control w-lg-75 w-100" name="setting_meta_keyword" id="setting_meta_keyword" rows="5">
                            {settingInfo.meta_keyword}
                        </textarea>
                    </div>  
                </div>

                <div id="tab-store" className={sectionTab == "#tab-store" ? "mt-4" : "d-none"}>
                    
                    <div class="mb-4">
                        <label for="setting_store_name" class="form-label">
                            Store Name
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="setting_store_name"
                            name="setting_store_name"
                            defaultValue={settingInfo.store_name}
                        />
                    </div>   
                    <div class="mb-4">
                        <label for="setting_store_owner" class="form-label">
                            Store Owner
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="setting_store_owner"
                            name="setting_store_owner"
                            defaultValue={settingInfo.store_owner}
                        />
                    </div>  
                    <div class="mb-4">
                        <label for="setting_store_address" class="form-label">
                            Address
                        </label>
                        <textarea class="form-control w-lg-75 w-100" name="setting_store_address" id="setting_store_address" rows="5">
                            {settingInfo.store_address}
                        </textarea>
                    </div>   
                    <div class="mb-4">
                        <label for="setting_store_email" class="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="setting_store_email"
                            name="setting_store_email"
                            defaultValue={settingInfo.email}
                        />
                    </div> 
                    <div class="mb-4">
                        <label for="setting_store_telephone" class="form-label">
                            Telephone
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="setting_store_telephone"
                            name="setting_store_telephone"
                            defaultValue={settingInfo.telephone}
                        />
                    </div> 
                    <div class="mb-4">
                        <label for="setting_store_fax" class="form-label">
                            Fax
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="setting_store_fax"
                            name="setting_store_fax"
                            defaultValue={settingInfo.fax}
                        />
                    </div> 
                    <div class="mb-4">
                        <label for="setting_store_image" class="form-label">
                            Image
                        </label> <br/>
                        <label for="setting_store_image">
                            <img src={storeImage} width={150} height={150} className="image-input border border-1"/>
                        </label>
                        <input type="file" id="setting_store_image" name="setting_store_image" className="d-none" onChange={chooseImage}/>
                    </div>
                </div>

                <div id="tab-option" className={sectionTab == "#tab-option" ? "mt-4" : "d-none"}>
                    
                    <div class="mb-4">
                        <label for="setting_order_status" class="form-label">
                            Default Order Status
                        </label>
                        <select id="setting_order_status" name="setting_order_status" class="form-control">
                            {orderStatuses.map((orderStatus) => (
                                <option value={orderStatus.order_status_id} selected={orderStatus.order_status_id == settingInfo.order_status_id ? "selected" : ""}>{orderStatus.name}</option>
                            ))}
                        </select>
                    </div> 

                    <div class="mb-4">
                        <label for="setting_store_logo" class="form-label">
                            Store Logo
                        </label> <br/>
                        <label for="setting_store_logo">
                            <img src={storeLogo} width={150} height={150} className="image-input border border-1"/>
                        </label>
                        <input type="file" id="setting_store_logo" name="setting_store_logo" className="d-none" onChange={chooseLogo}/>
                    </div>

                    <div class="mb-4">
                        <label for="setting_store_icon" class="form-label">
                            Store Icon
                        </label> <br/>
                        <label for="setting_store_icon">
                            <img src={storeIcon} width={150} height={150} className="image-input border border-1"/>
                        </label>
                        <input type="file" id="setting_store_icon" name="setting_store_icon" className="d-none" onChange={chooseIcon}/>
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

export default SettingPage;


