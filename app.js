import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'; // dotenv module import edildi
import express from 'express'; // express module import edildi
import fileUpload from 'express-fileupload';
import conn from './db.js'; // db.js import edildi 
import { checkUser } from './middlewares/authMiddleware.js';
import pageRoute from './routes/pageRoute.js'; // pageRoute.js import edildi
import photoRoute from './routes/photoRoute.js'; // photoRoute.js import edildi
import userRoute from './routes/userRoute.js'; // userRoute.js import edildi




dotenv.config(); // dotenv config edildi

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});


//connection to the DB
conn(); // db.js ile baglanti kuruldu 

const app = express(); // express app olusturuldu
const port = process.env.PORT; // port tanımlandı

//* ejs template engine
app.set('view engine', 'ejs'); // view engine tanımlandı

//* static files middleware
app.use(express.static('public')); // public klasörü eklendi
app.use(express.json());  // json middleware eklendi
app.use(express.urlencoded({ extended: true })); // urlencoded middleware eklendi
app.use(cookieParser()); // cookieParser middleware eklendi
app.use(fileUpload({ useTempFiles: true })); // fileUpload middleware eklendi

//*routes
app.use('*', checkUser); // checkUser middleware eklendi ve her yola uygun kullanicilara uygulaldi
app.use('/', pageRoute);       // sayfalar icin yol belirledi
app.use('/photos', photoRoute); // photos icin yol belirledi
app.use('/users', userRoute); // users icin yol belirledi


app.listen(port, () => {    // server baslatildi ve port numarasi console'a yazdirildi
    console.log(`Sunucu ${port} numaralı portta çalışıyor`); // console'a yazdirildi
});