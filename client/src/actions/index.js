import axios from "axios";

export function getRecipe(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/recipe",{
        });
        return dispatch({
            type: "GET_RECIPE",
            payload: json.data
        })
    }
}

export function orderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function filterRecipeByDiet(payload){
    return {
        type: "FILTER_BY_DIET",
        payload
    }
}

export function orderByHealthScore(payload){
    return {
        type: "ORDER_BY_HEALTHSCORE",
        payload
    }
}

export function getInfoByName(name){
    return async function(dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/recipe?name=${name}`)
            return dispatch({
                type: "GET_NAME_RECIPE",
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}
export function getTypeDiet(){
    return async function(dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/types`)
            return dispatch({
                type: "GET_DIETS",
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}
export function postRecipe(payload){
    return async function(){
        const json = await axios.post(`http://localhost:3001/recipe`, payload)
        console.log(json)
        return json;
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/recipe/${id}`);
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch (e) {
            console.log("error")
        }
    }
}