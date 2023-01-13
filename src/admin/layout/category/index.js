import React from "react";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";

function CategoryPage(){
    return (
        <div id="app">
      <SidebarComponent />
      <div id="main">
        <NavbarComponent />
        <div className="page-heading">
          <h3>Category</h3>
        </div>
        <div className="page-content">
          Hello world
        </div>
        <FooterComponent />       
      </div>
    </div>
    )
}

export default CategoryPage;