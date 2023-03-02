import axios from "axios";
import React, { useEffect } from "react";
import { toastNotificationError } from "../../functions";
import globalVariable from "../../variable";
import {
  LoginSocialGoogle,
  LoginSocialAmazon,
  LoginSocialFacebook,
  LoginSocialGithub,
  LoginSocialInstagram,
  LoginSocialLinkedin,
  LoginSocialMicrosoft,
  LoginSocialPinterest,
  LoginSocialTwitter,
  LoginSocialApple,
  IResolveParams,
} from 'reactjs-social-login';

import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
  AmazonLoginButton,
  InstagramLoginButton,
  LinkedInLoginButton,
  MicrosoftLoginButton,
  TwitterLoginButton,
  AppleLoginButton,
} from 'react-social-login-buttons';
import "./index.css"

const form_name = "form-customer-login"

function FrontLoginPage() {

  const REDIRECT_URI = 'http://localhost:3000/login';
  const url = new URL(window.location)
  const params = new URLSearchParams(url.search);

  const setLogin = () =>  {

    var form = document.getElementById(form_name)
    var formData = new FormData(form);

    axios.post(`${process.env.REACT_APP_API_ROOT}/api/login/`, formData, globalVariable.axiosConfig).then(response => {

      // console.log(response.data)
      localStorage.setItem("customer_login_token",response.data.customer_login_token)
      localStorage.setItem("currency", response.data.currency)
      localStorage.setItem("language",response.data.language)
      window.location.assign(`/shop?success=${response.data.message}`);

    }).catch((error) => {
        console.log(error)
        toastNotificationError(error.response.data.message)
        // window.location.assign("/login")
    })

  }

  useEffect(() => {
      if(params.get("error")){
        toastNotificationError(params.get("error"))
      }
  })


  return (
    <div className="container">
      {/* row */}
      <div className="row">
        <div className="col-12 d-flex justify-content-center my-5">
          {/* Billing Details */}
          <form action={`${process.env.REACT_APP_API_ROOT}/api/login`} id={form_name} method="POST" encType="multipart/form-data" className="login-details mt-5 p-5 col-lg-7 col-12 border border-2">
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
            <div className="d-flex justify-content-around mt-4">
              <div>
                  <a href="#" className="text-danger">Forgot password?</a>
              </div>
              <div>
                  Not a member? <a href="/register" className="text-danger">Register</a>
              </div>
            </div>
            <button type="button" class="btn btn-danger mt-5 w-100" onClick={setLogin}>Sign in</button>
            <LoginSocialGoogle
              client_id={process.env.REACT_APP_GG_APP_ID || ''}
              // onLoginStart={onLoginStart}
              redirect_uri={REDIRECT_URI}
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              onResolve={({ provider, data }) => {
                // setProvider(provider);
                // setProfile(data);
              }}
              onReject={err => {
                console.log(err);
              }}
            >
              <GoogleLoginButton />
            </LoginSocialGoogle>
          </form>
        </div>
      </div>
    </div>
  )
}
export default FrontLoginPage;