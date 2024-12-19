import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";
import Course_Slider from "../components/core/Catalog/Course_Slider";

import { getAllCatalogPageData } from "../services/operations/pageAndComponentData";

import { MdOutlineRateReview } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

import { motion } from "framer-motion";
import { fadeIn } from "../components/common/motionFrameVarients";

// background random images
import backgroundImg1 from "../assets/Images/random bg img/coding bg1.jpg";
import backgroundImg2 from "../assets/Images/random bg img/coding bg2.jpg";
import backgroundImg3 from "../assets/Images/random bg img/coding bg3.jpg";
import backgroundImg4 from "../assets/Images/random bg img/coding bg4.jpg";
import backgroundImg5 from "../assets/Images/random bg img/coding bg5.jpg";
import backgroundImg6 from "../assets/Images/random bg img/coding bg6.jpeg";
import backgroundImg7 from "../assets/Images/random bg img/coding bg7.jpg";
import backgroundImg8 from "../assets/Images/random bg img/coding bg8.jpeg";
import backgroundImg9 from "../assets/Images/random bg img/coding bg9.jpg";
import backgroundImg10 from "../assets/Images/random bg img/coding bg10.jpg";
import backgroundImg111 from "../assets/Images/random bg img/coding bg11.jpg";

const randomImges = [
    backgroundImg1,
    backgroundImg2,
    backgroundImg3,
    backgroundImg4,
    backgroundImg5,
    backgroundImg6,
    backgroundImg7,
    backgroundImg8,
    backgroundImg9,
    backgroundImg10,
    backgroundImg111,
];

// hardcoded

