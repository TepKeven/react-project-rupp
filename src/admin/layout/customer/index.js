import React, { useEffect, useState } from "react";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import globalVariable from "../../variable";

function CustomerPage(){

    const [perPage, setPerPage] = useState(20)
    const url = new URL(window.location)
    const params = new URLSearchParams(url.search);
    const [customerFilters,setCustomerFilters] = useState([])
    const [pagination, setPagination] = useState(null)
    const [startIndex,setStartIndex] = useState((params.get("start") == undefined || params.get("start") < 1) ? 1 : params.get("start"))
    const [endIndex, setEndIndex] = useState((params.get("end") == undefined || params.get("end") < params.get("start")) ? 20 : params.get("end"))
    const [customerLength, setCustomerLength] = useState(0)
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
      
      axios.get(`${process.env.REACT_APP_API_ROOT}/api/admin/customer?start=${startIndex}&end=${endIndex}`,globalVariable.axiosConfig)
      .then(function (response) {
        console.log(response.data)
        setCustomerFilters(response.data.customers)
        setCustomerLength(response.data.length)
      }).catch((error) => {
        // console.log(error)
        window.location.assign("/admin/login")
      })
        
        setPagination(Math.floor((startIndex / perPage) + 1))
        setStartIndex(startIndex)
        
    },[])


    function selectAllCheckbox(event){

      const customer_checkboxes = document.getElementsByClassName("customer-checkbox")
      if(event.target.checked){
        for(let customer_checkbox  of customer_checkboxes){
            customer_checkbox.checked = "checked"
        }
      }
      else{
        for(let customer_checkbox of customer_checkboxes){
            customer_checkbox.checked = ""
        }
      }
        
    }

    function deleteCustomers(){
      
      var deleteIDs = []
      const customer_checkboxes = document.getElementsByClassName("customer-checkbox")
      for(let customer_checkbox of customer_checkboxes){
        if(customer_checkbox.checked){
          deleteIDs.push(customer_checkbox.value)
        }
      }

      axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/customer/delete`,{
        "customer_ids" : deleteIDs
      }, 
        globalVariable.axiosConfigJson
      )
      .then(function (response) {
        console.log(response.data)
        window.location.assign("/admin/customer")
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
            <h3>Customers</h3>
            <div class="pull-right">
              <a href="/admin/customer/new" data-toggle="tooltip" title="New" className="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-plus"></i></a>
              <a href="#" data-toggle="tooltip" title="Delete" class="btn btn-danger" data-original-title="Delete" onClick={handleShow}><i class="fa fa-trash"></i></a>
            </div>
          </div>
          <div className="page-content">
            <section className="row">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" className="text-center align-middle"><input type="checkbox" className="customer-checkbox-all" onChange={selectAllCheckbox} /> </th>
                    <th scope="col" className="text-center align-middle">ID</th>
                    <th scope="col" className="text-center align-middle">Image</th>
                    <th scope="col" className="text-center align-middle">Customer Name</th>
                    <th scope="col" className="text-center align-middle">Email</th>
                    <th scope="col" className="text-center align-middle">IP</th>
                    <th scope="col" className="text-center align-middle">Status</th>
                    <th scope="col" className="text-center align-middle">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customerFilters.map((customer,index) => {
                      return (
                        <tr>
                          <td scope="col" className="text-center align-middle"><input type="checkbox" className="customer-checkbox"  value={customer.customer_id}/></td>
                          <td scope="row" className="text-center align-middle">{parseInt(startIndex) + index}</td> 
                          <td className="text-center align-middle"><img src={(customer.image == "" || customer.image == null) ? "/assets/images/no_image.png" : `${process.env.REACT_APP_IMAGE_CUSTOMER}/${customer.image}`} width="75"/></td>
                          <td className="text-center align-middle">{`${customer.first_name} ${customer.last_name}`}</td>
                          <td className="text-center align-middle">{customer.email}</td>
                          <td className="text-center align-middle">{customer.ip == "::1" ? "127.0.0.1" : customer.ip}</td>
                          <td className="text-center align-middle">{customer.status}</td>
                          <td className="text-center align-middle">
                            <a href={`/admin/customer/edit/${customer.customer_id}`} title="Edit" class="btn btn-primary"><i class="fa fa-pencil"></i></a>
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
                  {Array.apply(null, {length: Math.ceil(customerLength / perPage)}).map((item,index) => {

                      return (
                        <li class={"page-item " + (pagination - 1 == index ? "active" : "")}><a class="page-link" href={`customer?start=${perPage * index + 1}&end=${perPage * (index + 1)}`}>{index + 1}</a></li>
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
          <Modal.Body>Do you want to delete these Customers?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={deleteCustomers}>
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

export default CustomerPage;