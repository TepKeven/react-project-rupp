import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import "./index.css";
import axios from "axios"
import globalVariable from "../../variable";

function UserAddPage() {

  const form_name = "form-user-new"
  
  const [userImage, setUserImage] = useState("/assets/images/no_image.png")
  const [userRoles, setUserRoles] = useState([])
  

  const addUser = () =>  {

    var form = document.getElementById(form_name)
    var formData = new FormData(form);

    axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/user/new`, formData, globalVariable.axiosConfig).then(response => {
      console.log(response.data)
      window.location.assign("/admin/user");
    })
    .catch((error) => {
        // console.log(error)
        window.location.assign("/admin/login")
    })

  }

  useEffect(() => {
      
      axios.get(`${process.env.REACT_APP_API_ROOT}/api/admin/user/new`, globalVariable.axiosConfig)
      .then(function (response) {
        setUserRoles(response.data.user_roles)
      }).catch((error) => {
        // console.log(error)
        window.location.assign("/admin/login")
      })
      
      
  },[])

  const chooseImage = (event) => {
    setUserImage(URL.createObjectURL(event.target.files[0]))
  }

  
  return (
    <div id="app">
      <SidebarComponent />
      <div id="main">
        <NavbarComponent />
        <div className="page-heading d-flex align-items-center justify-content-between">
          <h3>Add User</h3>
          <div class="pull-right">
            <button onClick={addUser} data-toggle="tooltip" title="" class="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-save"></i></button>
            <a href="/admin/user" data-toggle="tooltip" title="" class="btn btn-danger" data-original-title="Cancel"><i class="fa fa-reply"></i></a>
          </div>
        </div>
        <div className="page-content">
            <form action={`${process.env.REACT_APP_API_ROOT}/api/admin/user/new/`} id={form_name} method="POST" encType="multipart/form-data">
                <div class="mb-4">
                    <label for="user_username" class="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="user_username"
                        name="user_username"
                        required
                    />
                </div> 
                <div class="mb-4">
                    <label for="user_user_role_id" class="form-label">
                        User Group
                    </label>
                    <select id="user_user_role_id" name="user_user_role_id" class="form-control">
                        
                        {userRoles.map((user_role, index) => (
                            <option value={user_role.user_role_id}>{user_role.name}</option>
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
                        <option value="1" selected="selected">Enabled</option>
                        <option value="0">Disabled</option>
                    </select>
                </div>
            </form>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
}

export default UserAddPage;
