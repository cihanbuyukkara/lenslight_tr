
import mongoose from 'mongoose'; // mongoose module import edildi

const conn = () => {
    mongoose.connect(process.env.DB_URI, {
        dbName: "lenslight_tr",
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log("Connected to the DB successfully");
    }).catch((err) => {
        console.log(`DB connection err:, ${err}`);
    });
}

export default conn;