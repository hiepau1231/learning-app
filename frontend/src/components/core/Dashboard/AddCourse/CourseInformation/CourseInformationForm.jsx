import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import {
    addCourseDetails,
    editCourseDetails,
    fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import IconBtn from "../../../../common/IconBtn";
import Upload from "../Upload";
import ChipInput from "./ChipInput";
import RequirementsField from "./RequirementField";

export default function CourseInformationForm() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if (categories.length > 0) {
                // console.log("categories", categories)
                setCourseCategories(categories);
            }
            setLoading(false);
        };
        // if form is in edit mode
        // It will add value in input field
        if (editCourse) {
            // console.log("editCourse ", editCourse)
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);

            setValue("courseImage", course.thumbnail);
        }

        getCategories();
    }, []);

    const isFormUpdated = () => {
        const currentValues = getValues();
        // console.log("changes after editing form values:", currentValues)
        if (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage !== course.thumbnail
        ) {
            return true;
        }
        return false;
    };

    //   handle next button click
    const onSubmit = async (data) => {
        console.log(`data submit:::`, data);

        if (editCourse) {
            // const currentValues = getValues()
            // console.log("changes after editing form values:", currentValues)
            // console.log("now course:", course)
            // console.log("Has Form Changed:", isFormUpdated())
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();
                // console.log('data -> ',data)
                formData.append("courseId", course._id);
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc);
                }

                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags));
                    // formData.append("tag", data.courseTags)
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }

                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage);
                }

                // send data to backend
                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if (result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            } else {
                toast.error("Không có thay đổi nào được thực hiện cho biểu mẫu");
            }
            return;
        }

        // user has visted first time to step 1
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);

        formData.append("tag", JSON.stringify(data.courseTags));
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("status", COURSE_STATUS.DRAFT);

        formData.append("thumbnailImage", data.courseImage);
        setLoading(true);
        const result = await addCourseDetails(formData, token);
        if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 "
        >
            {/* Course Title */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseTitle">
                    Tiêu đề khoá học <sup className="text-pink-200">*</sup>
                </label>
                <input
                    id="courseTitle"
                    placeholder="Nhập tiêu đề khoá học"
                    {...register("courseTitle", { required: true })}
                    className="form-style w-full"
                />
                {errors.courseTitle && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Tiêu đề khoá học là bắt buộc
                    </span>
                )}
            </div>

            {/* Course Short Description */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
                    Mô tả ngắn khoá học <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                    id="courseShortDesc"
                    placeholder="Nhập mô tả"
                    {...register("courseShortDesc", { required: true })}
                    className="form-style resize-x-none min-h-[130px] w-full ] "
                />
                {errors.courseShortDesc && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Mô tả khoá học là bắt buộc
                    </span>
                )}
            </div>

            {/* Course Category */}
            <div className="flex flex-col space-y-2 ">
                <label className="text-sm text-richblack-5" htmlFor="courseCategory">
                    Thể loại khoá học <sup className="text-pink-200">*</sup>
                </label>
                <select
                    {...register("courseCategory", { required: true })}
                    defaultValue=""
                    id="courseCategory"
                    className="form-style w-full cursor-pointer"
                >
                    <option value="" disabled>
                        Chọn thể loại
                    </option>
                    {!loading &&
                        courseCategories?.map((category, indx) => (
                            <option key={indx} value={category?._id}>
                                {category?.name}
                            </option>
                        ))}
                </select>
                {errors.courseCategory && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Thể loại khoá học là bắt buộc
                    </span>
                )}
            </div>

            {/* Course Tags */}
            <ChipInput
                label="Thẻ"
                name="courseTags"
                placeholder="Nhập thẻ khoá học"
                register={register}
                errors={errors}
                setValue={setValue}
            />

            {/* Course Thumbnail Image */}
            <Upload
                name="courseImage"
                label="Thumbnail Khoá học"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />

            {/* Benefits of the course */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
                    Lợi ích khoá học <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                    id="courseBenefits"
                    placeholder="Nhập lợi ích của khoá học"
                    {...register("courseBenefits", { required: true })}
                    className="form-style resize-x-none min-h-[130px] w-full"
                />
                {errors.courseBenefits && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Lợi ích khoá học là bắt buộc
                    </span>
                )}
            </div>

            {/* Next Button */}
            <div className="flex justify-end gap-x-2">
                {editCourse && (
                    <button
                        onClick={() => dispatch(setStep(2))}
                        disabled={loading}
                        className={`flex cursor-pointer items-center gap-x-2 rounded-md py-[8px] px-[20px] font-semibold
              text-richblack-900 bg-richblack-300 hover:bg-richblack-900 hover:text-richblack-300 duration-300`}
                    >
                        Tiếp tục
                    </button>
                )}
                <IconBtn disabled={loading} text={!editCourse ? "Tiếp tục" : "Lưu thay đổi"}>
                    <MdNavigateNext />
                </IconBtn>
            </div>
        </form>
    );
}