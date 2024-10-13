import express from 'express';
import { masterphoto } from '../../../../../models/home/masterPhotosModel.js';

const GetMasterPhotos = express.Router();
GetMasterPhotos.use(express.json());

GetMasterPhotos.get('/api/super-admin/masterphotos', async (req, res) => {
    try{
        const masterphotosData= await masterphoto.find()
        if(!masterphotosData){
            res.status(400).json({msg:'No data Found'})
        }
        res.status(200).json(masterphotosData)
    }catch(error){
        res.status(500).json({msg:'Server Error'})
    }
});

export default GetMasterPhotos;









