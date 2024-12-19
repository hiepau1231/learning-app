import React, { useState, useEffect } from "react";
import ViewQuestion from "../Dashboard/AddCourse/CourseBuilder/ViewQuestion";
import IconBtn from "../../common/IconBtn";
import toast from "react-hot-toast";

const CountdownComponent = ({
    initialMinutes,
    onTimeUp,
    questions = [],
    onSelect,
    isLoadingSubmitAnswer,
    handleSubmitAnswer,
}) => {
    const [seconds, setSeconds] = useState(initialMinutes * 60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;

        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            clearInterval(interval);
            onTimeUp();
        }

        return () => clearInterval(interval);
    }, [isActive, seconds, onTimeUp]);

    const startCountdown = () => {
        toast.success("Bắt đầu làm bài. Thời gian đã được tính!");
        setIsActive(true);
    };
    const resetCountdown = () => {
        setIsActive(false);
        setSeconds(initialMinutes * 60);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
    };

    const handleClickSubmit = () => {
        if (seconds > 0) {
            handleSubmitAnswer();
        } else {
            toast.error("Thời gian đã hết. Không thể nộp bài.");
        }
    };

    return (
        <div>
            <div className="border-b">
                <p className="text-xl">
                    Bài tập nhỏ{" "}
                    <span className="italic text-[#9EDF9C] text-base font-bold">
                        (Hoàn thành bài tập để hiểu bài học hơn.)
                    </span>
                </p>
            </div>

            <div className="space-y-3 mt-3 mb-2">
                <h1 className="text-yellow-5">Thời gian còn lại: {formatTime(seconds)}</h1>

                <div className="flex space-x-2">
                    <IconBtn onClick={startCountdown} disabled={isActive}>
                        Bắt đầu
                    </IconBtn>

                    <IconBtn onClick={resetCountdown}>Làm lại</IconBtn>
                </div>
            </div>

            {isActive ? (
                <>
                    <ViewQuestion
                        questions={questions || []}
                        isViewMode
                        isAction
                        onSelect={onSelect}
                    />
                    <div className="mb-8">
                        <IconBtn
                            disabled={isLoadingSubmitAnswer}
                            onclick={handleClickSubmit}
                            text="Nộp"
                            customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                        />
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default CountdownComponent;
