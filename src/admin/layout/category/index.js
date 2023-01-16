import React, { useEffect, useState } from "react";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";

function CategoryPage(){

    const [categoryItems, setCategoryItems] = useState(
      [
        {
          category_id: 1,
          name: "Category 1",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 1
        },
        {
          category_id: 2,
          name: "Category 2",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 2
        }, {
          category_id: 3,
          name: "Category 3",
          image: "/assets/images/products/product01.png",
          // parent_id: 1,
          parent: "Category 1",
          // top: 0,
          sort_order: 3
        }, {
          category_id: 1,
          name: "Category 4",
          image: "/assets/images/products/product01.png",
          // parent_id: 2,
          parent: "Category 2",
          // top: 0,
          sort_order: 4
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        },
        {
          category_id: 1,
          name: "Category 5",
          image: "/assets/images/products/product01.png",
          // parent_id: 0,
          parent: "",
          // top: 0,
          sort_order: 5
        }, 
      ]
    )
  
    const [categoryFilters,setCategoryFilters] = useState([])
    const [pagination, setPagination] = useState(null)
    const [start,setStart] = useState(null)

    useEffect(() => {
        
        const url = new URL(window.location)
        const params = new URLSearchParams(url.search);
        var start = params.get("start") || 1;
        var end = params.get("end") || 21;

        var categoryList = categoryItems.filter((category,index) => {
            return (index >= start && index <= end - 1)
            
        })
  
        setCategoryFilters(categoryList)
        setPagination(Math.floor((start / 20) + 1))
        setStart(start)
        
    },[])

    return (
        <div id="app">
      <SidebarComponent />
      <div id="main">
        <NavbarComponent />
        <div className="page-heading">
          <h3>Category</h3>
        </div>
        <div className="page-content">
          <section className="row">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center align-middle"><input type="checkbox" /> </th>
                  <th scope="col" className="text-center align-middle">ID</th>
                  <th scope="col" className="text-center align-middle">Image</th>
                  <th scope="col" className="text-center align-middle">Category Name</th>
                  <th scope="col" className="text-center align-middle">Parent</th>
                  <th scope="col" className="text-center align-middle">Sort Order</th>
                  <th scope="col" className="text-center align-middle">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoryFilters.map((category,index) => {
                    return (
                      <tr>
                        <th scope="col" className="text-center align-middle"><input type="checkbox" /></th>
                        <th scope="row" className="text-center align-middle">{parseInt(start) + index}</th> 
                        <td className="text-center align-middle"><img src={category.image} width="75"/></td>
                        <td className="text-center align-middle">{category.name}</td>
                        <td className="text-center align-middle">{category.parent}</td>
                        <td className="text-center align-middle">{category.sort_order}</td>
                        <td className="text-center align-middle">
                        <a href={`category/edit/${category.category_id}`} title="Edit" class="btn btn-primary"><i class="fa fa-pencil"></i></a>
                        </td>
                      </tr>
                    )
                  })
                }
                
              </tbody>
            </table>
            <nav aria-label="Page navigation">
              <ul class="pagination justify-content-end">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {Array.apply(null, {length: Math.ceil(categoryItems.length / 20)}).map((item,index) => {

                    return (
                      <li class={"page-item " + (pagination - 1 == index ? "active" : "")}><a class="page-link" href={`category?start=${20 * index + 1}&end=${20 * (index + 1) + 1}`}>{index + 1}</a></li>
                    )
                })}
            
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </section>
        </div>
        <FooterComponent />       
      </div>
    </div>
    )
}

export default CategoryPage;