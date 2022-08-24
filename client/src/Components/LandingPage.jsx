import React from 'react'
import { Link } from 'react-router-dom'
import '../css/LandingPage.css'


export default function LandingPage() {
  return (
      <div className='background'>

          <div className='henry'> 
            <div>
              <h3>Henry Videogames</h3>
              {/* <h2 className='maquina'>Press X to start..</h2> */}
              <p><span className='maquina'>Press X to start...</span></p>
            </div>
          </div> 

          <div className='title'>               
              <Link to='/home' className='llink'>
                  <button className='title2' type='submit'></button>
              </Link>
          </div>
      </div>
  )
}