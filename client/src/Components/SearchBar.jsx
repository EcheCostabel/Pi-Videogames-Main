import React from 'react'
import { useState } from 'react'
import { getNameVideogames , clearVideogame } from '../Redux/actions/index'
import { useDispatch } from 'react-redux'
import "../css/SearchBar.css"


function SerchBar() {
  const [input , setInput] = useState('')
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const re = /^[0-9a-zA-ZÁ-ÿ.:-\s]{0,40}$/;


  const handleInputChange = (e) => {
    setInput(e.target.value)
    if(!re.exec(e.target.value)){
      e.target.value.length > 40 ? setErrors({
        name: "Invalid length"
      })
      :  setErrors({
        name: "Invalid character"
      })
    }else {
      setErrors({
        name: ""
      })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(input === ""){
      setErrors({
        name: "This field is required"
      })
    }else {
      dispatch(getNameVideogames(input))
      setInput("")
      dispatch(clearVideogame())
    }
  }
  

  return (
    <div className='searchbar'>
      <form onSubmit={handleSubmit} >
        <div>
        <input className='input'
        name="name"
        type="text"
        placeholder = "Buscar videogame..."
        value={input}
        onChange = {handleInputChange}
        />
        <button className= 'button' type='submit'>SEARCH</button>
        {errors.name && (
          <div className='errors'>
        <p>{errors.name}</p>
        </div>
       )}
        </div>
      
      </form>
    </div>
  )
}

export default SerchBar