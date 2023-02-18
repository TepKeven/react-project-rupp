import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import FooterComponent from "../../component/footer";
import NavbarComponent from "../../component/navbar";
import SidebarComponent from "../../component/sidebar";
import axios from "axios"
import globalVariable from "../../variable";

function DashboardPage() {

  const [dashboardInfo, setDashboardInfo] = useState({})
  const [salesMonthSeries, setSalesMonthSeries] = useState([])
  const [subscriberNumberSeries, setSubscriberNumberSeries] = useState([])
  const [salesByCountries, setSalesByCountries] = useState({})
  const [linegraphStyle, setLineGraphStyle] = useState([
      globalVariable.optionsCountriesRed,
      globalVariable.optionsCountriesBlue,
      globalVariable.optionsCountriesCornFlower,
      globalVariable.optionsCountriesGreen,
      globalVariable.optionsCountriesOrange
  ])

  var salesPerEachMonth;

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_API_ROOT}/api/admin/dashboard`, globalVariable.axiosConfig)
      .then(function (response) {
        
        // console.log(response.data)

        var newSalesMonthSeries = globalVariable.seriesProfileVisit

        newSalesMonthSeries = [
          {
            name: "sales",
            data: response.data.overall_order_by_month
          }
        ]

        var subscriberCount = response.data.newsletter_count.map(newsletter => {
          return newsletter.count;
        })

        setDashboardInfo(response.data)
        setSalesMonthSeries(newSalesMonthSeries)
        setSubscriberNumberSeries(subscriberCount)
        setSalesByCountries(response.data.order_country_by_month)
        console.log(response.data.order_country_by_month)

      }).catch((error) => {
        // console.log(error)
        window.location.assign("/admin/login")
      })
      
  },[])
  
  return (
    <div id="app">
      <SidebarComponent />
      <div id="main">
        <NavbarComponent/>
        <div className="page-heading">
          <h3>Profile Statistics</h3>
        </div>
        <div className="page-content">
          <section className="row">
            <div className="col-12 col-lg-9">
              <div className="row">
                <div className="col-6 col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body px-3 py-4-5">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="stats-icon purple">
                            <i className="fas fa-eye"></i>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <h6 className="text-muted font-semibold">
                            Order Count
                          </h6>
                          <h6 className="font-extrabold mb-0">{dashboardInfo.orders && dashboardInfo.orders.length} Orders</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body px-3 py-4-5">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="stats-icon blue">
                            <i className="fas fa-user"></i>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <h6 className="text-muted font-semibold">Profit Total</h6>
                          <h6 className="font-extrabold mb-0">{dashboardInfo.total_revenue && `$ ${dashboardInfo.total_revenue.total}`}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body px-3 py-4-5">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="stats-icon green">
                            <i className="fa fa-user-plus"></i>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <h6 className="text-muted font-semibold">Customers</h6>
                          <h6 className="font-extrabold mb-0">{dashboardInfo.customers && dashboardInfo.customers.length} People</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body px-3 py-4-5">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="stats-icon red">
                            <i className="fa-solid fa-bookmark"></i>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <h6 className="text-muted font-semibold">Online</h6>
                          <h6 className="font-extrabold mb-0">{dashboardInfo.customer_online && dashboardInfo.customer_online.customer_online} People</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4>Sales Per Month</h4>
                    </div>
                    <div className="card-body">
                      <div id="chart-profile-visit">
                        <Chart
                          options={globalVariable.optionsSalesPerMonth}
                          series={salesMonthSeries}
                          type="bar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-xl-4">
                  <div className="card">
                    <div className="card-header">
                      <h4>Orders by Countries</h4>
                    </div>
                    <div className="card-body">
                      {Object.entries(salesByCountries).map(([key, salesByCountry], index) => (
                        <div className="row mt-3">
                          <div className="col-6">
                            <div className="d-flex align-items-center">
                              <svg
                                className="bi text-primary"
                                width="32"
                                height="32"
                                fill="blue"
                                style={{ width: 10 }}
                              >
                                <use xlinkHref="assets/vendors/bootstrap-icons/bootstrap-icons.svg#circle-fill" />
                              </svg>
                              <h5 className="mb-0 ms-3">{key}</h5>
                            </div>
                          </div>
                          <div className="col-6">
                            <h5 className="mb-0 mx-2">{salesByCountry["order_count"]}</h5>
                          </div>
                          <div className="col-12">
                            <div id="chart-europe">
                              <Chart
                                options={linegraphStyle[Math.floor(Math.random() * 5)]}
                                series={salesByCountry["data_stats"]}
                                type="area"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* <div className="row">
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <svg
                              className="bi text-success"
                              width="32"
                              height="32"
                              fill="blue"
                              style={{ width: 10 }}
                            >
                              <use xlinkHref="assets/vendors/bootstrap-icons/bootstrap-icons.svg#circle-fill" />
                            </svg>
                            <h5 className="mb-0 ms-3">America</h5>
                          </div>
                        </div>
                        <div className="col-6">
                          <h5 className="mb-0">375</h5>
                        </div>
                        <div className="col-12">
                          <div id="chart-america">
                            <Chart
                              options={globalVariable.optionsAmerica}
                              series={globalVariable.seriesEurope}
                              type="area"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <svg
                              className="bi text-danger"
                              width="32"
                              height="32"
                              fill="blue"
                              style={{ width: 10 }}
                            >
                              <use xlinkHref="assets/vendors/bootstrap-icons/bootstrap-icons.svg#circle-fill" />
                            </svg>
                            <h5 className="mb-0 ms-3">Indonesia</h5>
                          </div>
                        </div>
                        <div className="col-6">
                          <h5 className="mb-0">1025</h5>
                        </div>
                        <div className="col-12">
                          <div id="chart-indonesia">
                            <Chart
                              options={globalVariable.optionsCountries}
                              series={globalVariable.seriesEurope}
                              type="area"
                            />
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-8">
                  <div className="card">
                    <div className="card-header">
                      <h4>Latest Comments</h4>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-lg">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Comment</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="col-3">
                                <div className="d-flex align-items-center">
                                  <div className="avatar avatar-md">
                                    <img src="/assets/images/faces/1.jpg" />
                                  </div>
                                  <p className="font-bold ms-3 mb-0">Si Cantik</p>
                                </div>
                              </td>
                              <td className="col-auto">
                                <p className=" mb-0">
                                  Congratulations on your graduation!
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td className="col-3">
                                <div className="d-flex align-items-center">
                                  <div className="avatar avatar-md">
                                    <img src="/assets/images/faces/1.jpg" />
                                  </div>
                                  <p className="font-bold ms-3 mb-0">Si Ganteng</p>
                                </div>
                              </td>
                              <td className="col-auto">
                                <p className=" mb-0">
                                  Wow amazing design! Can you make another
                                  tutorial for this design?
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="card">
                <div className="card-body py-4 px-5">
                  <div className="d-flex align-items-center">
                    <div className="avatar avatar-xl">
                      <img src={dashboardInfo.user_in_session && (dashboardInfo.user_in_session.image.length <= 0 ? "/assets/images/faces/1.jpg" : `${process.env.REACT_APP_IMAGE_USER}/${dashboardInfo.user_in_session.image}`)} alt="User" />
                    </div>
                    <div className="ms-3 name">
                      <h5 className="font-bold">{dashboardInfo.user_in_session && dashboardInfo.user_in_session.username}</h5>
                      <a href={`mailto:${dashboardInfo.user_in_session && dashboardInfo.user_in_session.email}`}><h6 className="text-muted mb-0">@{dashboardInfo.user_in_session && dashboardInfo.user_in_session.username}</h6></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <h4>Recent Customers</h4>
                </div>
                <div className="card-content pb-4">
                  {dashboardInfo.recent_customers && dashboardInfo.recent_customers.map(recent_customer => (
                    <div className="recent-message d-flex px-4 py-3">
                      <div className="avatar avatar-lg">
                        <img src={recent_customer.image.length <= 0 ? "/assets/images/faces/1.jpg" : `${process.env.REACT_APP_IMAGE_CUSTOMER}/${recent_customer.image}`} />
                      </div>
                      <div className="name ms-4">
                        <h5 className="mb-1">{recent_customer.first_name}</h5>
                        <a href={`mailto:${recent_customer.email}`}><h6 className="text-muted mb-0">@{recent_customer.first_name}</h6></a>
                      </div>
                    </div>
                  ))}
                  <div className="px-4">
                    <button className="btn btn-block btn-xl btn-light-primary font-bold mt-3">
                      Start Conversation
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <h4>Subscriber Acceptance</h4>
                </div>
                <div className="card-body">
                  <div id="chart-visitors-profile">
                    <Chart options={globalVariable.optionsSubscriberNumber} series={subscriberNumberSeries} type="donut" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <FooterComponent/>       
      </div>
    </div>
  );
}

export default DashboardPage;
