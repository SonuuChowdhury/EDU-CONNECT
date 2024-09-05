import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 

export default MasterPhotos = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
    >
      <SwiperSlide>
        <img src="image1.jpg" alt="Image 1" style={{ width: '100%', height: 'auto' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src="image2.jpg" alt="Image 2" style={{ width: '100%', height: 'auto' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src="image3.jpg" alt="Image 3" style={{ width: '100%', height: 'auto' }} />
      </SwiperSlide>

      
    </Swiper>
  );
};


