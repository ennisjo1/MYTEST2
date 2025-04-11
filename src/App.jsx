import { useState } from 'react'
import Logo from '/Logobg.png'
import './App.css'
import './meme'
import './qoute'


function App() {

  return (
    <>
        <div className="logo" onClick={() => window.location.reload()}>
          <img src={Logo} className="logo" alt="Logobg" />
        </div>
        <h1>How's your Mood Today?</h1>
        <div className="button-container">
          <button className="meme-button">Click to get new Meme</button>
        </div>
    </>
  )
}

export default App