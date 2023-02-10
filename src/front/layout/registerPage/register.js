import React from "react";

function RegisterPage() {
  return (
    <>
      <div>
        {/* /BREADCRUMB */}
        {/* SECTION */}
        <div className="section">
          {/* container */}
          <div className="container">
            {/* row */}
            <div className="row">
              <div className="col-md-7">
                {/* Billing Details */}
                <div className="billing-details">
                  <div className="section-title">
                    <h3 className="title">Register Form</h3>
                  </div>
                  <div className="form-group">
                    <input className="input" type="text" name="first-name" placeholder="First Name" />
                  </div>
                  <div className="form-group">
                    <input className="input" type="text" name="last-name" placeholder="Last Name" />
                  </div>
                  <div className="form-group">
                    <input className="input" type="email" name="email" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <input className="input" type="password" name="password" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <input className="input" type="password" name="confirmPassword" placeholder="Confirm Password" />
                  </div>
                  <div className="form-group">
                    <input className="input" type="tel" name="tel" placeholder="Telephone" />
                  </div>
                  <label for="user_image" class="form-label">Image</label>
                  <br />
                  <label for="user_image"><img src="/assets/images/no_image.png" width="150" height="150" class="image-input border border-1" /></label>
                  <input type="file" id="user_image" name="user_image" class="d-none"></input>
                  <div className="row d-flex justify-content-center" style={{marginTop:30}}>
                    <div className="col-sm-4">
                      <p>Subscribe to the latest information on this site</p>
                    </div>
                    <div className="col-sm-7 d-flex">
                      <div className="form-group row">
                          <div className="col-md-6 py-0 d-flex justify-content-around">
                            <input className="input"  type="radio" name="subscribe"/>
                            <label for="subscribe" class="col-form-label">yes</label>
                          </div>
                          <div className="col-md-6 py-0 d-flex justify-content-around">
                            <input className="input"  type="radio" name="subscribe"/>
                            <label for="subscribe" class="col-form-label">No</label>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 order-details d-flex justify-content-center">
                <img style={{width: "80%", margin: "0 auto"}} className="my-auto" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"/>


              </div>
              {/* /Order Details */}
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
        {/* /SECTION */}
      </div>
    </>
  )
}
export default RegisterPage;