import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import './LayoutAdmin.scss'





const NavbarAdmin = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <nav>

<ul className='navBar mt-lg-4 mt-3 text-lg-end text-center me-lg-5 mb-lg-3 mb-0 p-0'>
      <li><NavLink to="/admin" >ADMIN</NavLink></li>
      <li><NavLink to="/admin/aboutus" >Ret About us</NavLink></li>
      <li className='dropdown'>
        <li className='dropdown-toggle' onClick={toggleDropdown}>Review</li>
        {isDropdownOpen && (
          <ul className='dropdown-menu'>
            <li><NavLink to="/admin/postreview" >Post et review</NavLink></li>
      <li><NavLink to="/admin/retreview" >Ret dit review</NavLink></li>
      <li><NavLink to="/admin/delreview" >Slet dit review</NavLink></li>
          </ul>
        )}
      </li>
      




      <li><NavLink to="/" >Home</NavLink></li>
  
      


    </ul>

    </nav>
  )
}

export default NavbarAdmin