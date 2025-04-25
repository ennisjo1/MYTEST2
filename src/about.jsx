import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import AbtApp from './abtApp.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AbtApp />
  </StrictMode>,
)