import React from "react";
import "./Card.css";

export default function Card({name, image, diets, TypeDiets}){
    return(
        <div className="ContainerCard">
            <img className="image" src={image ? image : "../img/404.png"} alt="img not found" width="200px" height="200px"/>
            <h4 className="title">{name}</h4>
            <p className="diets">{diets ? diets.map(e => ("| ") + e + (" |")) : TypeDiets.map(e => ("| ") + e.name + (" |"))}</p>
            <button className="buttonDetails">Details</button>
        </div>
    )
}