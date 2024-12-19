import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

import { IoAddCircleOutline } from "react-icons/io5";
import {
    createSubSection,
    updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import Upload from "../Upload";
import AddEditQuestionModal from "./AddEditQuestionModal";
import ViewQuestion from "./ViewQuestion";

export default function SubSectionModal({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues,
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const [questions, setQuestions] = useState([]);
    const [openAddEditQuestionModal, setOpenAddEditQuestionModal] = useState(false);
    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
            setValue("durationQuestion", modalData.durationQuestion);
            setQuestions(modalData.questions);
        }
    }, []);

    // Kiểm tra xem form đã được thay đổi chưa
    const isFormUpdated = () => {
        const currentValues = getValues();
        if (
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ) {
            return false;
        }
        return false;
    };

    // Xử lý việc chỉnh sửa phần mục con
    const handleEditSubsection = async () => {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }
        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.lectureVideo);
        }
        if (currentValues.durationQuestion !== modalData.durationQuestion) {
            formData.append("durationQuestion", currentValues.durationQuestion);
        }

        formData.append("questions", JSON.stringify(questions));

        setLoading(true);
        const result = await updateSubSection(formData, token);

        if (result) {
            // Cập nhật cấu trúc khóa học
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData.sectionId ? result : section
            );
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }

        setModalData(null);
        setLoading(false);
    };

    const onSubmit = async (data) => {
        if (view) return;

        if (edit) {
            // if (!isFormUpdated()) {
            //     toast.error("Không có thay đổi nào trong form");
            // } else {
            handleEditSubsection();
            // }
            return;
        }

        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("video", data.lectureVideo);
        formData.append("durationQuestion", data.durationQuestion);
        formData.append("questions", JSON.stringify(questions));

        setLoading(true);
        const result = await createSubSection(formData, token);

        if (result) {
            // Cập nhật cấu trúc khóa học
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData ? result : section
            );

            // setQuestions(result.questions);

            const updatedCourse = {
                ...course,
                courseContent: updatedCourseContent,
            };

            dispatch(setCourse(updatedCourse));
            setModalData(null);
        }
        setLoading(false);
    };

    const handleSubmitAddEditQuestion = (values, resetValues) => {
        const questionLen = questions.length;

        if (values.order !== -1) {
            setQuestions((prev) =>
                prev.map((question) => {
                    if (question.order === values.order) {
                        return {
                            ...question,
                            ...values,
                        };
                    }
                    return question;
                })
            );
            setOpenAddEditQuestionModal(false);
            resetValues();
            return;
        }

        const payload = {
            ...values,
            order: questionLen + 1,
        };

        setQuestions((prev) => [...prev, payload]);

        setOpenAddEditQuestionModal(false);

        resetValues();
    };

    return (
        <>
            {openAddEditQuestionModal && (
                <AddEditQuestionModal
                    open={openAddEditQuestionModal}
                    onClose={() => setOpenAddEditQuestionModal(false)}
                    initialValues={initialValues}
                    isEditMode={Boolean(initialValues?.order)}
                    onSubmit={handleSubmitAddEditQuestion}
                />
            )}

            <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
                <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
                    {/* Header Modal */}
                    <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                        <p className="text-xl font-semibold text-richblack-5">
                            {view && "Xem"} {add && "Thêm"} {edit && "Chỉnh sửa"} Bài giảng
                        </p>
                        <button onClick={() => (!loading ? setModalData(null) : {})}>
                            <RxCross2 className="text-2xl text-richblack-5" />
                        </button>
                    </div>

                    {/* Form Modal */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10">
                        {/* Upload Video Bài giảng */}
                        <Upload
                            name="lectureVideo"
                            label="Video Bài giảng"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            video={true}
                            viewData={view ? modalData.videoUrl : null}
                            editData={edit ? modalData.videoUrl : null}
                        />
                        {/* Tiêu đề Bài giảng */}
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
                                Tiêu đề bài giảng {!view && <sup className="text-pink-200">*</sup>}
                            </label>
                            <input
                                disabled={view || loading}
                                id="lectureTitle"
                                placeholder="Nhập tiêu đề bài giảng"
                                {...register("lectureTitle", { required: true })}
                                className="form-style w-full"
                            />
                            {errors.lectureTitle && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Tiêu đề bài giảng là bắt buộc
                                </span>
                            )}
                        </div>

                        {/* Mô tả bài giảng */}
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
                                Mô tả bài giảng {!view && <sup className="text-pink-200">*</sup>}
                            </label>
                            <textarea
                                disabled={view || loading}
                                id="lectureDesc"
                                placeholder="Nhập mô tả bài giảng"
                                {...register("lectureDesc", { required: true })}
                                className="form-style resize-x-none min-h-[130px] w-full"
                            />
                            {errors.lectureDesc && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Mô tả bài giảng là bắt buộc
                                </span>
                            )}
                        </div>

                        {/* Phần thêm/cập nhật câu hỏi */}
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm text-richblack-5" htmlFor="lectureDesc">
                                Danh sách câu hỏi {!view && <sup className="text-pink-200">*</sup>}
                            </p>

                            {!view && (
                                <button
                                    onClick={() => setOpenAddEditQuestionModal(true)}
                                    type="button"
                                    className="text-white"
                                >
                                    <IconBtn type="button" text={"Thêm câu hỏi"} outline={true}>
                                        <IoAddCircleOutline size={20} className="text-yellow-50" />
                                    </IconBtn>
                                </button>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-sm text-richblack-5" htmlFor="durationQuestion">
                                Thời gian làm bài (được tính bằng phút){" "}
                                {!view && <sup className="text-pink-200">*</sup>}
                            </label>
                            <input
                                disabled={view || loading}
                                id="durationQuestion"
                                placeholder="Nhập tiêu đề bài giảng"
                                {...register("durationQuestion", { required: true })}
                                className="form-style w-full"
                            />
                            {errors.durationQuestion && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Thời gian làm bài là bắt buộc
                                </span>
                            )}
                        </div>

                        <ViewQuestion
                            onEdit={(values) => {
                                setOpenAddEditQuestionModal(true);

                                setInitialValues(values);
                            }}
                            questions={questions}
                            isViewMode={view}
                            showIsCorrect={true}
                        />

                        {!view && (
                            <div className="flex justify-end">
                                <IconBtn
                                    disabled={loading}
                                    text={loading ? "Đang tải.." : edit ? "Lưu thay đổi" : "Lưu"}
                                />
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}
