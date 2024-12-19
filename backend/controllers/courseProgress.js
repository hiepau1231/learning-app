const mongoose = require("mongoose");
const Section = require("../models/section");
const SubSection = require("../models/subSection");
const CourseProgress = require("../models/courseProgress");
const Course = require("../models/course");

// ================ update Course Progress ================
exports.updateCourseProgress = async (req, res) => {
    const { courseId, subsectionId } = req.body;
    const userId = req.user.id;

    try {
        // Check if the subsection is valid
        const subsection = await SubSection.findById(subsectionId);
        if (!subsection) {
            return res.status(404).json({ error: "Không tìm thấy bài học" });
        }

        // Get total number of subsections in the course
        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        });

        let totalSubsections = 0;
        course.courseContent.forEach(section => {
            totalSubsections += section.subSection.length;
        });

        // Find the course progress document for the user and course
        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        });

        if (!courseProgress) {
            // If course progress doesn't exist, create a new one
            courseProgress = new CourseProgress({
                courseID: courseId,
                userId: userId,
                completedVideos: [subsectionId],
            });

            // Calculate score: 20% for videos (2 points per video)
            const videoScore = (1 / totalSubsections) * 2;
            courseProgress.score = videoScore;

            // Save the new course progress
            await courseProgress.save();

            return res.status(200).json({ 
                success: true,
                message: "Cập nhật tiến độ thành công",
                data: courseProgress
            });
        } else {
            // If course progress exists, check if the subsection is already completed
            if (courseProgress.completedVideos.includes(subsectionId)) {
                return res.status(400).json({ 
                    success: false,
                    message: "Bài học này đã được hoàn thành" 
                });
            }

            // Push the subsection into the completedVideos array
            courseProgress.completedVideos.push(subsectionId);

            // Calculate new score: 20% for videos (2 points per video)
            const videoScore = (courseProgress.completedVideos.length / totalSubsections) * 2;
            courseProgress.score = videoScore + (courseProgress.testScore || 0);

            // Save the updated course progress
            await courseProgress.save();

            return res.status(200).json({ 
                success: true,
                message: "Cập nhật tiến độ thành công",
                data: courseProgress
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false,
            message: "Lỗi server",
            error: error.message 
        });
    }
};

// ================ get Progress Percentage ================
// exports.getProgressPercentage = async (req, res) => {
//   const { courseId } = req.body
//   const userId = req.user.id

//   if (!courseId) {
//     return res.status(400).json({ error: "Course ID not provided." })
//   }

//   try {
//     // Find the course progress document for the user and course
//     let courseProgress = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     })
//       .populate({
//         path: "courseID",
//         populate: {
//           path: "courseContent",
//         },
//       })
//       .exec()

//     if (!courseProgress) {
//       return res
//         .status(400)
//         .json({ error: "Can not find Course Progress with these IDs." })
//     }
//     console.log(courseProgress, userId)
//     let lectures = 0
//     courseProgress.courseID.courseContent?.forEach((sec) => {
//       lectures += sec.subSection.length || 0
//     })

//     let progressPercentage =
//       (courseProgress.completedVideos.length / lectures) * 100

//     // To make it up to 2 decimal point
//     const multiplier = Math.pow(10, 2)
//     progressPercentage =
//       Math.round(progressPercentage * multiplier) / multiplier

//     return res.status(200).json({
//       data: progressPercentage,
//       message: "Succesfully fetched Course progress",
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ error: "Internal server error" })
//   }
// }
