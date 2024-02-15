import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';
import Photo from '../models/photoModel.js'; // model import edildi

const createPhoto = async (req, res) => {
    console.log(req.file);
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: 'lenslight_tr',
        }
    );
    console.log('result', result)
    try {
        await Photo.create({
            name: req.body.name,
            description: req.body.description,
            user: res.locals.user._id,
            url: result.secure_url
        });

        fs.unlinkSync(req.files.image.tempFilePath)

        res.status(201).redirect('/users/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).json({
            succeded: false,
            error,
        });
    }
};

const getAllPhotos = async (req, res) => { // GET metoduna gore getAllPhotos islemini yaptirdi
    try {
        const photos = await Photo.find({}); // photo tablosundan veri cekildi
        res.status(200).render('photos', {
            photos,
            link: 'photos',
        });
    } catch (error) {
        res.status(500).json({ // 500 oluşturuldu 
            succeded: false,
            error
        });
    }
};

const getAPhotos = async (req, res) => { // GET metoduna gore getAllPhotos islemini yaptirdi
    try {
        const photo = await Photo.findById({ _id: req.params.id }).populate('user'); // photo tablosundan veri cekildi
        res.status(200).render('photo', {
            photo,
            link: 'photos',
        });
    } catch (error) {
        res.status(500).json({ // 500 oluşturuldu 
            succeded: false,
            error
        });
    }
};





export { createPhoto, getAPhotos, getAllPhotos }; // export edildi 

