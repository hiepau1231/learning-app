import React from "react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import Course_Card from "./Course_Card"

function Course_Slider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={50}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="w-full py-10"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-col justify-center md:justify-start items-center md:items-start sm:flex-row gap-6">
          <p className="h-[300px] w-full rounded-xl skeleton"></p>
          <p className="h-[300px] w-full rounded-xl hidden lg:flex skeleton"></p>
          <p className="h-[300px] w-full rounded-xl hidden lg:flex skeleton"></p>
        </div>
      )}
    </>
  )
}

export default Course_Slider
