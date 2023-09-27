/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Link } from 'react-router-dom';

import imgs from '../../assets/publik.png';
import { Link } from 'react-router-dom';


const BlogPosts = ({ info }) => {
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

  // console.log(info);


  return (
    <section className='popular'>
      <div className='container'>
        <h2>Popular blogs</h2>
        <Swiper
          spaceBetween={10}
          slidesPerView={slidesPerView}
        >
          {info.map((element, index) => (
            <SwiperSlide key={index}>
              <div className='popular__item'>
                <div className='popular__image'>
                  <img className='popular__image-photo' src={imgs} alt='img' />
                </div>
                <div className='popular__details'>
                  <p className='popular__author'>
                    By <span className='popular__author-span'>{element.user.first_name} {element.user.last_name}</span> |{' '}
                    {element.createdAt.split('T')[0]}
                  </p>
                  <Link to={`post/${element._id}`}>
                    <h3 className='popular__title'>{element.description}</h3>
                  </Link>
                  <p className='popular__description'>{element.category.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BlogPosts;