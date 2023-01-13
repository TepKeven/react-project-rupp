import React from "react";

function FooterComponent() {
  return (
    <footer>
      <div className="footer clearfix mb-0 text-muted">
        <div className="float-start">
          <p>2022 &copy; Keven</p>
        </div>
        <div className="float-end">
          <p>
            Crafted with{" "}
            <span className="text-danger">
              <i className="fas fa-heart"></i>
            </span>{" "}
            by <a href="#">T. Keven</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;