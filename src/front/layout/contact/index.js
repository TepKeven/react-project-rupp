import axios from "axios";
import React, { useEffect } from "react";
import { toastNotificationError, toastNotificationSuccess } from "../../functions";
import "./index.css";

function ContactPage() {

    const form_name = "form-contact-new"

    const sendContactEmail = () => {
		
        var form = document.getElementById(form_name)
        var formData = new FormData(form);
        
        axios.post(`${process.env.REACT_APP_API_ROOT}/api/contact`, formData)
        .then(function (response) {
            
            console.log(response.data)
            toastNotificationSuccess("Email Sent Successfully")    

        }).catch((error) => {
            console.log(error)
            toastNotificationError(error.response.statusText)
        })
    
    }

    return (
        <div className="container my-5">
            <div className="">
            <h2 class="fw-bold">Contact Us</h2>
        <div class="px-4 py-4">
            <h4>Our Location</h4>
            <div class="d-flex mt-3">
                <i class="fa-solid fa-location-pin"></i>
                <h6 class="ms-3">Russey Keo Phnom Penh, Cambodia.</h6>
            </div>
            <div class="d-flex mt-3">
                <a href="https://www.google.com/maps/place/Russei+Keo,+Phnom+Penh/@11.6206873,104.8537742,13z/data=!3m1!4b1!4m5!3m4!1s0x310953b549725f55:0xc09fa059ffc26d49!8m2!3d11.6164769!4d104.8980058" target="_blank">
                    <button class="btn btn-dark">
                        <i class="fa-solid fa-map-pin me-1"></i>
                        Google Map
                    </button>
                </a>
            </div>
            <div class="d-flex mt-3">
                <i class="fa-solid fa-phone"></i>
                <h6 class="ms-3">+855 12345678</h6>
            </div>
            <div class="d-flex mt-3">
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <h6 class="ms-3">+855 12345678</h6>
            </div>
            <div class="col-lg-12 col-sm-12 my-5">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.770586944347!2d104.88850131494574!3d11.568297147240346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109519fe4077d69%3A0x20138e822e434660!2sRUPP%20(Royal%20University%20of%20Phnom%20Penh)!5e0!3m2!1sen!2skh!4v1675667899252!5m2!1sen!2skh" width="100%" height={450} allowFullScreen loading="lazy"  />
            </div>
            <h4>Send a Message</h4>
            <form class="my-4" action={`${process.env.REACT_APP_API_ROOT}/api/contact`} id={form_name} method="POST" encType="multipart/form-data">
                <div class="form-group mt-4">
                    <label for="contact_receipient_name">Name</label>
                    <input type="text" class="form-control w-lg-75 w-100" name="contact_receipient_name" id="contact_receipient_name" placeholder="Your Name" />
                </div>
                <div class="form-group mt-4">
                    <label for="contact_receipient_email">Email address</label>
                    <input type="email" class="form-control w-lg-75 w-100" name="contact_receipient_email" id="contact_receipient_email" placeholder="Your Email" />
                </div>
                <div class="form-group mt-4">
                    <label for="contact_receipient_phone">Phone Number</label>
                    <input type="text" class="form-control w-lg-75 w-100" name="contact_receipient_phone" id="contact_receipient_phone" placeholder="Your Phone" />
                </div>
                <div class="form-group mt-4">
                    <label for="contact_receipient_subject">Subject</label>
                    <input type="text" class="form-control w-lg-75 w-100" name="contact_receipient_subject" id="contact_receipient_subject" placeholder="Your Subject" />
                </div>
                <div class="form-group mt-4">
                    <label for="contact_receipient_message">Message</label>
                    <textarea class="form-control w-lg-75 w-100" name="contact_receipient_message" id="contact_receipient_message" rows="8"></textarea>
                </div>
                <div class="form-group col-12 d-flex justify-content-end mt-4">
                    <button type="button" class="btn btn-dark" onClick={sendContactEmail}>Submit</button>
                </div>
            </form>
        </div>
            </div>
        </div>
    )
}

export default ContactPage;