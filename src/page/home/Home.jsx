import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div
      className='home'
      style={{
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    }}>
      <h1 style={{ margin: '0px', boxSizing: 'border-box', padding: '0px' }}>PRIVETN<br />Created by Artur with Vlad</h1>
    </div>
  )
}

export default Home