const Section = require("../models/section");
const SubSection = require("../models/subSection");
const QuestionModel = require("../models/question");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// ================ create SubSection ================
exports.createSubSection = async (req, res) => {
    try {
        // extract data
        const { title, description, sectionId, durationQuestion, questions } = req.body;

        if (durationQuestion && !parseInt(durationQuestion)) {
            return res.status(400).json({
                success: false,
                message: "Thời gian làm bài phải nhập số",
            });
        }

        // extract video file
        const videoFile = req.files.video;
        // console.log('videoFile ', videoFile)

        // validation
        if (!title || !description || !videoFile || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // upload video to cloudinary
        const videoFileDetails = await uploadImageToCloudinary(videoFile, process.env.FOLDER_NAME);

        // create entry in DB
        const SubSectionDetails = await SubSection.create({
            title,
            timeDuration: videoFileDetails.duration,
            description,
            videoUrl: videoFileDetails.secure_url,
            durationQuestion,
        });

        if (questions) {
            const questionsToBeAdded = JSON.parse(questions);

            console.log("====================================");
            console.log({
                questionsToBeAdded,
            });
            console.log("====================================");

            // add new questions
            if (questionsToBeAdded.length > 0) {
                const newQuestions = await QuestionModel.insertMany(questionsToBeAdded);
                const questionIds = newQuestions.map((question) => question._id);
                SubSectionDetails.questions = [...questionIds];

                await SubSectionDetails.save();
            }
        }

        // link subsection id to section
        // Update the corresponding section with the newly created sub-section
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: SubSectionDetails._id } },
            { new: true }
        ).populate({
            path: "subSection",
            populate: {
                path: "questions",
            },
        });

        // return response
        res.status(200).json({
            success: true,
            data: updatedSection,
            message: "SubSection created successfully",
        });
    } catch (error) {
        console.log("Error while creating SubSection");
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while creating SubSection",
        });
    }
};

// ================ Update SubSection ================
exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, description, durationQuestion, questions } =
            req.body;

        if (durationQuestion && !parseInt(durationQuestion)) {
            return res.status(400).json({
                success: false,
                message: "Thời gian làm bài phải nhập số",
            });
        }

        // validation
        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "subSection ID is required to update",
            });
        }

        // find in DB
        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        // add data
        if (title) {
            subSection.title = title;
        }

        if (description) {
            subSection.description = description;
        }

        if (durationQuestion) {
            subSection.durationQuestion = durationQuestion;
        }

        if (questions) {
            const questionsArray = JSON.parse(questions);
            const defaultQuestions = subSection.questions.map((t) => t.toString());

            // filter question not present in new questions
            const questionsToBeAdded = questionsArray.filter((question) => !question._id);
            const questionsToBeUpdated = questionsArray.filter((q) => q._id);

            console.log("====================================");
            console.log({
                questionsArray,
                defaultQuestions,
                questionsToBeAdded,
                questionsToBeUpdated,
            });
            console.log("====================================");

            // add new questions
            if (questionsToBeAdded.length > 0) {
                const newQuestions = await QuestionModel.insertMany(questionsToBeAdded);

                const questionIds = newQuestions.map((question) => question._id);
                subSection.questions = [...defaultQuestions, ...questionIds];
            }

            if (questionsToBeUpdated.length > 0) {
                await Promise.all(
                    questionsToBeUpdated.map(
                        async ({ _id, ...question }) =>
                            await QuestionModel.findByIdAndUpdate(_id, {
                                $set: question,
                            })
                    )
                );
            }
        }

        // upload video to cloudinary
        if (req.files && req.files.videoFile !== undefined) {
            const video = req.files.videoFile;
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = uploadDetails.duration;
        }

        // save data to DB
        await subSection.save();

        const updatedSection = await Section.findById(sectionId).populate({
            path: "subSection",
            populate: {
                path: "questions",
            },
        });

        return res.json({
            success: true,
            data: updatedSection,
            message: "Section updated successfully",
        });
    } catch (error) {
        console.error("Error while updating the section");
        console.error(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while updating the section",
        });
    }
};

// ================ Delete SubSection ================
exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        );

        // delete from DB
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId });

        if (!subSection) {
            return res.status(404).json({ success: false, message: "SubSection not found" });
        }

        const updatedSection = await Section.findById(sectionId).populate("subSection");

        // In frontned we have to take care - when subsection is deleted we are sending ,
        // only section data not full course details as we do in others

        // success response
        return res.json({
            success: true,
            data: updatedSection,
            message: "SubSection deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,

            error: error.message,
            message: "An error occurred while deleting the SubSection",
        });
    }
};
