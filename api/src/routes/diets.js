const express = require('express')
const router = express.Router()
const { TypeDiet } = require('../db');
const {getAllDiets} = require('../routes/Controllers/RecipeControllers');

router.get('/', async function(req,res) {

     try{
        let result = await TypeDiet.findAll() 
        res.status(200).json(result);
    }catch{
        res.status(400).send(error);
    }
});

module.exports = router;