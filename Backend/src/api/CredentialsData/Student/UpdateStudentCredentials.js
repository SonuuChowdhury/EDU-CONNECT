import studentcredentials from '../../../models/students/studentCredentials.js'; 
import express from 'express';
import HashPassword from '../../../../Demo/PasswordConverter.js';

const UpdateStudentCredentials = express.Router();
UpdateStudentCredentials.use(express.json());

UpdateStudentCredentials.put('/api/student/change-password', async (req, res) => {
    const { _id } = req.user;
    const { NewPassword } = req.body;
    const hashedNewPassword=await HashPassword(NewPassword);

    try{
        const updatedStudent = await studentcredentials.findByIdAndUpdate(_id,{ $set: { password: `${hashedNewPassword}` } }, { new: true })
        if (!updatedStudent) {
            return res.status(400).json({ msg: 'Failed to update the password' });
        }

        res.status(200).json('New Password Updated');
    }catch(error){
        res.status(500).json({msg:'Internal Server Error'})
        console.log('Error Occured in changing password')
    }

});                     

export default UpdateStudentCredentials;
