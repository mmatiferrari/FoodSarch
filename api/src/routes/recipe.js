const express = require('express')
const router = express.Router()
require('dotenv').config();
const { Recipe, TypeDiet} = require('../db');
const { getAllInfo} = require('../routes/Controllers/RecipeControllers');

router.post('/', async (req, res) => {
    let{
        name,
        summary,
        score,
        healthScore,
        image,
        steps,
        diets
    } = req.body

    try{
        let recipeCreate = await Recipe.create({ 
            name,
            summary,
            score,
            healthScore,
            image,
            steps,
        })

        let dietDB = await TypeDiet.findAll({ 
            where: {name: diets}
        })
        
        recipeCreate.addTypeDiet(dietDB);
        res.send('Succesfull');

    }catch(error){
        res.status(404).send(error);
    }
})

router.get('/', async (req, res) => {
    
    const name = req.query.name
    let allRecipes = await getAllInfo();
    if (name){
        let recipeName = await allRecipes.filter(e=> e.name.toLowerCase().includes(name.toLowerCase()))
        recipeName.length ?
        res.status(200).send(recipeName) :
        res.status(404).send("not found")
    } else{
        res.status(200).send(allRecipes)
    }

});

router.get('/:id', async (req, res) => {

    const {id} = req.params
    const allRecipes = await getAllInfo()
    let validate = id.includes("-"); // si tiene el guion es porque se encuentra en la base de datos

    if (validate) {
      try {
        let dbId = await Recipe.findByPk(id, { include: TypeDiet });  // entonce la busco directo de la base de datos
        res.status(200).json([dbId]);
      } catch (e) {
        console.log(e);
      }
    }
    
else {
    try {
      if (id) {
        let recipeId = await allRecipes.filter((e) => e.id === parseInt(id));
        recipeId.length
          ? res.status(200).send(recipeId)
          : res.status(400).send("Not found");
      }
    } catch (e) {
      return e;
    }
  }
}
)

module.exports = router


