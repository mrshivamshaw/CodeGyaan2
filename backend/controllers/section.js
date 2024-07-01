import course from "../models/course.js";
import section from "../models/section.js";
import SubSection from "../models/SubSection.js";

//Create section
export const createSection = async (req, res) => {
  try {
    //fetch data
    const { sectionName, courseId } = req.body;

    //validate the data
    if (!sectionName || !courseId) {
      return res.status.json({
        success: false,
        message: "All fields are required",
      });
    }

    //create section and insert in course
    const newSection = await section.create({ sectionName });
    const updatedDetails = await course.findByIdAndUpdate(
      courseId,
      {
          $push: {
              courseContent: newSection._id,
          },
      },
      { new: true }
  )
  .populate({
      path: "courseContent",
      populate: {
          path: "subSection",
      },
  })
  .exec();
  
  

    //hw popullate section and subsection

    return res.status(200).json({
      success: true,
      courseData: updatedDetails,
      sectionData: newSection,
      message: "course updates successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "course updates Unsuccessfully",
    });
  }
};

//updatesction
export const updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;

    //validate the inputs
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Unable to fetch details",
      });
    }

    //updatesection
    const updateSection = await section.findByIdAndUpdate(
      sectionId,
      { sectionName: sectionName },
      { new: true }
    );

    //get the updated course
    const updatedCourse = await course.findById(courseId)
    .populate({
        path: "courseContent",
        populate: {
            path: "subSection",
        },
    })
    return res.status(200).json({
      success: true,
      data: updatedCourse,
      message: "Section updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(200).json({
      success: false,
      message: "Section updated Unsuccessfully",
    });
  }
};

//deleteSection
export const deleteSection = async (req, res) => {
  try {
    const { sectionId,courseId } = req.body;
    const allSubsection = await section.findById(sectionId);
    for (let i = 0; i < allSubsection.subSection.length; i++) {
      const subsectionId = allSubsection.subSection[i];
      await SubSection.findByIdAndDelete(subsectionId);
    }
    const deleteSection = await section.findByIdAndDelete(sectionId);
    // deleteSection && console.log("deleted",deleteSection);
    const updateCourse = await course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    })
    return res.status(200).json({
      success: true,
      message: "section deleted successfully",
      data: updateCourse,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "section deleted Unsuccessfully",
    });
  }
};
