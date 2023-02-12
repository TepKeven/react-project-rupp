import axios from "axios";
import React, { useEffect, useState } from "react";
import globalVariable from "../../variable";


function FrontRegisterPage() {

  const form_name = "form-customer-login"
  const [customerImage, setCustomerImage] = useState("/assets/images/no_image.png")
  const [countries, setCountries] = useState([])

  const setRegister = () =>  {

    var form = document.getElementById(form_name)
    var formData = new FormData(form);

    axios.post(`${process.env.REACT_APP_API_ROOT}/api/register/`, formData, globalVariable.axiosConfig).then(response => {

      console.log(response.data)
      localStorage.setItem("customer_login_token",response.data.customer_login_token)
      localStorage.setItem("currency", response.data.currency)
      localStorage.setItem("language",response.data.language)
      // window.location.assign("/shop");

    }).catch((error) => {
        console.log(error)
        // window.location.assign("/login")
    })

  }

  const chooseImage = (event) => {
    setCustomerImage(URL.createObjectURL(event.target.files[0]))
  }

  useEffect(() => {
      
    axios.get(`${process.env.REACT_APP_API_ROOT}/api/register`, globalVariable.axiosConfig)
    .then(function (response) {
      setCountries(response.data.countries)

    }).catch((error) => {
      console.log(error)
      // window.location.assign("/")
    })
    
  },[]) 
  
  return (
    <div>
      {/* /BREADCRUMB */}
      {/* SECTION */}
      <div className="section">
        {/* container */}
        <form action={`${process.env.REACT_APP_API_ROOT}/api/register/`} id={form_name} method="POST" encType="multipart/form-data" className="form-container">
          {/* row */}
          <div className="row d-flex justify-content-center">
            <div className="col-lg-5 col-12 mx-5">
              {/* Billing Details */}
              <div className="customer-details">
                <div className="section-title">
                  <h3 className="title">Register Form</h3>
                </div>
                <div class="form-group mt-3">
                  <label for="customer_first_name">First Name</label>
                  <input type="text" class="form-control" name="customer_first_name" id="customer_first_name" placeholder="Your First Name" />
                </div>
                <div class="form-group mt-3">
                  <label for="customer_last_name">Last Name</label>
                  <input type="text" class="form-control" name="customer_last_name" id="customer_last_name" placeholder="Your Last Name" />
                </div>
                <div class="form-group mt-3">
                  <label for="customer_email">Email</label>
                  <input type="text" class="form-control" name="customer_email" id="customer_email" placeholder="Your Email" />
                </div>
                <div class="form-group mt-3">
                  <label for="customer_password">Password</label>
                  <input type="password" class="form-control" name="customer_password" id="customer_password" placeholder="Your Password" />
                </div>
                <div class="form-group mt-3">
                  <label for="customer_confirm_password">Confirm Password</label>
                  <input type="password" class="form-control" name="customer_confirm_password" id="customer_confirm_password" placeholder="Your Confirm Password" />
                </div>
                <div class="form-group mt-3">
                  <label for="customer_telephone">Telephone</label>
                  <input type="text" class="form-control" name="customer_telephone" id="customer_telephone" placeholder="Your Telephone" />
                </div>
                <div class="form-group mt-3">
                  <label for="customer_image">Profile Image</label> <br/>
                  <label for="customer_image">
                    <img src={customerImage} width={150} height={150} className="image-input border border-1"/>
                  </label>
                  <input type="file" class="d-none" name="customer_image" id="customer_image" onChange={chooseImage}/>
                </div>
                <div class="form-group mt-3">
                  <label for="customer_telephone">Subscribe to our Newsletter</label>
                  <div className="form-group d-flex mt-2">
                      <div className="radio-group">
                        <input type="radio" name="customer_newsletter" id="customer_newsletter_yes" value={1}/>
                        <label for="customer_newsletter_yes" class="mx-2">yes</label>
                      </div>
                      <div className="radio-group mx-4">
                        <input type="radio" name="customer_newsletter" id="customer_newsletter_no" value={0}/>
                        <label for="customer_newsletter_no" class="mx-2">No</label>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-12 mx-5">
              <div className="address-details">
                <div className="section-title">
                  <h3 className="title">Address Details</h3>
                </div>
                <div class="form-group mt-3">
                  <label for="customer_company">Company</label>
                  <input type="text" class="form-control" name="customer_company" id="customer_company" placeholder="Your Company" />
                </div>
                <div class="form-group mt-3">
                  <label for="customer_address">Address</label>
                  <input type="text" class="form-control" name="customer_address" id="customer_address" placeholder="Your Address" />
                </div>
                <div class="form-group mt-3">
                  <label for="customer_city">City</label>
                  <input type="text" class="form-control" name="customer_city" id="customer_city" placeholder="Your City" />
                </div>
                <div class="form-group mt-3">
                  <label for="customer_postcode">Postcode</label>
                  <input type="text" class="form-control" name="customer_postcode" id="customer_postcode" placeholder="Your Postcode" />
                </div>
                <div class="mb-4">
                    <label for="customer_country_id" class="form-label">
                        Country
                    </label>
                    <select id="customer_country_id" name="customer_country_id" class="form-control">
                      {countries.map(country => (
                        <option value={country.country_id}>{country.name}</option>
                      ))}
                    </select>
                </div>  
                <div className="d-flex my-4">
                  <button type="button" class="btn btn-danger w-100" onClick={setRegister}>Sign up for an Account</button> 
                </div>
                <div className="d-flex justify-content-center">
                    Already have an Account? &nbsp;<a href="/login" className="text-danger">Login now</a>
                </div>
              </div>
            </div>
            {/* /Order Details */}
          </div>
          {/* /row */}
        </form>
        {/* /container */}
      </div>
      {/* /SECTION */}
    </div>
  )
}
export default FrontRegisterPage;