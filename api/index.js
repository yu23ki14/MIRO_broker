const express = require('express');
const app = express();
const axios = require('axios');
const multer = require('multer');
const csvtojson = require('csvtojson')
const fs = require('fs');
var upload = multer({ dest: 'tmp' }).single('file');

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if(err) {
      res.send("Failed to write " + req.file.destination + " with " + err)
    } else {
      const credential = req.body.credential
      const boardID = req.body.boardID
      const shuffle = req.body.shuffle
      const filePath = req.file.path
      const Fshuffle = ([...array]) => {
        for (let i = array.length - 1; i >= 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
      csvtojson().fromFile(filePath).then((jsonObj)=>{
        let i = 0
        const objSize = jsonObj.length
        if (shuffle) {
          jsonObj = Fshuffle(jsonObj)
        }
        let post = setInterval(() => {
          if (i < objSize) {
            axios.post(
              `https://api.miro.com/v1/boards/${boardID}/widgets/?access_token=${credential}`, 
              {
                "type": "sticker",
                "x": (i - Math.floor(i / 20) * 20) * 120,
                "y": Math.floor(i / 20) * 120,
                "style": {
                  "backgroundColor": jsonObj[i].color_code
                },
                "text": jsonObj[i].text
              }
            )
            i += 1
          } else {
            clearInterval(post)
            fs.unlink(filePath, () => {
              res.send("ok")
            })
          }
        }, 700);
      })
    }
  });
})

module.exports = {
  path: "/api/",
  handler: app
}