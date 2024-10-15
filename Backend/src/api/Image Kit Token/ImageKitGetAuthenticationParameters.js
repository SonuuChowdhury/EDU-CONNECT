import express from 'express';
import ImageKit from 'imagekit';
import dotenv from 'dotenv';

dotenv.config();

const ImageKitGetAuthParams = express.Router();
ImageKitGetAuthParams.use(express.json());

ImageKitGetAuthParams.get('/api/get-authentication-parameters', async (req, res) => {

    const ImageKitInstance = new ImageKit({
        publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
        privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT
    });

    try {
        // Get the authentication parameters from ImageKit
        const ImageKitAuthenticationParameters = await ImageKitInstance.getAuthenticationParameters();

        // Convert expire to a string to ensure it complies with the required format
        ImageKitAuthenticationParameters.expire = ImageKitAuthenticationParameters.expire.toString();

        // Send the authentication parameters as the response
        res.status(200).json(ImageKitAuthenticationParameters);

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Failed to get the Auth Parameter" });
    }
});

export default ImageKitGetAuthParams;
