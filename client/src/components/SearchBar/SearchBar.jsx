import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getInfoByName } from "../../actions/index";
import {AiOutlineSearch} from "react-icons/ai";
import "./Search.css";

export default function SearchBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInput(e){
        e.preventDefault()
        setName(e.target.value)
    }
    
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getInfoByName(name));
        setName("")
    }

    return(
        <div>
            <form className="Form">
                <input 
                    className="Container"
                    type= "text"
                    placeholder="search..."
                    onChange={handleInput}
                />
                <button className="buttonSearch" type="submit" onClick={handleSubmit}><AiOutlineSearch className="Search" size= "1.5em"/></button>
            </form>
        </div>
    )
}