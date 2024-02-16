import bcrypt from "bcrypt"; // bcrypt module import edildi 
import mongoose from 'mongoose'; // mongoose module import edildi
import validator from "validator";

const { Schema } = mongoose; // schema import edildi

const userSchema = new Schema({ // schema oluşturuldu
    username: { // name alanı
        type: String, // tipi
        required: [true, "Name area is required "],  // isim alanı zorunlu eğer boş bır deger girilirse hata verilecek
        lowercase: true, // isim alanı kucuk harf yapılır
        validate: [validator.isAlphanumeric, "Name must be alphanumeric"]
    },

    email: {// description alanı
        type: String,
        required: [true, "Email area is required"], // email alanı zorunlu  olduğunda gösterilecek hata mesajı
        unique: true,// email alanı benzersiz
        validate: [validator.isEmail, "Valid email is required"] // email alanı dogrulama yapılır
    },

    password: { // password alanı
        type: String, // tipi 
        required: [true, "Password area is required"], // password alanı zorunlu  değer girilmezse hata verilecek 
        minlength: [4, "Password must be at least 4 characters"], // password alanı en az 6 karakter olmalı         
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    followings: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

},


    {
        timestamps: true, // tarih alanı
    }
);

userSchema.pre("save", function (next) {
    const user = this; // 'this' kelimesini kullanarak şu anki kullanıcıya erişim sağlıyoruz
    console.log("USER PASS 1", user.password)

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err); // Hata durumunda hatayı döndür ve devam etme
        }
        user.password = hash;
        console.log("USER PASS 2", user.password)
        next();
    })
});

const User = mongoose.model('User', userSchema); // model oluşturuldu 

export default User; // export edildi 