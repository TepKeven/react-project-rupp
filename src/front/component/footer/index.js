import React from "react";
import "./index.css"

function FooterComponent() {
    return (
        <>
            <div>
                {/* NEWSLETTER */}
                <div id="newsletter" className="section">
                    {/* container */}
                    <div className="container">
                        {/* row */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="newsletter">
                                    <p>Sign Up for the <strong>NEWSLETTER</strong></p>
                                    <form>
                                        <input className="input" type="email" placeholder="Enter Your Email" />
                                        <button className="newsletter-btn"><i className="fa fa-envelope" /> Subscribe</button>
                                    </form>
                                    <ul className="newsletter-follow">
                                        <li>
                                            <a href="#"><i className="fa fa-facebook" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="fa fa-twitter" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="fa fa-instagram" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="fa fa-pinterest" /></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* /row */}
                    </div>
                    {/* /container */}
                </div>
                {/* /NEWSLETTER */}
                {/* FOOTER */}
                <footer id="footer">
                    {/* top footer */}
                    <div className="section">
                        {/* container */}
                        <div className="container">
                            {/* row */}
                            <div className="row">
                                <div className="col-md-3 col-xs-6">
                                    <div className="footer">
                                        <h3 className="footer-title">About Us</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.</p>
                                        <ul className="footer-links">
                                            <li><a href="#"><i className="fa fa-map-marker" />Phnom Penh, Cambodia</a></li>
                                            <li><a href="#"><i className="fa fa-phone" />+021-12-34-56-78</a></li>
                                            <li><a href="#"><i className="fa fa-envelope-o" />a3web@gmail.com</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3 col-xs-6">
                                    <div className="footer">
                                        <h3 className="footer-title">Categories</h3>
                                        <ul className="footer-links">
                                            <li><a href="/shop">Hot deals</a></li>
                                            <li><a href="/shop">Laptops</a></li>
                                            <li><a href="/shop">Smartphones</a></li>
                                            <li><a href="/shop">Cameras</a></li>
                                            <li><a href="/shop">Accessories</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3 col-xs-6">
                                    <div className="footer">
                                        <h3 className="footer-title">Information</h3>
                                        <ul className="footer-links">
                                            <li><a href="/about">About Us</a></li>
                                            <li><a href="/contact">Contact Us</a></li>
                                            <li><a href="/about">Privacy Policy</a></li>
                                            <li><a href="/about">Orders and Returns</a></li>
                                            <li><a href="/contact">Terms &amp; Conditions</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3 col-xs-6">
                                    <div className="footer">
                                        <h3 className="footer-title">Service</h3>
                                        <ul className="footer-links">
                                            <li><a href="/profile">My Account</a></li>
                                            <li><a href="/login">Login</a></li>
                                            <li><a href="/cart">View Cart</a></li>
                                            <li><a href="/checkout">Checkout</a></li>
                                            <li><a href="/contact">Help</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* /row */}
                        </div>
                        {/* /container */}
                    </div>
                    {/* /top footer */}
                    {/* bottom footer */}
                    <div id="bottom-footer" className="section">
                        <div className="container">
                            {/* row */}
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <ul className="footer-payments">
                                        <li><a href="#"><i className="fa fa-cc-visa text-white" /></a></li>
                                        <li><a href="#"><i className="fa fa-credit-card text-white" /></a></li>
                                        <li><a href="#"><i className="fa fa-cc-paypal text-white" /></a></li>
                                        <li><a href="#"><i className="fa fa-cc-mastercard text-white" /></a></li>
                                        <li><a href="#"><i className="fa fa-cc-discover text-white" /></a></li>
                                        <li><a href="#"><i className="fa fa-cc-amex text-white" /></a></li>
                                    </ul>
                                    <span className="copyright">
                                        {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                        Copyright © All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true" /> by <a href="/" target="_blank">A3 Team</a>
                                        {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                    </span>
                                </div>
                            </div>
                            {/* /row */}
                        </div>
                        {/* /container */}
                    </div>
                    {/* /bottom footer */}
                </footer>
                {/* /FOOTER */}
            </div>

        </>
    )
}

export default FooterComponent;