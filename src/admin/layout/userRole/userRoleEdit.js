import React, { useEffect, useState } from "react";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import { useParams } from "react-router-dom";
import "./index.css";
import axios from "axios"
import globalVariable from "../../variable";

function UserRoleEditPage() {

  const form_name = "form-user-role-edit"
  
  const [DashboardItems, setDashboardItems] = useState([])
  const [userRoleInfo, setUserRoleInfo] = useState({})
  const [userRolePermissions, setUserRolePermissions] = useState([])
  var params = useParams();
  

  const addUserRole = () =>  {

    var form = document.getElementById(form_name)
    var formData = new FormData(form);
    var permissionIDs = []

    const user_permission_checkboxes = document.getElementsByClassName("user-permission-checkbox")
    for(let user_permission_checkbox of user_permission_checkboxes){
      if(user_permission_checkbox.checked){
        permissionIDs.push(parseInt(user_permission_checkbox.value))
      }
    }

    formData.set("user_role_permissions",JSON.stringify(permissionIDs));

    axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/userrole/edit/${params.user_role_id}`, formData, globalVariable.axiosConfig).then(response => {
      console.log(response.data)
      window.location.assign("/admin/userrole");
    }).catch((error) => {
      // console.log(error)
      window.location.assign("/admin/login")
    })

  }

  useEffect(() => {
      
      axios.get(`${process.env.REACT_APP_API_ROOT}/api/admin/userrole/edit/${params.user_role_id}`, globalVariable.axiosConfig)
      .then(function (response) {
        setDashboardItems(response.data.dashboard_items)
        setUserRoleInfo(response.data.user_role)
        setUserRolePermissions(JSON.parse(response.data.user_role.permission))

      })
      .catch((error) => {
        // console.log(error)
        window.location.assign("/admin/login")
      })
      
  },[])

  function selectAllPermission(event){
    
    const user_permission_checkboxes = document.getElementsByClassName("user-permission-checkbox")
      if(event.target.checked){
        for(let user_permission_checkbox of user_permission_checkboxes){
          user_permission_checkbox.checked = "checked"
        }
      }
      else{
        for(let user_permission_checkbox of user_permission_checkboxes){
          user_permission_checkbox.checked = ""
        }
      }
  }


  return (
    <div id="app">
      <SidebarComponent />
      <div id="main">
        <NavbarComponent />
        <div className="page-heading d-flex align-items-center justify-content-between">
          <h3>Add User Role</h3>
          <div class="pull-right">
            <button onClick={addUserRole} data-toggle="tooltip" title="" class="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-save"></i></button>
            <a href="/admin/user" data-toggle="tooltip" title="" class="btn btn-danger" data-original-title="Cancel"><i class="fa fa-reply"></i></a>
          </div>
        </div>
        <div className="page-content">
            <form action={`${process.env.REACT_APP_API_ROOT}/api/admin/userrole/new/`} id={form_name} method="POST" encType="multipart/form-data">
                <div class="mb-4">
                    <label for="user_role_name" class="form-label">
                        User Role Name
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="user_role_name"
                        name="user_role_name"
                        defaultValue={userRoleInfo.name}
                        required
                    />
                </div> 
                <div class="mb-4">
                    <label for="user_role_permission" class="form-label">
                        Permission
                    </label>
                    <div class="well well-sm" style={{height: 150, overflow: 'auto'}}>
                        <div class="checkbox mt-1">
                            <input id={`user_role_permission`} type="checkbox" onClick={selectAllPermission}/>
                            <label className="ms-2" for={`user_role_permission`}>Check All</label>
                        </div>

                        {DashboardItems.map(DashboardItem => (
                            <div class="checkbox mt-1">
                                <input className="user-permission-checkbox" id={`user_role_permission_${DashboardItem.dashboard_item_id}`} type="checkbox" value={DashboardItem.dashboard_item_id} defaultChecked={userRolePermissions.indexOf(DashboardItem.dashboard_item_id) != -1 ? "checked" : ""}/>
                                <label className="ms-2" for={`user_role_permission_${DashboardItem.dashboard_item_id}`}>{DashboardItem.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div class="mb-4">
                    <label for="user_role_sort_order" class="form-label">
                        Sort Order
                    </label>
                    <input
                        type="number"
                        class="form-control"
                        id="user_role_sort_order"
                        name="user_role_sort_order"
                        defaultValue={userRoleInfo.sort_order}
                        required
                    />
                </div> 
                <div class="mb-4">
                  <label for="user_role_status" class="form-label">
                      Status
                  </label>
                  <select id="user_role_status" name="user_role_status" class="form-control">
                      <option value="1" selected={userRoleInfo.status == 1 ? "selected" : ""}>Enabled</option>
                      <option value="0" selected={userRoleInfo.status == 0 ? "selected" : ""}>Disabled</option>
                  </select>
                </div> 
            </form>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
}

export default UserRoleEditPage;
