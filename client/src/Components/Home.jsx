import React from 'react'
import { getVideogames, getGenre, filterByGenres, filterCreated, orderByName, orderByRating } from '../Redux/actions'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from './Card'
import Paginado from './Paginado'
import SerchBar from './SearchBar'
import "../css/Home.css"
import Loading from './Loading'
import Error from './Error'


function Home() {

  const dispatch = useDispatch()
  const allVideoGames = useSelector(state => state.videogames) // Me traigo del state global de redux los videojuegos, igual que hacer el mapStatetoProps. 
  const genres = useSelector(state => state.genres)
  const [currentPage, setCurrentPage] = useState(1)  //seteo en 1 porque la pagina actual inicial siempre va a ser 1. 
  const [videoGamePerPage, /*setVideoGamePerPage*/] = useState(15) // seteo 15 por la cantidad de videogames que se solicita por pagina. 
  const [/*sort*/, setSort] = useState()
  const [/*sortRating*/, setSortRating] = useState()

  const indexOfLastVideogame = currentPage * videoGamePerPage; //esto me da el indice del ultimo videogame que tengo en la pagina. //15
  const indexOfFirstVideogame = indexOfLastVideogame - videoGamePerPage; // esto me da el indice del primer videogame de la pagina.  //0
  const currentVideogames = allVideoGames.slice(indexOfFirstVideogame, indexOfLastVideogame)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }


  useEffect(() => {
    dispatch(getVideogames())
    dispatch(getGenre())
  }, [dispatch])

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getVideogames())
  }

  const handleFilterGenres = (e) => {
    dispatch(filterByGenres(e.target.value))
    setCurrentPage(1)
  }

  const handleFilterCreated = (e) => {
    dispatch(filterCreated(e.target.value)) //e.target.value es lo que llega del select , el payload es en la accion
    setCurrentPage(1)
  }

  const handleOrder = (e) => {
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setSort(e.target.value)
  }

  const handleOrderRating = (e) => {
    dispatch(orderByRating(e.target.value))
    setCurrentPage(1)
    setSortRating(`rating ${e.target.value}`)
  }
  

  return (
 
      <div className='fondoLoading'>
        <div className='fondoLoadingContenido'>
          
          <div className='clase2'>
            <div className='contenidoTitulo'>
              <h1 className='titulo'>Videogames</h1>
              
              <SerchBar />
              <Paginado
            videoGamePerPage={videoGamePerPage}
            allVideoGames={allVideoGames.length}
            paginado={paginado}
            currentPage={currentPage}
            
          />



          <div className='filtrosTarjetas'>
          <div className='clase1'>
            
            <Link to='/videogame'>
               <button className='buttonSecond'>Crear Videojuego</button>
             </Link>
              <button className='button' onClick={handleClick}>Recargar Videojuegos</button>
              <select
              className='select'
              defaultValue='Order'
              onChange={handleOrder}
            >
              <option value='Order' disabled>ABC</option>
              <option value='Asc'>A-Z</option>
              <option value='Desc'>Z-A</option>
            </select>

            <select
              className='select'
              defaultValue='Rating'
              onChange={handleOrderRating}
            >
              <option value='Order' disabled>Rating</option>
              <option value='high'>High</option>
              <option value='low'>Low</option>
            </select>

            <select
              className='select'
              defaultValue='Genres'
              onChange={handleFilterGenres}
            >
              <option className="options" disabled>Generos</option>
              <option className="options" value="All">All</option>
              {
                genres.map((e) => (
                <option className='options' key={e.id} value={e.name}>
                  {e.name}
                </option>
              ))
              }
            </select>

            <select
              className='select'
              defaultValue='filtrados'
              onChange={handleFilterCreated}
            >
              <option className="options" disabled>Origin</option>
              <option className="options" value='All'>All</option>
              <option className="options" value='created'>Created </option>
              <option className="options" value='api'>Api</option>
            </select>
          </div>
          <div className='contenedorCards'>
            {
              currentVideogames.length !== 0 ?
                currentVideogames?.map((e) => {
                  return (
                    <div key={e.id}>
                      { e.error ? <div className='error'><Error/></div>: 
                      <Link to={"/home/" + e.id}>
                        <Card
                          name={e.name}
                          image={e.image}
                          genres={e.genres}
                          rating={e.rating}
                        />
                      </Link>}
                    </div>
                  )
                }) 
                : <Loading />
            }
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Home