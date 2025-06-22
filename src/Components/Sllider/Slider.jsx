import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";

import img1 from "../../assets/home/1.jpg";
import img2 from "../../assets/home/2.jpg";
import img3 from "../../assets/home/3.jpg";
import img4 from "../../assets/home/4.jpg";
import img5 from "../../assets/home/5.jpg";
import img6 from "../../assets/home/6.jpg";
import img7 from "../../assets/home/7.jpg";
import img8 from "../../assets/home/8.jpg";
import img9 from "../../assets/home/9.jpg";
import img10 from "../../assets/home/10.jpg";

const Slider = () => {
  return (
    <Swiper
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      navigation={true}
      modules={[Navigation, Autoplay]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="w-full aspect-video flex items-center justify-center">
          <img
            src={img1}
            alt="slide 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full aspect-video flex items-center justify-center">
          <img
            src={img2}
            alt="slide 2"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full aspect-video flex items-center justify-center">
          <img
            src={img3}
            alt="slide 3"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full aspect-video flex items-center justify-center">
          <img
            src={img4}
            alt="slide 4"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full aspect-video flex items-center justify-center">
          <img
            src={img5}
            alt="slide 5"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full aspect-video flex items-center justify-center">
          <img
            src={img6}
            alt="slide 6"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full aspect-video flex items-center justify-center">
          <img
            src={img7}
            alt="slide 7"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full aspect-video flex items-center justify-center">
          <img
            src={img8}
            alt="slide 8"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full aspect-video flex items-center justify-center">
          <img
            src={img9}
            alt="slide 9"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full aspect-video flex items-center justify-center">
          <img
            src={img10}
            alt="slide 10"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
