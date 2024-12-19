import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
// import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ConfirmationModal from "../components/common/ConfirmationModal";
import Footer from "../components/common/Footer";
import RatingStars from "../components/common/RatingStars";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { formatDate } from "../services/formatDate";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { enrollCourse } from "../services/operations/studentFeaturesAPI";

import { addToCart } from "../slices/cartSlice";
import GetAvgRating from "../utils/avgRating";
import { ACCOUNT_TYPE } from "./../utils/constants";

import toast from "react-hot-toast";
import { IoReturnDownBack } from "react-icons/io5";
import { MdOutlineVerified } from "react-icons/md";
import Img from "./../components/common/Img";

function CourseDetails() {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Getting courseId from url parameter
    const { courseId } = useParams();
    // console.log(`course id: ${courseId}`)

    // Declear a state to save the course details
    const [response, setResponse] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);

    useEffect(() => {
        // Calling fetchCourseDetails fucntion to fetch the details
        const fectchCourseDetailsData = async () => {
            try {
                const res = await fetchCourseDetails(courseId);
                // console.log("course details res: ", res)
                setResponse(res);
            } catch (error) {
                console.log("Could not fetch Course Details");
            }
        };
        fectchCourseDetailsData();
    }, [courseId]);

    // console.log("response: ", response)

    // Calculating Avg Review count
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(() => {
        const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews);
        setAvgReviewCount(count);
    }, [response]);
    // console.log("avgReviewCount: ", avgReviewCount)

    // Collapse all
    // const [collapse, setCollapse] = useState("")
    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => {
        // console.log("called", id)
        setIsActive(
            !isActive.includes(id) ? isActive.concat([id]) : isActive.filter((e) => e != id)
        );
    };

    // Total number of lectures
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(() => {
        let lectures = 0;
        response?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0;
        });
        setTotalNoOfLectures(lectures);
    }, [response]);

    // Scroll to the top of the page when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Loading skeleton
    if (paymentLoading || loading || !response) {
        return (
            <div className={`mt-24 p-5 flex flex-col justify-center gap-4  `}>
                <div className="flex flex-col sm:flex-col-reverse  gap-4 ">
                    <p className="h-44 sm:h-24 sm:w-[60%] rounded-xl skeleton"></p>
                    <p className="h-9 sm:w-[39%] rounded-xl skeleton"></p>
                </div>

                <p className="h-4 w-[55%] lg:w-[25%] rounded-xl skeleton"></p>
                <p className="h-4 w-[75%] lg:w-[30%] rounded-xl skeleton"></p>
                <p className="h-4 w-[35%] lg:w-[10%] rounded-xl skeleton"></p>

                {/* Floating Courses Card */}
                <div
                    className="right-[1.5rem] top-[20%] hidden lg:block lg:absolute min-h-[450px] w-1/3 max-w-[410px]
            translate-y-24 md:translate-y-0 rounded-xl skeleton"
                ></div>

                <p className="mt-24 h-60 lg:w-[60%] rounded-xl skeleton"></p>
            </div>
        );
    }

    // extract course data
    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
        tag,
    } = response?.data?.courseDetails;

    // Buy Course handler
    const handleBuyCourse = () => {
        if (token) {
            const coursesId = [courseId];
            // if (price === 0) {
            enrollCourse(token, coursesId, user, navigate, dispatch);
            // } else {
            //     buyCourse(token, coursesId, user, navigate, dispatch);
            // }
            return;
        }
        setConfirmationModal({
            text1: "Bạn chưa đăng nhập!",
            text2: "Vui lòng đăng nhập để thêm vào danh sách",
            btn1Text: "Đăng nhập",
            btn2Text: "Huỷ",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        });
    };

    // Add to cart Course handler
    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("Bạn là Giảng viên. Bạn không thể mua khóa học.");
            return;
        }
        if (token) {
            dispatch(addToCart(response?.data.courseDetails));
            return;
        }
        setConfirmationModal({
            text1: "Bạn chưa đăng nhập!",
            text2: "Vui lòng đăng nhập để thêm vào danh sách",
            btn1Text: "Đăng nhập",
            btn2Text: "Huỷ",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        });
    };

    return (
        <>
            <div className="min-h-screen flex flex-col bg-richblack-900">
                {/* Main content */}
                <div className="flex-1">
                    <div className={`relative w-full bg-richblack-800`}>
                        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
                            <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-cente py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
                                {/* Go back button */}
                                <div className="mb-5 lg:mt-10 lg:mb-0 z-[100]" onClick={() => navigate(-1)}>
                                    <IoReturnDownBack className="w-10 h-10 text-white hover:text-gray-50 cursor-pointer" />
                                </div>

                                {/* Course thumbnail for mobile */}
                                <div className="relative block min-h-[30rem] lg:hidden">
                                    <Img
                                        src={thumbnail}
                                        alt="course thumbnail"
                                        className="aspect-auto w-full rounded-2xl"
                                    />
                                    <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                                </div>

                                {/* Course data */}
                                <div className={`mb-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}>
                                    <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                                        {courseName}
                                    </p>

                                    {/* Mục tiêu bài học */}
                                    <div className="flex flex-col gap-3">
                                        <p className="text-2xl font-semibold">Mục tiêu bài học</p>
                                        <div className="flex flex-col gap-2">
                                            {whatYouWillLearn?.split("\n").map((item, index) => (
                                                <p key={index} className="flex gap-2">
                                                    <MdOutlineVerified className="text-caribbeangreen-300" />
                                                    {item}
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tiến trình học */}
                                    <div className="flex flex-col gap-3">
                                        <p className="text-2xl font-semibold">Tiến trình học</p>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-full bg-richblack-700 rounded-full">
                                                <div 
                                                    className="h-full bg-yellow-50 rounded-full"
                                                    style={{
                                                        width: `${response?.data?.completedVideos?.length / totalNoOfLectures * 100 || 0}%`
                                                    }}
                                                ></div>
                                            </div>
                                            <p className="text-sm">
                                                {response?.data?.completedVideos?.length || 0}/{totalNoOfLectures} bài học
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tóm tắt nội dung bài học */}
                                    <div className="flex flex-col gap-3">
                                        <p className="text-2xl font-semibold">Tóm tắt nội dung bài học</p>
                                        <p className="text-richblack-200">{courseDescription}</p>
                                    </div>

                                    {/* Giảng viên */}
                                    <div className="flex flex-col gap-3">
                                        <p className="text-2xl font-semibold">Giảng viên</p>
                                        <div className="flex items-center gap-4">
                                            <Img 
                                                src={instructor?.image}
                                                alt={instructor?.firstName}
                                                className="h-14 w-14 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-semibold">
                                                    {instructor?.firstName} {instructor?.lastName}
                                                </p>
                                                <p className="text-sm text-richblack-300">{instructor?.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Course Content */}
                                    <div className="flex flex-col gap-3">
                                        <p className="text-2xl font-semibold">Nội dung khóa học</p>
                                        <div className="flex flex-col gap-2">
                                            {courseContent?.map((course, index) => (
                                                <CourseAccordionBar
                                                    key={index}
                                                    course={course}
                                                    isActive={isActive}
                                                    handleActive={handleActive}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* What you'll learn */}
                                    <div className="flex flex-col gap-3">
                                        <p className="text-2xl font-semibold">Những thứ bạn sẽ học được</p>
                                        <div className="flex flex-col gap-2">
                                            {whatYouWillLearn?.split("\n").map((item, index) => (
                                                <p key={index} className="flex gap-2">
                                                    <MdOutlineVerified className="text-caribbeangreen-300" />
                                                    {item}
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Author info */}
                                    <p className="capitalize">
                                        Tạo bởi{" "}
                                        <span className="font-semibold underline">
                                            {instructor.firstName} {instructor.lastName}
                                        </span>
                                    </p>

                                    {/* Tags */}
                                    <div className="flex gap-2">
                                        {tag?.map((item, index) => (
                                            <span
                                                key={index}
                                                className="bg-richblack-700 px-3 py-1 rounded-full text-sm"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile actions */}
                                <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
                                    <button className="yellowButton" onClick={handleBuyCourse}>
                                        Đăng ký ngay
                                    </button>
                                    <button onClick={handleAddToCart} className="blackButton">
                                        Thêm vào danh sách
                                    </button>
                                </div>
                            </div>

                            {/* Desktop course details card */}
                            <div className="right-[1.5rem] top-[60px] mx-auto hidden lg:block lg:absolute min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0">
                                <CourseDetailsCard
                                    course={response?.data?.courseDetails}
                                    setConfirmationModal={setConfirmationModal}
                                    handleBuyCourse={handleBuyCourse}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    );
}

export default CourseDetails;
