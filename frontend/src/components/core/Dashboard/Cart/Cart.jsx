import { useSelector } from "react-redux";

import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
    const { total, totalItems } = useSelector((state) => state.cart);

    return (
        <>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5  text-center sm:text-left">
                Danh sách đã lưu
            </h1>
            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
                {totalItems} Khoá học đã lưu
            </p>
            {total > 0 ? (
                <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                    <RenderCartCourses />
                    <RenderTotalAmount />
                </div>
            ) : (
                <p className="mt-14 text-center text-3xl text-richblack-100">
                    Không có khoá học nào được lưu
                </p>
            )}
        </>
    );
}
