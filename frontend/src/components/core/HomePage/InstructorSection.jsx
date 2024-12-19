import React from "react";
import Instructor from "../../../assets/Images/teacher3.png";
import HighlightText from "./HighlightText";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Img from "./../../common/Img";

import { motion } from "framer-motion";
import { scaleUp } from "./../../common/motionFrameVarients";

const InstructorSection = () => {
  return (
    <div>
      <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-20 items-center">
        <motion.div
          variants={scaleUp}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.1 }}
          className="lg:w-[50%] "
        >
          <Img
            src={Instructor}
            alt="Giảng viên"
            className="shadow-white rounded-3xl"
          />
        </motion.div>

        <div className="lg:w-[50%] flex flex-col">
          <div className="text-3xl lg:text-4xl font-semobold w-[50%] mb-2">
            Trở thành
            <HighlightText text={"Giảng viên"} />
          </div>

          <p className="font-medium text-[16px] w-[80%] text-richblack-300 mb-12">
            Các giảng viên từ khắp nơi trên thế giới dạy hàng triệu học viên
            trên Tri Thức Mới. Chúng tôi cung cấp công cụ và kỹ năng để bạn dạy
            những gì bạn yêu thích.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row gap-2 items-center">
                Bắt đầu học ngay hôm nay
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
