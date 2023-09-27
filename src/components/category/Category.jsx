/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';


import img from '../../assets/Icon.svg'
const Category = ({ category }) => {
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 735) {
        setSlidesPerView(1);
      } else if (windowWidth < 1100) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // console.log(category);


  return (
    <section className="category">
      <div className="container">
        <h2 className="category__title">Choose A Category</h2>
        <Swiper
          spaceBetween={40}
          slidesPerView={slidesPerView}
          className="category__swiper"
        >
          {category.data.map((element, index) => (
            <SwiperSlide key={index}>
              <Link to={`/category/${element._id}`}>
                <div className="category__item popular__item">
                  <div className="category__image popular__image">
                    <img className="category__image-photo popular__image-photo" src={img} alt="img" />
                  </div>
                  <div className="category__details popular__details">
                    <h3 className="category__title title popular__title ">{element.name}</h3>
                    <p className="category__description popular__description">{element.description}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Category