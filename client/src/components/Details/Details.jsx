import React  from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getDetail } from "../../actions/index";
import { useEffect} from "react";
import "./Details.css";

export default function Detail(props){
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getDetail(props.location.pathname.replace("/recipe/","")));
    },[dispatch])

    const myRecipe = useSelector((state) => state.detail)

    return (
        <div className="containerAll">
            {
                myRecipe.length>0 ?
                <div className="containerDetails">
                    <img className="imageDetails" src= {myRecipe[0].image} alt="" width="300px" height="300px" />
                    <h1 className="titleDetails">{myRecipe[0].name}</h1>
                    <div className="subContainer">
                        <h3 className="summaryDetails">summary: {myRecipe[0].summary}</h3>
                        <h3 className="hsDetails">healthScore: {myRecipe[0].healthScore}</h3>
                        <h3 className="">steps: {myRecipe[0].steps}</h3>
                        <h3 className="dietsDetail">type diets: {myRecipe[0].diets ? myRecipe[0].diets.map(e => ("| ") + e + (" |")) : myRecipe[0].TypeDiets.map(e => e.name + (" | "))}</h3>
                        <Link to= "/home">
                            <button className="buttonDetailsBack" type="submit">volver</button>
                        </Link>
                    </div>
                </div>
                : 
                <div className="containerLoading">
                    <div className="loading"></div>
                </div>
            } 
        </div>
    )

}