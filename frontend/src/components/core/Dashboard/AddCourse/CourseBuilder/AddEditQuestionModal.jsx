import React, { memo, useCallback, useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import IconBtn from "../../../../common/IconBtn";

const labels = {
    question: "Câu hỏi",
    answer1: "Câu trả lời 1",
    answer2: "Câu trả lời 2",
    answer3: "Câu trả lời 3",
    answer4: "Câu trả lời 4",
    correctAnswer: "Đáp án đúng",
};

const AddEditQuestionModal = ({
    initialValues = null,
    isViewMode = false,
    isEditMode = false,
    open = false,
    onClose,
    onSubmit = (values, resetValues = () => {}) => {},
}) => {
    const [errors, setErrors] = useState({});
    const [state, setState] = useState({
        order: -1,
        question: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        correctAnswer: -1,
    });

    useEffect(() => {
        if (initialValues) {
            const answers = initialValues.answers;

            setState({
                order: initialValues.order,
                question: initialValues.question,
                answer1: answers[0].answer,
                answer2: answers[1].answer,
                answer3: answers[2].answer,
                answer4: answers[3].answer,
                correctAnswer: answers.findIndex((answer) => answer.isCorrect) + 1,
            });
        }
    }, []);

    const validate = useCallback(() => {
        let errors = {};

        if (!state.question) {
            errors.question = "Câu hỏi là trường bắt buộc";
        }

        if (!state.answer1) {
            errors.answer1 = "Câu trả lời 1 là trường bắt buộc";
        }

        if (!state.answer2) {
            errors.answer2 = "Câu trả lời 2 là trường bắt buộc";
        }

        if (!state.answer3) {
            errors.answer3 = "Câu trả lời 3 là trường bắt buộc";
        }

        if (!state.answer4) {
            errors.answer4 = "Câu trả lời 4 là trường bắt buộc";
        }

        if (state.correctAnswer === -1) {
            errors.correctAnswer = "Câu hỏi chưa chọn đáp án đúng!";
        }

        return errors;
    }, [state]);

    const handleSubmit = useCallback(() => {
        const errors = validate();

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const payload = {
            order: state.order,
            question: state.question,
            answers: [
                {
                    order: 1,
                    answer: state.answer1,
                    isCorrect: state.correctAnswer === 1,
                },
                {
                    order: 2,
                    answer: state.answer2,
                    isCorrect: state.correctAnswer === 2,
                },
                {
                    order: 3,
                    answer: state.answer3,
                    isCorrect: state.correctAnswer === 3,
                },
                {
                    order: 4,
                    answer: state.answer4,
                    isCorrect: state.correctAnswer === 4,
                },
            ],
        };

        if (!onSubmit) return;

        onSubmit(payload, () => {
            setState({
                question: "",
                answer1: "",
                answer2: "",
                answer3: "",
                answer4: "",
                correctAnswer: -1,
            });
        });
    }, [validate, onSubmit, state]);

    const handleChangeValues = useCallback(
        (name) => (e) => {
            const { value } = e.target;

            setErrors((prev) => ({
                ...prev,
                [name]: value.length > 0 ? undefined : `${labels[name]} là trường bắt buộc`,
            }));

            setState((prev) => ({
                ...prev,
                [name]: e.target.value,
            }));
        },
        [errors]
    );

    const handleSelectAnswerCorrect = useCallback((orderIdx) => {
        setErrors((prev) => ({
            ...prev,
            correctAnswer: undefined,
        }));

        setState((prev) => ({
            ...prev,
            correctAnswer: orderIdx,
        }));
    }, []);

    if (isViewMode || !open) return null;

    return (
        <div className="fixed inset-0 z-[1001] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
                {/* Header Modal */}
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">
                        {isEditMode ? "Sửa" : "Thêm"} Câu hỏi
                    </p>
                    <button onClick={onClose}>
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>

                <div className="space-y-8 px-8 py-10">
                    {errors.correctAnswer && (
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-[#f8d7da] dark:bg-[#f8d7da] dark:text-[#84253d] border border-[#f5c2c7]"
                            role="alert"
                        >
                            {errors.correctAnswer}
                        </div>
                    )}

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm space-x-2 text-richblack-5" htmlFor="question">
                            <span>
                                Câu hỏi <sup className="text-pink-200">*</sup>
                            </span>
                        </label>

                        <input
                            value={state.question}
                            onChange={handleChangeValues("question")}
                            id="question"
                            placeholder="Nhập câu hỏi"
                            className="form-style w-full"
                        />

                        {errors.question && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                {errors.question}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm text-richblack-5" htmlFor="answer1">
                                <span>
                                    Câu trả lời 1 <sup className="text-pink-200">*</sup>
                                </span>
                                {state.correctAnswer === 1 ? (
                                    <span className="text-xs text-[#24e24e] cursor-pointer">
                                        {" "}
                                        Câu trả lời này là đáp án
                                    </span>
                                ) : (
                                    <span
                                        onClick={() => handleSelectAnswerCorrect(1)}
                                        className="text-xs text-yellow-50 cursor-pointer"
                                    >
                                        {" "}
                                        Chọn làm đáp án
                                    </span>
                                )}
                            </label>

                            <input
                                value={state.answer1}
                                onChange={handleChangeValues("answer1")}
                                id="answer1"
                                placeholder="Nhập Câu trả lời 1"
                                className="form-style w-full"
                            />

                            {errors.answer1 && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    {errors.answer1}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-sm text-richblack-5" htmlFor="answer2">
                                <span>
                                    Câu trả lời 2 <sup className="text-pink-200">*</sup>
                                </span>

                                {state.correctAnswer === 2 ? (
                                    <span className="text-xs text-[#24e24e] cursor-pointer">
                                        {" "}
                                        Câu trả lời này là đáp án
                                    </span>
                                ) : (
                                    <span
                                        onClick={() => handleSelectAnswerCorrect(2)}
                                        className="text-xs text-yellow-50 cursor-pointer"
                                    >
                                        {" "}
                                        Chọn làm đáp án
                                    </span>
                                )}
                            </label>

                            <input
                                value={state.answer2}
                                onChange={handleChangeValues("answer2")}
                                id="answer2"
                                placeholder="Nhập Câu trả lời 2"
                                className="form-style w-full"
                            />

                            {errors.answer2 && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    {errors.answer2}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-sm text-richblack-5" htmlFor="answer3">
                                <span>
                                    Câu trả lời 3 <sup className="text-pink-200">*</sup>
                                </span>
                                {state.correctAnswer === 3 ? (
                                    <span className="text-xs text-[#24e24e] cursor-pointer">
                                        {" "}
                                        Câu trả lời này là đáp án
                                    </span>
                                ) : (
                                    <span
                                        onClick={() => handleSelectAnswerCorrect(3)}
                                        className="text-xs text-yellow-50 cursor-pointer"
                                    >
                                        {" "}
                                        Chọn làm đáp án
                                    </span>
                                )}
                            </label>

                            <input
                                value={state.answer3}
                                onChange={handleChangeValues("answer3")}
                                id="answer3"
                                placeholder="Nhập Câu trả lời 3"
                                className="form-style w-full"
                            />

                            {errors.answer3 && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    {errors.answer3}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-sm text-richblack-5" htmlFor="answer4">
                                <span>
                                    Câu trả lời 4 <sup className="text-pink-200">*</sup>
                                </span>
                                {state.correctAnswer === 4 ? (
                                    <span className="text-xs text-[#24e24e] cursor-pointer">
                                        {" "}
                                        Câu trả lời này là đáp án
                                    </span>
                                ) : (
                                    <span
                                        onClick={() => handleSelectAnswerCorrect(4)}
                                        className="text-xs text-yellow-50 cursor-pointer"
                                    >
                                        {" "}
                                        Chọn làm đáp án
                                    </span>
                                )}
                            </label>

                            <input
                                value={state.answer4}
                                onChange={handleChangeValues("answer4")}
                                id="answer4"
                                placeholder="Nhập Câu trả lời 4"
                                className="form-style w-full"
                            />

                            {errors.answer4 && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    {errors.answer4}
                                </span>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <IconBtn
                                type="submit"
                                text={isEditMode ? "Lưu thay đổi" : "Tạo câu hỏi"}
                                outline={true}
                                onclick={handleSubmit}
                            >
                                <IoAddCircleOutline size={20} className="text-yellow-50" />
                            </IconBtn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(AddEditQuestionModal);
