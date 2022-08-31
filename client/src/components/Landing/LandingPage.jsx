import React from "react";
import {Link} from "react-router-dom";
import "./Landing.css";

export default function landingPage(){
    return(
        <div className="containerAllLanding">
            <div className="containerLanding">
                <img src="../img/food.png" width="800px" height="500px"/>
                <Link to= "/home">
                    <button className="button">WELCOME</button>
                </Link>
            </div>
        </div>
    )
}