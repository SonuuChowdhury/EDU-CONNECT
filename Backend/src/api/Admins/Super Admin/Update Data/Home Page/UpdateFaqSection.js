import express from 'express';

import {faq} from '../../../../../models/home/faq.js'

const UpdateFaqsSectionDetails = express.Router();
UpdateFaqsSectionDetails.use(express.json());


UpdateFaqsSectionDetails.put('/api/update/faqsection', async (req, res) => {
    const currentDate = new Date();
    const isoStringCurrent = currentDate.toISOString();

    const { _id } = req.user;
    const {serial,itemID, question, answer, deleteItem ,createNew} = req.body;

    try{
        if(deleteItem){
            const DeleteStatus = await faq.findByIdAndDelete(itemID)
            if(DeleteStatus){
                res.status(200).json({msg:"Item Deleted Succesfully"})
            }else{
                res.status(400).json({msg:"Item can not be Deleted"})
            }

        }else if(createNew){
            const newItem = new faq({
                serial:serial,
                question:question,
                answer:answer,
                date:isoStringCurrent,
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
            const item = await faq.findById(itemID);
            if(!item){
                res.status(404).json({msg:"item NOT found"})
            }else{
             const UpdatedItem = await message.findByIdAndUpdate(item._id,{
                    $set:{
                        serial:serial,
                        question:question,
                        answer:answer,
                        date:isoStringCurrent,
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

export default UpdateFaqsSectionDetails;