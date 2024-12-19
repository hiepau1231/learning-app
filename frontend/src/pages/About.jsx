import FoundingStory from "../assets/Images/FoundingStory.png";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";

import Footer from "../components/common/Footer";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponenet from "../components/core/AboutPage/Stats";
import HighlightText from "../components/core/HomePage/HighlightText";
import Img from "../components/common/Img";
import ReviewSlider from "./../components/common/ReviewSlider";

import { motion } from "framer-motion";
import { fadeIn } from "../components/common/motionFrameVarients";

const About = () => {
  return (
    <div>
      <section className="bg-richblack-700">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <motion.header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            <motion.p
              variants={fadeIn("down", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.1 }}
            >
              {" "}
              Thúc đẩy sự đổi mới trong giáo dục trực tuyến cho một
              <HighlightText text={"Tương Lai Sáng Lạng"} />
            </motion.p>

            <motion.p
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.1 }}
              className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]"
            >
              Tri Thức Mới đang dẫn đầu trong việc thúc đẩy sự đổi mới trong giáo
              dục trực tuyến. Chúng tôi đam mê tạo ra một tương lai sáng lạng
              bằng cách cung cấp các khóa học tiên tiến, tận dụng công nghệ mới
              nổi và xây dựng một cộng đồng học tập năng động.
            </motion.p>
          </motion.header>

          <div className="sm:h-[70px] lg:h-[150px]"></div>

          <div className=" absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <Img src={BannerImage1} alt="" />
            <Img src={BannerImage2} alt="" />
            <Img src={BannerImage3} alt="" />
          </div>
        </div>
      </section>

      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <motion.div
              variants={fadeIn("right", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.1 }}
              className="my-24 flex lg:w-[50%] flex-col gap-10"
            >
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Câu chuyện sáng lập của chúng tôi
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Nền tảng học trực tuyến của chúng tôi ra đời từ một tầm nhìn
                chung và niềm đam mê thay đổi giáo dục. Mọi chuyện bắt đầu với
                một nhóm giáo viên, chuyên gia công nghệ và những người học suốt
                đời nhận ra nhu cầu tạo ra cơ hội học tập dễ tiếp cận, linh hoạt
                và chất lượng cao trong một thế giới số đang phát triển nhanh
                chóng.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Là những giáo viên giàu kinh nghiệm, chúng tôi đã chứng kiến
                những hạn chế và thử thách của hệ thống giáo dục truyền thống.
                Chúng tôi tin rằng giáo dục không nên bị gò bó trong bốn bức
                tường của lớp học hay bị hạn chế bởi ranh giới địa lý. Chúng tôi
                hình dung một nền tảng có thể nối liền những khoảng cách này và
                giúp mọi cá nhân từ mọi tầng lớp có thể phát huy hết tiềm năng
                của mình.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn("left", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.1 }}
            >
              <Img
                src={FoundingStory}
                alt="FoundingStory"
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </motion.div>
          </div>

          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Tầm nhìn của chúng tôi
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Với tầm nhìn này, chúng tôi bắt đầu hành trình tạo ra một nền
                tảng học trực tuyến sẽ cách mạng hóa cách mọi người học. Đội ngũ
                chuyên gia tận tâm của chúng tôi đã làm việc không mệt mỏi để
                phát triển một nền tảng mạnh mẽ và trực quan kết hợp công nghệ
                tiên tiến với nội dung hấp dẫn, tạo ra một trải nghiệm học tập
                năng động và tương tác.
              </p>
            </div>

            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                Sứ mệnh của chúng tôi
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Sứ mệnh của chúng tôi không chỉ là cung cấp các khóa học trực
                tuyến. Chúng tôi muốn tạo ra một cộng đồng học viên sôi động,
                nơi mọi người có thể kết nối, hợp tác và học hỏi lẫn nhau. Chúng
                tôi tin rằng kiến thức sẽ phát triển trong một môi trường chia
                sẻ và đối thoại, và chúng tôi khuyến khích tinh thần hợp tác này
                qua các diễn đàn, buổi học trực tiếp và cơ hội giao lưu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsComponenet />

      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <LearningGrid />
        <ContactFormSection />
      </section>

      {/* Đánh giá từ các học viên khác */}
      <div className=" my-20 px-5 text-white ">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Đánh giá từ các học viên khác
        </h1>
        <ReviewSlider />
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default About;
