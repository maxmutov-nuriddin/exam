/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Link } from 'react-router-dom';

import imgs from '../../assets/publik.png';
import { Link } from 'react-router-dom';


const BlogPosts = ({ info, slidesPerView }) => {

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
                    By <span className='popular__author-span'>{element.title}</span> |{' '}
                    {element.createdAt.split('T')[0]}
                  </p>
                  <Link to={`post/${element._id}`}>
                    <h3 className='popular__title'>{element.description}</h3>
                  </Link>
                  <p className='popular__description'></p>
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