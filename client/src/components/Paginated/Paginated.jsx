import React from "react";
import "./Paginated.css";
import { GrPrevious, GrNext } from "react-icons/gr";

export default function Paginated({recipePerPage, allRecipe, paginated, currentPage}){
    const pageNumber= []
    for (let i = 0; i <= Math.ceil(allRecipe/recipePerPage) - 1; i++) {
        pageNumber.push(i+1)
    }
    return (
        <div className="paginated">
            <ul>
                <li className="next" onClick={() => paginated(currentPage - 1)}><GrPrevious/></li>
                {
                    pageNumber?.map(Number=>(

                            <li className="number" key={Number}>
                                <a onClick={() => paginated(Number)}>{Number}</a>
                            </li>
                    ))
                }
                <li className="prev" onClick={() => paginated(currentPage + 1)}><GrNext/></li>
            </ul>
        </div>
    )
}