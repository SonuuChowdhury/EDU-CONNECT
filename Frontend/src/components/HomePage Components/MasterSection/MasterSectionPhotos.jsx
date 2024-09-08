/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react';

import './MasterSectionPhotos.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 

const MasterPhotos = ({ params = [] }) => {

  return (<>
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
    >
      {params.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="ImageContainer" style={{ backgroundImage: `url(${image.link})` }}>
            <p className='titleArea'>{image.title}</p>     
          </div> 
                   
        </SwiperSlide>
      ))}
    </Swiper>

    <div className='masterTextArea'>Our college stands as a beacon of excellence, proudly ranked Ist in the NIRF rankings. With a legacy of academic brilliance, cutting-edge research, and a commitment to holistic Developement</div>

    
    </>
  )
}

export default MasterPhotos;