const Home = () => {
    const { token } = useSelector((state) => state.auth);
    // get background random images
    const [backgroundImg, setBackgroundImg] = useState(null);

    useEffect(() => {
        const bg = randomImges[Math.floor(Math.random() * randomImges.length)];
        setBackgroundImg(bg);
    }, []);

    // console.log('bg ==== ', backgroundImg)

    // get courses data
    const [CatalogPageData, setCatalogPageData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCatalogPageData = async () => {
            const result = await getAllCatalogPageData(token, dispatch);
            setCatalogPageData(result);
            // console.log("page data ==== ",CatalogPageData);
        };
        fetchCatalogPageData();
    }, []);

    // console.log('================ CatalogPageData?.selectedCourses ================ ', CatalogPageData)

    return (
        <React.Fragment>
            {/* background random image */}
            <div>
                <div className="w-full h-[450px] md:h-[650px] absolute top-0 left-0 opacity-[0.3] overflow-hidden object-cover ">
                    <img
                        src={backgroundImg}
                        alt="Background"
                        className="w-full h-full object-cover "
                    />

                    <div className="absolute left-0 bottom-0 w-full h-[250px] opacity_layer_bg "></div>
                </div>
            </div>

            <div className=" ">
                {/*Section1  */}
                <div className="relative h-[450px] md:h-[550px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white ">
                    <Link to={"/signup"}>
                        <div
                            className="z-0 group p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                                        transition-all duration-200 hover:scale-95 w-fit"
                        >
                            <div
                                className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                              transition-all duration-200 group-hover:bg-richblack-900"
                            >
                                <p>Học thôi nào </p>
                                <FaArrowRight />
                            </div>
                        </div>
                    </Link>

                    <motion.div
                        variants={fadeIn("left", 0.1)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.1 }}
                        className="text-center text-3xl lg:text-4xl font-semibold mt-7  "
                    >
                        CHỦ ĐỀ A:
                        <HighlightText text={"MÁY TÍNH VÀ XÃ HỘI TRI THỨC"} />
                    </motion.div>

                    <motion.div
                        variants={fadeIn("right", 0.1)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.1 }}
                        className=" mt-4 w-[90%] text-center text-base lg:text-lg font-bold text-richblack-300"
                    >
                        Với các khóa học lập trình trực tuyến của chúng tôi, bạn có thể học theo tốc
                        độ của riêng mình, từ bất kỳ đâu trên thế giới, và có quyền truy cập vào một
                        kho tài nguyên phong phú, bao gồm các dự án thực hành, bài kiểm tra và phản
                        hồi cá nhân từ các giảng viên.
                    </motion.div>

                    <div className="flex flex-row gap-7 mt-8">
                        <CTAButton active={true} linkto={"/signup"}>
                            Tìm hiểu thêm
                        </CTAButton>

                        <CTAButton active={false} linkto={"/login"}>
                            Đăng ký ngay
                        </CTAButton>
                    </div>
                </div>

                {/* animated code */}
                <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
                    {/* Code block 1 */}
                    <div className="">
                        <CodeBlocks
                            position={"lg:flex-row"}
                            heading={
                                <div className="text-3xl lg:text-4xl font-semibold">
                                    Khám Phá
                                    <HighlightText text={"tiềm năng lập trình của bạn "} />
                                    với các khóa học trực tuyến của chúng tôi
                                </div>
                            }
                            subheading={
                                "Các khóa học của chúng tôi được thiết kế và giảng dạy bởi các chuyên gia trong ngành có nhiều năm kinh nghiệm trong lập trình và đam mê chia sẻ kiến thức với bạn."
                            }
                            ctabtn1={{
                                btnText: "Thử ngay",
                                linkto: "/signup",
                                active: true,
                            }}
                            ctabtn2={{
                                btnText: "Tìm hiểu thêm",
                                linkto: "/login",
                                active: false,
                            }}
                            codeblock={`header = "Tiêu đề chính"\n\n nav_links = {\n    "Trang Một": "one/",\n    "Trang Hai": "two/",\n    "Trang Ba": "three/"\n}\n\n print(f"# {header}\\n")\nprint("Danh sách liên kết:")\nfor name, link in nav_links.items():\n    print(f"- {name} ({link})")`}
                            codeColor={"text-yellow-25"}
                            backgroundGradient={"code-block1-grad"}
                        />
                    </div>{" "}
                    */}
                    {/* Code block 2 */}
                    <div>
                        <CodeBlocks
                            position={"lg:flex-row-reverse"}
                            heading={
                                <div className="w-[100%] text-3xl lg:text-4xl font-semibold lg:w-[50%]">
                                    Bắt Đầu
                                    <HighlightText text={"lập trình chỉ trong vài giây"} />
                                </div>
                            }
                            subheading={
                                "Hãy thử ngay, môi trường học tập thực hành của chúng tôi có nghĩa là bạn sẽ viết mã thực từ bài học đầu tiên."
                            }
                            ctabtn1={{
                                btnText: "Tham gia lớp học",
                                link: "/signup",
                                active: true,
                            }}
                            ctabtn2={{
                                btnText: "Tìm hiểu thêm",
                                link: "/signup",
                                active: false,
                            }}
                            codeColor={"text-white"}
                            codeblock={`// Khởi tạo thông tin\nconst header = "Tiêu đề chính";\nconst navLinks = [\n  { name: "Trang Một", path: "one/" },\n  { name: "Trang Hai", path: "two/" },\n  { name: "Trang Ba", path: "three/" }\n];\n\n// Hiển thị\nconsole.log(\`# \${header}\\n\`);\nconsole.log("Danh sách liên kết:");\nnavLinks.forEach(link => {\n  console.log(\`- \${link.name} (\${link.path})\`);\n});`}
                            backgroundGradient={"code-block2-grad"}
                        />
                    </div>
                    {/* course slider */}
                    <div className="mx-auto box-content w-full max-w-maxContentTab px- py-12 lg:max-w-maxContent">
                        <h2 className="text-white mb-6 text-2xl ">
                            Những Lựa Chọn Phổ Biến Cho Bạn 🏆
                        </h2>
                        <Course_Slider Courses={CatalogPageData?.differentCategory?.courses} />
                    </div>
                    <div className=" mx-auto box-content w-full max-w-maxContentTab px- py-12 lg:max-w-maxContent">
                        <h2 className="text-white mb-6 text-2xl ">
                            Những Khóa Học Được Đăng Ký Nhiều Nhất Hôm Nay
                        </h2>
                        <Course_Slider Courses={CatalogPageData?.mostSellingCourses} />
                    </div>
                    {/* <ExploreMore /> */}
                </div>

                {/*Section 2  */}
                <div className="bg-pure-greys-5 text-richblack-700 ">
                    <div className="homepage_bg h-[310px]">
                        <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
                            <div className="h-[150px]"></div>
                            <div className="flex flex-row gap-7 text-white ">
                                <CTAButton active={true} linkto={"/signup"}>
                                    <div className="flex items-center gap-3">
                                        Khám pha danh mục
                                        <FaArrowRight />
                                    </div>
                                </CTAButton>
                                <CTAButton active={false} linkto={"/signup"}>
                                    <div>Tìm hiểu thêm</div>
                                </CTAButton>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
                        <div className="flex flex-col lg:flex-row gap-5 mb-10 mt-[95px]">
                            <div className="text-3xl lg:text-4xl font-semibold w-full lg:w-[45%]">
                                Nhận Kỹ Năng Bạn Cần Cho Một
                                <HighlightText text={"Công Việc Đang Có Nhu Cầu"} />
                            </div>

                            <div className="flex flex-col gap-10 w-full lg:w-[40%] items-start">
                                <div className="text-[16px]">
                                    Tri Thức Mới hiện đại tự đưa ra các điều khoản của riêng mình.
                                    Ngày nay, để trở thành một chuyên gia cạnh tranh đòi hỏi nhiều
                                    hơn là các kỹ năng chuyên nghiệp
                                </div>
                                <CTAButton active={true} linkto={"/signup"}>
                                    <div>Tìm hiểu thêm</div>
                                </CTAButton>
                            </div>
                        </div>

                        {/* leadership */}
                        <TimelineSection />

                        <LearningLanguageSection />
                    </div>
                </div>

                {/*Section 3 */}
                <div className="mt-14 w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
                    <InstructorSection />

                    {/* Reviws from Other Learner */}
                    <h1 className="text-center text-3xl lg:text-4xl font-semibold mt-8 flex justify-center items-center gap-x-3">
                        Đánh giá từ các học viên <MdOutlineRateReview className="text-yellow-25" />
                    </h1>
                    <ReviewSlider />
                </div>

                {/*Footer */}
                <Footer />
            </div>
        </React.Fragment>
    );
};

export default Home;
