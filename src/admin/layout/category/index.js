import React, { useEffect, useState } from "react";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import globalVariable from "../../variable";

function CategoryPage(){

    const [perPage, setPerPage] = useState(20)
    const url = new URL(window.location)
    const params = new URLSearchParams(url.search);
    const [categoryFilters,setCategoryFilters] = useState([])
    const [pagination, setPagination] = useState(null)
    const [startIndex,setStartIndex] = useState((params.get("start") == undefined || params.get("start") < 1) ? 1 : params.get("start"))
    const [endIndex, setEndIndex] = useState((params.get("end") == undefined || params.get("end") < params.get("start")) ? 20 : params.get("end"))
    const [categoryLength, setCategoryLength] = useState(0)
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
      
      axios.get(`${process.env.REACT_APP_API_ROOT}/api/admin/category?start=${startIndex}&end=${endIndex}`,globalVariable.axiosConfig
      )
      .then(function (response) {
          // console.log(response.data)
          setCategoryFilters(response.data.categories)
          setCategoryLength(response.data.length)
      }).catch((error) => {
          // console.log(error)
          window.location.assign("/admin/login")
      })
        
        setPagination(Math.floor((startIndex / perPage) + 1))
        setStartIndex(startIndex)
        
    },[])


    function selectAllCheckbox(event){

      const category_checkboxes = document.getElementsByClassName("category-checkbox")
      if(event.target.checked){
        for(let category_checkbox of category_checkboxes){
          category_checkbox.checked = "checked"
        }
      }
      else{
        for(let category_checkbox of category_checkboxes){
          category_checkbox.checked = ""
        }
      }
        
    }

    function deleteCategories(){
      
      var deleteIDs = []
      const category_checkboxes = document.getElementsByClassName("category-checkbox")
      for(let category_checkbox of category_checkboxes){
        if(category_checkbox.checked){
          deleteIDs.push(category_checkbox.value)
        }
      }

      axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/category/delete`,{
        "ids" : deleteIDs
      },
        globalVariable.axiosConfigJson
      )
      .then(function (response) {
        console.log(response.data)
        window.location.assign("/admin/category")
      }).catch((error) => {
        console.log(error)
        window.location.assign("/admin/login")
      })
    }


    return (
      <div id="app">
        <SidebarComponent />
        <div id="main">
          <NavbarComponent />
          <div className="page-heading d-flex align-items-center justify-content-between">
            <h3>Category</h3>
            <div class="pull-right">
              <a href="/admin/category/new" data-toggle="tooltip" title="New" className="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-plus"></i></a>
              <a href="#" data-toggle="tooltip" title="Delete" class="btn btn-danger" data-original-title="Delete" onClick={handleShow}><i class="fa fa-trash"></i></a>
            </div>
          </div>
          <div className="page-content">
            <section className="row">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" className="text-center align-middle"><input type="checkbox" className="category-checkbox-all" onChange={selectAllCheckbox} /> </th>
                    <th scope="col" className="text-center align-middle">ID</th>
                    <th scope="col" className="text-center align-middle">Image</th>
                    <th scope="col" className="text-center align-middle">Category Name</th>
                    <th scope="col" className="text-center align-middle">Parent</th>
                    <th scope="col" className="text-center align-middle">Sort Order</th>
                    <th scope="col" className="text-center align-middle">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryFilters.map((category,index) => {
                      return (
                        <tr>
                          <td scope="col" className="text-center align-middle"><input type="checkbox" className="category-checkbox" name="category_ids[]" value={category.category_id}/></td>
                          <td scope="row" className="text-center align-middle">{parseInt(startIndex) + index}</td> 
                          <td className="text-center align-middle"><img src={(category.image == "" || category.image == null) ? "/assets/images/no_image.png" : `${process.env.REACT_APP_IMAGE_CATEGORY}/${category.image}`} width="75"/></td>
                          <td className="text-center align-middle">{category.category_description_assoc[0].name}</td>
                          <td className="text-center align-middle">{category.parent_id}</td>
                          <td className="text-center align-middle">{category.sort_order}</td>
                          <td className="text-center align-middle">
                          <a href={`/admin/category/edit/${category.category_id}`} title="Edit" class="btn btn-primary"><i class="fa fa-pencil"></i></a>
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
                  {Array.apply(null, {length: Math.ceil(categoryLength / perPage)}).map((item,index) => {

                      return (
                        <li class={"page-item " + (pagination - 1 == index ? "active" : "")}><a class="page-link" href={`category?start=${perPage * index + 1}&end=${perPage * (index + 1)}`}>{index + 1}</a></li>
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
          <Modal.Body>Do you want to delete these category items?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={deleteCategories}>
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

export default CategoryPage;