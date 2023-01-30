import React, { useEffect, useState } from "react";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function OrderPage(){

    const [perPage, setPerPage] = useState(20)
    const url = new URL(window.location)
    const params = new URLSearchParams(url.search);
    const [orderFilters,setOrderFilters] = useState([])
    const [pagination, setPagination] = useState(null)
    const [startIndex,setStartIndex] = useState((params.get("start") == undefined || params.get("start") < 1) ? 1 : params.get("start"))
    const [endIndex, setEndIndex] = useState((params.get("end") == undefined || params.get("end") < params.get("start")) ? 20 : params.get("end"))
    const [orderLength, setOrderLength] = useState(0)
    const [show, setShow] = useState(false);
    const [orderStatuses, setOrderStatuses] = useState([])
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
      
      axios.get(`${process.env.REACT_APP_API_ROOT}/api/admin/order?start=${startIndex}&end=${endIndex}`)
      .then(function (response) {
        setOrderFilters(response.data.orders)
        setOrderStatuses(response.data.order_statuses)
        setOrderLength(response.data.length)
      })
        
        setPagination(Math.floor((startIndex / perPage) + 1))
        setStartIndex(startIndex)
        
    },[])


    function selectAllCheckbox(event){

      const order_checkboxes = document.getElementsByClassName("order-checkbox")
      if(event.target.checked){
        for(let order_checkbox of order_checkboxes){
          order_checkbox.checked = "checked"
        }
      }
      else{
        for(let order_checkbox of order_checkboxes){
          order_checkbox.checked = ""
        }
      }
        
    }

    function deleteOrders(){
      
      var deleteIDs = []
      const order_checkboxes = document.getElementsByClassName("order-checkbox")
      for(let order_checkbox of order_checkboxes){
        if(order_checkbox.checked){
          deleteIDs.push(order_checkbox.value)
        }
      }

      axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/order/delete`,{
        "order_ids" : deleteIDs
      })
      .then(function (response) {
        console.log(response.data)
        // window.location.assign("/admin/order")
      })
    }


    return (
      <div id="app">
        <SidebarComponent />
        <div id="main">
          <NavbarComponent />
          <div className="page-heading d-flex align-items-center justify-content-between">
            <h3>Orders</h3>
            <div class="pull-right">
              <a href="/admin/order/new" data-toggle="tooltip" title="New" className="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-plus"></i></a>
              <a href="#" data-toggle="tooltip" title="Delete" class="btn btn-danger" data-original-title="Delete" onClick={handleShow}><i class="fa fa-trash"></i></a>
            </div>
          </div>
          <div className="page-content">
            <section className="row">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" className="text-center align-middle"><input type="checkbox" className="order-checkbox-all" onChange={selectAllCheckbox} /> </th>
                    <th scope="col" className="text-center align-middle">Order ID</th>
                    <th scope="col" className="text-center align-middle">Customer</th>
                    <th scope="col" className="text-center align-middle">Status</th>
                    <th scope="col" className="text-center align-middle">Total</th>
                    <th scope="col" className="text-center align-middle">Date Added</th>
                    <th scope="col" className="text-center align-middle">Date Modified</th>
                    <th scope="col" className="text-center align-middle">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderFilters.map((order,index) => {
                      return (
                        <tr>
                          <td scope="col" className="text-center align-middle"><input type="checkbox" className="order-checkbox"  value={order.order_id}/></td>
                          <td scope="row" className="text-center align-middle">{parseInt(startIndex) + index}</td> 
                          <td className="text-center align-middle">{`${order.first_name} ${order.last_name}`}</td>
                          <td className="text-center align-middle">{orderStatuses.find(orderStatus => orderStatus.order_status_id == order.order_status_id).name || order.order_status_id}</td>
                          <td className="text-center align-middle">{`$ ${order.total}`}</td>
                          <td className="text-center align-middle">{new Date(order.createdAt).toLocaleDateString}</td>
                          <td className="text-center align-middle">{new Date(order.updatedAt).toLocaleDateString()}</td>
                          <td className="text-center align-middle">
                            <a href={`/admin/order/edit/${order.order_id}`} title="Edit" class="btn btn-primary me-2"><i class="fa fa-pencil"></i></a>
                            <a href={`/admin/order/view/${order.order_id}`} title="View" class="btn btn-primary ms-2"><i class="fa fa-eye"></i></a>
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
                  {Array.apply(null, {length: Math.ceil(orderLength / perPage)}).map((item,index) => {

                      return (
                        <li class={"page-item " + (pagination - 1 == index ? "active" : "")}><a class="page-link" href={`order?start=${perPage * index + 1}&end=${perPage * (index + 1)}`}>{index + 1}</a></li>
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
          <Modal.Body>Do you want to delete these order items?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={deleteOrders}>
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

export default OrderPage;