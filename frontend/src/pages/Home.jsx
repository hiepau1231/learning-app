import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Footer from "../components/common/Footer";
import Course_Slider from "../components/core/Catalog/Course_Slider";
import CTAButton from "../components/core/HomePage/Button";
import HighlightText from "../components/core/HomePage/HighlightText";

import { getAllCatalogPageData } from "../services/operations/pageAndComponentData";

import { FaArrowRight } from "react-icons/fa";

import { motion } from "framer-motion";
import { fadeIn } from "./../components/common/motionFrameVarients";

// background random images
import backgroundImg1 from "../assets/Images/random bg img/coding bg1.jpg";
import backgroundImg10 from "../assets/Images/random bg img/coding bg10.jpg";
import backgroundImg111 from "../assets/Images/random bg img/coding bg11.jpg";
import backgroundImg2 from "../assets/Images/random bg img/coding bg2.jpg";
import backgroundImg3 from "../assets/Images/random bg img/coding bg3.jpg";
import backgroundImg4 from "../assets/Images/random bg img/coding bg4.jpg";
import backgroundImg5 from "../assets/Images/random bg img/coding bg5.jpg";
import backgroundImg6 from "../assets/Images/random bg img/coding bg6.jpeg";
import backgroundImg7 from "../assets/Images/random bg img/coding bg7.jpg";
import backgroundImg8 from "../assets/Images/random bg img/coding bg8.jpeg";
import backgroundImg9 from "../assets/Images/random bg img/coding bg9.jpg";

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
                    {/* course slider */}
                    <div className="w-full py-12">
                        <div className="max-w-maxContent mx-auto px-4">
                            <h2 className="text-white mb-8 text-3xl font-semibold">
                                Những Lựa Chọn Phổ Biến Cho Bạn 🏆
                            </h2>
                            <Course_Slider Courses={CatalogPageData?.differentCategory?.courses} />
                        </div>
                    </div>
                </div>

                {/*Footer */}
                <Footer />
            </div>
        </React.Fragment>
    );
};

export default Home;
