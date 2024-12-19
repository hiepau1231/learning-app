import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Import các thành phần
import Course_Card from "../components/core/Catalog/Course_Card";
import Course_Slider from "../components/core/Catalog/Course_Slider";
import Footer from "../components/common/Footer";
import Loading from "./../components/common/Loading";

import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import { fetchCourseCategories } from "./../services/operations/courseDetailsAPI";

function Catalog() {
    const { catalogName } = useParams();
    const [active, setActive] = useState(1);
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [loading, setLoading] = useState(false);

    // Lấy tất cả các thể loại
    useEffect(() => {
        (async () => {
            try {
                const res = await fetchCourseCategories();
                const category_id = res.find(
                    (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
                )?._id;
                setCategoryId(category_id);
            } catch (error) {
                console.error("Không thể lấy danh mục.", error);
            }
        })();
    }, [catalogName]);

    useEffect(() => {
        if (categoryId) {
            (async () => {
                setLoading(true);
                try {
                    const res = await getCatalogPageData(categoryId);
                    setCatalogPageData(res);
                } catch (error) {
                    console.error(error);
                }
                setLoading(false);
            })();
        }
    }, [categoryId]);

    if (loading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <Loading />
            </div>
        );
    }

    if (!loading && !catalogPageData) {
        return (
            <div className="text-white text-4xl flex justify-center items-center mt-[20%]">
                Không tìm thấy khóa học nào
            </div>
        );
    }

    return (
        <>
            {/* Hero Section */}
            <div className="box-content bg-richblack-800 px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
                    <p className="text-sm text-richblack-300">
                        {`Trang chủ / Danh mục / `}
                        <span className="text-yellow-25">
                            {catalogPageData?.selectedCategory?.name}
                        </span>
                    </p>
                    <p className="text-3xl text-richblack-5">
                        {catalogPageData?.selectedCategory?.name}
                    </p>
                    <p className="max-w-[870px] text-richblack-200">
                        {catalogPageData?.selectedCategory?.description}
                    </p>
                </div>
            </div>

            {/* Section 1 */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading">Các khóa học để bạn bắt đầu</div>
                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <p
                        className={`px-4 py-2 ${
                            active === 1
                                ? "border-b border-b-yellow-25 text-yellow-25"
                                : "text-richblack-50"
                        } cursor-pointer`}
                        onClick={() => setActive(1)}
                    >
                        Phổ biến nhất
                    </p>
                    <p
                        className={`px-4 py-2 ${
                            active === 2
                                ? "border-b border-b-yellow-25 text-yellow-25"
                                : "text-richblack-50"
                        } cursor-pointer`}
                        onClick={() => setActive(2)}
                    >
                        Mới
                    </p>
                </div>
                <div>
                    <Course_Slider Courses={catalogPageData?.selectedCategory?.courses} />
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Catalog;
