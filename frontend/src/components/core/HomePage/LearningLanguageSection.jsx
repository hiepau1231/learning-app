import React from "react";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "../HomePage/Button";

const LearningLanguageSection = () => {
  return (
    <div className="mt-[130px] mb-10">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-3xl lg:text-4xl font-semibold text-center">
          Công cụ tuyệt vời của bạn để
          <HighlightText text={" học bất kỳ ngôn ngữ nào"} />
        </div>

        <div className="lg:text-center text-richblack-600 mx-auto text-base font-medium lg:w-[70%]">
          Sử dụng Spin giúp việc học nhiều ngôn ngữ trở nên dễ dàng. Với hơn 20
          ngôn ngữ, giọng nói thực tế, theo dõi tiến độ, lịch trình tùy chỉnh và
          nhiều tính năng khác.
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center mt-5">
          <img
            src={know_your_progress}
            alt="Biết Tiến Độ Của Bạn"
            className="object-contain lg:-mr-32"
          />
          <img
            src={compare_with_others}
            alt="So Sánh Với Người Khác"
            className="object-contain"
          />
          <img
            src={plan_your_lesson}
            alt="Lên Kế Hoạch Bài Học"
            className="object-contain lg:-ml-36"
          />
        </div>

        <div className="w-fit">
          <CTAButton active={true} linkto={"/signup"}>
            <div>Tìm hiểu thêm</div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
