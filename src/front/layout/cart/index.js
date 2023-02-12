import axios from "axios";
import React, { useEffect, useState } from "react";
import { toastNotificationError, toastNotificationSuccess } from "../../functions";
import globalVariable from "../../variable";
import "./index.css";


function CartPage() {

    const [cartItems, setCartItems] = useState([]);


    useEffect(() => {

        // localStorage.setItem("cart_items",JSON.stringify([{product_id: 4, quantity: 2}]))

        const formdata = new FormData();
        formdata.append("cart_items", localStorage.getItem("cart_items") || '[]');

        axios.post(`${process.env.REACT_APP_API_ROOT}/api/cart`, formdata, globalVariable.axiosConfig)
      .then(function (response) {
          console.log(response.data)
          setCartItems(response.data.carts)
      }).catch((error) => {
        console.log(error)
        toastNotificationError(error.response.statusText)
        // window.location.assign("/admin/login")
      })

    },[])


    const deleteCartItem = (product_id) => {

        const local_cart_items = JSON.parse(localStorage.getItem("cart_items")) || [];
        const local_cart_items_remain = local_cart_items.filter(cart_item => cart_item.product_id != product_id)
        const cart_items = cartItems.filter(cartItem => cartItem.product_id != product_id)
        
        setCartItems(cart_items)
        localStorage.setItem("cart_items", JSON.stringify(local_cart_items_remain))  
        toastNotificationSuccess("Cart Item Deleted Successfully") 
    }

    return (
        <div className="cart-container py-5">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-10 cart-item ">
                    <div className="mx-3">
                        <table class="table table-hover">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Tax</th>
                                    <th scope="col">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((cart_item,index) => {
                                    return (
                                        <tr>
                                            <td scope="row" className="text-center align-middle">{index + 1}</td> 
                                            <td className="text-center align-middle"><img src={(cart_item.image == "" || cart_item.image == null) ? "/assets/images/no_image.png" : `${process.env.REACT_APP_IMAGE_PRODUCT}/${cart_item.image}`} width="75"/></td>
                                            <td scope="row" className="text-center align-middle">{cart_item.product_description_assoc[0].name}</td> 
                                            <td className="text-center align-middle">${cart_item.price}</td>
                                            <td className="text-center align-middle">{cart_item.order_amount}</td>
                                            <td className="text-center align-middle">${(parseFloat(cart_item.tax_price) + parseFloat(cart_item.price)) * parseFloat(cart_item.order_amount)}</td>
                                            <td className="text-center align-middle">${cart_item.tax_price}</td>
                                            <td className="text-center align-middle">
                                                <button className="btn btn-danger" title="Delete" onClick={() => deleteCartItem(cart_item.product_id)}><i class="fa fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                    })
                                }
                                <tr>
                                    <td className="text-end align-middle" colSpan="7">Total Price</td>
                                    <td className="text-center align-middle">{`$${cartItems.reduce((total,product) => parseFloat(product.price) * parseFloat(product.order_amount) + total ,0)}`}</td>
                                </tr>
                                <tr>
                                    <td className="text-end align-middle" colSpan="7">Total Price with Tax</td>
                                    <td className="text-center align-middle">{`$${cartItems.reduce((total,product) => (parseFloat(product.price) + parseFloat(product.tax_price)) * parseFloat(product.order_amount) + total ,0)}`}</td>
                                </tr>   
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage;