import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getRecipe, orderByName, filterRecipeByDiet, getTypeDiet, orderByHealthScore } from "../../actions/index";
import {Link} from "react-router-dom";
import Card from "../Card/Card";
import Paginated from "../Paginated/Paginated";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";
import {AiFillFilter} from "react-icons/ai";
import { IoIosAddCircle} from "react-icons/io";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { MdOutlineFoodBank } from "react-icons/md";
import { TbSortAscendingLetters } from "react-icons/tb";
import { FaHeartbeat } from "react-icons/fa";


export default function Home (){

    const dispatch = useDispatch()
    const allRecipe = useSelector((state)=> state.recipe)
    const diets = useSelector((state) => state.diets)
    const [order, setOrder] = useState("")
    const [currentPage, setcurrentPage] = useState(1)
    const [recipePerPage, setRecipePerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipePerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage
    const currentRecipe = allRecipe.slice(indexOfFirstRecipe, indexOfLastRecipe)
    const numberPages = Math.ceil(allRecipe.length/recipePerPage)

    console.log("este es mi console")
    console.log(numberPages)
    
    const paginated = (pageNumber) => {
        if(pageNumber>=1 && pageNumber<=numberPages){
            setcurrentPage(pageNumber)
        }
    }

    useEffect(()=>{
        dispatch(getRecipe())
    }, [dispatch])

    useEffect(()=> {
        dispatch(getTypeDiet())
    }, []);

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipe());
    }
    
    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setcurrentPage(1)
        setOrder(`ORDER ${e.target.value}`)  
    };
    
    function handleHealthScore(e){
        e.preventDefault();
        dispatch(orderByHealthScore(e.target.value))
        setcurrentPage(1)
        setOrder(`ORDER ${e.target.value}`)  
    };

    function handleFilterDiet(e){
        e.preventDefault();
        dispatch(filterRecipeByDiet(e.target.value))
        setcurrentPage(1)
        setOrder(`FILTRADO POR ${e.target.value}`)
    }

    return (
        <div className="app">
            <div>
                <div className="line">
                    <Link to= "">
                        <button className="Button" type="submit"><BsFillArrowLeftCircleFill size="1.8em" color="white"/></button>
                    </Link>
                    <div className="nav">
                            <SearchBar/>
                    </div>
                    <div className="createLink">
                    <Link to= "/create">
                        <button className="Button" type="submit"><IoIosAddCircle size="1.8em" color="white"/></button>
                    </Link>
                    </div>
                </div>
                <div className="photoContainer">
                     <h2 className="textBanner">Find the perfect recipe for you.</h2>
                     <img className="photo" src="../img/cocina.png"/>
                </div>
            </div>
                
                <div className="orderFiler">
                    <div id="filterContainer">
                        <button className="ButtonFilter"><AiFillFilter size="1.5em" color="white"/>Filter by :</button>
                        <div className="filter">
                            <div className="typeFilter"><TbSortAscendingLetters className="simbol" size="25px" color="#fb9300"/></div>
                            <select className="filterOption" onChange={e => handleSort(e)}>
                                <option value= "asc">Order alphabetically</option>
                                <option value= "asc">A-Z</option>
                                <option value= "desc">Z-A</option>
                            </select>
                        </div>
                        <div className="filter">
                            <button className="typeFilter"><FaHeartbeat className="simbol" size="22px" color="#fb9300"/></button>
                            <select className="filterOption" onChange={e => handleHealthScore(e)}>
                                <option value= "min">Order by HealtScore</option>
                                <option value= "min">max/min</option>
                                <option value= "max">min/max</option>
                            </select>
                        </div>
                        <div className="filter">
                            <div className="typeFilter"><MdOutlineFoodBank className="simbol" size="27px" color="#fb9300"/></div>
                            <select className="filterOption" onChange={e => handleFilterDiet(e)}>
                                <option value="All">Filter for Diets</option>
                                <option value="All">All recipes</option>
                                <option value="gluten free">Gluten Free</option>
                                <option value="ketogenic">Ketogenic</option>
                                <option value="vegetarian">Vegetarian </option>
                                <option value="lacto-vegetarian">Lacto-Vegetarian </option>
                                <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                                <option value="vegan">Vegan</option>
                                <option value="pescatarian">Pescatarian</option>
                                <option value="paleolithic">Paleolithic</option>
                                <option value="primal">Primal</option>
                                <option value="whole 30">Whole 30</option>
                            </select>
                            </div>
                        </div>       
                    </div>
                <div>

                <div className="container">
                    {currentRecipe?.map((e=>{
                        console.log(e.healthScore)
                        return(
                                <Link className="cards" to={"/recipe/"+ e.id}>
                                    <div>
                                        <Card name={e.name} image={e.image} diets={e.diets} />
                                    </div>
                                </Link>
                        )
                    }))}
                </div>
                <Paginated  
                    className = "paginated"   
                    recipePerPage = {recipePerPage}
                    allRecipe = {allRecipe.length}
                    paginated = {paginated}
                    currentPage = {currentPage}
                />
            </div>
        </div>
    )
}