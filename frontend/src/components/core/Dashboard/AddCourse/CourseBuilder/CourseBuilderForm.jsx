import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { createSection, updateSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";

import IconBtn from "../../../../common/IconBtn";
import NestedView from "./NestedView";

export default function CourseBuilderForm() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [editSectionName, setEditSectionName] = useState(null); // lưu trữ ID của section

    // xử lý khi gửi form
    const onSubmit = async (data) => {
        // console.log("dữ liệu gửi đi ", data)
        setLoading(true);

        let result;

        if (editSectionName) {
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id,
                },
                token
            );
            // console.log("chỉnh sửa = ", result)
        } else {
            result = await createSection(
                { sectionName: data.sectionName, courseId: course._id },
                token
            );
        }
        // console.log("kết quả section = ", result)
        if (result) {
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", "");
        }
        setLoading(false);
    };

    // hủy chỉnh sửa
    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName", "");
    };

    // thay đổi tên section để chỉnh sửa
    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEdit();
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    };

    // đi tới bước tiếp theo
    const goToNext = () => {
        if (course.courseContent.length === 0) {
            toast.error("Vui lòng thêm ít nhất một section");
            return;
        }
        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Vui lòng thêm ít nhất một bài giảng trong mỗi section");
            return;
        }

        // tất cả đều ổn, tiến tới bước tiếp theo
        dispatch(setStep(3));
    };

    // quay lại
    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    };

    return (
        <div className="space-y-8 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-semibold text-richblack-5">Xây dựng khóa học</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Tên section */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="sectionName">
                        Tên section <sup className="text-pink-200">*</sup>
                    </label>
                    <input
                        id="sectionName"
                        disabled={loading}
                        placeholder="Thêm một section để xây dựng khóa học của bạn"
                        {...register("sectionName", { required: true })}
                        className="form-style w-full"
                    />
                    {errors.sectionName && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Tên section là bắt buộc
                        </span>
                    )}
                </div>

                {/* Chỉnh sửa tên Section hoặc Tạo Section */}
                <div className="flex items-end gap-x-4">
                    <IconBtn
                        type="submit"
                        disabled={loading}
                        text={editSectionName ? "Chỉnh sửa tên Section" : "Tạo Section"}
                        outline={true}
                    >
                        <IoAddCircleOutline size={20} className="text-yellow-50" />
                    </IconBtn>
                    {/* nếu đang ở chế độ chỉnh sửa tên section */}
                    {editSectionName && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="text-sm text-richblack-300 underline"
                        >
                            Hủy chỉnh sửa
                        </button>
                    )}
                </div>
            </form>

            {/* Xem chi tiết section và subSection */}
            {course.courseContent.length > 0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
            )}

            {/* Nút Next và Back */}
            <div className="flex justify-end gap-x-3">
                <button
                    onClick={goBack}
                    className={`rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                >
                    Quay lại
                </button>

                {/* Nút Next */}
                <IconBtn disabled={loading} text="Tiếp theo" onclick={goToNext}>
                    <MdNavigateNext />
                </IconBtn>
            </div>
        </div>
    );
}
