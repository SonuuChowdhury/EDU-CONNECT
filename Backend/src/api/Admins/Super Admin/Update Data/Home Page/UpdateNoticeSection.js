import express from 'express';

import { notice } from '../../../../../models/home/noticemodel';

const UpdateNoticeSectionDetails = express.Router();
UpdateNoticeSectionDetails.use(express.json());


UpdateNoticeSectionDetails.put('/api/update/noticesection', async (req, res) => {
    const currentDate = new Date();
    const isoStringCurrent = currentDate.toISOString();
    const { _id } = req.user;
    const {serial,itemID, link, tittle, description, deleteItem ,createNew} = req.body;

    try{
        if(deleteItem){
            const DeleteStatus = await notice.findByIdAndDelete(itemID)
            if(DeleteStatus){
                res.status(200).json({msg:"Item Deleted Succesfully"})
            }else{
                res.status(400).json({msg:"Item can not be Deleted"})
            }

        }else if(createNew){
            const newItem = new notice({
                serial:serial,
                date:isoStringCurrent,
                tittle:tittle,
                description:description,
                link:link
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


        } else{

            const item = await notice.findById(itemID);
            if(!item){
                res.status(404).json({msg:"item NOT found"})
            }else{
             const UpdatedItem = await notice.findByIdAndUpdate(item._id,{
                    $set:{
                        serial:serial,
                        tittle: tittle,
                        link: link,
                        description: description,
                        date: isoStringCurrent,
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

export default UpdateNoticeSectionDetails;