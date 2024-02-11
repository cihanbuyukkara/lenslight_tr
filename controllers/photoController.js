import Photo from '../models/photoModel.js'; // model import edildi

const createPhoto = async (req, res) => { // POST metoduna gore createPhoto islemini yaptirdi
    try {
        const photo = Photo.create(req.body); // req.body ile photo olusturuldu
        res.status(201).json({ // 201 oluşturuldu 
            succeded: true, // islem basarili
            photo, // photo olusturuldu 
        });
    } catch (error) {
        res.status(500).json({ // 201 oluşturuldu 
            succeded: false,
            error
        });
    }// hata verdi
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
}
export { createPhoto, getAllPhotos }; // export edildi 

