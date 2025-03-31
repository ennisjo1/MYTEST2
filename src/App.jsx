import { useState } from 'react'
import Logo from '/Logo.png'
import './App.css'
import './meme'
import './qoute'


function App() {

  return (
    <>
        <div className="logo">
          <img src={Logo} className="logo" alt="Logo" />
        </div>
        <h1>How's your Mood Today?</h1>
        <div className="button-container">
          <button className="meme-button">Click to get new Meme</button>
        </div>
    </>
  )
}

export default App