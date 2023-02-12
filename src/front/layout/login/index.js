import axios from "axios";
import React from "react";
import globalVariable from "../../variable";
import "./index.css"

const form_name = "form-customer-login"

function FrontLoginPage() {

  const setLogin = () =>  {

    var form = document.getElementById(form_name)
    var formData = new FormData(form);

    axios.post(`${process.env.REACT_APP_API_ROOT}/api/login/`, formData, globalVariable.axiosConfig).then(response => {

      // console.log(response.data)
      localStorage.setItem("customer_login_token",response.data.customer_login_token)
      localStorage.setItem("currency", response.data.currency)
      localStorage.setItem("language",response.data.language)
      window.location.assign("/shop");

    }).catch((error) => {
        console.log(error)
        // window.location.assign("/login")
    })

  }


  return (
    <div className="container">
      {/* row */}
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          {/* Billing Details */}
          <form action={`${process.env.REACT_APP_API_ROOT}/api/login`} id={form_name} method="POST" encType="multipart/form-data" className="login-details mt-5 p-5 col-lg-8 col-12 border border-2">
            <div className="section-title">
              <h3 className="title" >Login</h3>
            </div>
            <div class="form-group mt-4">
                <label for="customer_login_email">Email Address</label>
                <input type="text" class="form-control" name="customer_login_email" id="customer_login_email" placeholder="Your Email" />
            </div>
            <div class="form-group mt-4">
                <label for="customer_login_password">Password</label>
                <input type="password" class="form-control" name="customer_login_password" id="customer_login_password" placeholder="Your Password" />
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-sm-5">
                  <a href="#" className="text-danger">Forgot password?</a>
              </div>
              <div className="col-sm-5">
                  Not a member? <a href="/register" className="text-danger">Register</a>
              </div>
              <button type="button" class="btn btn-danger mt-5" onClick={setLogin}>Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default FrontLoginPage;