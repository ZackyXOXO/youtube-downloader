const express = require('express');
const path = require('path');
const app = express();
const ytdl = require('ytdl-core');

app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.sendFile(path.join( __dirname,'/index.html'))
    // res.sendFile('index.html')
})

app.get('/download', async (req, res) => {
    const v_id = req.query.url.split('v=')[1];
    const info = await ytdl.getInfo(req.query.url)
    try {

        return res.render('download', {
            url: "https://www.youtube.com/embed/" + v_id,
            info: info.formats.sort((a, b) => {
                return a.mimeType < b.mimeType
            })
        })
    } catch (e){
        console.log(e)
    }
})

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});