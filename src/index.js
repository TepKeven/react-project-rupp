import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import storeAdmin from './store/admin/store';
// import "./assets/css/front/bootstrap-5.2.3.min.css"
// import "./assets/css/front/font-awesome.min.css"
// import "./assets/css/front/nouislider.min.css"
// import "./assets/css/front/slick-theme.css"
// import "./assets/css/front/slick.css"
// import "./assets/css/front/style.css"

// import "./assets/css/admin/bold.css"
// import "./assets/css/admin/perfect-scrollbar.css"
// import "./assets/css/admin/bootstrap-icons.css"
// import "./assets/css/admin/app.css"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={storeAdmin}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
