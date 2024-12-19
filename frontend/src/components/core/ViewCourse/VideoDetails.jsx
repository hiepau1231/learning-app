import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import "video-react/dist/video-react.css";
import { BigPlayButton, Player } from "video-react";

import { createTest, markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { setCourseViewSidebar } from "../../../slices/sidebarSlice";

import IconBtn from "../../common/IconBtn";

import { HiMenuAlt1 } from "react-icons/hi";
import ViewQuestion from "../Dashboard/AddCourse/CourseBuilder/ViewQuestion";
import toast from "react-hot-toast";
import useCountdown from "../../../hooks/useCountdown";
import CountdownComponent from "./CountdownComponent";
import DialogReviewTest from "./DialogReviewTest";

const VideoDetails = () => {
    const { courseId, sectionId, subSectionId } = useParams();

    const navigate = useNavigate();
    const location = useLocation();
    const playerRef = useRef(null);
    const dispatch = useDispatch();

    const { token } = useSelector((state) => state.auth);
    const currentUser = useSelector((state) => state.profile.user);
    const { courseSectionData, courseEntireData, completedLectures } = useSelector(
        (state) => state.viewCourse
    );

    const [videoData, setVideoData] = useState(null);
    const [previewSource, setPreviewSource] = useState("");
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    const [isLoadingSubmitAnswer, setIsLoadingSubmitAnswer] = useState(false);
    const [responseSubmitAnswer, setResponseSubmitAnswer] = useState(null);

    const [isShowHistory, setIsShowHistory] = useState(false);
    const [selectedTestReview, setSelectedTestReview] = useState(null);

    useEffect(() => {
        (async () => {
            if (!courseSectionData.length) return;
            if (!courseId && !sectionId && !subSectionId) {
                navigate(`/dashboard/enrolled-courses`);
            } else {
                const filteredData = courseSectionData.filter((course) => course._id === sectionId);
                const filteredVideoData = filteredData?.[0]?.subSection.filter(
                    (data) => data._id === subSectionId
                );
                if (filteredVideoData) setVideoData(filteredVideoData[0]);
                setPreviewSource(courseEntireData.thumbnail);
                setVideoEnded(false);
                setResponseSubmitAnswer(null);
                setIsShowHistory(false);
                setSelectedTestReview(null);
            }
        })();
    }, [courseSectionData, courseEntireData, location.pathname]);

    // kiểm tra nếu bài học là video đầu tiên của khóa học
    const isFirstVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId);

        const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex(
            (data) => data._id === subSectionId
        );

        if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
            return true;
        } else {
            return false;
        }
    };

    // đi đến video tiếp theo
    const goToNextVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId);

        const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length;

        const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex(
            (data) => data._id === subSectionId
        );

        if (currentSubSectionIndx !== noOfSubsections - 1) {
            const nextSubSectionId =
                courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx + 1]._id;

            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
            );
        } else {
            const nextSectionId = courseSectionData[currentSectionIndx + 1]._id;
            const nextSubSectionId = courseSectionData[currentSectionIndx + 1].subSection[0]._id;
            navigate(
                `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
            );
        }
    };

    // kiểm tra nếu bài học là video cuối cùng của khóa học
    const isLastVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId);

        const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length;

        const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex(
            (data) => data._id === subSectionId
        );

        if (
            currentSectionIndx === courseSectionData.length - 1 &&
            currentSubSectionIndx === noOfSubsections - 1
        ) {
            return true;
        } else {
            return false;
        }
    };

    // đi đến video trước đó
    const goToPrevVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId);

        const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex(
            (data) => data._id === subSectionId
        );

        if (currentSubSectionIndx !== 0) {
            const prevSubSectionId =
                courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx - 1]._id;
            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
            );
        } else {
            const prevSectionId = courseSectionData[currentSectionIndx - 1]._id;
            const prevSubSectionLength =
                courseSectionData[currentSectionIndx - 1].subSection.length;
            const prevSubSectionId =
                courseSectionData[currentSectionIndx - 1].subSection[prevSubSectionLength - 1]._id;
            navigate(
                `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
            );
        }
    };

    // xử lý khi hoàn thành bài học
    const handleLectureCompletion = async () => {
        setLoading(true);
        const res = await markLectureAsComplete(
            { courseId: courseId, subsectionId: subSectionId },
            token
        );
        if (res) {
            dispatch(updateCompletedLectures(subSectionId));
        }
        setLoading(false);
    };

    // handle select answer
    const handleOnSelect = (answer, question) => {
        // update videoData
        const _videoData = { ...videoData };

        if (!_videoData.questions || _videoData?.questions?.length === 0) return;

        const index = _videoData.questions.findIndex((t) => t._id === question._id);

        if (index === -1) return;

        const questionsCopy = [..._videoData.questions];

        questionsCopy[index] = {
            ...questionsCopy[index],
            ...question,
            answerSelected: answer.order,
        };

        setVideoData({ ..._videoData, questions: questionsCopy });
    };

    const handleSubmitAnswer = async () => {
        const _videoData = { ...videoData };
        const questions = [..._videoData.questions];
        let tests = [...(_videoData.tests || [])];

        if (questions.some((q) => q?.answerSelected === undefined)) {
            toast.error("Vui lòng hoàn thành tất cả các câu hỏi trước khi nộp!");
            return;
        }

        if (!currentUser) {
            toast.error("Vui lòng đăng nhập!");
            return;
        }

        const payload = {
            questions,
            user: currentUser._id,
            subSection: subSectionId,
        };

        try {
            setIsLoadingSubmitAnswer(true);
            const response = await createTest(payload, token);

            tests = [response, ...tests];

            setVideoData((prev) => ({ ...prev, tests }));

            setResponseSubmitAnswer(response);
        } catch (error) {
        } finally {
            setIsLoadingSubmitAnswer(false);
        }
    };

    const handleShowHistory = () => {
        setIsShowHistory((prev) => !prev);
    };

    const { courseViewSidebar } = useSelector((state) => state.sidebar);

    // ẩn video khóa học, tiêu đề, mô tả khi sidebar mở trên thiết bị nhỏ
    if (courseViewSidebar && window.innerWidth <= 640) return;

    return (
        <>
            <DialogReviewTest
                open={!!selectedTestReview}
                onClose={() => setSelectedTestReview(null)}
                selectedTestReview={selectedTestReview}
            />

            <div className="flex flex-col gap-5 text-white">
                {/* biểu tượng mở - đóng sidebar */}
                <div
                    className="sm:hidden text-white absolute left-7 top-3 cursor-pointer "
                    onClick={() => dispatch(setCourseViewSidebar(!courseViewSidebar))}
                >
                    {!courseViewSidebar && <HiMenuAlt1 size={33} />}
                </div>

                {!videoData ? (
                    previewSource && (
                        <img
                            src={previewSource}
                            alt="Preview"
                            className="h-full w-full rounded-md object-cover"
                        />
                    )
                ) : (
                    <Player
                        ref={playerRef}
                        aspectRatio="16:9"
                        playsInline
                        autoPlay
                        onEnded={() => setVideoEnded(true)}
                        src={videoData?.videoUrl}
                    >
                        <BigPlayButton position="center" />
                        {/* Hiển thị khi video kết thúc */}
                        {videoEnded && (
                            <div
                                style={{
                                    backgroundImage:
                                        "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                                }}
                                className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                            >
                                {!completedLectures.includes(subSectionId) && (
                                    <IconBtn
                                        disabled={loading}
                                        onclick={() => handleLectureCompletion()}
                                        text={!loading ? "Đánh dấu đã hoàn thành" : "Đang tải..."}
                                        customClasses="text-xl max-w-max px-4 mx-auto"
                                    />
                                )}
                                <IconBtn
                                    disabled={loading}
                                    onclick={() => {
                                        if (playerRef?.current) {
                                            // đặt thời gian hiện tại của video về 0
                                            playerRef?.current?.seek(0);
                                            setVideoEnded(false);
                                        }
                                    }}
                                    text="Xem lại"
                                    customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                                />

                                <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                                    {!isFirstVideo() && (
                                        <button
                                            disabled={loading}
                                            onClick={goToPrevVideo}
                                            className="blackButton"
                                        >
                                            Trước
                                        </button>
                                    )}
                                    {!isLastVideo() && (
                                        <button
                                            disabled={loading}
                                            onClick={goToNextVideo}
                                            className="blackButton"
                                        >
                                            Tiếp theo
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </Player>
                )}

                <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
                <p className="pt-2 pb-6">{videoData?.description}</p>

                {videoData?.tests?.length > 0 && (
                    <div className="mb-4">
                        <IconBtn
                            disabled={loading}
                            onclick={handleShowHistory}
                            text="Lịch sử làm bài"
                        />
                    </div>
                )}

                {isShowHistory && (
                    <div className="relative overflow-x-auto mb-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-[#384152] dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Ngày đã làm
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Số câu đúng
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Số câu sai
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tổng số câu
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Xem lại
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {videoData?.tests?.length > 0 ? (
                                    videoData?.tests?.map((test, index, old) => (
                                        <tr
                                            className={
                                                "bg-[#202938] " +
                                                (old.length - 1 !== index
                                                    ? "border-b dark:bg-gray-800 dark:border-gray-700"
                                                    : "")
                                            }
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4">
                                                {moment(test.createdAt).format(
                                                    "DD/MM/YYYY, HH:mm:ss"
                                                )}
                                            </td>
                                            <td className="px-6 py-4">{test.totalIsCorrect}</td>
                                            <td className="px-6 py-4">{test.totalIsFailed}</td>
                                            <td className="px-6 py-4">{test.questions.length}</td>
                                            <td className="px-6 py-4">
                                                <IconBtn
                                                    text={"Xem"}
                                                    onclick={() => setSelectedTestReview(test)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="bg-[#202938] border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            Apple MacBook Pro 17"
                                        </th>
                                        <td className="px-6 py-4">Silver</td>
                                        <td className="px-6 py-4">Laptop</td>
                                        <td className="px-6 py-4">$2999</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {videoEnded ? (
                    responseSubmitAnswer ? (
                        <>
                            <div className="border-b">
                                <p className="text-xl">
                                    Kết quả làm bài tập nhỏ{" "}
                                    <span className="text-[#9EDF9C] text-base font-bold">
                                        (
                                        {`${responseSubmitAnswer?.totalIsCorrect}/${responseSubmitAnswer.questions.length} Đúng, ${responseSubmitAnswer?.totalIsFailed}/${responseSubmitAnswer.questions.length} Sai`}
                                        )
                                    </span>
                                </p>
                            </div>

                            <ViewQuestion
                                questions={responseSubmitAnswer?.questions || []}
                                isViewMode
                                isReviewMode
                            />

                            <div className="mb-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                                {!isFirstVideo() && (
                                    <button
                                        disabled={loading}
                                        onClick={goToPrevVideo}
                                        className="blackButton"
                                    >
                                        Trước
                                    </button>
                                )}
                                {!isLastVideo() && (
                                    <button
                                        disabled={loading}
                                        onClick={goToNextVideo}
                                        className="blackButton"
                                    >
                                        Tiếp theo
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        videoData?.questions.length > 0 && (
                            <>
                                <CountdownComponent
                                    initialMinutes={videoData.durationQuestion ?? 15}
                                    handleSubmitAnswer={handleSubmitAnswer}
                                    isLoadingSubmitAnswer={isLoadingSubmitAnswer}
                                    questions={videoData?.questions || []}
                                    onSelect={handleOnSelect}
                                    onTimeUp={() => alert("Time is up!")}
                                />
                            </>
                        )
                    )
                ) : null}
            </div>
        </>
    );
};

export default VideoDetails;
