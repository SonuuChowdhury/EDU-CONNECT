import express from 'express';
import ImageKit from 'imagekit'
import dotenv from 'dotenv'

dotenv.config()

const StudentUplaodProfile = express.Router();
StudentUplaodProfile.use(express.json());

StudentUplaodProfile.get('/api/student/change-photo', async (req, res) => {

    const ImageKitInstance = new ImageKit({
        publicKey: `${process.env.IMAGE_KIT_PUBLIC_KEY}`,
        privateKey: `${process.env.IMAGE_KIT_PRIVATE_KEY}`,
        urlEndpoint: `${process.env.IMAGE_KIT_URL_ENDPOINT}`
    });

    const expiryTimestamp = Math.floor(Date.now() / 1000) + 600;
    const StringExpiryTimeStamp=String(expiryTimestamp)

    try{
        const ImageKitAuthenticationParameters = await ImageKitInstance.getAuthenticationParameters(StringExpiryTimeStamp);
        console.log(ImageKitAuthenticationParameters)
        res.status(200).json(ImageKitAuthenticationParameters)
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Failed to get the Auth Parameter"})
    }
})

export default StudentUplaodProfile;
