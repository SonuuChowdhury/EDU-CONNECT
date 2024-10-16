import express from 'express';

import { masterphoto } from '../../../../../models/home/masterPhotosModel.js';

const UpdateMasterSectionDetails = express.Router();
UpdateMasterSectionDetails.use(express.json());


UpdateMasterSectionDetails.put('/api/update/mastersecetion', async (req, res) => {
    const { _id } = req.user;
    const {itemID, url, tittle, deleteItem } = req.body;

    try{
        if(deleteItem){
            const DeleteStatus = await masterphoto.findByIdAndDelete(itemID)
            if(DeleteStatus){
                res.status(200).json({msg:"Item Deleted Succesfully"})
            }else{
                res.status(400).json({msg:"Item can not be Deleted"})
            }

        }else{
            const item = await masterphoto.findById(itemID);
            if(!item){
                res.status(404).json({msg:"item NOT found"})
            }else{
             const UpdatedItem = await masterphoto.findByIdAndUpdate(item._id,{
                    $set:{
                        title :tittle,
                        link:url,
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

export default UpdateMasterSectionDetails;