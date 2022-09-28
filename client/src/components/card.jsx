import React from "react";
import './card.css'
import { Link } from "react-router-dom";
export default function Card({ name, img ,temperament, weight_min,weight_max, id, }){


    return (

        <div  className="card">

            <div className="img" >
            <img src={img} alt= 'img not found' width='250px' height='230 px'/>
            
            <h2 className='cardInfo' >{name}</h2>
            </div>

            <div className="cardInfo">
            
            <Link to={`/home/:${id}`}> 
            </Link>
            <h5>{temperament}</h5>
            <h5>Peso minimo : {weight_min}  / Peso maximo : {weight_max} </h5>
            </div>
                </div>


        
            
    )
}