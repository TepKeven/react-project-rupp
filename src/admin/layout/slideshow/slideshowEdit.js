import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import "./index.css";
import axios from "axios"
import globalVariable from "../../variable";

function SlideshowEditPage() {

  const form_name = "form-slideshow-edit"
  const [slideshowImage, setSlideshowImage] = useState("/assets/images/no_image.png")
  const [slideshowInfo, setSlideshowInfo] = useState({})
  var params = useParams();

  const editSlideshow = () =>  {

    var form = document.getElementById(form_name)
    var formData = new FormData(form);

    axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/slideshow/edit/${params.slideshow_id}`, formData, globalVariable.axiosConfig).then(response => {
      console.log(response.data)
      window.location.assign("/admin/slideshow");
    }).catch((error) => {
        console.log(error)
        // window.location.assign("/admin/login")
    })

  }

  useEffect(() => {
      
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/admin/slideshow/edit/${params.slideshow_id}`, globalVariable.axiosConfig)
        .then(function (response) {
            setSlideshowInfo(response.data.slideshow)
            setSlideshowImage(`${process.env.REACT_APP_IMAGE_SLIDESHOW}/${response.data.slideshow.image}`)
            loadURLToInputFiled(`${process.env.REACT_APP_IMAGE_SLIDESHOW}/${response.data.slideshow.image}`)
        }).catch((error) => {
            // console.log(error)
            window.location.assign("/admin/login")
        })

    },[])

  const chooseImage = (event) => {
    setSlideshowImage(URL.createObjectURL(event.target.files[0]))
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
            document.getElementById('slideshow_image').files = container.files;
            
        })
    }
    
  return (
    <div id="app">
      <SidebarComponent />
      <div id="main">
        <NavbarComponent />
        <div className="page-heading d-flex align-items-center justify-content-between">
          <h3>Edit Slideshow</h3>
          <div class="pull-right">
            <button onClick={editSlideshow} data-toggle="tooltip" title="" class="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-save"></i></button>
            <a href="/admin/slideshow" data-toggle="tooltip" title="" class="btn btn-danger" data-original-title="Cancel"><i class="fa fa-reply"></i></a>
          </div>
        </div>
        <div className="page-content">
      
        <form action={`${process.env.REACT_APP_API_ROOT}/api/admin/customer/edit/${params.customer_id}`} id={form_name} method="POST" encType="multipart/form-data">
            <div class="mb-4">
                <label for="slideshow_title" class="form-label">
                    Title
                </label>
                <input
                    type="text"
                    class="form-control"
                    id="slideshow_title"
                    name="slideshow_title"
                    defaultValue={slideshowInfo.title}
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
                    defaultValue={slideshowInfo.description}
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
                    defaultValue={slideshowInfo.link}
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
                    defaultValue={slideshowInfo.sort_order}
                />
            </div>
            <div class="mb-4">
                <label for="slideshow_status" class="form-label">
                    Status
                </label>
                <select id="slideshow_status" name="slideshow_status" class="form-control">
                    <option value="1" selected={slideshowInfo.status == 1 ? "selected" : ""}>Enabled</option>
                    <option value="0" selected={slideshowInfo.status == 0 ? "selected" : ""}>Disabled</option>
                </select>
            </div>
        </form>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
}

export default SlideshowEditPage;
