import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import "./index.css";
import axios from "axios"
import { toggleAddressTabAction } from "../../../store/admin/action/addrTabAction";
import AddressAddComponent from "../../component/address/addressAdd";
import globalVariable from "../../variable";

function UserEditPage() {

  const form_name = "form-user-edit"
  
  const [userImage, setUserImage] = useState("/assets/images/no_image.png")
  const [userRoles, setUserRoles] = useState([])
  const [userInfo, setUserInfo] = useState({})
  var params = useParams();

  const editUser = () =>  {

    var form = document.getElementById(form_name)
    var formData = new FormData(form);

    axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/user/edit/${params.user_id}`, formData, globalVariable.axiosConfig).then(response => {
      console.log(response.data)
      // window.location.assign("/admin/product");
    }).catch((error) => {
      // console.log(error)
      window.location.assign("/admin/login")
    })

  }

  useEffect(() => {
      
      axios.get(`${process.env.REACT_APP_API_ROOT}/api/admin/user/edit/${params.user_id}`, globalVariable.axiosConfig)
      .then(function (response) {
        setUserInfo(response.data.user)
        setUserImage(`${process.env.REACT_APP_IMAGE_USER}/${response.data.user.image}`)
        setUserRoles(response.data.user_roles)
        loadURLToInputFiled(`${process.env.REACT_APP_IMAGE_USER}/${response.data.user.image}`)
      })
      .catch((error) => {
        // console.log(error)
        window.location.assign("/admin/login")
      })
      
      
  },[])

  const chooseImage = (event) => {
    setUserImage(URL.createObjectURL(event.target.files[0]))
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
    document.getElementById('user_image').files = container.files;
    
  })
}

  
  return (
    <div id="app">
      <SidebarComponent />
      <div id="main">
        <NavbarComponent />
        <div className="page-heading d-flex align-items-center justify-content-between">
          <h3>Edit User</h3>
          <div class="pull-right">
            <button onClick={editUser} data-toggle="tooltip" title="" class="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-save"></i></button>
            <a href="/admin/user" data-toggle="tooltip" title="" class="btn btn-danger" data-original-title="Cancel"><i class="fa fa-reply"></i></a>
          </div>
        </div>
        <div className="page-content">
            <form action={`${process.env.REACT_APP_API_ROOT}/api/admin/user/edit/`} id={form_name} method="POST" encType="multipart/form-data">
                <div class="mb-4">
                    <label for="user_username" class="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="user_username"
                        name="user_username"
                        defaultValue={userInfo.username}
                        required
                    />
                </div> 
                <div class="mb-4">
                    <label for="user_user_role_id" class="form-label">
                        User Group
                    </label>
                    <select id="user_user_role_id" name="user_user_role_id" class="form-control">
                        
                        {userRoles.map((user_role, index) => (
                            <option value={user_role.user_role_id} selected={user_role.user_role_id == userInfo.user_role_id ? "selected" : ""}>{user_role.name}</option>
                        )
                        )}
                    </select>
                </div>
                <div class="mb-4">
                    <label for="user_firstname" class="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="user_firstname"
                        name="user_firstname"
                        required
                        defaultValue={userInfo.first_name}
                    />
                </div> 
                <div class="mb-4">
                    <label for="user_lastname" class="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="user_lastname"
                        name="user_lastname"
                        required
                        defaultValue={userInfo.last_name}
                    />
                </div> 
                <div class="mb-4">
                    <label for="user_email" class="form-label">
                        Email
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="user_email"
                        name="user_email"
                        required
                        defaultValue={userInfo.email}
                    />
                </div> 
                <div class="mb-4">
                    <label for="user_image" class="form-label">
                    Image
                    </label> <br/>
                    <label for="user_image">
                    <img src={userImage} width={150} height={150} className="image-input border border-1"/>
                    </label>
                    <input type="file" id="user_image" name="user_image" className="d-none" onChange={chooseImage}/>
                </div>
                <h4 className="my-5">Password</h4>
                <div class="mb-4">
                    <label for="user_password" class="form-label">
                        Password
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="user_password"
                        name="user_password"
                        required
                    />
                </div> 
                <div class="mb-4">
                    <label for="user_password_confirm" class="form-label">
                        Password Confirm
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="user_password_confirm"
                        name="user_password_confirm"
                        required
                    />
                </div> 
                <div class="mb-4">
                    <label for="user_status" class="form-label">
                        Status
                    </label>
                    <select id="user_status" name="user_status" class="form-control">
                        <option value="1" selected={userInfo.status == 1 ? "selected" : "" }>Enabled</option>
                        <option value="0" selected={userInfo.status == 0 ? "selected" : "" }>Disabled</option>
                    </select>
                </div>
            </form>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
}

export default UserEditPage;
