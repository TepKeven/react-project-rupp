import React from "react";
import "./index.css";
function CartPage() {
    return (
        <>
            <div className="container py-5">
                <div className="row ">
                    <div className="col-xl-7 item12 ">
                        <div style={{ margin: '20px 0px' }} /><table style={{ height: 284 }}>
                            <tbody><tr>
                                <th style={{ width: 4000 }}>Product</th>
                                <th style={{ width: '15%' }}>Price</th>
                                <th style={{ width: '15%' }}>Quantity</th>
                                <th style={{ width: '15%' }}>Total</th>
                                <th style={{ width: '15%' }}>Remove</th>
                            </tr>
                                <tr>
                                    <td className="align-middle">
                                        <img src="img/product-1.jpg" alt style={{ width: 30 }} />
                                        Colorful Stylish Shirt
                                    </td>
                                    <td className="align-middle">$150</td>
                                    <td className="align-middle">1</td>
                                    <td className="align-middle">$150</td>
                                    <td className="align-middle">
                                        <button className="btn-remove">
                                            <i className="fas fa-times" />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        <img src="img/product-2.jpg" alt style={{ width: 30 }} />
                                        Colorful Stylish Shirt
                                    </td>
                                    <td className="align-middle">$150</td>
                                    <td className="align-middle">1</td>
                                    <td className="align-middle">$150</td>
                                    <td className="align-middle">
                                        <button className="btn-remove">
                                            <i className="fas fa-times" />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        <img src="img/product-3.jpg" alt style={{ width: 30 }} />
                                        Colorful Stylish Shirt
                                    </td>
                                    <td className="align-middle">$150</td>
                                    <td className="align-middle">1</td>
                                    <td className="align-middle">$150</td>
                                    <td className="align-middle">
                                        <button className="btn-remove">
                                            <i className="fas fa-times" />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        <img src="img/product-4.jpg" alt style={{ width: 30 }} />
                                        Colorful Stylish Shirt
                                    </td>
                                    <td className="align-middle">$150</td>
                                    <td className="align-middle">1</td>
                                    <td className="align-middle">$150</td>
                                    <td className="align-middle">
                                        <button className="btn-remove">
                                            <i className="fas fa-times" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody></table>
                    </div>
                    <div className="col-xl-5 ">
                        <div className="add-coupon">
                            <input type="text" id name size={30} style={{ padding: 6 }} placeholder="Coupon Code" />
                            <label htmlFor><a href>Apply Coupon</a></label>
                        </div>
                        <div style={{ margin: '5px 0px' }} />
                        <div className="Cart-Summary">
                            <table className="Cart-table">
                                <tbody><tr style={{ textAlign: 'center' }}>
                                    <th colSpan={2}>Cart-Summary</th>
                                </tr>
                                    <tr>
                                        <td>Subtotal</td>
                                        <td>$150</td>
                                    </tr>
                                    <tr>
                                        <td>Shiping</td>
                                        <td>$10</td>
                                    </tr>
                                    <tr>
                                        <td><h4>Total</h4></td>
                                        <td><h4>$160</h4></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="last-tr mt-4 ">
                                <a href>Proceed to Checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage;