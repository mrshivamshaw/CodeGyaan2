import SubSection from "../models/SubSection.js";
import section from "../models/section.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import { config as configDotenv } from "dotenv";
configDotenv()


//create subsection
export const createSubSection = async (req,res) =>{
    try {
            //fetch data
        const {title,description,sectionId} = req.body
        const video = req.files.videoFile

        //validate the enteries
        if(!title || !description || !video){
            return res.status(400).json({
                success : false,
                message:"All fileds are mandatory"
            })
        }

        //upload video to cloudinary
        const videoDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME)

        //create a subsection
        const subsection = await SubSection.create(
            {
                description:description,
                title:title,
                videoUrl:videoDetails.secure_url,
                duration : videoDetails.duration
            }
        )

        //update section with subsection
        const updateSection = await section.findByIdAndUpdate(sectionId,{
            $push:{
                subSection:subsection._id
            }
        },{new:true}).populate("subSection")
        if(!updateSection){
            return res.status(400).json({
                success:false,
                message:"Unable to update section"
            })
        }
        return res.status(200).json({
            success:true,
            message:"SubSection Added successfully",
            data:updateSection
        })
    } catch (error) {
        console.log(error.message);
        return res.status(200).json({
            success:false,
            message:"SubSection Added unsuccessfully",
        })
    }

}



//Update subsection
export const updateSubSection = async (req,res) => {
    try {
                    //fetch data
                    const {title,description,duration,subSectionId} = req.body
                    // console.log(req.body);
                    // console.log(req.files);
                    //validate the enteries
                    if(!title || !description || !duration || !subSectionId){
                        return res.status(400).json({
                            success : false,
                            message:"All fileds are mandatory"
                        })
                    }
                    const video = req?.files?.videoFile
                    let videoDetails;
                    let updateSubSectionDetails;
                    if(video){
                        //upload video
                        videoDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
                        //update subsection
                        updateSubSectionDetails  = await SubSection.findByIdAndUpdate({_id:subSectionId},
                            {
                                title,
                                duration,
                                description,
                                videoUrl:videoDetails.secure_url
                            },
                            {new:true}
                        )
                    }
                    else{
                        //update subsection
                        updateSubSectionDetails  = await SubSection.findByIdAndUpdate({_id:subSectionId},
                            {
                                title,
                                duration,
                                description,
                            },
                            {new:true}
                        )
                    }

                    return res.status(200).json({
                        success:true,
                        message:"Subsection updated successfully",
                        data:updateSubSectionDetails
                    })
            
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Subsection updated Unsuccessfully",
        })
    }
}


//delete subsection
export const deleteSubsection = async (req,res) =>{
    try {
        const {subSectionId, sectionId} = req.body
        // console.log(req.body);
        // console.log(subSectionId);
       // validate
       if(!subSectionId || !sectionId){
            return res.status(500).json({
                success:false,
                message:"SubsectionId required to delete",
            })
       }
       const deleteDetails = await SubSection.findByIdAndDelete(subSectionId)
       const updatedSection = await section.findById(sectionId).populate("subSection")
       return res.status(200).json({
            success:true,
            message:"Subsection deleted successfully",
            data:updatedSection
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Subsection deleted Unsuccessfully",
        })
    }
}