import React, { useEffect, useState } from "react";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import globalVariable from "../../variable";

function LoginPage(){

    const form_name = "form-login"

    const setLogin = () =>  {

        var form = document.getElementById(form_name)
        var formData = new FormData(form);
    
        axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/login/`, formData, globalVariable.axiosConfig).then(response => {
          localStorage.setItem("login_token",response.data.login_token)
          localStorage.setItem("currency", response.data.currency)
          localStorage.setItem("language",response.data.language)
          console.log(response.data)
          window.location.assign("/admin/dashboard");
        }).catch((error) => {
            console.log(error)
            window.location.assign("/admin/login")
        })
    
      }

    return (
      <div id="app">
        <div class="main">
          <div className="page-content">
            <section className="row">
                <div id="auth">
                    <div class="row h-100">
                        <div class="col-lg-5 col-12 p-5">
                            <div id="auth-left">
                                <div class="auth-logo">
                                    <a href="index.html"><img src="/assets/images/logo/logo.png" alt="Logo" width={200}/></a>
                                </div>
                                <h1 class="auth-title mt-5">Log in.</h1>
                                <p class="auth-subtitle mb-5">Log in with your data that you entered during registration.</p>

                                <form action={`${process.env.REACT_APP_API_ROOT}/api/admin/login/`} method="POST" id={form_name}>
                                    <div class="form-group position-relative has-icon-left mb-4">
                                        <input type="text" name="login_email" class="form-control form-control-xl" placeholder="Email" />
                                        <div class="form-control-icon">
                                            <i class="bi bi-person"></i>
                                        </div>
                                    </div>
                                    <div class="form-group position-relative has-icon-left mb-4">
                                        <input type="password" name="login_password" class="form-control form-control-xl" placeholder="Password" />
                                        <div class="form-control-icon">
                                            <i class="bi bi-shield-lock"></i>
                                        </div>
                                    </div>
                                    {/* <div class="form-check form-check-lg d-flex align-items-end">
                                        <input class="form-check-input me-2" name="login_keep_logged" type="checkbox" value="" id="flexCheckDefault" />
                                        <label class="form-check-label text-gray-600" for="flexCheckDefault">
                                            Keep me logged in
                                        </label>
                                    </div> */}
                                    <button type="button" class="btn btn-primary btn-block btn-lg shadow-lg mt-5" onClick={setLogin}>Log in</button>
                                </form>
                                <div class="text-center mt-5 text-lg fs-4">
                                    <p class="text-gray-600">Don't have an account? <a href="/admin/register" class="font-bold">Sign up</a>.</p>
                                    <p><a class="font-bold" href="auth-forgot-password.html">Forgot password?</a>.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 d-none d-lg-block bg-primary">
                        </div>
                    </div>

                </div>
            </section>
          </div>     
        </div>
    </div>
    )
}

export default LoginPage;