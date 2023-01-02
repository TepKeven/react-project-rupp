import './App.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import NavBar from './front/navbar/navbar';
import Homepage from './front/home/home';
import AboutPage from './front/about/about';
import ContactPage from './front/contact/contact';
import Footer from './front/footer/footer';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "about",
    element: <AboutPage />,
  },
  {
    path: "contact",
    element: <ContactPage />,
  },
]);


function App() {
  return (
    <>
    <NavBar/>
    <RouterProvider router={routes} />
    <Footer/>
    </>
  );
}

export default App;
