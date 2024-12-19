const Test = require("../models/test");
const CourseProgress = require("../models/courseProgress");

const createTest = async (req, res) => {
    try {
        const { questionsToBeAdded, courseId } = req.body;
        const userId = req.user.id;

        // Validate input
        if (!questionsToBeAdded || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Thiếu thông tin bài kiểm tra"
            });
        }

        // Calculate test score (80% of total score)
        const totalQuestions = questionsToBeAdded.length;
        const pointsPerQuestion = 8 / totalQuestions; // 8 points = 80% of total 10 points
        let correctAnswers = 0;

        // Create test record
        const test = await Test.create({
            questions: questionsToBeAdded,
            courseId: courseId,
            userId: userId
        });

        // Find or create course progress
        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId
        });

        if (!courseProgress) {
            courseProgress = new CourseProgress({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
                testScore: 0,
                score: 0
            });
        }

        // Calculate test score
        questionsToBeAdded.forEach(question => {
            if (question.correctAnswer === question.selectedAnswer) {
                correctAnswers++;
            }
        });

        const testScore = (correctAnswers / totalQuestions) * 8; // 8 points = 80% of total score
        courseProgress.testScore = testScore;

        // Update total score (test score + video score)
        courseProgress.score = testScore + (courseProgress.score || 0);

        // Save course progress
        await courseProgress.save();

        return res.status(200).json({
            success: true,
            message: "Bài kiểm tra đã được lưu",
            data: {
                test,
                courseProgress
            }
        });

    } catch (error) {
        console.error("Error creating test:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi khi tạo bài kiểm tra",
            error: error.message
        });
    }
};

module.exports = {
    createTest
};
