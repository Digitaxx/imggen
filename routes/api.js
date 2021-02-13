var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/generate', function(req, res, next) {
        if(req.query.key){
                if(req.query.seed){
                        res.send({files: seedDecoder(req.query.seed, req.query.key), seed: req.query.seed})
                } else {
                        let newSeed = seedGenerator(req.query.key);
                        res.send({files: seedDecoder(newSeed, req.query.key), seed: newSeed})
                }
        } else {
                res.sendStatus(400)
        }
});

function randomInteger(min, max) {
        // получить случайное число от (min-0.4) до (max+0.4)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
}

function seedGenerator(key){
        let seed = '';
        let tiles = parseFiles();
        console.log(tiles);
        Object.keys(tiles).forEach((item) => {
                seed += randomInteger(0, tiles[item].count-1) + key;
        })
        console.log(seed);
        return seed;
}

function seedDecoder(seed, key){
        let seedItems = seed.split(key)
        let fileNames = [];
        let tiles = parseFiles();
        Object.keys(tiles).forEach((item, index)=>{
                fileNames.push(`/${item}/${tiles[item].files[seedItems[0]]}`);
                seedItems.shift();
        })
        return fileNames;
}

function parseFiles(){
        let array = fs.readdirSync(`./public/resources/`);
        let tiles = {};
        array.forEach((item) =>{
                let files = fs.readdirSync(`./public/resources/${item}`)
                tiles[item] = {count: files.length, files};
        })
        return tiles;
}


module.exports = router;
