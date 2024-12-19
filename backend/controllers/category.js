const mongoose = require("mongoose");
const Category = require("../models/category");

// get Random Integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// ================ create Category ================
exports.createCategory = async (req, res) => {
    try {
        // extract data
        const { name, description } = req.body;

        // validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });

        res.status(200).json({
            success: true,
            message: "Category created successfully",
        });
    } catch (error) {
        console.log("Error while creating Category");
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while creating Category",
            error: error.message,
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        // extract data
        const { _id, name, description } = req.body;

        // validation
        if (!_id || !name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const categoryDetails = await Category.findByIdAndUpdate(_id, {
            name: name,
            description: description,
        });

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
        });
    } catch (error) {
        console.log("Error while creating Category");
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while creating Category",
            error: error.message,
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        // extract data
        const { _id } = req.body;

        // validation
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const categoryDetails = await Category.deleteOne({
            _id: _id,
        });

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.log("Error while creating Category");
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while creating Category",
            error: error.message,
        });
    }
};

// ================ get All Category ================
exports.showAllCategories = async (req, res) => {
    try {
        // get all category from DB
        const allCategories = await Category.find({}, { name: true, description: true });

        // return response
        res.status(200).json({
            success: true,
            data: allCategories,
            message: "All allCategories fetched successfully",
        });
    } catch (error) {
        console.log("Error while fetching all allCategories");
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while fetching all allCategories",
        });
    }
};

// ================ Get Category Page Details ================
exports.getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;
        // console.log("PRINTING CATEGORY ID: ", categoryId);

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ success: false, message: "Invalid category ID" });
        }

        // Get courses for the specified category
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: [
                    {
                        path: "ratingAndReviews"
                    },
                    {
                        path: "instructor",
                        select: "firstName lastName email image"
                    }
                ]
            })
            .exec();

        // console.log('selectedCategory = ', selectedCategory)
        // Handle the case when the category is not found
        if (!selectedCategory) {
            // console.log("Category not found.")
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
            // console.log("No courses found for the selected category.")
            return res.status(404).json({
                success: false,
                data: null,
                message: "No courses found for the selected category.",
            });
        }

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        });

        let differentCategory = null;

        if (categoriesExceptSelected.length > 0) {
            const randomIndex = getRandomInt(categoriesExceptSelected.length);
            const randomCategory = categoriesExceptSelected[randomIndex];

            // Fetch details for the random category
            differentCategory = await Category.findById(randomCategory._id)
                .populate({
                    path: "courses",
                    match: { status: "Published" },
                    populate: {
                        path: "instructor",
                        select: "firstName lastName email image"
                    }
                })
                .exec();
        }

        // Get top-selling courses across all categories
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: [
                    {
                        path: "instructor",
                        select: "firstName lastName email image"
                    },
                    {
                        path: "studentsEnrolled"
                    }
                ]
            })
            .exec();

        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostPopularCourses = allCourses
            .sort((a, b) => (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0))
            .slice(0, 10);

        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses: mostPopularCourses
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// ================ Get All Category Page Details ================
exports.getAllCategoryPageDetails = async (req, res) => {
    try {
        // Lấy tất cả các danh mục với khóa học đã được xuất bản
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: "ratingAndReviews",
            })
            .exec();

        // Kiểm tra nếu không có danh mục nào
        if (allCategories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No categories found",
            });
        }

        // Lọc danh mục có khóa học
        const categoriesWithCourses = allCategories.filter(
            (category) => category.courses.length > 0
        );

        // Kiểm tra nếu không có khóa học trong các danh mục
        if (categoriesWithCourses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found in any category",
            });
        }

        // Lấy ngẫu nhiên một danh mục khác
        let differentCategory = null;
        const categoriesExceptSelected = allCategories.filter(
            (category) => category.courses.length > 0
        );

        if (categoriesExceptSelected.length > 0) {
            const randomIndex = getRandomInt(categoriesExceptSelected.length);
            const randomCategory = categoriesExceptSelected[randomIndex];

            // Lấy thông tin cho danh mục ngẫu nhiên
            differentCategory = await Category.findById(randomCategory._id)
                .populate({
                    path: "courses",
                    match: { status: "Published" },
                })
                .exec();
        }

        // Lấy danh sách khóa học bán chạy nhất từ tất cả các danh mục
        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses.sort((a, b) => b.sold - a.sold).slice(0, 10);

        // Trả về kết quả
        res.status(200).json({
            success: true,
            data: {
                allCategories: categoriesWithCourses,
                differentCategory,
                mostSellingCourses,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
