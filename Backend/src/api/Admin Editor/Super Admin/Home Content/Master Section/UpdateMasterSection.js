import express from 'express';

import { masterphoto } from '../../../../../models/home/masterPhotosModel.js';

const UpdateMasterSectionDetails = express.Router();
UpdateMasterSectionDetails.use(express.json());


UpdateMasterSectionDetails.put('/api/update/mastersecetion', async (req, res) => {
    const { _id } = req.user;
    const { url, tittle} = req.body;

    try{
        const item = await masterphoto.findById(_id);
        if(!item){
            res.status(404).json({msg:"item NOT found"})
        }else{
            const UpdatedItem = await masterphoto.findByIdAndUpdate(item._id,{
                $set:{
                    link:url,
                    tittle :tittle
                }
            },{ new: true })
    
            if(!UpdatedItem){
                res.status(400).json({msg:"Failed To update the item"})
            }else{
                res.status(200).json({msg:"Item Updated succesfully"})
            }   
        }

    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Internal Server Error"})
    }
});

export default UpdateMasterSectionDetails;
