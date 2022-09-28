import React from "react";
import { Link } from "react-router-dom";
import './landingPage.css';

function landingPage (){
    return(
        <div className="body">
            <h1 className="doggies">
                PiDogs Henry
            </h1>
            <Link to='/home'> <button> Home </button></Link>
        </div>
    )
}
export default landingPage