import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import "swiper/swiper-bundle.css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import img_1 from "../../assets/img-1.jpeg";
import img_2 from "../../assets/img-2.jpeg";
import img_3 from "../../assets/img-3.jpeg";
import img_4 from "../../assets/Img-4.jpeg";

const Hero = () => {
    return (
        <Swiper
            spaceBetween={30}
            effect={'fade'}
            centeredSlides={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[EffectFade, Autoplay, Pagination]}
            className="mySwiper h-90 z-0 relative"
        >
            <SwiperSlide>
                <img src={img_1} alt="image-1" className="bg-green-100 w-full h-full object-cover grayscale" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={img_2} alt="image-2" className="bg-red-100 w-full h-full object-cover grayscale" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={img_3} alt="image-3" className="bg-blue-100 w-full h-full object-cover grayscale" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={img_4} alt="image-4" className="bg-yellow-100 w-full h-full object-cover grayscale" />
            </SwiperSlide>

            <div className="flex justify-center items-center gap-x-4 h-80 z-50 absolute" style={{ top: "5%", left: "38%" }}>
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                    <input type="search" required placeholder="Search" className="w-80" />
                </label>
                <button type="submit" className="btn btn-neutral">Search</button>
            </div>
        </Swiper>
    )
}

export default Hero;