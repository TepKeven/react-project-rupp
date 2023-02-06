import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import "./index.css";
import axios from "axios"
import { toggleAddressTabAction } from "../../../store/admin/action/addrTabAction";
import AddressEditComponent from "../../component/address/addressEdit";
import globalVariable from "../../variable";

function CustomerEditPage() {

  const form_name = "form-customer-new"
  
  const [addressItems,setAddressItems] = useState([])
  const [customerImage, setCustomerImage] = useState("/assets/images/no_image.png")
  const [customerGroups,setCustomerGroups] = useState([])
  const [customerInfo, setCustomerInfo] = useState({})
  var params = useParams();
  
  const sectionTabs = [
    {tabID: 1, name: "General", tabReference: "#tab-general"},
    {tabID: 2, name: "Address", tabReference: "#tab-address"},
  ]

  const setAddrTab = useDispatch();
  const getAddrTab = useSelector((state) => state.getAddrTab);
  const [sectionTab,setSectionTab] = useState("#tab-general")
  
  function setActiveSectionTab(section_tab){
      setSectionTab(section_tab)
  }

  const editCustomer = () =>  {

    var form = document.getElementById(form_name)
    var formData = new FormData(form);

    axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/customer/edit/${params.customer_id}`, formData, globalVariable.axiosConfig).then(response => {
      console.log(response.data)
      // window.location.assign("/admin/product");
    }).catch((error) => {
        // console.log(error)
        window.location.assign("/admin/login")
    })

  }

  useEffect(() => {
      
      axios.get(`${process.env.REACT_APP_API_ROOT}/api/admin/customer/edit/${params.customer_id}`,globalVariable.axiosConfig)
      .then(function (response) {
        setCustomerInfo(response.data.customer)
        setCustomerImage(`${process.env.REACT_APP_IMAGE_CUSTOMER}/${response.data.customer.image}`)
        setAddressItems(response.data.addresses)
        setCustomerGroups(response.data.customer_groups)
        loadURLToInputFiled(`${process.env.REACT_APP_IMAGE_CUSTOMER}/${response.data.customer.image}`)
        
      }).catch((error) => {
        // console.log(error)
        window.location.assign("/admin/login")
      })
      
      
  },[])

  const chooseImage = (event) => {
    setCustomerImage(URL.createObjectURL(event.target.files[0]))
  }

  function openNewAddress(){
    setAddressItems(addressItems + 1)
  }

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
        document.getElementById('customer_image').files = container.files;
        
    })
    }
  
  return (
    <div id="app">
      <SidebarComponent />
      <div id="main">
        <NavbarComponent />
        <div className="page-heading d-flex align-items-center justify-content-between">
          <h3>Add Customer</h3>
          <div class="pull-right">
            <button onClick={editCustomer} data-toggle="tooltip" title="" class="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-save"></i></button>
            <a href="/admin/customer" data-toggle="tooltip" title="" class="btn btn-danger" data-original-title="Cancel"><i class="fa fa-reply"></i></a>
          </div>
        </div>
        <div className="page-content">
          <ul className="d-flex tabs-row px-0">
            {sectionTabs.map((tab) => (
              <li><a href="#" className={"section-tab " + (sectionTab == tab.tabReference ? "active-tab" : "")} onClick={() => setActiveSectionTab(tab.tabReference)}>{tab.name}</a></li>
            ))}
          </ul>
      
        <form action={`${process.env.REACT_APP_API_ROOT}/api/admin/product/new/`} id={form_name} method="POST" encType="multipart/form-data">
            <div id="tab-general" className={sectionTab == "#tab-general" ? "mt-5" : "d-none"}>
                <div class="mb-4">
                    <label for="customer_customer_group_id" class="form-label">
                        Customer Group
                    </label>
                    <select id="customer_customer_group_id" name="customer_customer_group_id" class="form-control">
                        
                        {customerGroups.map((customer_group, index) => (
                            <option value={customer_group.customer_group_id} selected={customer_group.customer_group_id == customerInfo.customer_group_id ? "selected" : ""}>{customer_group.name}</option>
                        )
                        )}
                    </select>
                </div>
                <div class="mb-4">
                    <label for="customer_firstname" class="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="customer_firstname"
                        name="customer_firstname"
                        defaultValue={customerInfo.first_name}
                    />
                </div> 
                <div class="mb-4">
                    <label for="customer_lastname" class="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="customer_lastname"
                        name="customer_lastname"
                        defaultValue={customerInfo.last_name}
                    />
                </div> 
                <div class="mb-4">
                    <label for="customer_email" class="form-label">
                        Email
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="customer_email"
                        name="customer_email"
                        defaultValue={customerInfo.email}
                    />
                </div> 
                <div class="mb-4">
                    <label for="customer_telephone" class="form-label">
                        Telephone
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="customer_telephone"
                        name="customer_telephone"
                        defaultValue={customerInfo.telephone}
                    />
                </div> 
                <div class="mb-4">
                    <label for="customer_image" class="form-label">
                    Image
                    </label> <br/>
                    <label for="customer_image">
                    <img src={customerImage} width={150} height={150} className="image-input border border-1"/>
                    </label>
                    <input type="file" id="customer_image" name="customer_image" className="d-none" onChange={chooseImage}/>
                </div>
                <h4 className="my-5">Password</h4>
                <div class="mb-4">
                    <label for="customer_password" class="form-label">
                        Password
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="customer_password"
                        name="customer_password"
                    />
                </div> 
                <div class="mb-4">
                    <label for="customer_password_confirm" class="form-label">
                        Password Confirm
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="customer_password_confirm"
                        name="customer_password_confirm"
                    />
                </div> 
                <h4 className="my-5">Other</h4>
                <div class="mb-4">
                    <label for="customer_newsletter" class="form-label">
                        Newsletter
                    </label>
                    <select id="customer_newsletter" name="customer_newsletter" class="form-control">
                        <option value="1" selected={customerInfo.newsletter == 1 ? "selected" : ""}>Enabled</option>
                        <option value="0" selected={customerInfo.newsletter == 0 ? "selected" : ""}>Disabled</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="customer_status" class="form-label">
                        Status
                    </label>
                    <select id="customer_status" name="customer_status" class="form-control">
                        <option value="1" selected={customerInfo.status == 1 ? "selected" : ""}>Enabled</option>
                        <option value="0" selected={customerInfo.status == 0 ? "selected" : ""}>Disabled</option>
                    </select>
                </div>
            </div>

            <div id="tab-address" className={sectionTab == "#tab-address" ? "mt-4" : "d-none"}>
                
                <ul className={"d-flex tabs-row overflow-auto px-0 " + (sectionTab == "#tab-address" ? "" : "d-none") } >
                    {addressItems.map((address,index) => (
                        <li><a href="#" className={"section-tab " + (getAddrTab == `#customer_address_${index}` ? "active-tab" : "")} onClick={() => setAddrTab(toggleAddressTabAction(`#customer_address_${index}`))}>{`Address ${index + 1}`}</a></li>
                    ))}
                </ul>


                <div className="d-flex justify-content-end m-0">
                    <button type="button" className="btn btn-primary" onClick={openNewAddress}>Add new Address</button>
                </div>
                {addressItems.map((address, addressIndex) => (
                    <AddressEditComponent addressIndex={addressIndex} address={address} key={`address-${addressIndex}`}/>
                ))}
            </div>
        </form>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
}

export default CustomerEditPage;
