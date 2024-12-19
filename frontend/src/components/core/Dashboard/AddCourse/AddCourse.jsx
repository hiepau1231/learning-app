import { useEffect } from "react";
import RenderSteps from "./RenderSteps";

export default function AddCourse() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex w-full items-start gap-x-6">
            <div className="flex flex-1 flex-col">
                <h1 className="mb-14 text-3xl font-medium text-richblack-5  text-center lg:text-left">
                    Thêm Khóa Học
                </h1>

                <div className="flex-1">
                    <RenderSteps />
                </div>
            </div>

            {/* Mẹo Tải Lên Khóa Học */}
            {/* <div className="sticky top-10 hidden lg:block max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 ">
                <p className="mb-8 text-lg text-richblack-5">⚡ Mẹo Tải Lên Khóa Học</p>

                <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
                    <li>Chọn tùy chọn Giá khóa học hoặc làm cho nó miễn phí.</li>
                    <li>Kích thước tiêu chuẩn cho ảnh thu nhỏ của khóa học là 1024x576.</li>
                    <li>Phần video điều khiển video tổng quan về khóa học.</li>
                    <li>Trình tạo khóa học là nơi bạn tạo và tổ chức khóa học.</li>
                    <li>
                        Thêm các Chủ đề trong phần Trình tạo khóa học để tạo bài học, bài kiểm tra
                        và bài tập.
                    </li>
                    <li>
                        Thông tin từ phần Dữ liệu bổ sung sẽ hiển thị trên trang chi tiết khóa học.
                    </li>
                    <li>Gửi Thông báo để thông báo cho bất kỳ điều gì quan trọng.</li>
                    <li>Ghi chú cho tất cả học viên đã đăng ký cùng một lúc.</li>
                </ul>
            </div> */}
        </div>
    );
}
