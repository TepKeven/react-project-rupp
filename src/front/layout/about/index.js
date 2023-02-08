import React from "react";
import "./index.css"

function AboutPage() {
    return (
        <div>
            <div className="big-img-box">
                <img src="img/bg-01.jpg" alt />
                <h1>About Us</h1>
            </div>
            <div className="container" style={{marginTop:50}}>
                <div className="row">
                    <div className="col-sm-9">
                        <h2>Our Story</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat consequat enim, non <br /> auctor massa ultrices non. Morbi sed odio massa. Quisque at vehicula tellus, sed tincidunt augue. <br /> Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas <br /> varius egestas diam, eu sodales metus scelerisque congue. Pellentesque habitant morbi tristique <br /> senectus et netus et malesuada fames ac turpis egestas. Maecenas gravida justo eu arcu egestas <br /> convallis. Nullam eu erat bibendum, tempus ipsum eget, dictum enim. Donec non neque ut enim <br /> dapibus tincidunt vitae nec augue. Suspendisse potenti. Proin ut est diam. Donec condimentum <br /> euismod tortor, eget facilisis diam faucibus et. Morbi a tempor elit.</p>
                        <br />
                        <p>Donec gravida lorem elit, quis condimentum ex semper sit amet. Fusce eget ligula magna. Aliquam <br /> aliquam imperdiet sodales. Ut fringilla turpis in vehicula vehicula. Pellentesque congue ac orci ut <br /> gravida. Aliquam erat volutpat. Donec iaculis lectus a arcu facilisis, eu sodales lectus sagittis. Etiam <br /> pellentesque, magna vel dictum rutrum, neque justo eleifend elit, vel tincidunt erat arcu ut sem. <br /> Sed rutrum, turpis ut commodo efficitur, quam velit convallis ipsum, et maximus enim ligula ac ligula.</p>
                        <br />
                        <p>Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 <br /> 716 6879</p>
                    </div>
                    <div className="col-sm-3">
                        <img src="img/about-01.jpg" alt />


                </div>
                <div className="col-sm-3" style={{marginTop:100,marginBottom:100}}>
                    <img src="img/about-02.jpg" alt />
                </div>
                <div className="col-sm-9" style={{marginTop:100}}>
                    <h2>Our Mission</h2>
                    <p>Mauris non lacinia magna. Sed nec lobortis dolor. Vestibulum rhoncus dignissim risus, sed consectetur erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam maximus mauris sit amet odio convallis, in pharetra magna gravida. Praesent sed nunc fermentum mi molestie tempor. Morbi vitae viverra odio. Pellentesque ac velit egestas, luctus arcu non, laoreet mauris. Sed in ipsum tempor, consequat odio in, porttitor ante. Ut mauris ligula, volutpat in sodales in, porta non odio. Pellentesque tempor urna vitae mi vestibulum, nec venenatis nulla lobortis. Proin at gravida ante. Mauris auctor purus at lacus maximus euismod. Pellentesque vulputate massa ut nisl hendrerit, eget elementum libero iaculis.</p>
                    <div className="quote-box">
                        <p>Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while.</p>
                        <p>- Steve Jobs</p>
                    </div>
                </div>
                </div>
            </div>
        </div>

    )
}

export default AboutPage;