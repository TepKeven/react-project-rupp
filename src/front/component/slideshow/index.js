import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "./index.css";

function SlideshowComponent() {
  const [slideshowItems, setSlideshowItems] = useState([
    {
      id: 1,
      title: "Welcome to Shop",
      descriptipn: "The Best Electronics in Cambodia. <br/> The Best Electronics in Cambodia.",
      image: "/assets/images/banners/banner1.jpg",
    },
    {
      id: 2,
      title: "Welcome to Shop",
      descriptipn: "The Best Electronics in Cambodia. <br/> The Best Electronics in Cambodia.",
      image: "/assets/images/banners/banner1.jpg",
    },
    {
      id: 3,
      title: "Welcome to Shop",
      descriptipn: "The Best Electronics in Cambodia. <br/> The Best Electronics in Cambodia.",
      image: "/assets/images/banners/banner1.jpg",
    },
    {
      id: 4,
      title: "Welcome to Shop",
      descriptipn: "The Best Electronics in Cambodia. <br/> The Best Electronics in Cambodia.",
      image: "/assets/images/banners/banner1.jpg",
    },
  ]);

  return (
    <Carousel>
      {slideshowItems.map((slideshowItem) => {
        return (
          <Carousel.Item key={slideshowItem.id} className="position-relative">
            <img
              className="d-block w-100"
              src={slideshowItem.image}
              alt="First slide"
            />
            <Carousel.Caption className="slideshow-caption text-end w-25">
              <h1 className="caption-title">{slideshowItem.title}</h1>
              <p className="caption-description text-dark" dangerouslySetInnerHTML={{ __html: slideshowItem.descriptipn }} />
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default SlideshowComponent;
