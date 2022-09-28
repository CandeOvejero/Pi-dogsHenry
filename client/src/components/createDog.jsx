import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import { getTemperaments, createDog } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import './createDog.css'

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Your breed must have a name';
    }
    else if (!input.height_min) {
        errors.height_min = 'Minimum height is required!!';
    }
    else if (isNaN(parseInt(input.height_min))) {
        errors.height_min = 'Height should be a number';
    }
    else if (input.height_min <= 0) {
        errors.height_min = 'Your breed cant be shorter than 0';
    }
    else if (parseInt(input.height_min) >= parseInt(input.height_max)) {
        errors.height_min = 'Minimum height should be lower than maximum height';
    }
    else if (!input.height_max) {
        errors.height_max = 'Maximum height is required!!';
    }
    else if (isNaN(parseInt(input.height_max))) {
        errors.height_max = 'Height should be a number';
    }
    else if (input.height_max > 150) {
        errors.height_max = 'I think 150cm is enough for a dogs height, dont you?';
    }
    else if (!input.weight_min) {
        errors.weight_min = 'Minimum weight is required!!';
    }
    else if (isNaN(parseInt(input.weight_min))) {
        errors.weight_min = 'Weight should be a number';
    }
    else if (input.weight_min <= 0) {
        errors.weight_min = 'Your breed must weight at least more than nothingness';
    }
    else if (!input.weight_max) {
        errors.weight_max = 'Maximum weight is required!!';
    }
    else if (isNaN(parseInt(input.weight_max))) {
        errors.weight_max = 'Weight should be a number';
    }
    else if (parseInt(input.weight_max) <= parseInt(input.weight_min)) {
        errors.weight_max = 'Maximum weight should be higher than minimum weight';
    }
    else if (input.weight_max > 200) {
        errors.weight_max = 'We are creating a dog, not a bear!! Keep your weight under 200';
    }
    else if (!input.life_span) {
        errors.life_span = 'Life span is required!!';
    }
    else if (isNaN(parseInt(input.life_span))) {
        errors.life_span = 'Life span should be a number';
    }
    else if (input.life_span > 25) {
        errors.life_span = 'Sorry, dogs dont live that long';
    }
    else if (input.life_span <= 0) {
        errors.life_span = 'Please insert a number';
    }

    return errors;
}

export default function DogCreate() {

    const dispatch = useDispatch();
    const allTemperaments = useSelector((state) => state.temperaments);

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_span: '',
        image: '',
        temperaments: [],
    });

    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));

        console.log(input)
    }

    function handleSelect(e) {
        if (!input.temperaments.includes(e.target.value)) {
            setInput({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            });
            console.log(input);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(errors);
        if (!Object.getOwnPropertyNames(errors).length && input.name && input.height_min && input.height_max && input.weight_min && input.weight_max && input.life_span && input.temperaments.length) {
            dispatch(createDog(input));
            console.log(input)
            alert('Dog created');
            // setInput({
            //     name: '',
            //     height_min: '',
            //     height_max: '',
            //     weight_min: '',
            //     weight_max: '',
            //     life_span: '', 
            //     image: '',
            //     temperaments: [],
            // });
        } else {
            alert('Dog no created')
        }
    }

    function handleDeleteTemperament(e) {
        setInput({
            ...input,
            allTemperaments: input.temperaments.filter(temp => temp !== e)
        })
    }

    return (
        <div className='divCreate'>
            <Link to='/home'><button className='buttonHome'>Home</button></Link>
            <h1 className='title'>CREATE A NEW DOG</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label><strong>Name: </strong></label>
                    <input type='text' value={input.name} name='name' onChange={e => handleChange(e)} />
                    {errors.name && (
                        <p className='error'><strong>{errors.name}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Minimum height: </strong></label>
                    <input type='text' value={input.height_min} name='height_min' onChange={e => handleChange(e)} />
                    <label><strong> cm</strong></label>
                    {errors.height_min && (
                        <p className='error'><strong>{errors.height_min}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Maximum height: </strong></label>
                    <input type='text' value={input.height_max} name='height_max' onChange={e => handleChange(e)} />
                    <label><strong> cm</strong></label>
                    {errors.height_max && (
                        <p className='error'><strong>{errors.height_max}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Minimum weight: </strong></label>
                    <input type='text' value={input.weight_min} name='weight_min' onChange={e => handleChange(e)} />
                    <label><strong> kg</strong></label>
                    {errors.weight_min && (
                        <p className='error'><strong>{errors.weight_min}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Maximum weight: </strong></label>
                    <input type='text' value={input.weight_max} name='weight_max' onChange={e => handleChange(e)} />
                    <label><strong> kg</strong></label>
                    {errors.weight_max && (
                        <p className='error'><strong>{errors.weight_max}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Expected life span: </strong></label>
                    <input type='text' value={input.life_span} name='life_span' onChange={e => handleChange(e)} />
                    <label><strong>years</strong></label>
                    {errors.life_span && (
                        <p className='error'><strong>{errors.life_span}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Image: </strong></label>
                    <input type='text' value={input.image} name='image' onChange={e => handleChange(e)} />
                </div>
                <div>
   <select onChange={e => handleSelect(e)} >
   <option value='selected' hidden >Temperaments</option>
   {allTemperaments?.sort(function (a, b) {
        if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
       return 0;
     }).map(temp => {
       return (
       <option value={temp.id} key={temp.id}>{temp.name}</option>
        )
   })}
 </select>

{input.temperaments.map(el => {
    return (
                            
   <ul className='allTemps' key={el}>
     <li>
  <p className='temp'><strong>{el}</strong></p>
       <button onClick={() => handleDeleteTemperament(el)} className='x' >X</button>
     </li>
     </ul>      
     )
     })}

      </div>
       <button type='submit' className='boop' ><strong>CREATE</strong></button>

        </form>

        </div>
    )
}