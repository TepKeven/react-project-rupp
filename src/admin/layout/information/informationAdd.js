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

function InformationAddPage() {

  const form_name = "form-information-new"
  
  const sectionTabs = [
    {tabID: 1, name: "General", tabReference: "#tab-general"},
    {tabID: 2, name: "Data", tabReference: "#tab-data"}
  ]

  const setLangTab = useDispatch();
  const navigate = useNavigate();
  const getLangTab = useSelector((state) => state.getLangTab.lang);
  const [sectionTab,setSectionTab] = useState("#tab-general")
  
  function setActiveSectionTab(section_tab){
      setSectionTab(section_tab)
  }

  const addInformationPage = () =>  {

    var form = document.getElementById(form_name)
    var formData = new FormData(form);

    axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/information/new`, formData, globalVariable.axiosConfigJson).then(response => {
      console.log(response.data)
      window.location.assign("/admin/information");
    }).catch((error) => {
      // console.log(error)
      window.location.assign("/admin/login")
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
            <button onClick={addInformationPage} data-toggle="tooltip" title="" class="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-save"></i></button>
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
        <form action={`${process.env.REACT_APP_API_ROOT}/api/admin/category/new/`} id={form_name} method="POST" encType="multipart/form-data">
            <div id="tab-general" className={sectionTab == "#tab-general" ? "mt-5" : "d-none"}>
                
                {/* General Tab English and Khmer */}
                {globalVariable.system_language.map((languageTab,index) => (
                    <GeneralTabComponent langTabId={languageTab.id - 1} tabName="information"  /> 
                )
                )}
            </div>

            <div id="tab-data" className={sectionTab == "#tab-data" ? "mt-4" : "d-none"}>
    
                <div class="mb-4">
                    <label for="information_bottom" class="form-label">
                        Bottom
                    </label>
                    <select id="information_bottom" name="information_bottom" class="form-control">
                    <option value="1" selected="selected">Yes</option>
                    <option value="0">No</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="information_sort_order" class="form-label">
                        Sort Order
                    </label>
                    <input
                        type="number"
                        class="form-control"
                        id="information_sort_order"
                        name="information_sort_order"
                    />
                </div>
                <div class="mb-4">
                    <label for="information_status" class="form-label">
                        Status
                    </label>
                    <select id="information_status" name="information_status" class="form-control">
                    <option value="1" selected="selected">Enabled</option>
                    <option value="0">Disabled</option>
                    </select>
                </div>
            </div>
        </form>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
}

export default InformationAddPage;
