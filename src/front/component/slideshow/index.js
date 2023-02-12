import React, { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import axios from "axios";
import "./index.css";

function SlideshowComponent() {
  
  const [slideshowItems, setSlideshowItems] = useState([
    // {
    //   id: 1,
    //   title: "Welcome to Shop",
    //   descriptipn: "The Best Electronics in Cambodia. <br/> The Best Electronics in Cambodia.",
    //   image: "/assets/images/banners/banner1.jpg",
    // },
    // {
    //   id: 2,
    //   title: "Welcome to Shop",
    //   descriptipn: "The Best Electronics in Cambodia. <br/> The Best Electronics in Cambodia.",
    //   image: "/assets/images/banners/banner1.jpg",
    // },
    // {
    //   id: 3,
    //   title: "Welcome to Shop",
    //   descriptipn: "The Best Electronics in Cambodia. <br/> The Best Electronics in Cambodia.",
    //   image: "/assets/images/banners/banner1.jpg",
    // },
    // {
    //   id: 4,
    //   title: "Welcome to Shop",
    //   descriptipn: "The Best Electronics in Cambodia. <br/> The Best Electronics in Cambodia.",
    //   image: "/assets/images/banners/banner1.jpg",
    // },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4000/api/slideshow");
      console.log(response)
      if(response.data != null){
        setSlideshowItems(response.data.slideshows);
      }
    };
    
    fetchData();
  }, []);

  return (
    <Carousel>
      {slideshowItems.map((slideshowItem) => {
        return (
          <Carousel.Item key={slideshowItem.id} className="position-relative">
            <img
              className="d-block w-100"
              src={`${process.env.REACT_APP_IMAGE_SLIDESHOW}/${slideshowItem.image}`}
              alt={slideshowItem.title}
            />
            <Carousel.Caption className="slideshow-caption text-end w-25">
              <h1 className="caption-title">{slideshowItem.title}</h1>
              <p className="caption-description text-dark" dangerouslySetInnerHTML={{ __html: slideshowItem.description }} />
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default SlideshowComponent;
