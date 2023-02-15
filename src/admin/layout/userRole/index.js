import React, { useEffect, useState } from "react";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import globalVariable from "../../variable";

function UserRolePage(){

    const [perPage, setPerPage] = useState(20)
    const url = new URL(window.location)
    const params = new URLSearchParams(url.search);
    const [userRoleFilters,setUserRoleFilters] = useState([])
    const [pagination, setPagination] = useState(null)
    const [startIndex,setStartIndex] = useState((params.get("start") == undefined || params.get("start") < 1) ? 1 : params.get("start"))
    const [endIndex, setEndIndex] = useState((params.get("end") == undefined || params.get("end") < params.get("start")) ? 20 : params.get("end"))
    const [userRoleLength, setUserRoleLength] = useState(0)
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
      
      axios.get(`${process.env.REACT_APP_API_ROOT}/api/admin/userrole?start=${startIndex}&end=${endIndex}`, globalVariable.axiosConfigJson)
      .then(function (response) {
        console.log(response.data)
        setUserRoleFilters(response.data.user_roles)
        setUserRoleLength(response.data.length)
      })
      .catch((error) => {
        // console.log(error)
        window.location.assign("/admin/login")
      })
        
        setPagination(Math.floor((startIndex / perPage) + 1))
        setStartIndex(startIndex)
        
    },[])


    function selectAllCheckbox(event){

      const user_role_checkboxes = document.getElementsByClassName("user-role-checkbox")
      if(event.target.checked){
        for(let user_role_checkbox  of user_role_checkboxes){
            user_role_checkbox.checked = "checked"
        }
      }
      else{
        for(let user_role_checkbox of user_role_checkboxes){
            user_role_checkbox.checked = ""
        }
      }
        
    }

    function deleteUserRoles(){
      
      var deleteIDs = []
      const user_role_checkboxes = document.getElementsByClassName("user-role-checkbox")
      for(let user_role_checkbox of user_role_checkboxes){
        if(user_role_checkbox.checked){
          deleteIDs.push(user_role_checkbox.value)
        }
      }

      axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/userrole/delete`,{
        "user_role_ids" : deleteIDs
      }, globalVariable.axiosConfig)
      .then(function (response) {
        console.log(response.data)
        window.location.assign("/admin/userrole")
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
            <h3>User Roles</h3>
            <div class="pull-right">
              <a href="/admin/userrole/new" data-toggle="tooltip" title="New" className="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-plus"></i></a>
              <a href="#" data-toggle="tooltip" title="Delete" class="btn btn-danger" data-original-title="Delete" onClick={handleShow}><i class="fa fa-trash"></i></a>
            </div>
          </div>
          <div className="page-content">
            <section className="row">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" className="text-center align-middle"><input type="checkbox" className="user-role-checkbox-all" onChange={selectAllCheckbox} /> </th>
                    <th scope="col" className="text-center align-middle">ID</th>
                    <th scope="col" className="text-center align-middle">Name</th>
                    <th scope="col" className="text-center align-middle">Status</th>
                    <th scope="col" className="text-center align-middle">Sort Order</th>
                    <th scope="col" className="text-center align-middle">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userRoleFilters.map((user,index) => {
                      return (
                        <tr>
                          <td scope="col" className="text-center align-middle"><input type="checkbox" className="user-role-checkbox"  value={user.user_role_id}/></td>
                          <td scope="row" className="text-center align-middle">{parseInt(startIndex) + index}</td> 
                          <td className="text-center align-middle">{user.name}</td>
                          <td className="text-center align-middle">{user.status}</td>
                          <td className="text-center align-middle">{user.sort_order}</td>
                          <td className="text-center align-middle">
                            <a href={`/admin/userrole/edit/${user.user_role_id}`} title="Edit" class="btn btn-primary"><i class="fa fa-pencil"></i></a>
                          </td>
                        </tr>
                      )
                    })
                  }
                  
                </tbody>
              </table>
              <nav aria-label="Page navigation">
                <ul class="pagination justify-content-end">
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  {Array.apply(null, {length: Math.ceil(userRoleLength / perPage)}).map((item,index) => {

                      return (
                        <li class={"page-item " + (pagination - 1 == index ? "active" : "")}><a class="page-link" href={`user?start=${perPage * index + 1}&end=${perPage * (index + 1)}`}>{index + 1}</a></li>
                      )
                  })}
              
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </section>
          </div>
          <FooterComponent />       
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you want to delete these User Roles?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={deleteUserRoles}>
              Yes
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
      </Modal>
    </div>
    )
}

export default UserRolePage;