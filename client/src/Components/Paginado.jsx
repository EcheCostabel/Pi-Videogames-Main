import React from 'react'
// import { Link } from 'react-router-dom'
import '../css/Paginado.css'

function Paginado({videoGamePerPage,allVideoGames, paginado,currentPage}) {
  let pageNumbers = [];
  let Paginas = Math.ceil(allVideoGames/videoGamePerPage)


  for(let i = 1 ; i <= Paginas; i++){  //math.ceil redondea para arriba.
    pageNumbers.push(i)
  }
 
  return (
    <nav>
      <ul className='ul'>
      {
        currentPage - 1 > 0 ? (
          <button className='buttonPN' onClick={() => paginado(currentPage - 1)} >Prev</button>
        )
        : null
      }
      { 
        pageNumbers && pageNumbers.map(number => (
          <li className='li' key={number}>
            <button className='botonPaginado' onClick={() => paginado(number)}>{number}</button>
          </li>
        ))
      }
      {
        currentPage < Paginas ? (
          <button className='buttonPN' onClick={() => paginado(currentPage + 1)} >Next</button>
        )
        : null
      }
      </ul>
    </nav>
  )
}

export default Paginado