import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, } from "react-router";
import './index.css'
import App from './App.jsx'

import Mainlayout from './Components/mainlayout/mainlayout.jsx';
import { CartProvider } from './CardContext.jsx';






createRoot(document.getElementById('root')).render(
   <BrowserRouter>
       <CartProvider>
        <Mainlayout/>
        
    <App/>
    </CartProvider>    
  </BrowserRouter>
)
