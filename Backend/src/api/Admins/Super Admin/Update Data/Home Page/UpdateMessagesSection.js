import express from 'express';

import { message } from '../../../../../models/home/messageModel.js';

const UpdateMessagesSectionDetails = express.Router();
UpdateMessagesSectionDetails.use(express.json());


UpdateMessagesSectionDetails.put('/api/update/messagesection', async (req, res) => {

    const { _id } = req.user;
    const {serial,itemID, name, tittle, description, deleteItem ,photoLink, createNew} = req.body;

    try{
        if(deleteItem){
            const DeleteStatus = await message.findByIdAndDelete(itemID)
            if(DeleteStatus){
                res.status(200).json({msg:"Item Deleted Succesfully"})
            }else{
                res.status(400).json({msg:"Item can not be Deleted"})
            }

        }else if(createNew){
            const newItem = new message({
                serial:serial,
                photo:photoLink,
                title:tittle,
                name:name,
                description:description,
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
            const item = await message.findById(itemID);
            if(!item){
                res.status(404).json({msg:"item NOT found"})
            }else{
             const UpdatedItem = await message.findByIdAndUpdate(item._id,{
                    $set:{
                        serial:serial,
                        photo:photoLink,
                        title:tittle,
                        name:name,
                        description:description,
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

export default UpdateMessagesSectionDetails;