import express from 'express';

import { facility } from '../../../../../models/home/facilityModel';

const UpdatefacilitiesSectionDetails = express.Router();
UpdatefacilitiesSectionDetails.use(express.json());


UpdatefacilitiesSectionDetails.put('/api/update/facilitiessection', async (req, res) => {
    const { _id } = req.user;
    const {itemID, tittle, deleteItem ,photoLink,serial,createNew} = req.body;

    try{
        if(deleteItem){
            const DeleteStatus = await facility.findByIdAndDelete(itemID)
            if(DeleteStatus){
                res.status(200).json({msg:"Item Deleted Succesfully"})
            }else{
                res.status(400).json({msg:"Item can not be Deleted"})
            }

        }else if(createNew){
            const newItem = new facility({
                serial:serial,
                photo:photoLink,
                title:tittle,
            })

            try {
                // Save the item to the database
                const savedItem = await newItem.save();
                if(savedItem){
                    res.status(200).json({msg:"Item Added Succesfully"})
                }else{
                    res.status(400).json({msg:"Item can not be Added"})
                }
            } catch (error) {
                res.status(400).json({msg:"Item can not be Added"})
            }
        }else{

            const item = await facility.findById(itemID);
            if(!item){
                res.status(404).json({msg:"item NOT found"})
            }else{
             const UpdatedItem = await facility.findByIdAndUpdate(item._id,{
                    $set:{
                        serial:serial,
                        title: tittle,
                        photo:photoLink,
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

export default UpdatefacilitiesSectionDetails;