import express from 'express'; // express module import edildi 

import * as photoController from '../controllers/photoController.js'; // photoController import edildi 
const router = express.Router(); // router oluşturuldu

router
    .route('/') // GET metoduna yonlendirilir
    .post(photoController.createPhoto)
    .get(photoController.getAllPhotos); // GET metoduna gore getAllPhotos islemini yaptirdi

router.route("/:id")
    .get(photoController.getAPhotos)
    .delete(photoController.deletePhoto)
    .put(photoController.updatePhoto)



export default router;