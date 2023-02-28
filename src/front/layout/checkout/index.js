import axios from "axios";
import React, { useEffect, useState } from "react";
import { toastNotificationError, toastNotificationSuccess } from "../../functions";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import globalVariable from "../../variable";
import "./index.css"

function CheckoutPage() {

    const initialPaypalOptions = {
        "client-id": "AaeR8Td_b6gPaaoXouNNcGjjzjMfRgd0C5Uuq57oOtViapAVih93uzOI_ElNm4YOBcHPTyaDY7IiHLe1",
        currency: "USD",
        intent: "capture",
    };

    const form_name = "form-order-new"
    const [countries, setCountries] = useState([]);
    const [payments, setPayments] = useState([]);
    const [shipments, setShipments] = useState([])
    const [loginToken, setLoginToken] = useState(null)
    const [cartProducts, setCartProducts] = useState([])
    const [paymentIDSelected, setPaymentIDSelected] = useState(1)
 
    useEffect(() => {

        const formdata = new FormData();
        formdata.append("cart_items", localStorage.getItem("cart_items") || '[]');

        axios.post(`${process.env.REACT_APP_API_ROOT}/api/order/new/get`, formdata, globalVariable.axiosConfig)
        .then(function (response) {
            
            console.log(response.data)
            setCartProducts(response.data.products)
            setCountries(response.data.countries)
            setPayments(response.data.payments)
            setShipments(response.data.shipments)
            setLoginToken(response.data.customer_login_token)

        }).catch((error) => {
            console.log(error)
            // window.location.reload();
        })

    },[])

    const addOrder = () => {

        var order_create_account = document.getElementById("order_create_account")

        var form = document.getElementById(form_name)
        var formData = new FormData(form);
    
        formData.append("cart_items", localStorage.getItem("cart_items") || '[]');
        formData.append("order_create_account", (order_create_account != null &&  order_create_account.checked == true) ? 1 : 0)

        axios.post(`${process.env.REACT_APP_API_ROOT}/api/order/new`, formData).then(response => {
        
            console.log(response.data)
            toastNotificationSuccess("Checkout Successfully")
            localStorage.setItem("cart_items", "[]")
        
        }).catch((error) => {
            console.log(error)
            toastNotificationError(error.response.statusText)
            // window.location.reload();
        })
    }

    const setPaymentID = (payment_id) => {
        setPaymentIDSelected(payment_id)
    }

    return (
        <div>
            {/* BREADCRUMB */}
            <div id="breadcrumb" className="section">
                {/* container */}
                <div className="container">
                    {/* row */}
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="breadcrumb-header">Checkout</h3>
                            <ul className="breadcrumb-tree">
                                <li><a href="#">Home</a></li>
                                <li className="active">Checkout</li>
                            </ul>
                        </div>
                    </div>
                    {/* /row */}
                </div>
                {/* /container */}
            </div>
            {/* /BREADCRUMB */}
            {/* SECTION */}
            <div className="section">
                {/* container */}
                <form action={`${process.env.REACT_APP_API_ROOT}/api/order/new`} id={form_name} method="POST" encType="multipart/form-data" className="checkout-container">
                    {/* row */}
                    <div className="row d-flex justify-content-evenly">
                        <div className="col-md-5">
                            {/* Billing Details */}
                            <div className="billing-details">
                                <div className="section-title">
                                    <h3 className="title">Checkout Information</h3>
                                </div>
                                <div class="mb-3">
                                    <label for="order_first_name" class="form-label">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="order_first_name"
                                        name="order_first_name"
                                    />
                                </div>   
                                <div class="mb-3">
                                    <label for="order_last_name" class="form-label">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="order_last_name"
                                        name="order_last_name"
                                    />
                                </div>  
                                <div class="mb-3">
                                    <label for="order_email" class="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="order_email"
                                        name="order_email"
                                    />
                                </div>  
                                <div class="mb-3">
                                    <label for="order_telephone" class="form-label">
                                        Telephone
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="order_telephone"
                                        name="order_telephone"
                                    />
                                </div>
                                <div class="mb-3">
                                    <label for="order_company" class="form-label">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="order_company"
                                        name="order_company"
                                    />
                                </div>
                                <div class="mb-3">
                                    <label for="order_address" class="form-label">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="order_address"
                                        name="order_address"
                                    />
                                </div>
                                <div class="mb-3">
                                    <label for="order_city" class="form-label">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="order_city"
                                        name="order_city"
                                    />
                                </div>
                                <div class="mb-4">
                                    <label for="order_country_id" class="form-label">
                                        Country
                                    </label>
                                    <select id="order_country_id" name="order_country_id" class="form-control">
                                        {countries.map(country => (
                                            <option value={country.country_id}>{country.name}</option>
                                        ))}
                                    </select>
                                </div>
                                {loginToken == null && (
                                    <div className="form-group">
                                        <div className="input-checkbox">
                                            <input type="checkbox" id="order_create_account"/>
                                            <label htmlFor="order_create_account">
                                                <span />
                                                Create Account?
                                            </label>
                                            <div className="caption">
                                                <p>Please Enter Your Password:</p>
                                                <div class="input-group mb-3">
                                                    <input type="password" name="order_password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon2" />
                                                    <div class="input-group-append">
                                                        <button class="btn btn-outline-danger" type="button"><i className="fas fa-eye"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* /Billing Details */}
                            {/* Shiping Details */}
                            {/* <div className="shiping-details">
                                <div className="section-title">
                                    <h3 className="title">Shiping address</h3>
                                </div>
                                <div className="input-checkbox">
                                    <input type="checkbox" id="shiping-address" />
                                    <label htmlFor="shiping-address">
                                        <span />
                                        Ship to a diffrent address?
                                    </label>
                                    <div className="caption">
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
                                            <input className="input" type="text" name="address" placeholder="Address" />
                                        </div>
                                        <div className="form-group">
                                            <input className="input" type="text" name="city" placeholder="City" />
                                        </div>
                                        <div className="form-group">
                                            <input className="input" type="text" name="country" placeholder="Country" />
                                        </div>
                                        <div className="form-group">
                                            <input className="input" type="text" name="zip-code" placeholder="ZIP Code" />
                                        </div>
                                        <div className="form-group">
                                            <input className="input" type="tel" name="tel" placeholder="Telephone" />
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* /Shiping Details */}
                            {/* Order notes */}
                            {/* <div className="order-notes">
                                <textarea className="input" placeholder="Order Notes" defaultValue={""} />
                            </div> */}
                            {/* /Order notes */}
                        </div>
                        {/* Order Details */}
                        <div className="col-md-5 order-details">
                            <div className="section-title text-center">
                                <h3 className="title">Your Order</h3>
                            </div>
                            <div className="order-summary">
                                <div className="order-col">
                                    <div><strong>PRODUCT</strong></div>
                                    <div><strong>TOTAL</strong></div>
                                </div>
                                <div className="order-products">
                                    {cartProducts.map(cartProduct => (
                                        <div className="order-col">
                                            <div>{`${cartProduct.purchase_quantity}x ${cartProduct.product_description_assoc[0].name}`}</div>
                                            <div>${parseFloat(cartProduct.price) * parseInt(cartProduct.purchase_quantity)}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="order-col">
                                    <div><strong>Total</strong></div>
                                    <div><strong>${cartProducts.reduce((total,product) => parseFloat(product.price) * parseFloat(product.purchase_quantity) + total ,0)}</strong></div>
                                </div>
                                <div className="order-col">
                                    <div><strong>Tax</strong></div>
                                    <div><strong>${cartProducts.reduce((total,product) => parseFloat(product.tax) * parseFloat(product.purchase_quantity) + total ,0)}</strong></div>
                                </div>
                                <div className="order-col">
                                    <div><strong>TOTAL & TAX</strong></div>
                                    <div><strong className="order-total">${cartProducts.reduce((total,product) => (parseFloat(product.price) + parseFloat(product.tax)) * parseFloat(product.purchase_quantity) + total ,0)}</strong></div>
                                </div>
                            </div>
                            <div className="payment-method">
                                <div className="section-title">
                                    <h4 className="title">Payment Method</h4>
                                </div>
                                {payments.map((payment, index) => (
                                    <div className="input-radio">
                                        <input type="radio" name="order_payment_id" id={`payment-${payment.payment_id}`} value={payment.payment_id} defaultChecked={index == 0} onChange={() => setPaymentID(payment.payment_id)}/>
                                        <label htmlFor={`payment-${payment.payment_id}`}>
                                            <span />
                                            {payment.name}
                                        </label>
                                        <div className="caption">
                                            <p>
                                                {payment.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="shipping-method">
                                <div className="section-title">
                                    <h4 className="title">Shipping Method</h4>
                                </div>
                                {shipments.map((shipment, index) => (
                                    <div className="input-radio">
                                        <input type="radio" name="order_shipping_id" id={`shipping-${shipment.shipping_id}`} value={shipment.shipping_id} defaultChecked={index == 0}/>
                                        <label htmlFor={`shipping-${shipment.shipping_id}`}>
                                            <span />
                                            {shipment.name}
                                        </label>
                                        <div className="caption">
                                            <p>{shipment.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="input-checkbox mt-5">
                                <input type="checkbox" id="terms" />
                                <label htmlFor="terms">
                                    <span />
                                    I've read and accept the <a href="#">terms &amp; conditions</a>
                                </label>
                            </div>
                            {paymentIDSelected != 3 && (
                                <a href="#" className="primary-btn order-submit" onClick={addOrder}>Place order</a>
                            )}
                            {paymentIDSelected == 3  && (
                                <PayPalScriptProvider options={initialPaypalOptions}>
                                    <PayPalButtons className="order-submit" style={{ color: "black", shape: 'pill',height: 48 }} 
                                        createOrder= {(data, actions) => {
                                            return actions.order
                                                .create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                currency_code: "USD",
                                                                value: cartProducts.reduce((total,product) => (parseFloat(product.price) + parseFloat(product.tax)) * parseFloat(product.purchase_quantity) + total ,0),
                                                            },
                                                        },
                                                    ],
                                                })
                                                .then((orderId) => {
                                                    // Your code here after create the order
                                                    console.log(orderId)
                                                    return orderId;
                                                });
                                        }}
                                        onApprove={function (data, actions) {
                                            return actions.order.capture().then(function (details) {
                                                console.log(details)
                                                addOrder()
                                            });
                                        }}
                                    />
                                </PayPalScriptProvider>
                            )}
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
export default CheckoutPage;