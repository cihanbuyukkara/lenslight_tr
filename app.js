import express from 'express';

const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('index sayfası');
});
app.listen(port, () => {
    console.log(`Sunucu ${port} numaralı portta çalışıyor`);
});