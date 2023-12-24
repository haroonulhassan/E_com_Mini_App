import React from 'react'
import { Outlet,Link } from 'react-router-dom'
Outlet

function NavBar() {
  return (
    <>
    
    <ul>
      <li>
        <Link to='/admin'>Admin</Link>
      </li>
      <li>
        <Link to='/product'>Product</Link>
      </li>

      <li>
        <Link to='/Order'>Order</Link>
      </li>
    </ul>
    
    
    <Outlet />
  </>
  )
}

export default NavBar