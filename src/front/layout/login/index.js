import React from "react";
import "./index.css"
function ULoginPage() {
  return (
    <>
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-md-12">
            {/* Billing Details */}
            <div className="billing-detailss mt-5">
              <div className="section-title">
                <h3 className="title" >Login</h3>
              </div>
              <div className="form-group">
                <input className="input" type="email" name="email" placeholder="Email" />
              </div>
              <div className="form-group">
                <input className="input" type="text" name="password" placeholder="password" />
              </div>
              <div className="row d-flex justify-content-center">
              <div className="col-sm-3">
                  <a href="#" >Forgot password?</a>
              </div>
              <div className="col-sm-4">
                Not a member?<a href="#" >Register</a>
              </div>
              <button type="button" class="btn btn-primary btn-block " style={{marginTop:30}}>Sign in</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ULoginPage;