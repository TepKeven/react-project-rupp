import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import "./index.css";
import axios from "axios"

function OrderAddPage() {

  const form_name = "form-order-new"
  
  const [customers,setCustomers] = useState([])
  const [customerGroups, setCustomerGroups] = useState([])
  const [currencies, setCurrencies] = useState([])
  const [products, setProducts] = useState([])
  const [countries, setCountries] = useState([])
  const [payments, setPayments] = useState([])
  const [shipments, setShipments] = useState([])
  const [orderStatuses,setOrderStatuses] = useState([])
  const [orderProducts,setOrderProducts] = useState([])
  const [taxClasses, setTaxClasses] = useState([])

  
  const sectionTabs = [
    {tabID: 1, name: "Customer Details", tabReference: "#tab-customer-details"},
    {tabID: 2, name: "Products", tabReference: "#tab-products"},
    {tabID: 3, name: "Data", tabReference: "#tab-data"},
    {tabID: 4, name: "Total", tabReference: "#tab-total"}
  ]

  const setLangTab = useDispatch();
  const navigate = useNavigate();
  const getLangTab = useSelector((state) => state.getLangTab.lang);
  const [sectionTab,setSectionTab] = useState("#tab-customer-details")
  
  function setActiveSectionTab(section_tab){
      setSectionTab(section_tab)
  }

  const addOrder = () =>  {

    var form = document.getElementById(form_name)
    var formData = new FormData(form);
        
    formData.append("orderProducts",JSON.stringify(orderProducts))

    axios.post(`${process.env.REACT_APP_API_ROOT}/api/admin/order/new`, formData).then(response => {
      console.log(response.data)
      
    })

  }



  const addProduct = () => {

    const product_id = document.getElementById("order_product_id").value
    const quantity  = document.getElementById("order_product_quantity").value
    
    if(orderProducts.find(orderProduct => orderProduct.product_id == product_id) == null){
        const product = products.find(product => product.product_id == product_id)
        const tax_class = taxClasses.find(taxClass => taxClass.tax_class_id == product.tax_class_id)

        const order_product = {
           product_id: product_id,
           name: product.product_description_assoc[0].name,
           model: product.model,
           quantity: quantity,
           price: product.price,
           tax: tax_class == null ? 0 : (tax_class.type == "P" ?  product.price * tax_class.rate / 100 : tax_class.rate),
        }
        
        setOrderProducts([...orderProducts, order_product])
        // console.log(product)
    }
    else{
        for(let orderProduct of orderProducts){

            if(orderProduct.product_id == product_id){
                orderProduct.quantity = parseInt(orderProduct.quantity) + parseInt(quantity)
            }
        }

        setOrderProducts([...orderProducts])
    }
  }



  const removeProduct = (product_id) => {
    const products = orderProducts.filter(product => product.product_id != product_id)
    setOrderProducts([...products])
  }



  useEffect(() => {
      
      axios.get(`${process.env.REACT_APP_API_ROOT}/api/admin/order/new`)
      .then(function (response) {
        setCustomers(response.data.customers)
        setCustomerGroups(response.data.customer_groups)
        setCurrencies(response.data.currencies)
        setProducts(response.data.products)
        setCountries(response.data.countries)
        setPayments(response.data.payment)
        setShipments(response.data.shipment)
        setOrderStatuses(response.data.order_status)
        setTaxClasses(response.data.tax_classes)
      })
      
      
  },[])
  
  return (
    <div id="app">
      <SidebarComponent />
      <div id="main">
        <NavbarComponent />
        <div className="page-heading d-flex align-items-center justify-content-between">
          <h3>Add Order</h3>
          <div class="pull-right">
            <button onClick={addOrder} data-toggle="tooltip" title="" class="btn btn-primary me-2" data-original-title="Save"><i class="fa fa-save"></i></button>
            <a href="/admin/order" data-toggle="tooltip" title="" class="btn btn-danger" data-original-title="Cancel"><i class="fa fa-reply"></i></a>
          </div>
        </div>
        <div className="page-content">
          <ul className="d-flex tabs-row px-0">
            {sectionTabs.map((tab) => (
              <li><a href="#" className={"section-tab " + (sectionTab == tab.tabReference ? "active-tab" : "")} onClick={() => setActiveSectionTab(tab.tabReference)}>{tab.name}</a></li>
            ))}
          </ul>
      
        <form action={`${process.env.REACT_APP_API_ROOT}/api/admin/product/new/`} id={form_name} method="POST" encType="multipart/form-data">
            
            <div id="tab-customer-details" className={sectionTab == "#tab-customer-details" ? "mt-5" : "d-none"}>
                <div class="mb-4">
                    <label for="order_currency_id" class="form-label">
                        Currency
                    </label>
                    <select id="order_currency_id" name="order_currency_id" class="form-control">
                        {currencies.map((currency) => (
                            <option value={currency.currency_id}>{currency.name}</option>
                        ))}
                    </select>
                </div>   
                <div class="mb-4">
                    <label for="order_customer_id" class="form-label">
                        Customer
                    </label>
                    <select id="order_customer_id" name="order_customer_id" class="form-control">
                        <option value="0">--Please Select--</option>
                        {customers.map((customer) => (
                            <option value={customer.customer_id}>{`${customer.first_name} ${customer.last_name}`}</option>
                        ))}
                    </select>
                </div>  
                {/* <div class="mb-4">
                    <label for="order_customer_group_id" class="form-label">
                        Customer Group
                    </label>
                    <select id="order_customer_group_id" name="order_customer_group_id" class="form-control">
                        {customerGroups.map((customerGroup) => (
                            <option value={customerGroup.customer_group_id}>{customerGroup.name}</option>
                        ))}
                    </select>
                </div>       */}
                <div class="mb-4">
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
                <div class="mb-4">
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
                <div class="mb-4">
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
                <div class="mb-4">
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
            </div>

            <div id="tab-products" className={sectionTab == "#tab-products" ? "mt-4" : "d-none"}>
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center align-middle">Product</th>
                        <th scope="col" className="text-center align-middle">Model</th>
                        <th scope="col" className="text-center align-middle">Quantity</th>
                        <th scope="col" className="text-center align-middle">Unit Price</th>
                        <th scope="col" className="text-center align-middle">Total</th>
                        <th scope="col" className="text-center align-middle">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderProducts.map((orderProduct,index) => {
                        return (
                            <tr>
                              <td className="text-center align-middle">{orderProduct.name}</td>
                              <td className="text-center align-middle">{orderProduct.model}</td>
                              <td className="text-center align-middle">{orderProduct.quantity}</td>
                              <td className="text-center align-middle">{orderProduct.price}</td>
                              <td className="text-center align-middle">{orderProduct.quantity * orderProduct.price}</td>
                              <td className="text-center align-middle">
                                <a href="#" title="Delete" class="btn btn-danger" onClick={() => removeProduct(orderProduct.product_id)}><i class="fa fa-trash"></i></a>
                              </td>
                            </tr>
                        )
                        })
                    }
                    {orderProducts.length <= 0 && (
                      <tr>
                        <td className="text-center align-middle" colSpan="6">No Result</td>
                      </tr>
                    )}
                    </tbody>
                </table>
                <div className="row m-0 py-5">
                    <h5 className="my-4">Add Product(s)</h5>
                    <div class="mb-4">
                        <label for="order_product_id" class="form-label">
                            Choose Product
                        </label>
                        <select id="order_product_id" name="order_product_id" class="form-control">
                            {products.map((product) => (
                                <option value={product.product_id}>{product.product_description_assoc[0].name}</option>
                            ))}
                        </select>
                    </div>    
                    <div class="mb-4">
                        <label for="order_product_quantity" class="form-label">
                            Quantity
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="order_product_quantity"
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-primary" onClick={addProduct}>Add Product</button>
                    </div>
                </div>
            </div>

            <div id="tab-data" className={sectionTab == "#tab-data" ? "mt-4" : "d-none"}>
                <div class="mb-4">
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
                <div class="mb-4">
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
                <div class="mb-4">
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
                        {countries.map((country) => (
                            <option value={country.country_id}>{country.name}</option>
                        ))}
                    </select>
                </div> 
                <div class="mb-4">
                    <label for="order_payment_id" class="form-label">
                        Payment Type
                    </label>
                    <select id="order_payment_id" name="order_payment_id" class="form-control">
                        {payments.map((payment) => (
                            <option value={payment.payment_id}>{payment.name}</option>
                        ))}
                    </select>
                </div> 
                <div class="mb-4">
                    <label for="order_shipment_id" class="form-label">
                        Shipment Type
                    </label>
                    <select id="order_shipment_id" name="order_shipment_id" class="form-control">
                        {shipments.map((shipment) => (
                            <option value={shipment.shipping_id}>{shipment.name}</option>
                        ))}
                    </select>
                </div> 
                <div class="mb-4">
                    <label for="order_order_status_id" class="form-label">
                        Order Status
                    </label>
                    <select id="order_order_status_id" name="order_order_status_id" class="form-control">
                        {orderStatuses.map(orderStatus => (
                            <option value={orderStatus.order_status_id}>{orderStatus.name}</option>
                        ))}
                    </select>
                </div> 
            </div>

            <div id="tab-total" className={sectionTab == "#tab-total" ? "mt-4" : "d-none"}>
            <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center align-middle">Product</th>
                            <th scope="col" className="text-center align-middle">Model</th>
                            <th scope="col" className="text-center align-middle">Quantity</th>
                            <th scope="col" className="text-center align-middle">Unit Price</th>
                            <th scope="col" className="text-center align-middle">Total</th>
                            <th scope="col" className="text-center align-middle">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderProducts.map((orderProduct,index) => {
                            return (
                                <tr>
                                    <td className="text-center align-middle">{orderProduct.name}</td>
                                    <td className="text-center align-middle">{orderProduct.model}</td>
                                    <td className="text-center align-middle">{orderProduct.quantity}</td>
                                    <td className="text-center align-middle">{orderProduct.price}</td>
                                    <td className="text-center align-middle">{orderProduct.quantity * orderProduct.price}</td>
                                    <td className="text-center align-middle">
                                        <a href="#" title="Delete" class="btn btn-danger" onClick={() => removeProduct(orderProduct.product_id)}><i class="fa fa-trash"></i></a>
                                    </td>
                                </tr>
                            )
                            })
                        }
                        <tr>
                            <td className="text-end align-middle" colSpan="5">Total Price</td>
                            <td className="text-center align-middle">{`$ ${orderProducts.reduce((total,product) => parseFloat(product.price) * parseFloat(product.quantity) + total ,0)}`}</td>
                        </tr>
                        <tr>
                            <td className="text-end align-middle" colSpan="5">Total Price with Tax</td>
                            <td className="text-center align-middle">{`$ ${orderProducts.reduce((total,product) => (parseFloat(product.price) + parseFloat(product.tax)) * parseFloat(product.quantity) + total ,0)}`}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
}

export default OrderAddPage;


