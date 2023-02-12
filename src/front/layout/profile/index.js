import React from "react";
import "./index.css"
function ProfilePage() {
  return (
    <>
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-md-12">
            {/* Billing Details */}
            <div className="billing-detailss mt-5">
              <div className="section-title">
                <h3 className="title" >Profile</h3>
              </div>
              <div className="form-group d-flex justify-content-center mb-4">
              <label for="user_image"><img src="/assets/images/no_image.png" width="150" height="150" class="image-input border border-1 rounded-circle" /></label>
                  <input type="file" id="user_image" name="user_image" class="d-none"></input>
              </div>
            <h3 className=" text-center">About</h3><br/>
              <div className="d-flex justify-content-between">
                <div className="col-5 " style={{height:300}}>
                    <h5>First Name : </h5><br/>
                    <h5>Last Name : </h5><br/>
                    <h5>Email : </h5><br/>
                    <h5>Phone : </h5><br/>
                    <h5>Subcribe : </h5>
                </div>
                <div className="col-5" style={{height:300}}>
                    <h5>Tep </h5><br/>
                    <h5>Keven </h5><br/>
                    <h5>KevenBekSloy@gmail.com </h5><br/>
                    <h5>010986707 </h5><br/>
                    <h5>subscribed </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProfilePage;