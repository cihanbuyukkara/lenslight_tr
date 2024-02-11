import dotenv from 'dotenv'; // dotenv module import edildi
import express from 'express'; // express module import edildi
import conn from './db.js'; // db.js import edildi 
import pageRoute from './routes/pageRoute.js'; // pageRoute.js import edildi
import photoRoute from './routes/photoRoute.js'; // photoRoute.js import edildi

dotenv.config(); // dotenv config edildi
//connection to the DB
conn(); // db.js ile baglanti kuruldu

const app = express(); // express app olusturuldu
const port = process.env.PORT; // port tanımlandı

//* ejs template engine
app.set('view engine', 'ejs'); // view engine tanımlandı

//* static files middleware
app.use(express.static('public')); // public klasörü eklendi
app.use(express.json());  // json middleware eklendi

//*routes
app.use('/', pageRoute);       // sayfalar icin yol belirledi
app.use('/photos', photoRoute); // photos icin yol belirledi


app.listen(port, () => {    // server baslatildi ve port numarasi console'a yazdirildi
    console.log(`Sunucu ${port} numaralı portta çalışıyor`); // console'a yazdirildi
});