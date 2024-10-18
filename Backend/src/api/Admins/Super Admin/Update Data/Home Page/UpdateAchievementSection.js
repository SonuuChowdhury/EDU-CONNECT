import express from 'express';

import { achievement } from '../../../../../models/home/achievementModel';

const UpdateAchievementSectionDetails = express.Router();
UpdateAchievementSectionDetails.use(express.json());


UpdateAchievementSectionDetails.put('/api/update/achievementsection', async (req, res) => {
    const currentDate = new Date();
    const isoStringCurrent = currentDate.toISOString();
    const { _id } = req.user;
    const {itemID, link, tittle, description, deleteItem ,serial ,photoLink, createNew} = req.body;

    try{
        if(deleteItem){
            const DeleteStatus = await achievement.findByIdAndDelete(itemID)
            if(DeleteStatus){
                res.status(200).json({msg:"Item Deleted Succesfully"})
            }else{
                res.status(400).json({msg:"Item can not be Deleted"})
            }

        }else if(createNew){
            const newItem = new achievement({
                serial:serial,
                date:isoStringCurrent,
                tittle:tittle,
                photo:photoLink,
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


        }else{
            const currentDate = new Date();
            const isoStringCurrent = currentDate.toISOString();

            const item = await achievement.findById(itemID);
            if(!item){
                res.status(404).json({msg:"item NOT found"})
            }else{
             const UpdatedItem = await achievement.findByIdAndUpdate(item._id,{
                    $set:{
                        tittle: tittle,
                        link: link,
                        description: description,
                        date: isoStringCurrent,
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

export default UpdateAchievementSectionDetails;