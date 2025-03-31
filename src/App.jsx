import { useState } from 'react'
import Logo from '/Logo.png'
import './App.css'
import './meme'
import './qoute'


function App() {

  return (
    <>
        <img src={Logo} className="logo" alt="Logo" />
        
        <h1>How's your Mood Today?</h1>
        
    </>
  )
}

export default App