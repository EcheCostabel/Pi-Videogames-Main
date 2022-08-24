import React from 'react'
import '../css/Loading.css'
import gifLoading from '../css/256x256.gif'

function Loading() {

  return (
    <div className='contenedorLoading'>
        <img src={gifLoading}
        alt="Loading please wait"
        
        />
    </div>
  )
}

export default Loading