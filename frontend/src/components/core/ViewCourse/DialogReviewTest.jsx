import React from "react";
import { RxCross2 } from "react-icons/rx";
import ViewQuestion from "../Dashboard/AddCourse/CourseBuilder/ViewQuestion";

const DialogReviewTest = ({ onClose, open = false, selectedTestReview = null }) => {
    console.log("====================================");
    console.log(selectedTestReview);
    console.log("====================================");

    if (!open || !selectedTestReview) return null;

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
                {/* Header Modal */}
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">Xem lại bài kiểm tra</p>
                    <button onClick={onClose}>
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>

                {/* Body Modal */}
                <div className="p-6">
                    <ViewQuestion
                        questions={selectedTestReview?.questions || []}
                        isViewMode
                        isReviewMode
                    />
                </div>
            </div>
        </div>
    );
};

export default DialogReviewTest;
