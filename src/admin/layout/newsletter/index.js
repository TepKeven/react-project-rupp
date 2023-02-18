import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import axios from "axios"
import globalVariable from "../../variable";
import NewsletterTextEditorComponent from "../../component/newsletterTextEditor";
import {toastNotificationSuccess} from "../../functions"

function NewsletterAddPage() {

  const form_name = "form-newsletter-new"

  const sendNewsletter = () =>  {

    var form = document.getElementById(form_name)
    var formData = new FormData(form);

    axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/newsletter/`, formData, globalVariable.axiosConfig).then(response => {
      console.log(response.data)
      toastNotificationSuccess("Newsletter Sent Successfully")
    }).catch((error) => {
        console.log(error)
        window.location.assign("/admin/dashboard")
    })

  }
  
  return (
    <div id="app">
      <SidebarComponent />
      <div id="main">
        <NavbarComponent />
        <div className="page-heading d-flex align-items-center justify-content-between">
          <h3>Send Newsletter</h3>
          <div class="pull-right">
            <button onClick={sendNewsletter} data-toggle="tooltip" title="" class="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-save"></i></button>
            <a href="/admin/dashboard" data-toggle="tooltip" title="" class="btn btn-danger" data-original-title="Cancel"><i class="fa fa-reply"></i></a>
          </div>
        </div>
        <div className="page-content">
            <form action={`${process.env.REACT_APP_API_ROOT}/api/admin/newsletter/new/`} id={form_name} method="POST" encType="multipart/form-data">
                <div class="mb-4">
                    <label for="newsletter_to" class="form-label">
                        To
                    </label>
                    <select id="newsletter_to" name="newsletter_to" class="form-control">
                        <option value="1" selected="selected">All Customers</option>
                        <option value="2">All Newsletter Subscriber</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="newsletter_subject" class="form-label">
                        Subject
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="newsletter_subject"
                        name="newsletter_subject"
                    />
                </div>
                <div className="mb-4">
                    <label for="newsletter_message" className="form-label">
                        Message
                    </label>
                    <NewsletterTextEditorComponent description="" tabName="newsletter_message" />
                </div>
            </form>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
}

export default NewsletterAddPage;
