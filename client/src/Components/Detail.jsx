import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDetail , vaciarDetail } from '../Redux/actions'
import "../css/Detail.css"

function Detail() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const myVideogame = useSelector(state => state.details)

  useEffect(() => {
    dispatch(getDetail(id))
    return function () {
      dispatch(vaciarDetail())
    }
  },[dispatch, id])
  console.log(myVideogame)

  return (
    <div className= 'fondoDetail'>
      { myVideogame ? (
        <div className= 'contenedorGeneral'>
          <h1 className= 'tituloName'>{myVideogame.name}</h1>
          <img className= 'image' src={myVideogame.image} alt=""/>
          <div className= 'contenedorSecundario'>
            <h4 className= 'items'>🏆Rating: {myVideogame.rating} </h4>
            <h4 className= 'items'>Released: {myVideogame.released}</h4>
            <h4 className= 'items'>Platform: {myVideogame.platforms}</h4>
            <h4 className= 'items'>
              Genres: 
              {myVideogame.genres?.map((g) => g.name).join(", ")}
            </h4>
            <h4 className= 'items'>Description: </h4>
            <p 
            className='descriptionDetail'
            dangerouslySetInnerHTML = {{__html: myVideogame.description }}/>
          </div>
          <Link to="/home">
          <button className= 'buttonBack'>Go Home</button>
          </Link>
        </div>
      ): null}
    </div>
  )
}

export default Detail