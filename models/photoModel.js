import mongoose from 'mongoose'; // mongoose module import edildi

const { Schema } = mongoose; // schema import edildi

const photoSchema = new Schema({ // schema oluşturuldu
    name: { // name alanı
        type: String, // tipi
        required: true,  // isim alanı zorunlu  
        trim: true, // boşlukları temizler
    },

    description: {// description alanı
        type: String,
        required: true,
        trim: true, // boşlukları temizler
    },

    uploadedAt: { // uploadedAt alanı tarih formatinda olusturulmuştur.
        type: Date, // tarih 
        default: Date.now, // tarih alanı varsayılan olarak bugün
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    url: {
        type: String,
        required: true
    },
    image_id: {
        type: String
    },

});

const Photo = mongoose.model('Photo', photoSchema); // model oluşturuldu 

export default Photo; // export edildi