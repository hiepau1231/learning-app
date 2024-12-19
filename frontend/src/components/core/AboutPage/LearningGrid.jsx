import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "Học Tập Cấp Cao Cho",
    highlightText: "Mọi Người, Mọi Nơi",
    description:
      "Tri Thức Mới hợp tác với hơn 275+ trường đại học và công ty hàng đầu để mang đến những khóa học linh hoạt, giá cả phải chăng và liên quan đến công việc cho các cá nhân và tổ chức trên toàn cầu.",
    BtnText: "Tìm Hiểu Thêm",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Chương Trình Học Dựa Trên Nhu Cầu Ngành",
    description:
      "Tiết kiệm thời gian và tiền bạc! Chương trình học của Belajar được thiết kế dễ hiểu và phù hợp với nhu cầu của ngành.",
  },
  {
    order: 2,
    heading: "Phương Pháp Học Của Chúng Tôi",
    description:
      "Tri Thức Mới hợp tác với hơn 275+ trường đại học và công ty hàng đầu để mang đến",
  },
  {
    order: 3,
    heading: "Chứng Nhận",
    description:
      "Tri Thức Mới hợp tác với hơn 275+ trường đại học và công ty hàng đầu để mang đến",
  },
  {
    order: 4,
    heading: `Đánh Giá "Tự Chấm Điểm"`,
    description:
      "Tri Thức Mới hợp tác với hơn 275+ trường đại học và công ty hàng đầu để mang đến",
  },
  {
    order: 5,
    heading: "Sẵn Sàng Làm Việc",
    description:
      "Tri Thức Mới hợp tác với hơn 275+ trường đại học và công ty hàng đầu để mang đến",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto w-[350px] lg:w-fit grid-cols-1 lg:grid-cols-4 mb-12">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${i === 0 && "lg:col-span-2 lg:h-[294px]"}  ${
              card.order % 2 === 1
                ? "bg-richblack-700 h-[294px]"
                : card.order % 2 === 0
                ? "bg-richblack-800 h-[294px]"
                : "bg-transparent"
            } ${card.order === 3 && "lg:col-start-2"}  `}
          >
            {card.order < 0 ? (
              <div className="lg:w-[90%] flex flex-col gap-3 pb-10 lg:pb-0">
                <div className="text-4xl font-semibold ">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-richblack-5 text-lg">{card.heading}</h1>

                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
