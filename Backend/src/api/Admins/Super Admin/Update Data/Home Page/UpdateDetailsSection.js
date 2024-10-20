import express from 'express';

import { detail } from '../../../../../models/home/detailsModel.js';

const UpdateDetailsSectionDetails = express.Router();
UpdateDetailsSectionDetails.use(express.json());
 

UpdateDetailsSectionDetails.put('/api/update/detailsection', async (req, res) => {
    const { _id } = req.user;
    const {itemID, PhotoLink, profCount, alumniCount,currentStudentCount,courseCount, deleteItem } = req.body;

    try{
        if(deleteItem){
            const DeleteStatus = await detail.findByIdAndDelete(itemID)
            if(DeleteStatus){
                res.status(200).json({msg:"Item Deleted Succesfully"})
            }else{
                res.status(400).json({msg:"Item can not be Deleted"})
            }

        }else{
            const item = await notice.findById(itemID);
            if(!item){
                res.status(404).json({msg:"item NOT found"})
            }else{
             const UpdatedItem = await detail.findByIdAndUpdate(item._id,{
                    $set:{
                        backgroundPhoto:PhotoLink,
                        profCount:profCount,
                        courseCount:courseCount,
                        currentStudentCount:currentStudentCount,
                        alumniCount:alumniCount
                    },
                },{ new: true })
    
                if(!UpdatedItem){
                    res.status(400).json({msg:"Failed To update the item"})
                }else{
                    res.status(200).json({msg:"Item Updated succesfully"})
                }   
            }
        }

    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Internal Server Error"})
    }
});

export default UpdateDetailsSectionDetails;