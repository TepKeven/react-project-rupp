import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import "./index.css";
import axios from "axios"
import globalVariable from "../../variable";

function SlideshowAddPage() {

  const form_name = "form-slideshow-new"
  const [slideshowImage, setSlideshowImage] = useState("/assets/images/no_image.png")

  const addSlideshow = () =>  {

    var form = document.getElementById(form_name)
    var formData = new FormData(form);

    axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/slideshow/new`, formData, globalVariable.axiosConfig).then(response => {
      console.log(response.data)
      window.location.assign("/admin/slideshow");
    }).catch((error) => {
        // console.log(error)
        window.location.assign("/admin/login")
    })

  }

  const chooseImage = (event) => {
    setSlideshowImage(URL.createObjectURL(event.target.files[0]))
  }
  
  return (
    <div id="app">
      <SidebarComponent />
      <div id="main">
        <NavbarComponent />
        <div className="page-heading d-flex align-items-center justify-content-between">
          <h3>Add Slideshow</h3>
          <div class="pull-right">
            <button onClick={addSlideshow} data-toggle="tooltip" title="" class="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-save"></i></button>
            <a href="/admin/slideshow" data-toggle="tooltip" title="" class="btn btn-danger" data-original-title="Cancel"><i class="fa fa-reply"></i></a>
          </div>
        </div>
        <div className="page-content">
      
        <form action={`${process.env.REACT_APP_API_ROOT}/api/admin/customer/new/`} id={form_name} method="POST" encType="multipart/form-data">
            <div class="mb-4">
                <label for="slideshow_title" class="form-label">
                    Title
                </label>
                <input
                    type="text"
                    class="form-control"
                    id="slideshow_title"
                    name="slideshow_title"
                />
            </div>
            <div class="mb-4">
                <label for="slideshow_description" class="form-label">
                    Description
                </label>
                <input
                    type="text"
                    class="form-control"
                    id="slideshow_description"
                    name="slideshow_description"
                />
            </div>
            <div class="mb-4">
                <label for="slideshow_link" class="form-label">
                    Link
                </label>
                <input
                    type="text"
                    class="form-control"
                    id="slideshow_link"
                    name="slideshow_link"
                />
            </div>
            <div class="mb-4">
                <label for="slideshow_image" class="form-label">
                    Image
                </label> <br/>
                <label for="slideshow_image">
                    <img src={slideshowImage} width={150} height={150} className="image-input border border-1"/>
                </label>
                <input type="file" id="slideshow_image" name="slideshow_image" className="d-none" onChange={chooseImage}/>
            </div>
            <div class="mb-4">
                <label for="slideshow_sort_order" class="form-label">
                    Sort Order
                </label>
                <input
                type="number"
                class="form-control"
                id="slideshow_sort_order"
                name="slideshow_sort_order"
                />
            </div>
            <div class="mb-4">
                <label for="slideshow_status" class="form-label">
                    Status
                </label>
                <select id="slideshow_status" name="slideshow_status" class="form-control">
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

export default SlideshowAddPage;
