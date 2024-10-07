import express from 'express';

import studentbasicdetails from '../../../models/students/studentDetails.js';
import studentcredentials from '../../../models/students/studentCredentials.js';

const StudentUpdateURLProfile = express.Router();
StudentUpdateURLProfile.use(express.json());


StudentUpdateURLProfile.put('/api/student/change-photo/update-or-delete', async (req, res) => {
    const { _id } = req.user;
    const { url, update } = req.body;

    try{
        if(update){
            const Student=await studentcredentials.findById(_id);
            if(!Student){
                res.status(404).json({msg:"Student Not found in database"})
            }else{
                const RollNumber = Student.roll;
                const StudentBasicDetails =await  studentbasicdetails.findOne({roll:RollNumber})

                const UpdateStudent = await studentbasicdetails.findByIdAndUpdate(StudentBasicDetails._id,{
                    $set:{
                        profile:url,
                        isProfile :true
                    }
                },{ new: true })
    
                if(!UpdateStudent){
                    res.status(404).json({msg:"Student Not found in database"})
                }else{
                    res.status(200).json({msg:"Profile Picture URL Updated"})
                }   
            }

        }else{

            const Student=await studentcredentials.findById(_id);
            if(!Student){
                res.status(404).json({msg:"Student Not found in database"})
            }else{
                const RollNumber = Student.roll;
                const StudentBasicDetails =await  studentbasicdetails.findOne({roll:RollNumber})
           

            const UpdateStudent = await studentbasicdetails.findByIdAndUpdate(StudentBasicDetails._id,{
                $set:{
                    isProfile :false
                }
            },{ new: true })
    
            if(!UpdateStudent){
                res.status(404).json({msg:"Student Not found in database"})
            }
            res.status(200).json({msg:"Profile Picture Removed seccesfully"})
        }
    
        }
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Internal Server Error"})
    }
});

export default StudentUpdateURLProfile;
