import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' //react-dom is renderer for sites. if we want to build apps we will use react-native.
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render( //getting html DOM element root and rendering the App component in it.
  <StrictMode>
    <App />
  </StrictMode>,
)
