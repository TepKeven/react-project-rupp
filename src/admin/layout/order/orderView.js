import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import "./index.css";
import axios from "axios"

function OrderViewPage() {

  const form_name = "form-order-view"
  const params = useParams();
  
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
  const [orderInfo, setOrderInfo] = useState({})
  const [orderCurrency, setOrderCurrency] = useState("")
  


  const navigate = useNavigate();


  useEffect(() => {
      
      axios.get(`${process.env.REACT_APP_API_ROOT}/api/admin/order/edit/${params.order_id}`)
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
        setOrderProducts(response.data.order_products)
        setOrderInfo(response.data.order)

        const allCurrencies = response.data.currencies
        const myOrder = response.data.order
        setOrderCurrency(allCurrencies.find(currency => currency.currency_id == myOrder.currency_id).symbol_left)
        // console.log(response.data)
      })
      
      
  },[])

  const printOrder = () => {
    window.print();
  }
  
  return (
    <div id="app">
      <SidebarComponent />
      <div id="main">
        <NavbarComponent />
        <div className="page-heading d-flex align-items-center justify-content-between">
          <h3>Add Order</h3>
          <div class="pull-right">
            <a href="/admin/order" data-toggle="tooltip" title="" class="btn btn-danger" data-original-title="Cancel"><i class="fa fa-reply"></i></a>
          </div>
        </div>
        <div className="page-content">
            {orderInfo.payment_id && (
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center align-middle">Order Details</th>
                            <th scope="col" className="text-center align-middle">Customer Details</th>
                            <th scope="col" className="text-center align-middle">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-center align-middle">{orderInfo.store_name}</td>
                            <td className="text-center align-middle">{`${orderInfo.first_name} ${orderInfo.last_name}`}</td>
                            <td className="text-center align-middle">
                                <button class="btn btn-success" onClick={printOrder}><i class="fa fa-print me-2"></i> Print Order</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center align-middle">{new Date(orderInfo.createdAt).toDateString()}</td>
                            <td className="text-center align-middle">{orderStatuses.find(orderStatus => orderStatus.order_status_id == orderInfo.order_status_id).name}</td>
                            <td className="text-center align-middle">
                                <a href={`/admin/order/edit/${orderInfo.order_id}`} title="Edit" class="btn btn-primary"><i class="fa fa-pencil me-2"></i>Edit Order</a>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center align-middle">{payments.find(payment => payment.payment_id == orderInfo.payment_id).name}</td>
                            <td className="text-center align-middle">{orderInfo.email}</td>
                        </tr>
                        <tr>
                            <td className="text-center align-middle">{shipments.find(shipment => shipment.shipping_id == orderInfo.shipping_id).name}</td>
                            <td className="text-center align-middle">{orderInfo.telephone}</td>
                            
                        </tr>
                    </tbody>
                </table>
            )}
            <h4>{`Order #${orderInfo.order_id}`}</h4>
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col" className="text-start align-middle">Invocie Prefix</th>
                        <th scope="col" className="text-start align-middle">Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-start align-middle">{orderInfo.invoice_prefix}</td>
                        <td className="text-start align-middle">{`${orderInfo.address} ${orderInfo.city} ${orderInfo.country}`}</td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-bordered table-hover mt-5">
                <thead>
                    <tr>
                        <th scope="col" className="text-center align-middle">Products</th>
                        <th scope="col" className="text-center align-middle">Model</th>
                        <th scope="col" className="text-center align-middle">Quantity</th>
                        <th scope="col" className="text-center align-middle">Unit Price</th>
                        <th scope="col" className="text-center align-middle">Unit Tax</th>
                        <th scope="col" className="text-center align-middle">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orderProducts.map(orderProduct => (
                        <>
                            <tr>
                                <td className="text-center align-middle">{orderProduct.name}</td>
                                <td className="text-center align-middle">{orderProduct.model}</td>
                                <td className="text-center align-middle">{orderProduct.quantity}</td>
                                <td className="text-center align-middle">{`${orderCurrency} ${orderProduct.price}`}</td>
                                <td className="text-center align-middle">{`${orderCurrency} ${orderProduct.tax}`}</td>
                                <td className="text-center align-middle">{`${orderCurrency} ${parseFloat(orderProduct.price) * orderProduct.quantity}`}</td>
                            </tr>
                            <tr>
                                <td className="text-end align-middle" colSpan={5}>Total Price</td>
                                <td className="text-center align-middle">{`${orderCurrency} ${orderProducts.reduce((total,product) => (parseFloat(product.price)) * parseFloat(product.quantity) + total ,0)}`}</td>
                            </tr>
                            <tr>
                                <td className="text-end align-middle" colSpan={5}>Tax</td>
                                <td className="text-center align-middle">{`${orderCurrency} ${orderProducts.reduce((total,product) => parseFloat(product.tax) * parseFloat(product.quantity) + total ,0)}`}</td>
                            </tr>
                            <tr>
                                <td className="text-end align-middle" colSpan={5}>Total Price with Tax</td>
                                <td className="text-center align-middle">{`${orderCurrency} ${orderProducts.reduce((total,product) => (parseFloat(product.price) + parseFloat(product.tax)) * parseFloat(product.quantity) + total ,0)}`}</td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
}

export default OrderViewPage;


