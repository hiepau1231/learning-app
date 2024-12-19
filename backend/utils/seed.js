const Category = require('../models/category');
const Course = require('../models/course');
const User = require('../models/user');

const categories = [
    {
        name: "Lập trình web",
        description: "Học cách xây dựng các ứng dụng web từ cơ bản đến nâng cao"
    },
    {
        name: "Lập trình di động",
        description: "Phát triển ứng dụng di động cho iOS và Android"
    },
    {
        name: "Trí tuệ nhân tạo",
        description: "Tìm hiểu về AI, Machine Learning và Deep Learning"
    },
    {
        name: "Cơ sở dữ liệu",
        description: "Thiết kế và quản lý cơ sở dữ liệu"
    },
    {
        name: "Bảo mật",
        description: "Bảo mật thông tin và an toàn mạng"
    }
];

const sampleCourses = [
    {
        courseName: "Lập trình web với React",
        courseDescription: "Học cách xây dựng ứng dụng web với React",
        whatYouWillLearn: "React, Redux, React Router, Hooks",
        tag: ["web", "react", "javascript"],
        status: "Published",
        thumbnail: "https://example.com/react.jpg",
        categoryName: "Lập trình web"
    },
    {
        courseName: "Phát triển ứng dụng Android",
        courseDescription: "Học cách xây dựng ứng dụng Android native",
        whatYouWillLearn: "Android SDK, Kotlin, Material Design",
        tag: ["android", "mobile", "kotlin"],
        status: "Published",
        thumbnail: "https://example.com/android.jpg",
        categoryName: "Lập trình di động"
    },
    {
        courseName: "Machine Learning cơ bản",
        courseDescription: "Nhập môn Machine Learning",
        whatYouWillLearn: "Python, NumPy, Pandas, Scikit-learn",
        tag: ["ai", "ml", "python"],
        status: "Published",
        thumbnail: "https://example.com/ml.jpg",
        categoryName: "Trí tuệ nhân tạo"
    }
];

async function seedData() {
    try {
        // Xóa tất cả dữ liệu cũ
        await Category.deleteMany({});
        await Course.deleteMany({});
        
        // Thêm categories mới
        const createdCategories = await Category.insertMany(categories);
        console.log('Đã thêm dữ liệu mẫu cho category thành công');

        // Tìm một instructor
        const instructor = await User.findOne({ accountType: "Instructor" });
        if (!instructor) {
            console.log('Không tìm thấy instructor');
            return;
        }

        // Thêm courses mới
        for (const course of sampleCourses) {
            // Tìm category tương ứng
            const category = createdCategories.find(cat => cat.name === course.categoryName);
            if (!category) {
                console.log(`Không tìm thấy category cho khóa học ${course.courseName}`);
                continue;
            }

            const newCourse = await Course.create({
                ...course,
                instructor: instructor._id,
                category: category._id,
                createdAt: Date.now()
            });

            // Thêm course vào category
            await Category.findByIdAndUpdate(
                category._id,
                {
                    $push: { courses: newCourse._id }
                },
                { new: true }
            );

            // Thêm course vào instructor
            await User.findByIdAndUpdate(
                instructor._id,
                {
                    $push: { courses: newCourse._id }
                },
                { new: true }
            );
        }

        console.log('Đã thêm dữ liệu mẫu cho course thành công');
    } catch (error) {
        console.error('Lỗi khi thêm dữ liệu mẫu:', error);
    }
}

module.exports = seedData; 