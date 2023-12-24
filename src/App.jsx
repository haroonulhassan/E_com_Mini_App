import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './NavBar'
import Admin from './Admin'
import Order from './Order'
import Prodect from './Product'
function App() {
  return (
    <>
  
    <Routes> 
    <Route path="/" element={<NavBar/>} />
    <Route path="/admin" element={<Admin/>} />
    <Route path="/product" element={<Prodect/>} />
    <Route path="/order" element={<Order/>} />
    </Routes>
 
    
    
    </>
  )
}

export default App