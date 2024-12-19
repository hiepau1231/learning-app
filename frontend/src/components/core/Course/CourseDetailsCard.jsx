import React from "react";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";

import { addToCart } from "../../../slices/cartSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Img from "./../../common/Img";

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { thumbnail: ThumbnailImage, price: CurrentPrice, _id: courseId } = course;

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Liên kết đã được sao chép vào clipboard");
    };

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("Bạn là giảng viên. Bạn không thể mua khóa học.");
            return;
        }
        if (token) {
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1: "Bạn chưa đăng nhập!",
            text2: "Vui lòng đăng nhập để Thêm vào danh sách.",
            btn1Text: "Đăng nhập",
            btn2Text: "Hủy",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        });
    };

    // console.log("Student already enrolled ", course?.studentsEnrolled, user?._id)

    return (
        <>
            <div
                className={`flex flex-col md:justify-start justify-center items-center md:items-start gap-4 rounded-2xl bg-richblack-700 p-4 text-richblack-5 `}
            >
                {/* Hình ảnh khóa học */}
                <Img
                    src={ThumbnailImage}
                    alt={course?.courseName}
                    className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
                />

                <div className="px-4">
                    {/* <div className="space-x-3 pb-4 text-3xl font-semibold">
            {CurrentPrice === 0 ? "Miễn phí" : `${CurrentPrice} VNĐ`}
          </div> */}
                    <div className="flex flex-col gap-4">
                        <button
                            className="yellowButton outline-none"
                            onClick={
                                user && course?.studentsEnrolled.includes(user?._id)
                                    ? () => navigate("/dashboard/enrolled-courses")
                                    : handleBuyCourse
                            }
                        >
                            {user && course?.studentsEnrolled.includes(user?._id)
                                ? "Đi đến khóa học"
                                : "Đăng ký ngay"}
                        </button>
                        {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
                            <button onClick={handleAddToCart} className="blackButton outline-none">
                                Thêm vào danh sách
                            </button>
                        )}
                    </div>
                    <div className={``}>
                        <p className={`my-2 text-xl font-semibold `}>Yêu cầu khóa học:</p>
                        <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                            {course?.instructions?.map((item, i) => {
                                return (
                                    <p className={`flex gap-2`} key={i}>
                                        <BsFillCaretRightFill />
                                        <span>{item}</span>
                                    </p>
                                );
                            })}
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
                            onClick={handleShare}
                        >
                            <FaShareSquare size={15} /> Chia sẻ
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseDetailsCard;
