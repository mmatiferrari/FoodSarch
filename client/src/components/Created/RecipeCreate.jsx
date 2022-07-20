import React  from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getTypeDiet } from "../../actions/index";
import { MdOutlineFoodBank } from "react-icons/md";
import "./Create.css"

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = "se requiere un nombre";
    }
     else if (!input.summary){
        errors.summary = "se requiere un summary";
    }
     else if (0>input.healthScore>100){
        errors.healthScore = "el valor debe ser entre 0 y 100";
    }
     else if (input.diets.length<0){
        errors.diets = "se requiere al menos 1 dieta";
    }
    else if (!input.steps){
        errors.steps = "se requiere un steps";
    }

    return errors;
}

export default function RecipeCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector((state) => state.diets)
    const [errors, setErrors] = useState({})

    const[input, setInput] = useState({
            name: "",
            summary: "",
            healthScore: "",
            steps: "",
            diets:[]
        })

        function handleChange(e){
            if(e.target.name==="healthScore"){
                setInput({
                    ...input,
                    [e.target.name] : parseInt(e.target.value)
                })
            }else {
                setInput({
                    ...input,
                    [e.target.name] : e.target.value
                })
            }
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        }
        function handleSelect (e){
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }
        
        function handleDelete (e){
            setInput({
                ...input,
                diets: input.diets.filter(diet => diet!== e)
            })
        }

        function handleSubmit(e){
            e.preventDefault();
            dispatch(postRecipe(input))
            alert("receta creada!!")
            setInput({
                name: "",
                summary: "",
                healthScore: "",
                steps: "",
                diets:[]
            })
            history.push("/home")
        }

        useEffect(()=> {
            dispatch(getTypeDiet())
        }, []);

        return (
            <div>
                <Link to= "/home"><button className="back">Back</button></Link>
                <form className="form" onSubmit= {(e)=> handleSubmit(e)}>
                    <h1 className="formTitle">Create your recipe</h1>
                    <div className="formContainer">
                        <div className="formGroup">
                            <input
                                className="formInput"
                                placeholder=" "
                                type="text"
                                value={input.name}
                                name= "name"
                                onChange={(e)=> handleChange(e)}
                                />
                            <label for="name" className="formLabel">Name:</label>
                            {errors.name && (
                                <p className="error">{errors.name}</p>    
                            )}
                            <span className="formLine"></span>
                        </div>
                        <div className="formGroup">
                            <input
                                className="formInput"
                                placeholder=" "
                                type="text"
                                value={input.summary}
                                name= "summary"
                                onChange={(e)=> handleChange(e)}
                            />
                            <label for="summary" className="formLabel">Summary:</label>
                            {errors.summary && (
                                <p className="error">{errors.summary}</p>    
                            )}
                            <span className="formLine"></span>
                        </div>
                        <div className="formGroup">
                            <input
                                className="formInput"
                                placeholder=" "
                                type="text"
                                value={input.healthScore}
                                name= "healthScore"
                                onChange={(e)=> handleChange(e)}
                            />
                            <label for="healthScore" className="formLabel">HealthScore:</label>
                            {errors.healthScore && (
                                <p className="error">{errors.healthScore}</p>    
                            )}
                            <span className="formLine"></span>
                        </div>
                        <div className="formGroup">
                            <input
                                className="formInput"
                                placeholder=" "
                                type="text"
                                value={input.steps}
                                name= "steps"
                                onChange={(e)=> handleChange(e)}
                            />
                            <label for="steps" className="formLabel">Steps:</label>
                            {errors.steps && (
                                <p className="error">{errors.steps}</p>    
                            )}
                            <span className="formLine"></span>
                        <div  className="formDiet">
                            <div className="formatDiets">
                                <div className="simbolDiets"><MdOutlineFoodBank size="27px" color="#fb9300"/></div>
                                <select className="selectDiets" onChange={(e)=> handleSelect(e)}>
                                        <option>Select type diets</option>
                                    {diets.map((diets)=> (
                                        <option value={diets.name}>{diets.name}</option>
                                    ))}
                                    {errors.diets && (
                                        <p className="error">{errors.diets}</p>    
                                    )}
                                </select>
                                <span className="formLine"></span>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="dietsSelects">
                        {input.diets.map(e =>
                            <div className="divDiets">
                                <h5 className="nameDiet">{e}</h5>
                                <button className="buttonX" onClick={()=> handleDelete(e)}>x</button>
                            </div>
                        )}
                    </div>
                    <button type="submit" className="formSubmit">crear receta</button>
                </form>
            </div>
        )




}
