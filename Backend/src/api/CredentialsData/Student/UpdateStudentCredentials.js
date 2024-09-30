import studentcredentials from '../../../models/students/studentCredentials.js'; 
import express from 'express';
import HashPassword from '../../../../Demo/PasswordConverter.js';

const UpdateStudentCredentials = express.Router();
UpdateStudentCredentials.use(express.json());

UpdateStudentCredentials.put('/api/student/change-password', async (req, res) => {
    const { _id , NewPassword } = req.user;
    const hashedNewPassword=HashPassword(NewPassword);

    try{
        studentcredentials.findByIdAndUpdate(_id,{ $set: { password: `${hashedNewPassword}` } }, { new: true })
        .then(res.status(200).json('New Password Updated'))
        .catch(res.status(400).json({msg:'Failed to update the password'}))
    }catch(error){
        res.status(500).json({msg:'Internal Server Error'})
        console.log('Error Occured in changing password')
    }

});                     

export default UpdateStudentCredentials;
