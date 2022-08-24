import React from 'react'
import "../css/Card.css"

function Card({name,image,genres,rating}) {
  return (
    <div className='cardItem'>
        <div className= 'card'>
        <h1 className= 'nombre'>{name}</h1>
        <img className='imagen' src={image} alt='Img not found' />
        <h2 className='generos'>Genres: {genres.join(",  ")}</h2>
        <h2 className='rating'>Rating: {rating}</h2>
      </div>
    </div>
  )
}

export default Card