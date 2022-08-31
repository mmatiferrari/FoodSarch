const initialState = {
    recipe : [],
    recipeAll:[],
    diets : [],
    detail:[]
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case "GET_RECIPE":
            return{
                ...state,
                recipe: action.payload,
                recipeAll: action.payload 

            }
            case "FILTER_BY_DIET":
                
                let dietRecipes = [...state.recipeAll];
                let diet = action.payload;
                let result= dietRecipes.filter((e) => e.diets ? e.diets.includes(diet) : e.TypeDiets[0].name.includes(diet))
          
                return {
                  ...state,
                  recipe:  diet === "All" ?  dietRecipes : result
                };

            case "GET_NAME_RECIPE":
                return{
                    ...state,
                    recipe: action.payload
                }
                case "POST_RECIPE":
                return{
                    ...state,
                }
                case "GET_DIETS":
                return{
                    ...state,
                    diets: action.payload
                }
                case "GET_DETAILS":
                    return {
                        ...state,
                        detail: action.payload
                    }
            case "ORDER_BY_NAME":
                let ordered = action.payload === "asc" ?
                state.recipe.sort(function(a, b){
                    if (a.name > b.name){
                        return 1;
                    }
                    if (b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) :
                state.recipe.sort(function(a, b){
                    if (a.name > b.name){
                        return -1;
                    }
                    if (b.name > a.name){
                        return 1;
                    }
                    return 0;
                }) 
                return {
                    ...state,
                    recipe: ordered
                }
                
                case "ORDER_BY_HEALTHSCORE":
                    let order = action.payload === "max" ?
                state.recipe.sort(function(a, b){
                    if (a.healthScore > b.healthScore){
                        return 1;
                    }
                    if (b.healthScore > a.healthScore){
                        return -1;
                    }
                    return 0;
                }) :
                state.recipe.sort(function(a, b){
                    if (a.healthScore > b.healthScore){
                        return -1;
                    }
                    if (b.healthScore > a.healthScore){
                        return 1;
                    }
                    return 0;
                }) 
                return {
                    ...state,
                    recipe: order
                }
                
                default:
                    return state;
                }  
                
      }

export default rootReducer;