import React, { useEffect, useState } from "react";
import axios from "axios";
import globalVariable from "../../variable";
import {toastNotificationError} from "../../functions"
import "./index.css"


function ProfilePage() {

  const [profileInfo, setProfileInfo] = useState({})
  const [profieImage, setProfileImage] = useState("/assets/images/no_image.png")
  const [addressInfo, setAddressInfo] = useState([])

  useEffect(() => {

      // localStorage.setItem("cart_items",JSON.stringify([{product_id: 4, quantity: 2}]))

      axios.get(`${process.env.REACT_APP_API_ROOT}/api/customer/get`, globalVariable.axiosConfig)
      .then(function (response) {

          console.log(response.data)
          setProfileInfo(response.data.customer)
          setAddressInfo(response.data.addresses)
          setProfileImage(`${process.env.REACT_APP_IMAGE_CUSTOMER}/${response.data.customer.image}`)


      }).catch((error) => {

        console.log(error)
        window.location.assign(`/login?error=${error.response.data.message}`);
        // window.location.assign("/admin/login")
      })

  },[])


  return (
    <>
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-md-12">
            {/* Profile Details */}
            <div className="profile-detail col-lg-8 col-12 m-auto my-5 p-lg-5 p-3">
              <div className="section-title">
                <h3 className="profile-title">Profile</h3>
              </div>
              <div className="form-group d-flex justify-content-center mb-4">
                <img src={profieImage} width="150" height="150" class="image-input border border-1 rounded-circle" />
              </div>
              <h3 className=" text-center">About</h3><br/>
              <div className="p-4">
                <div className="col-12 d-flex justify-content-between mt-4">
                  <h5>First Name: </h5>
                  <h5>{profileInfo.first_name}</h5>
                </div>
                <div className="col-12 d-flex justify-content-between mt-4">
                  <h5>Last Name: </h5>
                  <h5>{profileInfo.last_name}</h5>
                </div>
                <div className="col-12 d-flex justify-content-between mt-4">
                  <h5>Email: </h5>
                  <h5>{profileInfo.email}</h5>
                </div>
                <div className="col-12 d-flex justify-content-between mt-4">
                  <h5>Phone: </h5>
                  <h5>{profileInfo.telephone}</h5>
                </div>
                <div className="col-12 d-flex justify-content-between mt-4">
                  <h5>Newsletter: </h5>
                  <h5>{profileInfo.newsletter == 1 ? "Subscried" : "Unsubscribed"}</h5>
                </div>
                <div className="col-12 d-flex justify-content-between mt-4">
                  <h5>IP Address: </h5>
                  <h5>{profileInfo.ip == "::1" ? "127.0.0.1" : profileInfo.ip}</h5>
                </div>
                <div className="col-12 mt-4">
                  <h5>Address(es): </h5>
                  {addressInfo.map((address, index) => (
                    <div className="address-item mt-3">
                      <h5>{`${index + 1}. ${address.company}, ${address.address}, ${address.city}, ${address.postcode}, ${address.country}`}</h5><br/>
                    </div>
                  ))}
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