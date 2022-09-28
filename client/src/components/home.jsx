import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, filterCreated, getTemperaments, filterByTemperaments, orderByName, orderByWeight } from "../actions";
import Card from "./card";
import Paginado from "./Paginado";
import SearchBar from './search-bar';
import './home.css';
import './paginado.css';


export default function Home() {
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, /*setDogsPerPage*/] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    console.log(currentDogs)
    const allTemperaments = useSelector((state) => state.temperaments)

    const [, setOrder] = useState('')
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getAll())
    }, [dispatch])

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch])


    function handleClick(e) {
        e.preventDefault();
        dispatch(getAll());
        setCurrentPage(1)
    }

    function handleSelect(e) {
        // e.preventDefault()
        setCurrentPage(1)
        dispatch(filterByTemperaments(e.target.value))
    }

    const [, setBreeds] = useState('all')

    function handleFilterCreated(e) {
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
        setBreeds(e.target.value)
        setCurrentPage(1)
    }

    function handleSort(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }


    function handleByWeight(e) {
        e.preventDefault()
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)

    }


    return (


        <div className='home'>
            <div className='divnavbar'>
                <ul className='navbar'>
                    <div className="dogs">
                        <h1> Bienvenidos al pi dogs Henry</h1>

                        <div className="content-select">
                            <button onClick={e => handleClick(e)} className='newdog'>
                                All dogs
                            </button>

                            <Link to='/dogs'><button className='newdog'>
                                Create new dog
                            </button></Link>

                        </div>

                        <li className="content-select">
                            <select onChange={(e) => handleSort(e)}>
                                <option value='selected' hidden className="newdog" >Sort breed by name</option>
                                <option value='asc'> A - Z </option>
                                <option value='desc'> Z - A </option>
                            </select>
                        </li>
                        <li className="content-select">
                            <select onChange={(e) => handleByWeight(e)}>
                                <option value='selected' hidden >Sort by weigth</option>
                                <option value='desc'>Lighter to heavier</option>
                                <option value='asc'>Heavier to lighter</option>
                            </select>
                        </li>
                        <li className="content-select">
                            <select onChange={(e) => handleSelect(e)}>
                                <option value='all'> Todos los Temperamentos</option>
                                {allTemperaments && allTemperaments.map(e => {
                                    return (<option value={e.name} key={e.id} >{e.name} </option>)
                                })}
                            </select>
                        </li>

                        <li className="content-select">
                            <select onChange={e => handleFilterCreated(e)}>
                                <option value='all' hidden>All breeds</option>
                                <option value='api'>Existent breeds</option>
                                <option value='created'>Created breeds</option>
                            </select>
                        </li>
                    </div>
                    <SearchBar />

                    <div>


                    </div>
                </ul>
            </div>


            <div className=" container">
                {currentDogs?.map((e) => {
                    return (
                        <div key={e.id} className='card-home'>
                            <Link to={`/home/${e.id}`}>
                                <Card
                                    key={e.id}
                                    name={e.name}
                                    img={e.image}
                                    weight_min={e.weight_min}
                                    weight_max={e.weight_max}
                                    height_min={e.height_min}
                                    height_max={e.height_max}
                                    temperament={e.temperament}
                                    life_span={e.life_span}
                                />
                            </Link>

                        </div>
                    )
                })}
            <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
            </div>

            <Link to='/' ><button className='welcome'><span>Welcome Page</span></button></Link>
        </div>

    )
}
