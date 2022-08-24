import React from 'react'
import { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { postVideogame , getGenre , getVideogames } from '../Redux/actions'
import "../css/VideoGameCreated.css"


function VideoGameCreated() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const genres = useSelector(state => state.genres)
  const platforms = useSelector(state => state.platforms)
  const allVideogames = useSelector((state) => state.videogames);
  const [input , setInput] = useState({
     name: "",
     image: "",
     description: "",
     released: "",
     rating: "",
     genres: [],
     platforms: [],
  });

  useEffect(() => {
    dispatch(getGenre())
    dispatch(getVideogames())
  },[dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name] : e.target.value  //va a setearse dependiendo del target que este en ese momento. 
    });
  }

  const handleSelect = (e) => {
    setInput({
      ...input,
      genres: input.genres.includes(e.target.value) 
      ? input.genres 
      : [...input.genres, e.target.value]
    })
  }

  const handleSelect2 = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.includes(e.target.value) 
      ? input.platforms 
      : [...input.platforms, e.target.value]
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!input.name.trim()){
      return alert("Need to put name")
    }else if(
      allVideogames.find(e => 
         e.name.toLowerCase().trim() === input.name.toLowerCase().trim()
      )
    ){
      return alert(`The name ${input.name} already exist`)
    }else if (input.description.trim() === ""){
      return alert("Description required")
    }else if(input.released.trim() === ""){
      return alert("Released required")
    }else if (input.released < "1951-05-03"){
      return alert ("Date can't be below that 03/05/1951")
    }else if (input.rating === "" || input.rating < 1 || input.rating > 5){
      return alert ("Must be between 1 and 5")
    }else if (input.genres.length === 0){
      return alert ("Select one or more genres")
    }else if (input.platforms.length === 0){
      return alert ("Select one or more platforms")
  }else {
    dispatch(postVideogame(input))
    alert("Successfully created 😀")
    setInput({
      name: "",
      image: "",
      description: "",
      released: "",
      rating: "",
      genres: [],
      platforms: [],
    })
     navigate("/home") //redirige a la ruta que le pase. En router v6 reemplaza al hook useHistory.
  }
}   
  

  const handleDelete1 = (e) => {
    setInput({
      ...input,
      genres: input.genres.filter((el) => el !== e)
    })
  }
  const handleDelete2 = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((el) => el !== e)
    })
  }

  return (
    <div className='fondoVGCreate'>
      <div className='contenedorAll'>
      <Link to="/home">
        <button className='buttonBackHome' >Go back home</button>
      </Link>
      <h1 className='titulo'>Create your video game</h1>
      <form onSubmit={handleSubmit}>
        <div className='item'>
          <label className='label'>Name: </label>
          <br></br>
            <input 
            className='input'
            type= "text"
            value= {input.name}
            name = "name"
            onChange={handleChange}
            />
        </div>
        <div className='item'>
          <label className='label'>Image: </label>
          <br></br>
            <input 
            className='input'
            type= "text"
            value= {input.image}
            name = "image"
            onChange={handleChange}
            />
        </div>

        <div className='item'>
          <label className='label'>Released:</label>
          <br></br>
            <input 
              className='input'
              type= "date"
              value= {input.released}
              name = "released"
              onChange={handleChange}
              />
        </div>

        <div className='item'>
          <label className='label'>Rating</label>
          <br></br>
            <input 
              className='input'
              type= "number"
              value= {input.rating}
              name = "rating"
              onChange={handleChange}
              />
        </div>

        <div className='item'>
          <label className='label'>Description</label>
          <br></br>
            <textarea 
              className='inputDescription'
              type= "text"
              value= {input.description}
              name = "description"
              onChange={handleChange}
              />
        </div>

        <div className='item'>
          <label className='label'>Genres</label>
          <br></br>
          <select 
            className='select'
            defaultValue="select"
            onChange = {handleSelect}
            >
            <option className='select' disabled>Select</option>
            {
              genres?.map((e) => {
                return (
                <option className='select' value={e.name} key={e.id}>{e.name}</option>
                )})
            }
            </select>
            
            <ul className="ul">
                {input.genres.map((e) => (
                  <li key={e} className='listaGP'>
                    <div className='divGP'>
                      {e + " "}
                      <button className='buttonx' type='button' onClick={() => handleDelete1(e)}>
                        X
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
        </div>  

        <div className='item'>
          <label className='label'>Platforms</label>
            <br></br>
              <select 
                className='select'
                defaultValue="platforms"
                onChange = {handleSelect2}
                >
                <option className='select' disabled>Platforms</option>
                {
                  platforms?.map((e) => {
                    return (
                    <option className='select' value={e} key={e}>{e}</option>
                    )})
                }
            </select>
            <ul className="ul">
                {input.platforms.map((e) => (
                  <li key={e} className='listaGP'>
                    <div className='divGP'>
                      {e + " "}
                      <button className='buttonx' type='button' onClick={() => handleDelete2(e)}>
                        X
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
        </div>  
        <br></br>
        <button className='buttonCreate' type='submit'>Create videogame</button>
      </form>
    </div>
  </div>
  )
}

export default VideoGameCreated