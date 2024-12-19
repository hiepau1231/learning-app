import React, { useId } from "react";
import { MdEdit } from "react-icons/md";

const Answer = ({
    answer,
    isViewMode = false,
    questionId = "",
    isAction = false,
    isReviewMode = false,
    onSelect = (value) => {},
    answerSelected = -1,
    showIsCorrect = false,
}) => {
    const id = useId();

    return (
        <div className="my-1">
            <div className="flex items-center">
                <div className="flex items-center mb-4">
                    <input
                        onChange={isReviewMode ? undefined : (e) => onSelect?.(answer)}
                        id={`answer_${id}`}
                        type="radio"
                        name={`answer-${questionId}`}
                        {...(isAction
                            ? {
                                  checked: answer.order === answerSelected,
                                  defaultChecked: answer.order === answerSelected,
                              }
                            : !showIsCorrect
                            ? {
                                  checked:
                                      (isViewMode && answer?.isCorrect) ||
                                      answer.order === answerSelected,
                              }
                            : {
                                  checked: answer?.isCorrect,
                              })}
                        readOnly={isReviewMode ? true : isViewMode && !isAction}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label htmlFor={`answer_${id}`} className="ms-2 text-sm font-medium text-white">
                        {answer?.answer}{" "}
                        {showIsCorrect && answer?.isCorrect && (
                            <span className="text-[#C2FFC7] text-xs ms-2">
                                (Đây là đáp án đúng)
                            </span>
                        )}
                        {isViewMode && !isAction && answer?.isCorrect && (
                            <span className="text-[#C2FFC7] text-xs ms-2">
                                (Đây là đáp án đúng)
                            </span>
                        )}
                        {isReviewMode && answer?.order === answerSelected && (
                            <span className="text-pink-50 text-xs ms-2">
                                (Đây là đáp án của bạn)
                            </span>
                        )}
                    </label>
                </div>
            </div>
        </div>
    );
};

const QuestionItem = ({
    question,
    onEdit,
    isViewMode,
    isAction,
    isReviewMode,
    showIsCorrect = false,
    onSelect = (values) => {},
}) => {
    const questionId = useId();

    return (
        <div>
            <div className="flex mb-4 items-center space-x-2">
                {!isViewMode && (
                    <button
                        className="text-white hover:text-yellow-50"
                        type="button"
                        onClick={() => onEdit?.(question)}
                    >
                        <MdEdit />
                    </button>
                )}

                <p className="text-base tracking-wide text-white font-bold">
                    {question.order}. {question?.question}
                </p>
            </div>

            {question?.answers?.map((answer, index) => {
                return (
                    <Answer
                        showIsCorrect={showIsCorrect}
                        questionId={questionId}
                        isReviewMode={isReviewMode}
                        key={index}
                        answer={answer}
                        isViewMode={isViewMode}
                        isAction={isAction}
                        onSelect={onSelect}
                        answerSelected={question?.answerSelected ?? -1}
                    />
                );
            })}
        </div>
    );
};

const ViewQuestion = ({
    questions = [],
    isViewMode = false,
    isReviewMode = false,
    showIsCorrect = false,
    onEdit,
    isAction = false,
    onSelect = (answer, question) => {},
}) => {
    const handleOnSelect = (answer, question) => {
        onSelect?.(answer, question);
    };

    return (
        <div className="mt-5 space-y-2">
            {questions.length > 0 ? (
                questions.map((question, index) => {
                    return (
                        <QuestionItem
                            key={index}
                            question={question}
                            isAction={isAction}
                            isViewMode={isViewMode}
                            isReviewMode={isReviewMode}
                            showIsCorrect={showIsCorrect}
                            onEdit={onEdit}
                            onSelect={(value) => handleOnSelect(value, question)}
                        />
                    );
                })
            ) : (
                <p className="ml-2 text-xs tracking-wide text-white">* Chưa có câu hỏi nào</p>
            )}
        </div>
    );
};

export default ViewQuestion;
