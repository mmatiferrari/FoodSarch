const express = require('express')
const axios = require('axios');
require('dotenv').config();
const { Recipe, TypeDiet} = require('../../db');
const {API_KEY} = process.env;


const getApiInfo = async () => {
    try{
        const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`);
        const { results } = resAxios.data;
        if(results.length > 0){
            let response = results.map((result) => {
                return {
                    name: result.title,
                    image: result.image, 
                    id: result.id, 
                    score: result.spoonacularScore,
                    healthScore: result.healthScore,
                    types: result.dishTypes,
                    diets: result.diets,
                    summary:result.summary.replace(/<[^>]+>/g, ""), 
                    steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'').replace(/<[^>]+>/g, "")
                }
            })

      return response           
    }
  
    }catch (error) {
        console.error(error);
        return ([])
    }
}

const getDBInfo = async () => {
  
    return await Recipe.findAll({ 
        include:{
            model: TypeDiet,
            attributes: ['name'],
            through:{
                attributes: []
            }
        }
    })
}

const getAllInfo = async () => {
  try{
      const apiInfo = await getApiInfo();
      const bdInfo = await getDBInfo();
      const infoTotal = bdInfo.concat(apiInfo);
      return infoTotal;
  }catch (error) {
      console.error(error);
  }
}

module.exports={
   getApiInfo, getDBInfo, getAllInfo
}