import React from "react";
import "./index.css";

function ContactPage() {
    return (
        <>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-sm-6 border">
                        <div className="container-inside">
                            <h2 style={{ marginBottom: 20 }}>Send Us a Message</h2>
                            <input type="text" name id placeholder="Your Email Address" size={44} /><br /><br />
                            <textarea name id cols={30} rows={12} style={{ width: '90%' }} placeholder="How can we help?" defaultValue={""} /><br /><br />
                            <a href>Submit</a>
                        </div>
                    </div>
                    <div className="col-sm-6 border">
                        <div className="container-inside">
                            <div className="margin">
                                <span><i className="fa-solid fa-location-dot" /></span>
                                <span>&nbsp;Address</span> <br /><br />
                                <span>&nbsp; Coza Store Center 8th floor, 379 Hudson St, New York, NY 10018 US</span>
                                <br /><br /><br />
                                <span><i className="fa-solid fa-phone" /></span>
                                <span>&nbsp;Let's Talk</span> <br /><br />
                                <span>&nbsp; +1 800 1236879</span>
                                <br /><br /><br />
                                <span><i className="fa-regular fa-envelope" /></span>
                                <span>&nbsp;Sale Support</span> <br /><br />
                                <span>&nbsp;contact@example.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div classname="container">
                <div style={{width:"80%", margin:"50px auto"}}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.770586944347!2d104.88850131494574!3d11.568297147240346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109519fe4077d69%3A0x20138e822e434660!2sRUPP%20(Royal%20University%20of%20Phnom%20Penh)!5e0!3m2!1sen!2skh!4v1675667899252!5m2!1sen!2skh" width={"100%"} height={450} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
            </div>

        </>
    )
}

export default ContactPage;