import express from 'express'; // express module import edildi 

import * as photoController from '../controllers/photoController.js'; // photoController import edildi 
const router = express.Router(); // router oluşturuldu

router.route('/').post(photoController.createPhoto)
    .get(photoController.getAllPhotos); // GET metoduna gore getAllPhotos islemini yaptirdi
export default router;