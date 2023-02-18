import React, { useEffect, useState } from "react";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import globalVariable from "../../variable";

function SlideshowPage(){

    const [perPage, setPerPage] = useState(20)
    const url = new URL(window.location)
    const params = new URLSearchParams(url.search);
    const [slideshowFilters,setSlideshowFilters] = useState([])
    const [pagination, setPagination] = useState(null)
    const [startIndex,setStartIndex] = useState((params.get("start") == undefined || params.get("start") < 1) ? 1 : params.get("start"))
    const [endIndex, setEndIndex] = useState((params.get("end") == undefined || params.get("end") < params.get("start")) ? 20 : params.get("end"))
    const [slideshowLength, setSlideshowLength] = useState(0)
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
      
      axios.get(`${process.env.REACT_APP_API_ROOT}/api/admin/slideshow?start=${startIndex}&end=${endIndex}`,globalVariable.axiosConfig)
      .then(function (response) {
        console.log(response.data)
        setSlideshowFilters(response.data.slideshows)
        setSlideshowLength(response.data.length)
      }).catch((error) => {
        // console.log(error)
        window.location.assign("/admin/login")
      })
        
        setPagination(Math.floor((startIndex / perPage) + 1))
        setStartIndex(startIndex)
        
    },[])


    function selectAllCheckbox(event){

      const slideshow_checkboxes = document.getElementsByClassName("slideshow-checkbox")
      if(event.target.checked){
        for(let slideshow_checkbox  of slideshow_checkboxes){
            slideshow_checkbox.checked = "checked"
        }
      }
      else{
        for(let slideshow_checkbox of slideshow_checkboxes){
            slideshow_checkbox.checked = ""
        }
      }
        
    }

    function deleteSlideshows(){
      
      var deleteIDs = []
      const slideshow_checkboxes = document.getElementsByClassName("slideshow-checkbox")
      for(let slideshow_checkbox of slideshow_checkboxes){
        if(slideshow_checkbox.checked){
          deleteIDs.push(slideshow_checkbox.value)
        }
      }

      axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/slideshow/delete`,{
        "slideshow_ids" : deleteIDs
      }, globalVariable.axiosConfigJson )
      .then(function (response) {
        console.log(response.data)
        window.location.assign("/admin/slideshow")
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
            <h3>Slideshows</h3>
            <div class="pull-right">
              <a href="/admin/slideshow/new" data-toggle="tooltip" title="New" className="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-plus"></i></a>
              <a href="#" data-toggle="tooltip" title="Delete" class="btn btn-danger" data-original-title="Delete" onClick={handleShow}><i class="fa fa-trash"></i></a>
            </div>
          </div>
          <div className="page-content">
            <section className="row">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" className="text-center align-middle"><input type="checkbox" className="slideshow-checkbox-all" onChange={selectAllCheckbox} /> </th>
                    <th scope="col" className="text-center align-middle">ID</th>
                    <th scope="col" className="text-center align-middle">Image</th>
                    <th scope="col" className="text-center align-middle">Name</th>
                    <th scope="col" className="text-center align-middle">Status</th>
                    <th scope="col" className="text-center align-middle">Sort Order</th>
                    <th scope="col" className="text-center align-middle">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {slideshowFilters.map((slideshow,index) => {
                      return (
                        <tr>
                          <td scope="col" className="text-center align-middle"><input type="checkbox" className="slideshow-checkbox"  value={slideshow.slideshow_id}/></td>
                          <td scope="row" className="text-center align-middle">{parseInt(startIndex) + index}</td> 
                          <td className="text-center align-middle"><img src={(slideshow.image == "" || slideshow.image == null) ? "/assets/images/no_image.png" : `${process.env.REACT_APP_IMAGE_SLIDESHOW}/${slideshow.image}`} width="75"/></td>
                          <td className="text-center align-middle">{slideshow.title}</td>
                          <td className="text-center align-middle">{slideshow.status}</td>
                          <td className="text-center align-middle">{slideshow.sort_order}</td>
                          <td className="text-center align-middle">
                            <a href={`/admin/slideshow/edit/${slideshow.slideshow_id}`} title="Edit" class="btn btn-primary"><i class="fa fa-pencil"></i></a>
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
                  {Array.apply(null, {length: Math.ceil(slideshowLength / perPage)}).map((item,index) => {

                      return (
                        <li class={"page-item " + (pagination - 1 == index ? "active" : "")}><a class="page-link" href={`slideshow?start=${perPage * index + 1}&end=${perPage * (index + 1)}`}>{index + 1}</a></li>
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
          <Modal.Body>Do you want to delete these Slideshows?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={deleteSlideshows}>
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

export default SlideshowPage;